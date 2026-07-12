import "dotenv/config";
import { createApp } from "./app.js";

const app = await createApp();

try {
  await app.listen({
    host: app.config.API_HOST,
    port: app.config.API_PORT,
  });
} catch (error) {
  app.log.error({ error }, "Failed to start TrustPay API");
  process.exit(1);
}
