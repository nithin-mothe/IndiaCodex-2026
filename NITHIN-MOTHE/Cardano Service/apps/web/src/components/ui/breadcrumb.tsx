import Link from "next/link";

export function Breadcrumb({
  items,
}: {
  readonly items: readonly { readonly href: string; readonly label: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li className="flex items-center gap-2" key={item.href}>
            {index > 0 ? <span>/</span> : null}
            <Link className="hover:text-foreground" href={item.href}>
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
