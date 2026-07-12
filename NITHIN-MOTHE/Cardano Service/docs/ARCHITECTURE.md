# Architecture Guide

TrustPay follows the milestone-driven architecture defined in the attached specifications.

## Foundation

Milestone 1 creates the monorepo, shared package boundaries, strict TypeScript configuration, linting, formatting, tests, CI, Docker, and environment validation.

## Planned Application Layers

- Presentation: Next.js web, admin, and docs apps
- API controllers: Fastify route modules
- Services: business workflows and authorization
- Repositories: Prisma-backed persistence
- Workers: notifications, analytics, blockchain sync, NFT, email, cleanup, and retries
- Contracts: Aiken validators and minting policies
- SDK: public developer client package

## Source of Truth

On-chain Cardano state is authoritative for fund custody and financial transitions. Backend services coordinate, index, validate, notify, and expose APIs, but never store private keys or sign user transactions.
