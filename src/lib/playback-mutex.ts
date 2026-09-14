/** Mutex so procedural ambient loops and the music player never overlap. */

type Fn = () => void;

let pauseMusic: Fn | null = null;
let stopAmbient: Fn | null = null;

export function registerMusicPause(fn: Fn | null) {
  pauseMusic = fn;
}

export function registerAmbientStop(fn: Fn | null) {
  stopAmbient = fn;
}

/** Call before starting a catalog track. */
export function requestMusicStart() {
  stopAmbient?.();
}

/** Call before starting a procedural genre loop. */
export function requestAmbientStart() {
  pauseMusic?.();
}
