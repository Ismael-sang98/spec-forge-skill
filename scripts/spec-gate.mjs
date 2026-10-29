#!/usr/bin/env node
/**
 * SpecForge Smart Gate — PreToolUse Lifecycle Hook
 *
 * Enforces "Zero Code Before Complete Specifications" across projects while
 * intelligently distinguishing:
 *   1. Explicit bypass (.spec-ignore) -> ALLOW
 *   2. Tracked SpecForge project (docs/.spec-state.json):
 *      - status === "READY_TO_CODE" -> ALLOW
 *      - status !== "READY_TO_CODE" -> DENY code writes outside docs/
 *   3. Existing Spec-Driven project (e.g., docs/01_PRD.md + docs/07_IMPLEMENTATION_PLAN.md) -> ALLOW
 *   4. Unspecified project:
 *      - Greenfield (< 3 existing source files) -> DENY code writes until spec-init finishes
 *      - Legacy codebase (>= 3 existing source files) -> ASK user (allow edit, retro-spec, or .spec-ignore)
 */

import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const CODE_EXTENSIONS = new Set([
  ".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs",
  ".py", ".dart", ".java", ".kt", ".kts", ".swift",
  ".cs", ".go", ".rs", ".php", ".rb", ".cpp", ".cc",
  ".c", ".h", ".hpp", ".vue", ".svelte", ".astro",
  ".Sql", ".sql", ".prisma", ".graphql", ".proto",
  ".html", ".css", ".scss", ".sass", ".less"
]);

const IGNORED_DIRS = new Set([
  ".git", "node_modules", "dist", "build", "out", ".next", ".nuxt",
  ".dart_tool", ".idea", ".vscode", "target", "bin", "obj", "vendor",
  ".venv", "venv", "__pycache__", "coverage", ".turbo", ".cache",
  "docs", "Docs", ".agents", ".agent", ".gemini", ".claude", ".cursor"
]);

const ALLOWED_ROOT_FILENAMES = new Set([
  "AGENTS.md",
  "GEMINI.md",
  "CLAUDE.md",
  "AI_RULES.md",
  ".cursorrules",
  ".windsurfrules",
  ".clinerules",
  "README.md",
  "LICENSE",
  ".gitignore",
  ".env.example",
  ".spec-ignore"
]);

function respond(obj) {
  process.stdout.write(JSON.stringify(obj) + "\n");
  process.exit(0);
}

function isSubPath(childPath, parentPath) {
  if (!parentPath) return false;
  const rel = path.relative(path.resolve(parentPath), path.resolve(childPath));
  return rel === "" || (!rel.startsWith("..") && !path.isAbsolute(rel));
}

function extractTargetFile(args) {
  if (!args || typeof args !== "object") return null;
  const candidate =
    args.Path ||
    args.TargetFile ||
    args.path ||
    args.file_path ||
    args.filePath ||
    args.target_file;
  return typeof candidate === "string" && candidate.trim().length > 0
    ? candidate.trim()
    : null;
}

function findProjectRoot(targetFile, workspacePaths) {
  const resolvedTarget = path.resolve(targetFile);

  if (Array.isArray(workspacePaths) && workspacePaths.length > 0) {
    const matchingWorkspaces = workspacePaths
      .filter((ws) => typeof ws === "string" && ws.length > 0)
      .map((ws) => path.resolve(ws))
      .filter((ws) => isSubPath(resolvedTarget, ws))
      .sort((a, b) => b.length - a.length);

    if (matchingWorkspaces.length > 0) {
      return matchingWorkspaces[0];
    }
  }

  let current = path.dirname(resolvedTarget);
  while (true) {
    if (
      fs.existsSync(path.join(current, ".spec-ignore")) ||
      fs.existsSync(path.join(current, "docs", ".spec-state.json")) ||
      fs.existsSync(path.join(current, ".git"))
    ) {
      return current;
    }
    const parent = path.dirname(current);
    if (parent === current) break;
    current = parent;
  }
  return null;
}

function isAllowedSystemOrDocWrite(targetFile, projectRoot, artifactDir) {
  const resolvedTarget = path.resolve(targetFile);
  const home = os.homedir();
  const tmp = os.tmpdir();

  // Always allow writes to agent internal/config/temp/artifact directories
  const systemPrefixes = [
    artifactDir,
    tmp,
    "/tmp",
    "/private/tmp",
    path.join(home, ".gemini"),
    path.join(home, ".claude"),
    path.join(home, ".cursor"),
    path.join(home, ".windsurf"),
    path.join(home, ".codeium"),
    path.join(home, ".agents")
  ].filter(Boolean);

  for (const prefix of systemPrefixes) {
    if (isSubPath(resolvedTarget, prefix)) return true;
  }

  if (!projectRoot) return true;

  // Allow maintaining the spec-forge plugin repository itself
  const manifestPath = path.join(projectRoot, "plugin.json");
  if (fs.existsSync(manifestPath)) {
    try {
      const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
      if (manifest && manifest.name === "spec-forge") return true;
    } catch {
      // Ignore parse errors
    }
  }

  const relToRoot = path.relative(projectRoot, resolvedTarget);
  const segments = relToRoot.split(path.sep);
  const topSegment = segments[0];
  const fileName = path.basename(resolvedTarget);

  // Allow writing inside docs/, Docs/, .agents/, .cursor/, .claude/, .github/
  if (
    topSegment === "docs" ||
    topSegment === "Docs" ||
    topSegment === ".agents" ||
    topSegment === ".agent" ||
    topSegment === ".cursor" ||
    topSegment === ".claude" ||
    topSegment === ".github"
  ) {
    return true;
  }

  // Allow governance & README files at the project root
  if (segments.length === 1) {
    if (ALLOWED_ROOT_FILENAMES.has(fileName)) return true;
    if (/^README\.[a-zA-Z_-]+\.md$/.test(fileName)) return true;
  }

  return false;
}

function hasCompleteExistingSpecs(projectRoot) {
  const docsDir = fs.existsSync(path.join(projectRoot, "docs"))
    ? path.join(projectRoot, "docs")
    : fs.existsSync(path.join(projectRoot, "Docs"))
      ? path.join(projectRoot, "Docs")
      : null;

  if (!docsDir) return false;

  const hasPrd = fs.existsSync(path.join(docsDir, "01_PRD.md"));
  const hasPlan = fs.existsSync(path.join(docsDir, "07_IMPLEMENTATION_PLAN.md"));
  if (hasPrd && hasPlan) return true;

  const hasAgents =
    fs.existsSync(path.join(projectRoot, "AGENTS.md")) ||
    fs.existsSync(path.join(projectRoot, "GEMINI.md"));

  if (hasAgents) {
    try {
      const mdFiles = fs
        .readdirSync(docsDir)
        .filter((f) => f.toLowerCase().endsWith(".md"));
      if (mdFiles.length >= 4) return true;
    } catch {
      return false;
    }
  }

  return false;
}

function countExistingCodeFiles(dir, depth = 0, limit = 3) {
  if (depth > 4) return 0;
  let count = 0;
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return 0;
  }

  for (const entry of entries) {
    if (entry.name.startsWith(".") && entry.isDirectory()) {
      if (IGNORED_DIRS.has(entry.name)) continue;
    }
    if (entry.isDirectory()) {
      if (IGNORED_DIRS.has(entry.name)) continue;
      count += countExistingCodeFiles(path.join(dir, entry.name), depth + 1, limit);
      if (count >= limit) return count;
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name);
      if (CODE_EXTENSIONS.has(ext)) {
        count += 1;
        if (count >= limit) return count;
      }
    }
  }
  return count;
}

async function main() {
  let rawInput = "";
  for await (const chunk of process.stdin) {
    rawInput += chunk;
  }

  if (!rawInput.trim()) {
    return respond({ decision: "allow" });
  }

  let payload;
  try {
    payload = JSON.parse(rawInput);
  } catch {
    return respond({ decision: "allow" });
  }

  const targetFile = extractTargetFile(payload?.toolCall?.args);
  if (!targetFile) {
    return respond({ decision: "allow" });
  }

  const projectRoot = findProjectRoot(targetFile, payload?.workspacePaths);
  if (!projectRoot) {
    return respond({ decision: "allow" });
  }

  // 1. Explicit bypass marker
  if (fs.existsSync(path.join(projectRoot, ".spec-ignore"))) {
    return respond({ decision: "allow" });
  }

  // 2. Always allow documentation, governance, and agent config writes
  if (
    isAllowedSystemOrDocWrite(
      targetFile,
      projectRoot,
      payload?.artifactDirectoryPath
    )
  ) {
    return respond({ decision: "allow" });
  }

  // 3. Check active SpecForge state tracker (docs/.spec-state.json)
  const specStatePath = path.join(projectRoot, "docs", ".spec-state.json");
  if (fs.existsSync(specStatePath)) {
    try {
      const state = JSON.parse(fs.readFileSync(specStatePath, "utf8"));
      if (state && state.status === "READY_TO_CODE") {
        return respond({ decision: "allow" });
      }
      const phaseInfo = state?.currentPhase
        ? ` (currently at Phase ${state.currentPhase}/4)`
        : "";
      return respond({
        decision: "deny",
        reason: `SPEC-FORGE SMART GATE: Project specification is still IN_PROGRESS${phaseInfo}. Writing code outside docs/ is strictly forbidden until all phases of 'spec-init' are completed, validated by the user, and docs/.spec-state.json is set to "READY_TO_CODE".`
      });
    } catch {
      return respond({
        decision: "deny",
        reason:
          "SPEC-FORGE SMART GATE: docs/.spec-state.json is unreadable or incomplete. Run 'spec-init' to validate specifications before writing code."
      });
    }
  }

  // 4. Existing Spec-Driven project (e.g. already has docs/01_PRD.md + 07_IMPLEMENTATION_PLAN.md)
  if (hasCompleteExistingSpecs(projectRoot)) {
    return respond({ decision: "allow" });
  }

  // 5. Distinguish Greenfield project vs Legacy codebase
  const existingCodeCount = countExistingCodeFiles(projectRoot, 0, 3);
  if (existingCodeCount < 3) {
    return respond({
      decision: "deny",
      reason:
        "SPEC-FORGE SMART GATE (ZERO CODE BEFORE SPECS): This is a new project without specification documents in docs/. Before writing a single line of application code, you MUST read and execute the 'spec-init' skill to interview the user and generate the complete specification suite (docs/ + AGENTS.md)."
    });
  }

  return respond({
    decision: "ask",
    reason:
      "SpecForge Smart Gate: Existing legacy codebase detected without docs/ specifications. Allow direct code edit? (Or deny and ask the agent to run 'spec-init' for retro-specification, or create a '.spec-ignore' file at project root.)"
  });
}

main().catch(() => {
  respond({ decision: "allow" });
});
