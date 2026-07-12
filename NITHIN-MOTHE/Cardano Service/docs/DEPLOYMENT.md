# Deployment Guide

Milestone 1 provides the reproducible build foundation and local infrastructure containers.

## Local Services

```bash
docker compose up -d postgres redis
```

## CI

GitHub Actions runs:

- dependency install
- package build
- environment validation
- type check
- lint
- format check
- tests

Application deployment targets are introduced in later milestones:

- Vercel for frontend apps
- Railway, Render, or Fly.io for backend services
- managed PostgreSQL and Redis for production data services
