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

/** Resolve playback URL: CDN env wins, else absolute src from index, else /audio/. */
export function resolveTrackUrl(track: AudioTrack): string {
  const cdn = (process.env.NEXT_PUBLIC_AUDIO_CDN || "").replace(/\/$/, "");
  if (cdn) return `${cdn}/${track.id}.mp3`;
  if (track.src.startsWith("http://") || track.src.startsWith("https://")) {
    return track.src;
  }
  return track.src.startsWith("/") ? track.src : `/audio/${track.id}.mp3`;
}

export function formatDuration(sec: number | null | undefined): string {
  if (sec == null || !Number.isFinite(sec)) return "–";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}
