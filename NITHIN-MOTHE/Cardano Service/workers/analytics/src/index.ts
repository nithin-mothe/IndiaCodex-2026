export interface WorkerDescriptor {
  readonly name: string;
  readonly queueName: string;
  readonly healthLabel: string;
}

/**
 * Describes the analytics worker process for orchestration and health checks.
 */
export function getAnalyticsWorkerDescriptor(): WorkerDescriptor {
  return {
    name: "analytics",
    queueName: "trustpay.analytics",
    healthLabel: "analytics-worker-ready",
  };
}
