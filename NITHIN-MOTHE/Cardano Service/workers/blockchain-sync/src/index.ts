export interface WorkerDescriptor {
  readonly name: string;
  readonly queueName: string;
  readonly healthLabel: string;
}

/**
 * Describes the blockchain sync worker process for orchestration and health checks.
 */
export function getBlockchainSyncWorkerDescriptor(): WorkerDescriptor {
  return {
    name: "blockchain-sync",
    queueName: "trustpay.blockchain-sync",
    healthLabel: "blockchain-sync-worker-ready",
  };
}
