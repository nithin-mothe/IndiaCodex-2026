import type { UserRole } from "@trustpay/types";
import type { Redis } from "ioredis";

import type { RuntimeConfig } from "../config/runtime.js";
import type { DatabaseClient } from "../infrastructure/prisma.js";
import type { TrustPayQueues } from "../infrastructure/queues.js";
import type { RepositoryRegistry } from "../repositories/index.js";

declare module "fastify" {
  interface FastifyInstance {
    config: RuntimeConfig;
    prisma: DatabaseClient;
    repositories: RepositoryRegistry;
    redis: Redis;
    queues: TrustPayQueues;
  }

  interface FastifyRequest {
    auth?: {
      readonly subject: string;
      readonly roles: readonly UserRole[];
    };
  }
}
