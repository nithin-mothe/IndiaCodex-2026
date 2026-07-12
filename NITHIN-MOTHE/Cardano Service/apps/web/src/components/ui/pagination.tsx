import Link from "next/link";

import { Button } from "@/components/ui/button";

export function Pagination() {
  return (
    <nav className="flex items-center justify-end gap-2" aria-label="Pagination">
      <Button asChild variant="outline" size="sm">
        <Link href="#">Previous</Link>
      </Button>
      <Button asChild variant="outline" size="sm">
        <Link href="#">Next</Link>
      </Button>
    </nav>
  );
}
