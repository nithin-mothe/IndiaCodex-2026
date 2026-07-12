import "dotenv/config";
import { z } from "zod";

const aiProviderSchema = z.enum(["openai", "gemini", "groq"]);

const environmentSchema = z
  .object({
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    TRUSTPAY_ENV: z
      .enum(["local", "development", "testing", "preview", "staging", "production"])
      .default("local"),
    LOG_LEVEL: z.enum(["trace", "debug", "info", "warn", "error", "fatal"]).default("info"),
    DATABASE_URL: z.url().startsWith("postgresql://"),
    REDIS_URL: z.url().startsWith("redis://"),
    JWT_SECRET: z.string().min(16),
    CARDANO_NETWORK: z.enum(["preview", "preprod", "mainnet"]).default("preview"),
    CARDANO_PROVIDER_URL: z.url(),
    AI_PRIMARY_PROVIDER: aiProviderSchema.default("openai"),
    AI_OPENAI_API_KEY: z.string().min(1).optional(),
    AI_GEMINI_API_KEY: z.string().min(1).optional(),
    AI_GROQ_API_KEY: z.string().min(1).optional(),
  })
  .superRefine((value, context) => {
    const providerKeyByProvider = {
      openai: value.AI_OPENAI_API_KEY,
      gemini: value.AI_GEMINI_API_KEY,
      groq: value.AI_GROQ_API_KEY,
    };

    if (!providerKeyByProvider[value.AI_PRIMARY_PROVIDER]) {
      context.addIssue({
        code: "custom",
        path: ["AI_PRIMARY_PROVIDER"],
        message: `Missing API key for selected provider ${value.AI_PRIMARY_PROVIDER}.`,
      });
    }
  });

const result = environmentSchema.safeParse(process.env);

if (!result.success) {
  const issues = result.error.issues.map((issue) => {
    const path = issue.path.join(".") || "environment";
    return `${path}: ${issue.message}`;
  });

  console.error(`Environment validation failed: ${issues.join("; ")}`);
  process.exit(1);
}

console.log("Environment validation passed.");
