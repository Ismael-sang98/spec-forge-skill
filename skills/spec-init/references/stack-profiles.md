# SpecForge — Stack-Specific Profiles, Guardrails & `verify` Commands

Use this reference during **Phase 2** and **Phase 4** of `spec-init` so that `06_CODING_RULES.md`, `08_TESTING_STRATEGY.md`, `AGENTS.md`, and the project's `verify` command match the chosen technology stack idiomatically.

---

## 1. TypeScript / JavaScript (React, Next.js, Vue, Node.js, Express, NestJS, Tauri/Electron UI)

- **Strict Typing**: `"strict": true` in `tsconfig.json`. **Zero `any`** (`unknown` + runtime parser required). Explicit return types on exported functions and services.
- **Boundary Validation**: Mandatory **Zod** (or Valibot/TypeBox) schemas shared between client and server for every HTTP payload, query param, form input, and env variable.
- **Frontend Fetching & Forms**: Ban raw `useEffect` data fetching; enforce **TanStack Query** (or framework loader/Server Actions) + `react-hook-form` with schema resolver. Max **200 lines** per React/Vue component.
- **Backend & Persistence**: Route -> Controller -> Service -> Repository/ORM (Prisma/Drizzle). Business & financial calculations strictly server-side inside `services/`. Multi-table writes wrapped in atomic transactions (`prisma.$transaction`).
- **Testing**: Vitest (or Jest) for unit/integration + Supertest for API + Playwright for E2E.
- **Canonical `verify` Script (`package.json`)**:
  ```json
  {
    "scripts": {
      "verify": "npm run typecheck && npm run lint && npm run test && npm run build"
    }
  }
  ```

---

## 2. Flutter / Dart (Mobile iOS/Android, Web, Desktop)

- **Strict Typing**: Enable strict casts, strict inference, and strict raw types in `analysis_options.yaml`. **Zero unjustified `dynamic`**.
- **Architecture & State**: Layered architecture (`UI Widgets -> Riverpod/Bloc Controllers -> Domain UseCases -> Data Repositories`). Widgets must remain pure UI (`<= 200 lines`, extract sub-widgets into dedicated files, `const` constructors everywhere possible).
- **Serialization & Immutability**: Immutable models (`freezed` / `json_serializable` or sealed Dart 3 classes with exhaustive pattern matching). Validate external JSON at repository boundaries.
- **Offline & Lifecycle**: Explicit handling of loading/error/empty states (`AsyncValue`), safe area constraints, responsive layouts, and local DB transactions (Drift/SQLite) when offline-first.
- **Testing**: `package:test` unit tests for repositories/domain + `WidgetTester` widget tests + `integration_test` critical flows.
- **Canonical `verify` Command (`Makefile` or `scripts/verify.sh`)**:
  ```bash
  dart format --output=none --set-exit-if-changed . && flutter analyze --fatal-infos --fatal-warnings && flutter test
  ```

---

## 3. Python (FastAPI, Django, Flask, CLI, Data/AI Backends)

- **Strict Typing**: 100% type annotations on all function signatures (`mypy --strict` or `pyright` in strict mode). Ban untyped `dict[str, Any]` payloads across boundaries.
- **Boundary Validation**: **Pydantic v2** (`ConfigDict(extra="forbid", strict=True)`) for all request/response DTOs and `pydantic-settings` for startup environment validation.
- **Architecture & Persistence**: Router -> Service -> Repository/Unit-of-Work (SQLAlchemy 2.0 typed / SQLModel / Django ORM). Explicit `async with session.begin():` or `transaction.atomic()` for multi-entity writes. Use `Decimal` or strict `int` (never `float`) for monetary amounts.
- **Testing**: `pytest` + `pytest-asyncio` + `httpx.AsyncClient` + FactoryBoy/fixtures.
- **Canonical `verify` Command (`Makefile` or `pyproject.toml` task)**:
  ```bash
  ruff check . && ruff format --check . && mypy src && pytest
  ```

---

## 4. Java / Kotlin (Spring Boot, Android Native, Enterprise Backends)

- **Strict Typing & Null Safety**: Null-safe annotations (`@NonNull` / JSpecify in Java; native null-safety without `!!` operator abuse in Kotlin). Java Records / Kotlin `data class` for immutable DTOs. Never expose JPA `@Entity` classes directly in REST controllers.
- **Boundary Validation**: Jakarta Bean Validation (`@Valid`, `@NotNull`, `@PositiveOrZero`, custom validators) on every incoming DTO + `@ControllerAdvice` mapping exceptions to `ERROR_CATALOG.md` (`ProblemDetail` RFC 7807).
- **Transactions & Money**: `@Transactional` on domain service boundaries; `BigDecimal` with explicit `RoundingMode` or `long` minor units (never `double`/`float`) for money. Flyway or Liquibase for immutable SQL migrations (`ddl-auto: validate` in production).
- **Testing**: JUnit 5 + Mockito / MockK + Spring `@WebMvcTest` / Testcontainers.
- **Canonical `verify` Command**:
  ```bash
  ./mvnw spotless:check test package   # or ./gradlew check
  ```

---

## 5. C# / .NET (ASP.NET Core, Desktop WPF/MAUI/Avalonia)

- **Strict Typing**: `<Nullable>enable</Nullable>` and `<TreatWarningsAsErrors>true</TreatWarningsAsErrors>` in `.csproj`. Immutable `record` DTOs.
- **Boundary Validation**: FluentValidation or DataAnnotations at API/Command boundaries; MediatR / Clean Architecture slices (`Endpoints -> Application -> Domain -> Infrastructure`).
- **Transactions & Money**: `decimal` or `long` for monetary calculations; EF Core explicit migrations + transactions for multi-aggregate mutations.
- **Testing**: xUnit + FluentAssertions + NSubstitute/Moq + `WebApplicationFactory`.
- **Canonical `verify` Command**:
  ```bash
  dotnet format --verify-no-changes && dotnet build -warnaserror && dotnet test
  ```

---

## 6. Go & Rust (High-Performance Backends, Systems, Desktop Tauri Core, CLIs)

### Go:
- Explicit error wrapping (`fmt.Errorf("...: %w", err)`), zero ignored errors (`errcheck`), context propagation (`ctx context.Context` first arg), `sqlc` or typed queries with `tx.Commit()/ defer tx.Rollback()`, `int64` for money.
- **`verify`**: `gofmt -l . && go vet ./... && golangci-lint run && go test -race ./... && go build ./...`

### Rust:
- Zero `.unwrap()` / `.expect()` in production runtime paths (use typed `thiserror` domain errors mapped to `ERROR_CATALOG.md` + `Result<T, AppError>`), `serde` strict validation, `sqlx` compile-time checked queries & transactions.
- **`verify`**: `cargo fmt --all -- --check && cargo clippy --all-targets -- -D warnings && cargo test && cargo build`
