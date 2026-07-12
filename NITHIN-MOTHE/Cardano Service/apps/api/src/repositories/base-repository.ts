import type { DatabaseClient } from "../infrastructure/prisma.js";

export abstract class BaseRepository {
  public constructor(protected readonly prisma: DatabaseClient) {}
}
