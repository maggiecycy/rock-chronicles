import Link from "next/link";

interface TagPillProps {
  label: string;
  href?: string;
}

export function TagPill({ label, href }: TagPillProps) {
  const className =
    "inline-block border border-ink px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-ink transition-colors hover:bg-ink hover:text-paper";

  if (href) {
    return (
      <Link href={href} className={className}>
        {label}
      </Link>
    );
  }

  return <span className={className}>{label}</span>;
}
