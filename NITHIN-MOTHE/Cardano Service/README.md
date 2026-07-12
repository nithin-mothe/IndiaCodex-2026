# TrustPay Protocol

TrustPay is a Cardano-native decentralized escrow platform built as an AI-assisted Web3 SaaS product.

This repository now contains a demo-ready hackathon build on top of the existing monorepo foundation. It includes a polished Next.js product console, Fastify demo API endpoints, Prisma schema and seed data, strict TypeScript, linting, formatting, test wiring, environment validation, Docker infrastructure, CI, shared packages, and worker package stubs.

## Requirements

- Node.js 22 or newer
- npm 10 or newer
- Docker and Docker Compose

## Quick Start

```bash
npm install
Copy-Item .env.example .env
npm run build
npm run validate:env
npm run typecheck
npm run lint
npm test
docker compose up -d postgres redis
npm run dev --workspace @trustpay/api
npm run dev --workspace @trustpay/web
```

Use `npm.cmd` instead of `npm` on Windows PowerShell if script execution policy blocks npm's PowerShell shim.

## Workspace Layout

- `apps/web`: Next.js frontend with landing, dashboard, escrows, wallet, analytics, notifications, developer, admin, settings, profile, help, loading, error, and 404 routes
- `apps/api`: Fastify API with health, Swagger, demo user, wallet, escrow, transaction, notification, analytics, NFT, AI, developer, dispute, and admin endpoints
- `packages/config`: environment validation and runtime configuration
- `packages/types`: shared domain and API types
- `packages/utils`: shared utility functions
- `packages/sdk`: developer SDK package
- `workers/*`: independently scalable background worker packages
- `contracts/*`: Aiken contracts, added in Milestone 5
- `database/*`: Prisma schema and migrations, added in Milestone 4
- `docker/*`: container build definitions
- `docs/*`: operating documentation

## Demo URLs

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:4000`
- Swagger: `http://localhost:4000/docs`
- Admin portal: `http://localhost:3000/admin`

## Quality Gates

The demo quality gate is:

```bash
npm run build
npm run validate:env
npm run typecheck
npm run lint
npm run format
npm test
```
