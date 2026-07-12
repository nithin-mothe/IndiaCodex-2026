# Environment Variables Guide

`@trustpay/config` validates environment variables before runtime services start.

## Required Variables

- `NODE_ENV`: `development`, `test`, or `production`
- `TRUSTPAY_ENV`: `local`, `development`, `testing`, `preview`, `staging`, or `production`
- `LOG_LEVEL`: `trace`, `debug`, `info`, `warn`, `error`, or `fatal`
- `API_HOST`: API bind host, defaults to `0.0.0.0`
- `API_PORT`: API bind port, defaults to `4000`
- `API_CORS_ORIGINS`: comma-separated allowed browser origins
- `DATABASE_URL`: PostgreSQL connection URL
- `REDIS_URL`: Redis connection URL
- `JWT_SECRET`: session signing secret with at least 16 characters
- `CARDANO_NETWORK`: `preview`, `preprod`, or `mainnet`
- `CARDANO_PROVIDER_URL`: Cardano provider URL
- `AI_PRIMARY_PROVIDER`: `openai`, `gemini`, or `groq`

The API key matching `AI_PRIMARY_PROVIDER` is required.
