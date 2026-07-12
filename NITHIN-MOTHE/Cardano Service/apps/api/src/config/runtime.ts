import "dotenv/config";
import { validateEnvironment } from "@trustpay/config";

export function loadRuntimeConfig() {
  const result = validateEnvironment(process.env);

  if (!result.success) {
    throw new Error(result.message);
  }

  return result.data;
}

export type RuntimeConfig = ReturnType<typeof loadRuntimeConfig>;
