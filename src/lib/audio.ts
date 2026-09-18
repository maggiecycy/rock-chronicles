import audioIndexJson from "../../content/audio-index.json";

export interface AudioTrack {
  id: string;
  title: string;
  artistLabel: string;
  bandSlug: string | null;
  genreSlugs: string[];
  src: string;
  durationSec: number | null;
  extra: boolean;
  sourceFile?: string;
}

export interface AudioIndex {
  version: number;
  generatedAt: string;
  cdnBase: string | null;
  trackCount: number;
  tracks: AudioTrack[];
  genrePicks: Record<string, string[]>;
}

export const audioIndex = audioIndexJson as AudioIndex;

const byId = new Map(audioIndex.tracks.map((t) => [t.id, t]));

export function getTrack(id: string): AudioTrack | undefined {
  return byId.get(id);
}

export function getTracksByBand(bandSlug: string): AudioTrack[] {
  return audioIndex.tracks.filter((t) => t.bandSlug === bandSlug);
}

export function getTracksByGenre(genreSlug: string, limit = 5): AudioTrack[] {
  const picks = audioIndex.genrePicks[genreSlug] ?? [];
  const fromPicks = picks
    .map((id) => byId.get(id))
    .filter((t): t is AudioTrack => Boolean(t));
  if (fromPicks.length > 0) return fromPicks.slice(0, limit);
  return audioIndex.tracks
    .filter((t) => !t.extra && t.genreSlugs.includes(genreSlug))
    .slice(0, limit);
}

export function getExtraTracks(): AudioTrack[] {
  return audioIndex.tracks.filter((t) => t.extra);
}

/** Same-origin path under public/audio. */
export function localTrackUrl(trackId: string): string {
  return `/audio/${trackId}.mp3`;
}

function absoluteFromMaybeRelative(url: string): string {
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (typeof window !== "undefined") {
    return new URL(url, window.location.origin).href;
  }
  return url;
}

/**
 * Ordered URL candidates for a track.
 * Localhost prefers /audio/ then Blob; production prefers CDN/Blob then local.
 */
export function trackUrlCandidates(track: AudioTrack): string[] {
  const local = localTrackUrl(track.id);
  const remote =
    track.src.startsWith("http://") || track.src.startsWith("https://")
      ? track.src
      : null;
  const envCdn = (process.env.NEXT_PUBLIC_AUDIO_CDN || "").replace(/\/$/, "");
  const fromEnv = envCdn ? `${envCdn}/${track.id}.mp3` : null;
  const base = (audioIndex.cdnBase || "").replace(/\/$/, "");
  const fromBase = base ? `${base}/${track.id}.mp3` : null;

  const isLocalHost =
    typeof window !== "undefined" &&
    /^(localhost|127\.0\.0\.1)$/i.test(window.location.hostname);

  const ordered = isLocalHost
    ? [local, fromEnv, remote, fromBase]
    : [fromEnv, remote, fromBase, local];

  const seen = new Set<string>();
  const out: string[] = [];
  for (const u of ordered) {
    if (!u) continue;
    const abs = absoluteFromMaybeRelative(u);
    if (seen.has(abs)) continue;
    seen.add(abs);
    out.push(abs);
  }
  return out;
}

/** Resolve primary playback URL (first candidate). */
export function resolveTrackUrl(track: AudioTrack): string {
  const cdn = (process.env.NEXT_PUBLIC_AUDIO_CDN || "").replace(/\/$/, "");
  if (cdn) return `${cdn}/${track.id}.mp3`;

  if (typeof window !== "undefined") {
    return trackUrlCandidates(track)[0] ?? localTrackUrl(track.id);
  }

  // SSR / build: keep deterministic local path in development.
  if (process.env.NODE_ENV !== "production") {
    return localTrackUrl(track.id);
  }
  if (track.src.startsWith("http://") || track.src.startsWith("https://")) {
    return track.src;
  }
  const base = (audioIndex.cdnBase || "").replace(/\/$/, "");
  if (base) return `${base}/${track.id}.mp3`;
  return track.src.startsWith("/") ? track.src : localTrackUrl(track.id);
}

export function formatDuration(sec: number | null | undefined): string {
  if (sec == null || !Number.isFinite(sec)) return "–";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}
