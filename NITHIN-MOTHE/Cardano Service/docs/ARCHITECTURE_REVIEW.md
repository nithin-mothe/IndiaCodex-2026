# Architecture Review

Senior Staff Engineering review of the completed Milestone 1 foundation, performed before starting Milestone 2.

## Executive Summary

Milestone 1 is directionally strong. The repository has a clear product identity, strict TypeScript defaults, sensible workspace boundaries, basic shared packages, CI, formatting, linting, test wiring, Docker Compose infrastructure, and concise operating documentation.

The foundation is not overbuilt, which is good for this stage. The primary concern is that several decisions that are acceptable in a small foundation will become expensive once Milestone 2 introduces a real Next.js application and later milestones add API, database, Cardano, AI, SDK, and worker surfaces.

The highest priority before Milestone 2 is to tighten monorepo hygiene and runtime boundaries: environment loading, generated artifact policy, app package scaffolding, shared config strategy, and dependency ownership.

## Strengths

### Architecture Consistency

- The repository matches the documented milestone-driven architecture.
- The planned layers are clear: apps, API, services, repositories, workers, contracts, SDK, and shared packages.
- The architecture correctly states that Cardano on-chain state is authoritative for custody and financial transitions.
- Backend responsibility is framed appropriately: coordinate, index, validate, notify, and expose APIs without storing private keys or signing user transactions.

### Folder Structure

- Top-level directories are easy to understand.
- `apps`, `packages`, `workers`, `contracts`, `database`, `docker`, `docs`, `scripts`, and `tests` give the project room to grow.
- Placeholder folders are present for later milestones, reducing ambiguity about where future work belongs.

### Package Organization

- `@trustpay/config`, `@trustpay/types`, `@trustpay/utils`, and `@trustpay/sdk` are useful early package boundaries.
- Worker packages already exist as independently buildable workspace packages.
- Internal package names are consistent and scoped under `@trustpay`.

### Naming Conventions

- Package names, worker names, queue names, and docs names are readable and consistent.
- The API envelope naming is simple and conventional.
- Environment variable names are explicit and product-scoped where needed.

### TypeScript Configuration

- Strict TypeScript settings are strong for a financial workflow product.
- `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `noImplicitOverride`, and `noPropertyAccessFromIndexSignature` are good choices.
- Project references are already in place.
- ESM/NodeNext alignment is appropriate for modern Node.js services.

### Code Quality

- Existing code is small, readable, and low-risk.
- Zod is a good choice for environment validation.
- Utility and SDK functions have focused unit tests.
- ESLint is strict and uses typed linting.

### Dependency Management

- The dependency graph is minimal at this stage.
- There is no premature inclusion of frontend, database, Cardano, queue, or AI SDK dependencies.
- Runtime dependencies are mostly owned by the packages that need them.

### Docker Setup

- Docker Compose provides PostgreSQL and Redis with health checks and persistent volumes.
- Separate Dockerfiles exist for API, web, and workers, anticipating deployable surfaces.

### CI/CD

- CI covers install, build, environment validation, typecheck, lint, format, and tests.
- Node 22 is pinned in CI.
- CI injects required environment variables for validation.

### Environment Configuration

- Required runtime variables are documented.
- Validation rejects missing database, Redis, Cardano provider, JWT, and selected AI provider values.
- The selected AI provider key requirement is already modeled.

### Testing Infrastructure

- Vitest is configured and passing for existing packages.
- Tests cover environment validation, response envelope helpers, and SDK configuration behavior.

### Documentation Quality

- Documentation is concise and aligned with current implementation state.
- `PROJECT_STATE.md` gives a useful recovery snapshot.
- Setup, environment, deployment, contributing, API, and architecture docs exist.

### Future Scalability

- The top-level boundaries can support the planned Cardano, AI, SDK, and worker growth.
- Keeping workers separate from apps is a good long-term scaling direction.
- The SDK has its own package early, which avoids coupling public client behavior to app internals.

## Weaknesses

### Architecture Weaknesses

- The repo documents layers but does not yet define enforceable dependency rules between them.
- Domain ownership is unclear. Escrow lifecycle types live in `@trustpay/types`, but future business rules need a more intentional domain package.
- API, SDK, workers, and database will all need shared domain contracts; the current `types` package may become a dumping ground.
- There is no written ADR process for important architecture decisions.

### Folder Structure Weaknesses

- Placeholder app folders do not yet contain package manifests, local TypeScript configs, or ownership notes.
- `tests` exists but is empty, while package-local tests exist. The intended distinction between package tests and integration/e2e tests is not documented.
- `database` is outside npm workspaces, which is fine now, but Prisma scripts and generated clients will need an explicit ownership model.

### Package Organization Weaknesses

- Worker packages duplicate the `WorkerDescriptor` interface.
- `@trustpay/utils` depends on `@trustpay/types`; that is acceptable, but `utils` can easily become too broad unless scoped carefully.
- `@trustpay/sdk` depends on `@trustpay/types` but does not yet define a transport, error model, versioning strategy, or generated API client strategy.
- There is no package for shared logging, observability, domain logic, API contracts, database client, Cardano adapters, queue abstractions, or AI provider abstractions.

### Monorepo Weaknesses

- npm workspaces are acceptable for Milestone 1 but lack task graph caching and affected-package execution.
- The root `build` script uses `npm run build --workspaces --if-present`, while `typecheck` uses TypeScript project references. These may diverge as apps and packages grow.
- Apps are included in workspace globs but currently have no package manifests.
- There is no monorepo boundary enforcement tool.

### Dependency Management Weaknesses

- Dev dependency versions use caret ranges. For a financial protocol foundation, exact pinning or a controlled update process would reduce supply-chain drift.
- There is no dependency audit step in CI.
- There is no license policy or dependency review automation.
- No Renovate, Dependabot, or update policy is present.

### TypeScript Weaknesses

- `tsconfig.base.json` includes DOM libraries globally. This may leak browser types into backend and worker code.
- `skipLibCheck` is enabled. This is pragmatic, but it hides dependency type issues.
- There is no separate frontend, backend, worker, and package TypeScript profile.
- Build artifacts exist in `dist` despite `dist/` being ignored, which creates ambiguity about artifact ownership.

### Docker Weaknesses

- API, web, and worker Dockerfiles are nearly identical templates.
- Dockerfiles currently run environment validation rather than real services.
- Dockerfiles copy only root package files plus selected folders before `npm ci`; this may break once workspace packages have package manifests in apps or if lockfile/package metadata expectations change.
- There is no `.dockerignore`.
- There are no production hardening choices yet, such as non-root user, minimal runtime copy, healthcheck, or service-specific command.

### CI/CD Weaknesses

- CI does not run Docker builds.
- CI does not run dependency audit or security scanning.
- CI does not verify that generated artifacts are absent or reproducible.
- CI does not use service containers for PostgreSQL or Redis.
- CI does not run integration tests.
- CI does not include path-based or affected-package optimization.

### Environment Configuration Weaknesses

- `scripts/validate-env.mjs` imports from `packages/config/dist/index.js`, which couples validation to prebuilt artifacts.
- Local `.env` files are not automatically loaded by validation scripts.
- `.env.example` includes placeholder API key values that satisfy non-empty string validation if copied unchanged.
- There is no split between build-time, server-runtime, client-exposed, worker-runtime, and test environment variables.
- Future Next.js public environment variables are not accounted for.

### Testing Weaknesses

- Tests are limited to small package behavior.
- No integration, contract, API, database, worker, blockchain, or frontend testing strategy is defined.
- No coverage reporting exists.
- No test fixtures or factories exist.
- No e2e framework is present for future web/API flows.

### Documentation Weaknesses

- Documentation is accurate but intentionally high-level.
- Missing dedicated specs listed in the original recovery request: product spec, UI/UX spec, technical spec, database/API spec, Cardano smart contract spec, AI spec, security/devops spec, and implementation plan.
- There are no ADRs.
- There is no explicit milestone acceptance checklist per upcoming milestone.

## Risks

### Critical Issues

1. Environment validation depends on generated `dist` output.
   - Risk: New contributors, CI steps, Docker builds, or clean clones can fail if validation runs before build artifacts exist.
   - Recommendation: Make environment validation runnable from source or define build-before-validate as a hard invariant.

2. Generated `dist` artifacts are present despite being ignored.
   - Risk: The repo state is ambiguous. Future edits may accidentally rely on stale compiled output.
   - Recommendation: Decide whether `dist` is source-controlled or generated-only before adding Milestone 2.

3. No Git metadata is present in the current folder.
   - Risk: Review, rollback, history, CI integration, branch discipline, and change attribution are unavailable locally.
   - Recommendation: Restore or initialize version control before substantial feature work.

4. Global TypeScript config includes DOM types for all packages.
   - Risk: Backend and worker code can accidentally depend on browser globals, hiding portability bugs.
   - Recommendation: Split TypeScript configs by runtime before adding frontend and server code.

5. No dependency boundary rules exist.
   - Risk: Frontend, API, SDK, workers, and future Cardano/database code may become tightly coupled.
   - Recommendation: Define allowed dependency direction before Milestone 2.

### High Risks

- `@trustpay/types` can become an unbounded shared bucket.
- `@trustpay/utils` can become a broad miscellaneous package.
- SDK design may accidentally mirror internal API implementation instead of a stable public contract.
- Worker packages may diverge without a shared runtime abstraction.
- Placeholder Dockerfiles may create false confidence about deployability.
- Lack of app scaffolding standards can cause Milestone 2 to set patterns that conflict with backend and SDK needs.

### Medium Risks

- npm workspaces may become slow as apps and packages grow.
- Lack of integration tests will become painful once API/database/workers arrive.
- Missing security automation is acceptable for Milestone 1 but not for a financial workflow product.
- Missing docs for product, UI/UX, Cardano contracts, AI behavior, and security can lead to inconsistent implementation decisions.

## Recommendations

## Priority

### P0: Address Before Milestone 2

1. Decide generated artifact policy.
   - Either remove generated `dist` artifacts from working state and rely on builds, or intentionally document and commit them.
   - For this monorepo, generated-only is the cleaner default.

2. Fix or document validation/build ordering.
   - Preferred: make `validate:env` run against TypeScript source through a supported runtime or keep a tiny validation script independent of compiled package output.
   - Acceptable short term: document that `npm run build` must run before `npm run validate:env` on clean clones.

3. Split TypeScript configs by runtime.
   - Keep a strict base.
   - Add Node/server config without DOM libs.
   - Add browser/Next.js config with DOM libs.
   - Add test config if needed.

4. Define monorepo dependency rules.
   - Apps may depend on packages.
   - API may depend on config, types, domain, database, services, observability, and provider adapters.
   - Workers may depend on config, domain, database, queues, observability, and provider adapters.
   - SDK should depend only on public API contracts and client-safe utilities.
   - Contracts should not depend on application runtime packages.

5. Add app scaffolding standards before creating `apps/web`.
   - Define package naming, scripts, TypeScript extension, lint participation, test location, environment variable policy, and import boundaries.

6. Restore or initialize Git before larger changes.
   - Milestone 2 should be developed with commits, reviewable diffs, and branch hygiene.

### P1: Strongly Recommended Before or During Early Milestone 2

1. Add missing architecture packages deliberately.
   - `@trustpay/domain` for escrow lifecycle, roles, invariants, and business-level types.
   - `@trustpay/contracts-api` or `@trustpay/api-contracts` for public REST schemas.
   - `@trustpay/logger` or `@trustpay/observability` for structured logging and telemetry.
   - `@trustpay/env` or keep `@trustpay/config` but split server/client/test schemas.

2. Add a package ownership model.
   - Document what belongs in `types`, `utils`, `domain`, `sdk`, and app-local code.

3. Add `.dockerignore`.
   - Exclude `node_modules`, `dist` where appropriate, `.env`, coverage, local caches, and VCS files.

4. Add basic CI hardening.
   - Add `npm audit` or an equivalent dependency security check.
   - Add Dockerfile build checks once app packages exist.
   - Add a clean-build check to catch stale generated artifact reliance.

5. Add documentation for Milestone 2 acceptance criteria.
   - Include UX, routing, wallet connection assumptions, environment variables, testing expectations, and build/deploy behavior.

### P2: Recommended Before Backend, Database, Cardano, AI, and Worker Expansion

1. Introduce API schema strategy.
   - Choose OpenAPI, TypeBox, Zod-to-OpenAPI, or another contract-first strategy.
   - Ensure API and SDK share public contracts without leaking internal service types.

2. Define database ownership.
   - Decide where Prisma schema lives.
   - Decide whether generated Prisma client is app-owned or package-owned.
   - Define migration and seed scripts.

3. Define Cardano adapter boundaries.
   - Separate chain provider, transaction builder, indexer, script artifact loading, and domain state mapping.
   - Keep wallet signing client-side or user-controlled.

4. Define AI service boundaries.
   - Separate prompts, provider clients, policy/safety controls, evaluation tests, and audit logging.
   - Avoid calling provider SDKs directly from UI or arbitrary service modules.

5. Define worker runtime abstraction.
   - Standardize queue naming, retry policy, dead-letter behavior, idempotency keys, concurrency, logging, metrics, and graceful shutdown.

6. Add integration and e2e test layers.
   - API contract tests.
   - Database migration tests.
   - Worker job tests.
   - Web e2e tests.
   - Cardano contract/unit tests once Aiken arrives.

## Missing Packages

Recommended future packages:

- `@trustpay/domain`: business entities, escrow states, roles, invariants, and domain errors.
- `@trustpay/api-contracts`: request/response schemas, route contracts, public API versioning.
- `@trustpay/logger`: structured logging with request/job context.
- `@trustpay/observability`: metrics, tracing, and event instrumentation.
- `@trustpay/database`: Prisma client wrapper, transaction helper, repository interfaces.
- `@trustpay/queue`: queue abstraction, job schemas, retry/dead-letter conventions.
- `@trustpay/cardano`: provider adapters, chain state mapping, transaction construction interfaces.
- `@trustpay/ai`: provider abstraction, prompt registry, safety controls, evaluation helpers.
- `@trustpay/auth`: session/JWT helpers, role checks, and authorization primitives.
- `@trustpay/testkit`: fixtures, factories, mocks, and integration test utilities.

These should not all be added immediately. Add them only when the corresponding milestone needs them, but decide the boundaries before implementation starts.

## Missing Abstractions

- Domain error model.
- Domain event model.
- Escrow state transition model.
- API contract/schema model.
- Runtime configuration split by target.
- Structured logging context.
- Worker job schema and idempotency model.
- Queue retry and dead-letter policy.
- Cardano provider interface.
- Transaction-building interface.
- Chain indexer interface.
- SDK transport and error handling model.
- AI provider interface.
- AI prompt/version registry.
- Test fixture/factory layer.

## Missing Tooling

- Git metadata or repository initialization in the current folder.
- Clean build verification.
- Dependency audit/security scanning.
- Dependency update automation.
- `.dockerignore`.
- Runtime-specific TypeScript configs.
- Boundary enforcement or import rules.
- Coverage reporting.
- Integration/e2e test tooling.
- ADR template.
- OpenAPI or API schema generation tooling.
- Database migration tooling.
- Cardano/Aiken tooling.
- Observability tooling.

## Nice-to-have Improvements

- Add `docs/adr/` with an ADR template.
- Add `docs/MILESTONE_2_PLAN.md` before implementing the frontend.
- Add package-level README files for each shared package once behavior grows.
- Add workspace scripts for focused commands, such as building only web or only packages.
- Add a root `check` script that runs the full quality gate in order.
- Add editor settings for consistent TypeScript, formatting, and line endings.
- Add issue/PR templates once Git hosting is restored.
- Add a security policy before public collaboration.
- Add package exports maps when packages expose more than a single entrypoint.
- Add changeset/release planning if the SDK will be published externally.

## Final Assessment

Milestone 1 is a good foundation and should be accepted as a foundation milestone, with caveats. The repo is intentionally skeletal, but its direction is coherent.

Before Milestone 2 begins, the team should not add product features yet. The best next move is a short hardening pass focused on monorepo hygiene: generated artifacts, environment validation, runtime TypeScript configs, dependency boundaries, app scaffolding standards, and Git state. Those choices will heavily influence the quality of the frontend and every later backend, Cardano, AI, SDK, and worker milestone.
