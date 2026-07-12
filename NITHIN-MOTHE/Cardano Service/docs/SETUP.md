# Setup Guide

## Install Dependencies

```bash
npm install
```

If PowerShell blocks `npm`, run:

```bash
npm.cmd install
```

## Configure Environment

Create `.env` from `.env.example`, then replace local secrets and provider values.

Required variables are validated by `@trustpay/config`:

- `NODE_ENV`
- `TRUSTPAY_ENV`
- `LOG_LEVEL`
- `API_HOST`
- `API_PORT`
- `API_CORS_ORIGINS`
- `DATABASE_URL`
- `REDIS_URL`
- `JWT_SECRET`
- `CARDANO_NETWORK`
- `CARDANO_PROVIDER_URL`
- `AI_PRIMARY_PROVIDER`
- the API key for the selected AI provider

## Start Dependencies

```bash
docker compose up -d postgres redis
```

## Prepare Database

```bash
npm run db:generate
npm run db:migrate
npm run db:seed
```

## Run API

```bash
npm run dev --workspace @trustpay/api
```

The API listens on `API_HOST` and `API_PORT`; Swagger UI is served at `/docs`.

## Verify Foundation

```bash
npm run build
npm run validate:env
npm run typecheck
npm run lint
npm test
```
