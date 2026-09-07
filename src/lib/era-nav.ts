import type { Localized } from "@/i18n/config";
import type { Era } from "@/lib/types";

/** Short unique tab labels — decades overlap (two 1990s eras), so never use decade alone. */
const ERA_NAV_LABELS: Record<string, Localized> = {
  "1950s-roots": { en: "Roots", zh: "根源" },
  "1960s-british-invasion": { en: "60s", zh: "六十年代" },
  "1970s-prog-hard-rock": { en: "70s", zh: "七十年代" },
  "punk-postpunk": { en: "Punk", zh: "朋克" },
  "1980s-metal": { en: "Metal", zh: "金属" },
  "1990s-grunge-alt": { en: "Grunge", zh: "油渍" },
  "1990s-britpop": { en: "Britpop", zh: "英伦" },
  "2000s-revival": { en: "00s", zh: "两千年代" },
  "2010s-indie-modern": { en: "Now", zh: "当下" },
};

export function eraNavLabel(era: Era): Localized {
  return ERA_NAV_LABELS[era.slug] ?? { en: era.decade, zh: era.decade };
}

export const UNIFIED_ERA_COUNT = 9;
