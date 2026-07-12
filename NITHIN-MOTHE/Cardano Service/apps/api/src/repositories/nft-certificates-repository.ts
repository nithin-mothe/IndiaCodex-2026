import type { NftCertificate, Prisma } from "@prisma/client";

import { BaseRepository } from "./base-repository.js";

export class NftCertificatesRepository extends BaseRepository {
  create(data: Prisma.NftCertificateCreateInput): Promise<NftCertificate> {
    return this.prisma.nftCertificate.create({ data });
  }

  listForEscrow(escrowId: string): Promise<NftCertificate[]> {
    return this.prisma.nftCertificate.findMany({
      where: {
        escrowId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
}
