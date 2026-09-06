"use client";

import { LocaleProvider } from "@/i18n/LocaleProvider";
import { SoundProvider } from "@/components/SoundProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LocaleProvider>
      <SoundProvider>{children}</SoundProvider>
    </LocaleProvider>
  );
}
