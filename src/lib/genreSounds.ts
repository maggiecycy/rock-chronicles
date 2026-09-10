import type { GenreSoundProfile } from "./types";

/**
 * Procedural, copyright-free genre loops (Web Audio oscillators).
 * Distinct timbre/rhythm per genre — Seinfeld-style "instruments", not licensed riffs.
 */
export const GENRE_SOUNDS: Record<string, GenreSoundProfile> = {
  blues: {
    wave: "triangle",
    baseFreq: 82.41,
    bpm: 72,
    pattern: [1, 0, 0, 1, 0, 0, 1, 0],
    filterFreq: 900,
  },
  "rock-n-roll": {
    wave: "square",
    baseFreq: 110,
    bpm: 148,
    pattern: [1, 0, 1, 0, 1, 0, 1, 1],
    filterFreq: 1800,
  },
  psychedelic: {
    wave: "sine",
    baseFreq: 146.83,
    bpm: 96,
    pattern: [1, 0, 0, 0, 1, 0, 1, 0],
    filterFreq: 2400,
  },
  "progressive-rock": {
    wave: "sawtooth",
    baseFreq: 98,
    bpm: 108,
    pattern: [1, 0, 1, 1, 0, 1, 0, 0],
    filterFreq: 1600,
  },
  "hard-rock": {
    wave: "sawtooth",
    baseFreq: 73.42,
    bpm: 126,
    pattern: [1, 0, 1, 0, 1, 1, 0, 1],
    filterFreq: 1200,
  },
  punk: {
    wave: "square",
    baseFreq: 130.81,
    bpm: 180,
    pattern: [1, 1, 1, 1, 1, 1, 1, 1],
    filterFreq: 2200,
  },
  "heavy-metal": {
    wave: "sawtooth",
    baseFreq: 61.74,
    bpm: 140,
    pattern: [1, 0, 0, 1, 1, 0, 1, 0],
    filterFreq: 800,
  },
  "post-punk": {
    wave: "triangle",
    baseFreq: 103.83,
    bpm: 118,
    pattern: [1, 0, 1, 0, 0, 1, 0, 1],
    filterFreq: 1400,
  },
  grunge: {
    wave: "sawtooth",
    baseFreq: 87.31,
    bpm: 100,
    pattern: [1, 0, 0, 0, 1, 0, 1, 1],
    filterFreq: 700,
  },
  britpop: {
    wave: "triangle",
    baseFreq: 123.47,
    bpm: 124,
    pattern: [1, 0, 1, 0, 1, 0, 0, 1],
    filterFreq: 2000,
  },
  alternative: {
    wave: "sine",
    baseFreq: 116.54,
    bpm: 112,
    pattern: [1, 0, 0, 1, 0, 1, 0, 0],
    filterFreq: 1500,
  },
  "indie-rock": {
    wave: "square",
    baseFreq: 138.59,
    bpm: 132,
    pattern: [1, 0, 1, 0, 1, 0, 1, 0],
    filterFreq: 1900,
  },
  "thrash-metal": {
    wave: "sawtooth",
    baseFreq: 55,
    bpm: 176,
    pattern: [1, 1, 0, 1, 1, 0, 1, 1],
    filterFreq: 900,
  },
  "new-wave": {
    wave: "square",
    baseFreq: 146.83,
    bpm: 128,
    pattern: [1, 0, 1, 0, 0, 1, 0, 1],
    filterFreq: 2100,
  },
  shoegaze: {
    wave: "sine",
    baseFreq: 110,
    bpm: 92,
    pattern: [1, 0, 0, 1, 0, 0, 1, 0],
    filterFreq: 2800,
  },
};

export function getGenreSound(slug: string): GenreSoundProfile {
  return (
    GENRE_SOUNDS[slug] ?? {
      wave: "sine" as const,
      baseFreq: 110,
      bpm: 100,
      pattern: [1, 0, 1, 0, 1, 0, 1, 0],
      filterFreq: 1200,
    }
  );
}
