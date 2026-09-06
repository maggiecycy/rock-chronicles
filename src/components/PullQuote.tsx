interface PullQuoteProps {
  quote: string;
}

export function PullQuote({ quote }: PullQuoteProps) {
  return (
    <blockquote className="border-l-4 border-accent pl-4 py-1">
      <p className="font-display text-xl leading-snug text-ink sm:text-2xl">
        “{quote}”
      </p>
    </blockquote>
  );
}
