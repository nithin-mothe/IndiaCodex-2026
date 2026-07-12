import { PrismaClient } from "@prisma/client";

export type DatabaseClient = PrismaClient;

export function createPrismaClient(databaseUrl: string): DatabaseClient {
  return new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl,
      },
    },
  });
}

export async function checkDatabase(prisma: DatabaseClient): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch {
    return false;
  }
}
