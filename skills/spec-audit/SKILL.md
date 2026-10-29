---
name: spec-audit
description: >-
  Audits a project for Spec-to-Code alignment, coding-rule compliance (zero any/dynamic, file size caps,
  glossary naming, RBAC guards, ACID transactions, test coverage), and executes the pre-production security
  hardening checklist in docs/PROD_CONFIG.md. Use when reviewing quality, checking drift between docs/ and
  code, or preparing a project for production deployment.
---

# SpecForge — `spec-audit` (Spec-Code Drift & Production Hardening Auditor)

You perform a rigorous, evidence-based engineering audit against `AGENTS.md` and `docs/`. Never assume compliance — verify every claim directly in the codebase and run automated checks.

---

## Audit Pillar 1: Spec Completeness & Internal Consistency
Check all files in `docs/` and root governance (`AGENTS.md`, `.cursorrules`, `CLAUDE.md`, `.env.example`):
- Are there any leftover `[TODO]`, `[TBD]`, or contradictory definitions across PRD, TRD, Schema, and AppFlow?
- Does `.env.example` match every environment variable referenced in `02_TRD*.md` and source code?

## Audit Pillar 2: Spec-to-Code Drift & Coding Rules (`06_CODING_RULES.md`)
Scan the actual codebase to verify:
1. **Strict Typing**: Grep for forbidden escape hatches (`: any`, `as any`, untyped `dynamic`, `.unwrap()` in prod paths).
2. **Boundary Validation & Glossary Alignment**: Every external input passes through schema validation; entity/field names match `docs/GLOSSARY.md`.
3. **Domain & ACID Invariants**: Calculations live exclusively in domain/server services (never client UI); multi-table writes use atomic transactions; error responses match `docs/ERROR_CATALOG.md`.
4. **RBAC Enforcement**: Every route/action enforces the exact role & ownership matrix in `docs/09_RBAC_PERMISSIONS.md`.
5. **Modularity & UI Fidelity**: Flag files/components exceeding the line cap (`> 200 lines`), forbidden fetching patterns (e.g. `useEffect` network calls), or hardcoded off-brand colors violating `docs/05_UI_UX_DESIGN.md`.

## Audit Pillar 3: Automated Verification (`verify`)
Run the project's full `verify` command (typecheck + lint + unit/integration tests + build) and capture exact pass/fail evidence.

## Audit Pillar 4: Pre-Production Security & Hardening (`docs/PROD_CONFIG.md`)
Evaluate every control point in `docs/PROD_CONFIG.md` line-by-line:
- Zero token/secret leaks in HTTP responses, client bundles, placeholders, or server logs.
- Zero demo/mock fallback active when `NODE_ENV=production` (or release build).
- Destructive seed scripts blocked in production; formal migrations configured.
- Rate-limiting, strict cookie/CORS headers, private storage buckets + short-lived signed URLs, startup secret validation.

---

## Output Format

Deliver a structured report in the user's language:
1. **Overall Readiness Score (`0–100`) & Verdict** (`🟢 PRODUCTION READY` | `🟡 DRIFT / MINOR FIXES NEEDED` | `🔴 BLOCKED — P0 VIOLATIONS`).
2. **Findings Table Categorized by Severity (`P0 Critical`, `P1 High`, `P2 Medium`, `P3 Polish`)**:
   - File & line reference, violated spec rule/ID (e.g., `SEC-01`, `CODING-RULE-01`), and exact remediation fix.
3. **Actionable Next Step**: Offer to remediate findings systematically (and update `docs/PROD_CONFIG.md` statuses once fixed and verified).
