import type { AuditLog, Prisma } from "@prisma/client";

import { BaseRepository } from "./base-repository.js";

export class AuditLogsRepository extends BaseRepository {
  create(data: Prisma.AuditLogCreateInput): Promise<AuditLog> {
    return this.prisma.auditLog.create({ data });
  }

  listForResource(resource: string, resourceId?: string, limit = 100): Promise<AuditLog[]> {
    return this.prisma.auditLog.findMany({
      where: {
        resource,
        ...(resourceId ? { resourceId } : {}),
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
    });
  }
}
