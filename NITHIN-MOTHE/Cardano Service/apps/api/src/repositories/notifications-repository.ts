import type { Notification, Prisma } from "@prisma/client";

import { BaseRepository } from "./base-repository.js";

export class NotificationsRepository extends BaseRepository {
  create(data: Prisma.NotificationCreateInput): Promise<Notification> {
    return this.prisma.notification.create({ data });
  }

  listForUser(userId: string, limit = 50): Promise<Notification[]> {
    return this.prisma.notification.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
    });
  }

  markRead(id: string): Promise<Notification> {
    return this.prisma.notification.update({
      where: {
        id,
      },
      data: {
        readAt: new Date(),
      },
    });
  }
}
