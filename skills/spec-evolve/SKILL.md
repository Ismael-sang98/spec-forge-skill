---
name: spec-evolve
description: >-
  SpecForge (spec-forge) evolution & ADR skill: manages mid-project feature additions, requirement changes,
  schema updates, or architectural pivots without breaking Spec-Driven integrity. Interviews the user on
  impacts, records an Architecture Decision Record (docs/adr/NNNN-*.md), and updates affected docs/ files
  and docs/07_IMPLEMENTATION_PLAN.md BEFORE any code is modified.
---

# SpecForge — `spec-evolve` (Spec-First Evolution & ADR Gatekeeper)

In Spec-Driven AI Development, **code never drifts ahead of specifications**. Whenever a project already has `docs/` and the user requests a **new feature, business rule modification, third-party integration, or architectural change** not yet covered in `docs/`, you update the Single Source of Truth **first**.

---

## Workflow

### 1. Impact Analysis (Read Before Asking)
Inspect `docs/` (`GLOSSARY.md`, `01_PRD.md`, `02_TRD*.md`, `03_APPFLOW.md`, `04_DATABASE_SCHEMA.md`, `05_UI_UX*.md`, `07_IMPLEMENTATION_PLAN.md`, `09_RBAC_PERMISSIONS.md`, `ERROR_CATALOG.md`, and `docs/adr/`) to pinpoint every affected layer:
- Does it introduce new domain terms or enums? -> `GLOSSARY.md`
- Does it alter formulas, invariants, or user workflows? -> `01_PRD.md`, `03_APPFLOW.md`
- Does it add/modify tables, columns, or indexes? -> `04_DATABASE_SCHEMA.md`
- Does it add/change endpoints, env vars, permissions, or errors? -> `02_TRD*.md`, `.env.example`, `09_RBAC_PERMISSIONS.md`, `ERROR_CATALOG.md`
- Does it add screens, modals, or states? -> `05_UI_UX*.md`

### 2. Targeted Clarification Interview
- Ask only the high-impact delta questions needed to eliminate ambiguity (using `ask_question` when available, with a **`(Recommended)`** architect option first).
- Ask if the user has any supplementary docs, API URLs, or mockup screenshots for this new feature.

### 3. Record an Architecture Decision Record (`docs/adr/NNNN-<slug>.md`)
- Determine the next sequential 4-digit ADR number in `docs/adr/` (e.g., `0002-add-stripe-webhooks.md`).
- Document: **Status**, **Date**, **Context**, **Options Considered**, **Decision**, and **Migration / Backward-Compatibility Consequences**.

### 4. Synchronize Affected Specification Files & Plan
- Update every impacted file in `docs/` (and `.env.example` if new env variables are introduced) cleanly with zero placeholders.
- Append (or insert at the right dependency point) a new **Vertical Slice** with granular `[ ]` checkboxes in `docs/07_IMPLEMENTATION_PLAN.md`.

### 5. Confirm & Hand Off to `spec-slice`
- Present a concise summary of the updated specification files, the new ADR, and the new slice added to `07_IMPLEMENTATION_PLAN.md`.
- Once the user confirms (or immediately if they asked to both specify and implement in one go and zero ambiguity remains), execute the new slice using **`spec-slice`**.
