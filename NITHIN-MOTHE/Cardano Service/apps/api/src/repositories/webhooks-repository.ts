import type { Prisma, WebhookDelivery, WebhookEndpoint } from "@prisma/client";

import { BaseRepository } from "./base-repository.js";

export class WebhooksRepository extends BaseRepository {
  createEndpoint(data: Prisma.WebhookEndpointCreateInput): Promise<WebhookEndpoint> {
    return this.prisma.webhookEndpoint.create({ data });
  }

  listActiveEndpoints(): Promise<WebhookEndpoint[]> {
    return this.prisma.webhookEndpoint.findMany({
      where: {
        active: true,
        deletedAt: null,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  createDelivery(data: Prisma.WebhookDeliveryCreateInput): Promise<WebhookDelivery> {
    return this.prisma.webhookDelivery.create({ data });
  }

  listDeliveries(endpointId: string, limit = 50): Promise<WebhookDelivery[]> {
    return this.prisma.webhookDelivery.findMany({
      where: {
        endpointId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
    });
  }
}
