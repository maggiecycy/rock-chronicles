"use client";

import Image from "next/image";
import { useLocale } from "@/i18n/LocaleProvider";
import { loc } from "@/i18n/config";
import type { EntityImage } from "@/lib/types";

export function EntityHeroImage({
  image,
  variant = "wide",
}: {
  image: EntityImage;
  variant?: "wide" | "portrait";
}) {
  const { locale, t } = useLocale();
  const frame =
    variant === "portrait"
      ? "relative aspect-[3/4] w-full max-w-sm overflow-hidden border-2 border-ink bg-paper-deep"
      : "relative aspect-[16/10] w-full overflow-hidden border-2 border-ink bg-paper-deep";

  return (
    <figure className={variant === "portrait" ? "mt-8" : "mt-10 max-w-3xl"}>
      <a
        href={image.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block outline-none focus-visible:ring-2 focus-visible:ring-accent"
        title={t.media.openSource}
      >
        <div className={frame}>
          <Image
            src={image.src}
            alt={loc(image.alt, locale)}
            fill
            className="object-cover object-center transition-opacity hover:opacity-95"
            sizes={
              variant === "portrait"
                ? "(max-width: 640px) 100vw, 24rem"
                : "(max-width: 1024px) 100vw, 48rem"
            }
            priority
          />
        </div>
      </a>
      <figcaption className="mt-2 text-xs leading-relaxed text-muted">
        <span>{image.credit}</span>
        <span aria-hidden> · </span>
        <span>{image.license}</span>
        <span aria-hidden> · </span>
        <a
          href={image.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-ink underline-offset-2 hover:underline"
        >
          {t.media.openSource}
        </a>
      </figcaption>
    </figure>
  );
}
