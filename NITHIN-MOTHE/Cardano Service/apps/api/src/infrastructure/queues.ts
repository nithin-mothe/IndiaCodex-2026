import { Queue } from "bullmq";
import type { Redis } from "ioredis";

export const queueNames = [
  "notifications",
  "analytics",
  "blockchain-sync",
  "nft-certificates",
  "webhooks",
] as const;

export type QueueName = (typeof queueNames)[number];

export type TrustPayQueues = Readonly<Record<QueueName, Queue>>;

export function createQueues(connection: Redis): TrustPayQueues {
  return Object.fromEntries(
    queueNames.map((name) => [
      name,
      new Queue(name, {
        connection,
        defaultJobOptions: {
          attempts: 3,
          backoff: {
            type: "exponential",
            delay: 5_000,
          },
          removeOnComplete: 1_000,
          removeOnFail: 5_000,
        },
      }),
    ]),
  ) as TrustPayQueues;
}

export async function closeQueues(queues: TrustPayQueues): Promise<void> {
  await Promise.all(Object.values(queues).map((queue) => queue.close()));
}
