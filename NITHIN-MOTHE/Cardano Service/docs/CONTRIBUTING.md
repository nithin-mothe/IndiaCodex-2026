# Contributing Guide

TrustPay uses strict quality gates because it handles financial workflows.

## Before Opening a Pull Request

```bash
npm run build
npm run validate:env
npm run typecheck
npm run lint
npm run format
npm test
```

## Commit Format

Use Conventional Commits:

```text
feat(api): add escrow creation endpoint
fix(config): reject invalid Cardano networks
docs(setup): clarify local dependency startup
```

## Engineering Standards

- Keep business logic outside UI and controllers.
- Validate input at every trust boundary.
- Avoid unchecked types and implicit runtime assumptions.
- Keep modules testable and independently understandable.
