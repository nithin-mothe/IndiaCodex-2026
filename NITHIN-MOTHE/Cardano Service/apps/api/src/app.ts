import Fastify from "fastify";
import type { FastifyInstance } from "fastify";

import { loadRuntimeConfig } from "./config/runtime.js";
import { authPlugin } from "./plugins/auth.js";
import { corePlugin } from "./plugins/core.js";
import { dependencyPlugin } from "./plugins/dependencies.js";
import { registerRoutes } from "./modules/index.js";

export interface CreateAppOptions {
  readonly logger?: boolean;
  readonly dependencies?: boolean;
}

export async function createApp(options: CreateAppOptions = {}): Promise<FastifyInstance> {
  const config = loadRuntimeConfig();
  const app = Fastify({
    logger:
      options.logger ??
      ({
        level: config.LOG_LEVEL,
      } as const),
    genReqId: (request) => request.headers["x-request-id"]?.toString() ?? crypto.randomUUID(),
  });

  app.decorate("config", config);

  if (options.dependencies ?? true) {
    await app.register(dependencyPlugin);
  }
  await app.register(corePlugin);
  await app.register(authPlugin);
  registerRoutes(app);

  return app;
}
