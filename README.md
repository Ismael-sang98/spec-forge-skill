<div align="center">
  <img src="./assets/logo.svg" alt="SpecForge Logo" width="112" height="112" />
  <h1>SpecForge — Spec-Driven AI Development</h1>
  <p><strong>Zero Hallucinations. Zero Spaghetti Code. Zero Code Before Validated Specifications.</strong></p>
  <p>
    <strong>🇬🇧 English</strong> &nbsp;|&nbsp;
    <a href="./README.fr.md">🇫🇷 Français</a> &nbsp;|&nbsp;
    <a href="./README.tr.md">🇹🇷 Türkçe</a>
  </p>
</div>

---

## Why SpecForge?

AI coding agents drift, invent endpoints, skip edge cases, and create 1,000-line "God Components" when they start coding from a vague prompt.

**SpecForge** turns any AI coding assistant (**Google Antigravity, Cursor, Claude Code, Windsurf, GitHub Copilot**) into a disciplined Principal Engineer by enforcing **Spec-Driven AI Development**:

1. **Physical Smart Gate (`PreToolUse` Hook + Global Rule)**: On any new project, writing application code is **blocked** until the complete specification suite (`docs/` + `AGENTS.md`) is co-designed and approved.
2. **Multimodal CTO Discovery (`spec-init`)**: Scans dropped PDFs, briefs, spreadsheets, and Figma mockups (`docs/maquettes/`), fetches external API/competitor URLs, recommends optimal stacks/architectures, and conducts a **resumable 4-phase interview** in **your language** (English, Français, Türkçe, etc.).
3. **Full Lifecycle Governance**: Vertical-slice execution (`spec-slice`), ADR-backed mid-project changes (`spec-evolve`), and pre-production security audits (`spec-audit`).
4. **Universal Stack & Platform Support**: Tailored guardrails and `verify` gates for **Web/SaaS, Mobile (Flutter/iOS/Android), Desktop (Tauri/Electron/.NET), Backend APIs, and CLIs** across TypeScript, Dart/Flutter, Python, Java/Spring Boot, C#/.NET, Go, and Rust.

---

## Global Installation (1 Minute)

### ✨ Option 1 — Zero-Terminal AI Prompt (Copy & Paste into Your AI)

Don't want to run terminal commands manually? Just **copy-paste this prompt into your AI coding assistant** (Antigravity, Cursor, Claude Code, or Windsurf) and let it install everything for you:

```text
Install the SpecForge global plugin & skills from https://github.com/Ismael-sang98/spec-forge-skill.git on my machine:
1. Clone https://github.com/Ismael-sang98/spec-forge-skill.git into a temporary directory.
2. Detect my OS and run "./install.sh" (macOS/Linux) or "powershell -ExecutionPolicy Bypass -File .\install.ps1" (Windows) so the global plugin, Smart Gate hook, and 4 skills (spec-init, spec-slice, spec-evolve, spec-audit) are installed for my AI IDE(s).
3. Verify the installed files, remove the temporary clone folder, and then explain clearly to me how SpecForge works, how the "Zero Code Before Specs" Smart Gate protects my projects, when to use each of the 4 skills, and remind me to restart my IDE once.
```

---

### 🛠️ Option 2 — Manual CLI Installation (Full Plugin + Smart Gate Hook)

**macOS & Linux:**
```bash
git clone https://github.com/Ismael-sang98/spec-forge-skill.git
cd spec-forge-skill
chmod +x install.sh && ./install.sh
```

**Windows (PowerShell):**
```powershell
git clone https://github.com/Ismael-sang98/spec-forge-skill.git
cd spec-forge-skill
powershell -ExecutionPolicy Bypass -File .\install.ps1
```

**Or directly with the Antigravity CLI:**
```bash
agy plugin install ./spec-forge-skill
```

> **Note:** Restart your AI IDE once after installing so the global plugin, `PreToolUse` Smart Gate hook, and 4 skills are loaded.

### 🌐 Option 3 — Universal Skills CLI (Cursor, Claude Code, Windsurf, Copilot, Antigravity)

```bash
npx skills add Ismael-sang98/spec-forge-skill -g
```

---

## The 4 Coordinated Skills

| Skill | When to Use | What It Does |
| :--- | :--- | :--- |
| **`spec-init`** | Starting a new project (or retro-specifying an existing repo) | Scans local briefs/mockups & external links, interviews you across **4 Phases** with `(Recommended)` CTO answers, saves progress in `docs/.spec-state.json`, generates all `docs/` + root governance files with **zero `[TODO]` placeholders**, and unlocks `READY_TO_CODE`. |
| **`spec-slice`** | Building features step-by-step | Picks the next unchecked `[ ]` vertical slice in `docs/07_IMPLEMENTATION_PLAN.md`, codes Validation -> DB -> Service/ACID -> Unit Tests -> UI, runs `verify`, marks `[x]`, and outputs a structured progress report. |
| **`spec-evolve`** | Adding a new feature or changing rules mid-project | Prevents spec drift: records a numbered ADR (`docs/adr/NNNN-*.md`), updates affected `docs/` specs and `07_IMPLEMENTATION_PLAN.md` **before** touching source code. |
| **`spec-audit`** | Quality review & pre-production release | Audits spec-to-code drift (zero `any`/`dynamic`, glossary naming, line caps, RBAC, ACID transactions), runs `verify`, and checks 100% of `docs/PROD_CONFIG.md`. |

---

## How the Smart Gate Protects Your Machine Globally

Because SpecForge installs globally, its `PreToolUse` Smart Gate (`scripts/spec-gate.mjs`) adapts intelligently to every folder you open:

- **Brand-New Project (`< 3` source files, no `docs/`)**: Hard-blocks code creation (`deny`) and instructs the AI to launch **`spec-init`** first.
- **In-Progress Specification (`docs/.spec-state.json` = `IN_PROGRESS`)**: Allows writing inside `docs/` and root governance files while keeping application code locked until Phase 4 is approved (`READY_TO_CODE`).
- **Specified Project (`READY_TO_CODE` or existing `docs/01_PRD.md` + `07_IMPLEMENTATION_PLAN.md`)**: Allows coding smoothly under `AGENTS.md` laws.
- **Existing Legacy Repo (`>= 3` source files, no `docs/`)**: Prompts you cleanly — either run `spec-init` in **Retro-Spec Mode** or create a `.spec-ignore` file at the project root for quick hotfixes.

---

## Generated Project Blueprint (14-Doc Full Suite + Multi-Team Pack)

*(Also supports an optional **8-Doc Lean / MVP / Academic Profile** for smaller projects or university coursework!)*

```text
YourProject/
├── AGENTS.md                          # Project Constitution & 12 Stack-Tailored Commandments
├── .cursorrules                       # Cursor team mirror
├── CLAUDE.md                          # Claude Code team mirror
├── .env.example                       # Documented environment variable matrix (zero real secrets)
└── docs/
    ├── .spec-state.json               # Resumable phase state & READY_TO_CODE gate status
    ├── README.md                      # Central specification hub
    ├── GLOSSARY.md                    # Ubiquitous Language (Local Domain Term <-> English Code Key)
    ├── ERROR_CATALOG.md               # Standardized error envelope & error code registry
    ├── 01_PRD.md                      # Business vision, personas, invariants & exact formulas
    ├── 02_TRD_TECHNICAL_SPEC.md       # Architecture, stack, API/IPC contracts & ACID boundaries
    ├── 03_APPFLOW.md                  # Route/command map, sequence diagrams & Finite State Machines
    ├── 04_DATABASE_SCHEMA.md          # Mermaid ERD, formal ORM/SQL schema, indexes & cascades
    ├── 05_UI_UX_DESIGN.md             # Design tokens & screen mapping (or 05_INTERFACE_CONTRACT.md)
    ├── 06_CODING_RULES.md             # Clean architecture layers, modularity caps & anti-pattern bans
    ├── 07_IMPLEMENTATION_PLAN.md      # Vertical slices roadmap with [ ] / [x] checkboxes
    ├── 08_TESTING_STRATEGY.md         # Testing pyramid, test factories & coverage mandates
    ├── 09_RBAC_PERMISSIONS.md         # Role x Resource CRUD & ownership matrix
    ├── PROD_CONFIG.md                 # 6-pillar pre-production security & deployment audit checklist
    ├── adr/                           # Immutable Architecture Decision Records
    │   └── 0001-stack-and-architecture.md
    └── maquettes/                     # Optional Figma exports / wireframes / screenshots
```

---

## License

Released under the [MIT License](./LICENSE). Share freely with your team and classmates!
