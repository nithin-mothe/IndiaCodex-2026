export interface WorkerDescriptor {
  readonly name: string;
  readonly queueName: string;
  readonly healthLabel: string;
}

/**
 * Describes the notification worker process for orchestration and health checks.
 */
export function getNotificationWorkerDescriptor(): WorkerDescriptor {
  return {
    name: "notifications",
    queueName: "trustpay.notifications",
    healthLabel: "notification-worker-ready",
  };
}
