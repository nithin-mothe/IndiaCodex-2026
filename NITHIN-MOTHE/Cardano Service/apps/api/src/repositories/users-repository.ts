import type { Prisma, User, UserRole } from "@prisma/client";

import { BaseRepository } from "./base-repository.js";

export class UsersRepository extends BaseRepository {
  create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  findById(id: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        email,
        deletedAt: null,
      },
    });
  }

  listByRole(role?: UserRole, limit = 50): Promise<User[]> {
    return this.prisma.user.findMany({
      where: {
        deletedAt: null,
        ...(role ? { role } : {}),
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
    });
  }

  softDelete(id: string): Promise<User> {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
