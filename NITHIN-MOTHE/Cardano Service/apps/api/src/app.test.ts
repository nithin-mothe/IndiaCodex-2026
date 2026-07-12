import { describe, expect, it } from "vitest";

import { createApp } from "./app.js";

const testEnvironment = {
  NODE_ENV: "test",
  TRUSTPAY_ENV: "testing",
  LOG_LEVEL: "fatal",
  API_HOST: "127.0.0.1",
  API_PORT: "4001",
  API_CORS_ORIGINS: "http://localhost:3000",
  DATABASE_URL: "postgresql://trustpay:trustpay@localhost:5432/trustpay",
  REDIS_URL: "redis://localhost:6379",
  JWT_SECRET: "test-secret-with-enough-length",
  CARDANO_NETWORK: "preview",
  CARDANO_PROVIDER_URL: "https://preview.example.cardano-provider.invalid",
  AI_PRIMARY_PROVIDER: "openai",
  AI_OPENAI_API_KEY: "test-key",
} satisfies NodeJS.ProcessEnv;

describe("TrustPay API app", () => {
  it("serves the shallow health endpoint", async () => {
    Object.assign(process.env, testEnvironment);
    const app = await createApp({ dependencies: false, logger: false });

    const response = await app.inject({
      method: "GET",
      url: "/health",
    });

    await app.close();

    expect(response.statusCode).toBe(200);
    expect(response.json()).toMatchObject({
      success: true,
      data: {
        service: "trustpay-api",
        status: "ok",
      },
    });
  });
});
