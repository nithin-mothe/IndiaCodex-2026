import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

import { createPrismaClient } from "../infrastructure/prisma.js";
import { closeQueues, createQueues } from "../infrastructure/queues.js";
import { createRedisClient } from "../infrastructure/redis.js";
import { createRepositories } from "../repositories/index.js";

export const dependencyPlugin = fp(function dependencyPlugin(app: FastifyInstance) {
  const prisma = createPrismaClient(app.config.DATABASE_URL);
  const redis = createRedisClient(app.config.REDIS_URL);
  const queues = createQueues(redis);
  const repositories = createRepositories(prisma);

  app.decorate("prisma", prisma);
  app.decorate("repositories", repositories);
  app.decorate("redis", redis);
  app.decorate("queues", queues);

  app.addHook("onClose", async () => {
    await closeQueues(queues);
    await redis.quit();
    await prisma.$disconnect();
  });
});
