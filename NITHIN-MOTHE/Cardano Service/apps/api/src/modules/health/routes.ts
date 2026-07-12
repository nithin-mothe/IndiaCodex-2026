import type { FastifyInstance } from "fastify";

import { createSuccessResponse } from "@trustpay/utils";

import { checkDatabase } from "../../infrastructure/prisma.js";
import { queueNames } from "../../infrastructure/queues.js";
import { checkRedis } from "../../infrastructure/redis.js";

export function registerHealthRoutes(app: FastifyInstance) {
  app.get("/health", () =>
    createSuccessResponse(
      {
        service: "trustpay-api",
        status: "ok",
        environment: app.config.TRUSTPAY_ENV,
        version: "0.1.0",
      },
      "API is healthy.",
    ),
  );

  app.get("/health/deep", async (_request, reply) => {
    const [database, redis] = await Promise.all([checkDatabase(app.prisma), checkRedis(app.redis)]);
    const healthy = database && redis;

    return reply.status(healthy ? 200 : 503).send(
      createSuccessResponse(
        {
          status: healthy ? "ok" : "degraded",
          checks: {
            database,
            redis,
            queues: queueNames,
          },
        },
        healthy ? "All dependencies are healthy." : "One or more dependencies are unavailable.",
      ),
    );
  });
}
