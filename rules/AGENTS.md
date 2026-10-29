# SpecForge — Global Spec-Driven AI Development Mandate

You operate under the **SpecForge (Spec-Driven AI Development)** discipline. Your core principle is **Zero Improvisation & Zero Code Before Validated Specifications**.

## 1. The Smart Gate Law (Before Writing Any Code)

Whenever a user asks you to build, scaffold, or modify software in a workspace, inspect the project root **before** creating or editing any source code file:

1. **Explicit Bypass (`.spec-ignore` exists at project root):**
   - Proceed normally without enforcing `docs/` creation.
2. **New / Greenfield Project (no `docs/01_PRD.md`, no `docs/.spec-state.json`, and fewer than 3 existing source files) OR In-Progress Spec (`docs/.spec-state.json` has `"status": "IN_PROGRESS"`):**
   - **HARD STOP ON CODE:** You are **strictly forbidden** from writing a single line of application code, scaffolding frameworks, or creating database migrations yet.
   - Immediately activate and read the **`spec-init`** skill (`skills/spec-init/SKILL.md`) to conduct or resume the structured 4-phase discovery interview and generate the complete specification suite (`docs/` + `AGENTS.md`).
3. **Legacy Project (existing source codebase with >= 3 code files, no `docs/` and no `.spec-ignore`):**
   - Ask the user once in their language whether they want to:
     - **(A) Run `spec-init` in Retro-Spec Mode** to reverse-engineer and lock down `docs/` + `AGENTS.md` from their existing codebase, OR
     - **(B) Create `.spec-ignore`** (or proceed directly for a quick hotfix).
4. **Specified Project (`docs/.spec-state.json` is `"READY_TO_CODE"`, or `docs/01_PRD.md` + `docs/07_IMPLEMENTATION_PLAN.md` exist):**
   - Follow the project's root `AGENTS.md` and `docs/` as the **Single Source of Truth**.
   - Never invent endpoints, database fields, calculations, or UI styles that contradict `docs/`.

## 2. Lifecycle Routing to SpecForge Skills

Activate the matching SpecForge skill whenever the user's intent matches:

- **Starting a project / Creating or resuming specs** -> Read and execute **`spec-init`**.
- **Implementing the next feature / slice from `docs/07_IMPLEMENTATION_PLAN.md`** -> Read and execute **`spec-slice`**.
- **Adding a new feature, changing business rules, or altering architecture mid-project** -> Read and execute **`spec-evolve`** (update specs + create an ADR in `docs/adr/` + update the plan *before* writing code).
- **Auditing code quality, checking spec/code drift, or preparing for production deployment** -> Read and execute **`spec-audit`**.

## 3. Multilingual Respect

- Always converse with the user in **their active language** (e.g., Français, Türkçe, English, etc.).
- Keep code identifiers, database column names, API routes, and `GLOSSARY.md` code keys in clean, idiomatic **English**.
