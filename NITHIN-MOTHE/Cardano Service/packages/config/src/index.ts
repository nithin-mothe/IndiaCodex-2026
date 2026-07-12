import "dotenv/config";
import { z } from "zod";

const nodeEnvironmentSchema = z.enum(["development", "test", "production"]);
const trustPayEnvironmentSchema = z.enum([
  "local",
  "development",
  "testing",
  "preview",
  "staging",
  "production",
]);
const logLevelSchema = z.enum(["trace", "debug", "info", "warn", "error", "fatal"]);
const cardanoNetworkSchema = z.enum(["preview", "preprod", "mainnet"]);
const aiProviderSchema = z.enum(["openai", "gemini", "groq"]);
const portSchema = z.coerce.number().int().min(1).max(65_535);

const environmentSchema = z
  .object({
    NODE_ENV: nodeEnvironmentSchema.default("development"),
    TRUSTPAY_ENV: trustPayEnvironmentSchema.default("local"),
    LOG_LEVEL: logLevelSchema.default("info"),
    API_HOST: z.string().min(1).default("0.0.0.0"),
    API_PORT: portSchema.default(4000),
    API_CORS_ORIGINS: z.string().min(1).default("http://localhost:3000"),
    DATABASE_URL: z.url().startsWith("postgresql://"),
    REDIS_URL: z.url().startsWith("redis://"),
    JWT_SECRET: z.string().min(16),
    CARDANO_NETWORK: cardanoNetworkSchema.default("preview"),
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
    } satisfies Record<z.infer<typeof aiProviderSchema>, string | undefined>;

    if (!providerKeyByProvider[value.AI_PRIMARY_PROVIDER]) {
      context.addIssue({
        code: "custom",
        path: ["AI_PRIMARY_PROVIDER"],
        message: `Missing API key for selected provider ${value.AI_PRIMARY_PROVIDER}.`,
      });
    }
  });

export type TrustPayEnvironment = z.infer<typeof environmentSchema>;

export type EnvironmentValidationResult =
  | {
      readonly success: true;
      readonly data: TrustPayEnvironment;
      readonly message: string;
    }
  | {
      readonly success: false;
      readonly message: string;
      readonly issues: readonly string[];
    };

/**
 * Validates and normalizes TrustPay environment variables for every runtime.
 */
export function validateEnvironment(source: NodeJS.ProcessEnv): EnvironmentValidationResult {
  const parsed = environmentSchema.safeParse(source);

  if (!parsed.success) {
    const issues = parsed.error.issues.map((issue) => {
      const path = issue.path.join(".") || "environment";
      return `${path}: ${issue.message}`;
    });

    return {
      success: false,
      message: `Environment validation failed: ${issues.join("; ")}`,
      issues,
    };
  }

  return {
    success: true,
    data: parsed.data,
    message: "Environment validation passed.",
  };
}
