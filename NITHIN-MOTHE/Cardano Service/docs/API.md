# API Documentation

The REST API is implemented in `apps/api` with Fastify, OpenAPI, shared response envelopes, and versioned demo-ready route handlers. The current implementation returns deterministic seeded demo data and cleanly separates visible Cardano/AI workflow responses from future production providers.

All endpoints will use the versioned `/api/v1` prefix and the standard response envelopes exported by `@trustpay/types`.

## Local Server

```bash
npm run dev --workspace @trustpay/api
```

Swagger UI is available at `/docs`.

## Health Endpoints

- `GET /health`: shallow API health check without dependency probes.
- `GET /health/deep`: checks PostgreSQL, Redis, and registered queue names.

## Demo v1 Endpoints

- `GET /api/v1/users`
- `GET /api/v1/wallets`
- `POST /api/v1/wallets/connect`
- `GET /api/v1/escrows`
- `GET /api/v1/escrows/:id`
- `POST /api/v1/escrows`
- `POST /api/v1/escrows/:id/deposit`
- `POST /api/v1/escrows/:id/release`
- `POST /api/v1/escrows/:id/refund`
- `GET /api/v1/transactions`
- `GET /api/v1/notifications`
- `POST /api/v1/notifications/:id/read`
- `GET /api/v1/analytics`
- `GET /api/v1/nft-certificates`
- `POST /api/v1/ai/contract`
- `POST /api/v1/ai/risk`
- `POST /api/v1/ai/dispute-summary`
- `GET /api/v1/disputes`
- `GET /api/v1/developers`
- `GET /api/v1/admin`

## Demo Flow

1. Connect wallet with `POST /api/v1/wallets/connect`.
2. Create an escrow with `POST /api/v1/escrows`.
3. Lock funds with `POST /api/v1/escrows/:id/deposit`.
4. Release with `POST /api/v1/escrows/:id/release`, or refund with `POST /api/v1/escrows/:id/refund`.
5. Review receipt NFTs with `GET /api/v1/nft-certificates`.
6. Generate AI contract, risk, and dispute summaries through `/api/v1/ai/*`.

## Success Envelope

```json
{
  "success": true,
  "data": {},
  "message": "",
  "meta": {}
}
```

## Error Envelope

```json
{
  "success": false,
  "error": {
    "code": "",
    "message": ""
  }
}
```
