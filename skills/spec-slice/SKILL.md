---
name: spec-slice
description: >-
  SpecForge (spec-forge) vertical slice execution skill: executes the next unchecked vertical slice from
  docs/07_IMPLEMENTATION_PLAN.md following the strict SpecForge 6-step protocol (Specs review -> Validation ->
  Database -> Service/ACID -> Unit Tests -> API/UI -> verify command -> checkbox update -> structured report).
  Use when implementing features, continuing project development, or building the next slice/task.
---

# SpecForge — `spec-slice` (Vertical Slice Executor)

You implement software strictly **one vertical slice at a time**, treating `AGENTS.md` and `docs/` as absolute law.

---

## Pre-Flight Gate Check

1. Verify that `docs/07_IMPLEMENTATION_PLAN.md` and `AGENTS.md` exist (and if `docs/.spec-state.json` exists, verify `"status": "READY_TO_CODE"`).
   - If specs are missing or still `"IN_PROGRESS"`, **STOP immediately** and switch to **`spec-init`**.
2. Identify the **active slice** (the first slice in `docs/07_IMPLEMENTATION_PLAN.md` with unchecked `[ ]` items, unless the user explicitly names a specific slice whose prerequisites are already `[x]`).

---

## The 6-Step Vertical Slice Execution Protocol

### Step 1: Load the Exact Specifications for This Slice
Before touching any source file, read the relevant sections of:
- `AGENTS.md` & `docs/GLOSSARY.md` (canonical English identifiers — never invent synonyms).
- `docs/01_PRD.md` (business rules, formulas, edge cases).
- `docs/02_TRD*.md`, `docs/04_DATABASE_SCHEMA.md`, `docs/ERROR_CATALOG.md`, `docs/09_RBAC_PERMISSIONS.md` (contracts, schema, error codes, role guards).
- `docs/03_APPFLOW.md` & `docs/05_UI_UX_DESIGN.md` / `05_INTERFACE_CONTRACT.md` (+ any mockup image in `docs/maquettes/` mapped to this screen!).
- `docs/06_CODING_RULES.md` & `docs/08_TESTING_STRATEGY.md`.

### Step 2: Code the Slice Vertically (Bottom-Up, Zero Shortcuts)
Implement only the scope of the active slice across layers:
1. **Boundary Validation / DTOs**: Input/output schemas enforcing types, bounds, and domain constraints.
2. **Persistence & Migrations**: Schema update + migration + repository queries matching `04_DATABASE_SCHEMA.md`.
3. **Domain Service & ACID Transactions**: All calculations and state-machine guards on the server/domain layer; wrap multi-entity mutations in atomic transactions; throw/return standardized codes from `ERROR_CATALOG.md`.
4. **Automated Tests**: Write unit and integration tests covering nominal paths, exact formula outputs, forbidden state transitions, RBAC denials, and rollback edge cases.
5. **Controller / API / State Wiring**: Thin controllers + RBAC middleware + typed client state/queries.
6. **UI / Presentation**: Pixel-accurate tokens from `05_UI_UX_DESIGN.md`, modular files respecting the line-count cap (`<= 200 lines`), loading/empty/error states handled.

### Step 3: Run the Mandatory `verify` Gate
Execute the project's full verification command (`npm run verify`, `make verify`, `./scripts/verify.sh`, or stack equivalent: typecheck + lint + tests + build).
- **Zero Tolerance**: If a single type error, linter warning, test failure, or build failure occurs, fix it immediately and re-run until exit code is `0`.

### Step 4: Check Off Completed Items
Update `docs/07_IMPLEMENTATION_PLAN.md`, turning `[ ]` into `[x]` **only** for items verified green in Step 3.

### Step 5: Mandatory Structured Closing Report
Conclude your response (in the user's language) with the required 3-part report:
1. 🟢 **Done**: Exhaustive list of files created/modified, endpoints/commands added, tests passing, and UI screens/components integrated.
2. ⏳ **Remaining**: Exact next unchecked slice or sub-task in `docs/07_IMPLEMENTATION_PLAN.md`.
3. 📊 **Global Progress**: Active milestone status and overall completion percentage (`checked / total` tasks).
