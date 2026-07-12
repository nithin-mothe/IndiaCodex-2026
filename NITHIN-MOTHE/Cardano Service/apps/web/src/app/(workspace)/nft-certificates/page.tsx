import { FileBadge2, ShieldCheck, Sparkles } from "lucide-react";

import { CertificatesGallery } from "@/components/demo-sections";
import { PageHeader } from "@/components/page-header";
import { StatCard } from "@/components/stat-card";
import { Button } from "@/components/ui/button";

export default function NftCertificatesPage() {
  return (
    <>
      <PageHeader
        actions={
          <>
            <Button variant="outline">Verify asset</Button>
            <Button>Mint receipt</Button>
          </>
        }
        description="View proof-of-completion NFT receipts, verification metadata, and downloadable settlement certificates."
        eyebrow="NFT certificates"
        title="Certificate gallery"
      />
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard icon={FileBadge2} label="Certificates" tone="Seeded gallery" value="2" />
        <StatCard icon={ShieldCheck} label="Verified" tone="Metadata checks" value="1" />
        <StatCard icon={Sparkles} label="Mint queue" tone="Ready after release" value="1" />
      </div>
      <div className="mt-4">
        <CertificatesGallery />
      </div>
    </>
  );
}
