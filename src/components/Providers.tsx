"use client";

import { LocaleProvider } from "@/i18n/LocaleProvider";
import { SoundProvider } from "@/components/SoundProvider";
import { MusicPlayerProvider } from "@/components/MusicPlayerProvider";
import { MiniPlayer } from "@/components/MiniPlayer";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LocaleProvider>
      <SoundProvider>
        <MusicPlayerProvider>
          {children}
          <MiniPlayer />
        </MusicPlayerProvider>
      </SoundProvider>
    </LocaleProvider>
  );
}
