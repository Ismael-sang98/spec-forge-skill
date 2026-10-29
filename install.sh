#!/usr/bin/env bash
set -euo pipefail

# ==============================================================================
# SpecForge — Universal Global Installer (macOS & Linux)
# Supports: Google Antigravity (Full Plugin + Hook + Rules), Claude Code,
#           Cursor, Windsurf, and ~/.agents/skills
# ==============================================================================

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PLUGIN_NAME="spec-forge"
SKILLS=("spec-init" "spec-slice" "spec-evolve" "spec-audit")

UNINSTALL=false
if [[ "${1:-}" == "--uninstall" || "${1:-}" == "uninstall" ]]; then
  UNINSTALL=true
fi

install_skills_into() {
  local target_skills_dir="$1"
  local label="$2"
  mkdir -p "$target_skills_dir"
  for skill in "${SKILLS[@]}"; do
    rm -rf "${target_skills_dir:?}/${skill}"
    cp -R "${SCRIPT_DIR}/skills/${skill}" "${target_skills_dir}/${skill}"
  done
  echo "  [OK] Installed 4 SpecForge skills for ${label} -> ${target_skills_dir}"
}

uninstall_skills_from() {
  local target_skills_dir="$1"
  local label="$2"
  if [[ -d "$target_skills_dir" ]]; then
    for skill in "${SKILLS[@]}"; do
      rm -rf "${target_skills_dir:?}/${skill}"
    done
    echo "  [OK] Removed SpecForge skills from ${label} (${target_skills_dir})"
  fi
}

if [[ "$UNINSTALL" == true ]]; then
  echo "Uninstalling ${PLUGIN_NAME}..."
  if command -v agy >/dev/null 2>&1; then
    agy plugin uninstall "${PLUGIN_NAME}" >/dev/null 2>&1 || true
  fi
  rm -rf "${HOME}/.gemini/config/plugins/${PLUGIN_NAME}"
  echo "  [OK] Removed Antigravity global plugin (${HOME}/.gemini/config/plugins/${PLUGIN_NAME})"

  uninstall_skills_from "${HOME}/.claude/skills" "Claude Code"
  uninstall_skills_from "${HOME}/.cursor/skills" "Cursor"
  uninstall_skills_from "${HOME}/.codeium/windsurf/skills" "Windsurf"
  uninstall_skills_from "${HOME}/.agents/skills" "Universal Agent Skills"
  echo "Done! Restart your AI IDE / CLI to complete removal."
  exit 0
fi

echo "=============================================================="
echo "  SpecForge — Global Spec-Driven AI Development Installer"
echo "=============================================================="

chmod +x "${SCRIPT_DIR}/scripts/spec-gate.mjs" || true

# 1. Antigravity Full Plugin Bundle (Skills + Global Rule + PreToolUse Smart Gate Hook)
AGY_PLUGIN_DIR="${HOME}/.gemini/config/plugins/${PLUGIN_NAME}"
mkdir -p "${HOME}/.gemini/config/plugins"

INSTALLED_VIA_CLI=false
if command -v agy >/dev/null 2>&1; then
  if agy plugin install "${SCRIPT_DIR}" >/dev/null 2>&1; then
    INSTALLED_VIA_CLI=true
    echo "  [OK] Installed full Antigravity plugin via 'agy plugin install'"
  fi
fi

if [[ "$INSTALLED_VIA_CLI" == false ]]; then
  rm -rf "${AGY_PLUGIN_DIR}"
  mkdir -p "${AGY_PLUGIN_DIR}"
  cp -R "${SCRIPT_DIR}/plugin.json" \
        "${SCRIPT_DIR}/hooks.json" \
        "${SCRIPT_DIR}/assets" \
        "${SCRIPT_DIR}/rules" \
        "${SCRIPT_DIR}/scripts" \
        "${SCRIPT_DIR}/skills" \
        "${SCRIPT_DIR}/README.md" \
        "${AGY_PLUGIN_DIR}/"
  chmod +x "${AGY_PLUGIN_DIR}/scripts/spec-gate.mjs" || true
  echo "  [OK] Installed full Antigravity plugin -> ${AGY_PLUGIN_DIR}"
fi

# 2. Auto-detect and install global skills for Claude Code, Cursor, Windsurf
if [[ -d "${HOME}/.claude" ]]; then
  install_skills_into "${HOME}/.claude/skills" "Claude Code"
fi

if [[ -d "${HOME}/.cursor" ]]; then
  install_skills_into "${HOME}/.cursor/skills" "Cursor"
fi

if [[ -d "${HOME}/.codeium/windsurf" ]]; then
  install_skills_into "${HOME}/.codeium/windsurf/skills" "Windsurf"
fi

echo ""
echo "SpecForge v1.0.0 is installed globally!"
echo "-> Restart Antigravity / your AI IDE so the new plugin, Smart Gate hook, and skills load."
echo "-> Start any new project by asking: 'Use spec-init to specify my project'"
