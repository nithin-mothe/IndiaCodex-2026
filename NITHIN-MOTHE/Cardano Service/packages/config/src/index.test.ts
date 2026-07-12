import { describe, expect, it } from "vitest";

import { validateEnvironment } from "./index.js";

const validEnvironment = {
  NODE_ENV: "test",
  TRUSTPAY_ENV: "testing",
  LOG_LEVEL: "info",
  DATABASE_URL: "postgresql://trustpay:trustpay@localhost:5432/trustpay",
  REDIS_URL: "redis://localhost:6379",
  JWT_SECRET: "local-secret-with-length",
  CARDANO_NETWORK: "preview",
  CARDANO_PROVIDER_URL: "https://preview.example.cardano-provider.invalid",
  AI_PRIMARY_PROVIDER: "openai",
  AI_OPENAI_API_KEY: "test-key",
} satisfies NodeJS.ProcessEnv;

describe("validateEnvironment", () => {
  it("accepts a complete local environment", () => {
    expect(validateEnvironment(validEnvironment).success).toBe(true);
  });

  it("requires the selected AI provider key", () => {
    const result = validateEnvironment({
      ...validEnvironment,
      AI_PRIMARY_PROVIDER: "groq",
      AI_OPENAI_API_KEY: "test-key",
      AI_GROQ_API_KEY: undefined,
    });

    expect(result.success).toBe(false);
  });
});
