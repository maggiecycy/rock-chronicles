"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  getTrack,
  resolveTrackUrl,
  trackUrlCandidates,
  type AudioTrack,
} from "@/lib/audio";
import {
  registerMusicPause,
  requestMusicStart,
} from "@/lib/playback-mutex";

interface MusicPlayerValue {
  queue: AudioTrack[];
  index: number;
  current: AudioTrack | null;
  playing: boolean;
  progress: number;
  duration: number;
  error: string | null;
  queueOpen: boolean;
  setQueueOpen: (open: boolean) => void;
  playTracks: (tracks: AudioTrack[], startId?: string) => void;
  playTrackIds: (ids: string[], startId?: string) => void;
  toggle: () => void;
  play: () => void;
  pause: () => void;
  next: () => void;
  prev: () => void;
  seek: (ratio: number) => void;
  jumpTo: (queueIndex: number) => void;
  close: () => void;
}

const MusicPlayerContext = createContext<MusicPlayerValue | null>(null);

function waitForCanPlay(el: HTMLAudioElement, ms = 12000): Promise<void> {
  if (el.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
    return Promise.resolve();
  }
  return new Promise((resolve, reject) => {
    const timer = window.setTimeout(() => {
      cleanup();
      reject(new Error("audio timeout"));
    }, ms);
    const onReady = () => {
      cleanup();
      resolve();
    };
    const onError = () => {
      cleanup();
      reject(el.error ?? new Error("audio error"));
    };
    const cleanup = () => {
      window.clearTimeout(timer);
      el.removeEventListener("canplay", onReady);
      el.removeEventListener("error", onError);
    };
    el.addEventListener("canplay", onReady);
    el.addEventListener("error", onError);
  });
}

async function tryPlayUrl(el: HTMLAudioElement, absolute: string): Promise<void> {
  // Setting src is enough; calling load() races with play() and fires spurious pause.
  if (el.src !== absolute) {
    el.src = absolute;
  }
  try {
    await el.play();
  } catch {
    await waitForCanPlay(el);
    await el.play();
  }
}

export function MusicPlayerProvider({ children }: { children: ReactNode }) {
  const [queue, setQueue] = useState<AudioTrack[]>([]);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [queueOpen, setQueueOpen] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const prefetchRef = useRef<HTMLAudioElement | null>(null);
  const indexRef = useRef(0);
  const queueRef = useRef<AudioTrack[]>([]);
  /** Ignore pause events while we intentionally change src / start play. */
  const switchingRef = useRef(false);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);
  useEffect(() => {
    queueRef.current = queue;
  }, [queue]);

  const current = queue[index] ?? null;

  const ensureAudio = useCallback(() => {
    if (!audioRef.current) {
      const el = new Audio();
      el.preload = "auto";
      audioRef.current = el;
    }
    return audioRef.current;
  }, []);

  const prefetchNext = useCallback((q: AudioTrack[], i: number) => {
    const nextTrack = q[i + 1];
    if (!nextTrack) {
      if (prefetchRef.current) {
        prefetchRef.current.removeAttribute("src");
      }
      return;
    }
    if (!prefetchRef.current) {
      prefetchRef.current = new Audio();
      prefetchRef.current.preload = "auto";
    }
    const url = resolveTrackUrl(nextTrack);
    const absolute =
      url.startsWith("http://") || url.startsWith("https://")
        ? url
        : new URL(url, window.location.origin).href;
    if (prefetchRef.current.src !== absolute) {
      prefetchRef.current.src = absolute;
    }
  }, []);

  const loadAndPlay = useCallback(
    async (track: AudioTrack, shouldPlay: boolean) => {
      const el = ensureAudio();
      const candidates = trackUrlCandidates(track);
      queueMicrotask(() => requestMusicStart());
      setProgress(0);
      setError(null);

      if (!shouldPlay) {
        const first = candidates[0];
        if (first && el.src !== first) el.src = first;
        return;
      }

      switchingRef.current = true;
      let lastErr: unknown = null;
      try {
        for (const url of candidates) {
          try {
            await tryPlayUrl(el, url);
            setPlaying(true);
            setError(null);
            lastErr = null;
            break;
          } catch (err) {
            lastErr = err;
          }
        }
        if (lastErr) {
          setPlaying(false);
          const msg =
            lastErr instanceof Error ? lastErr.message : "playback failed";
          setError(msg);
          console.warn("[MusicPlayer] play failed for", track.id, candidates, lastErr);
        }
      } finally {
        // Defer clearing so late pause events from src change are ignored.
        window.setTimeout(() => {
          switchingRef.current = false;
        }, 0);
      }
      prefetchNext(queueRef.current, indexRef.current);
    },
    [ensureAudio, prefetchNext],
  );

  const pause = useCallback(() => {
    const el = audioRef.current;
    if (el) el.pause();
    setPlaying(false);
  }, []);

  useEffect(() => {
    registerMusicPause(pause);
    return () => registerMusicPause(null);
  }, [pause]);

  useEffect(() => {
    const el = ensureAudio();

    const onTime = () => {
      setProgress(el.currentTime);
      setDuration(el.duration || 0);
    };
    const onEnded = () => {
      const q = queueRef.current;
      const i = indexRef.current;
      if (i + 1 < q.length) {
        const nextI = i + 1;
        setIndex(nextI);
        indexRef.current = nextI;
        void loadAndPlay(q[nextI], true);
      } else {
        setPlaying(false);
      }
    };
    const onPlay = () => {
      if (!switchingRef.current) setPlaying(true);
    };
    const onPause = () => {
      // src changes / load races emit pause; ignore while we are switching.
      if (switchingRef.current) return;
      if (el.paused) setPlaying(false);
    };

    el.addEventListener("timeupdate", onTime);
    el.addEventListener("ended", onEnded);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    el.addEventListener("loadedmetadata", onTime);

    return () => {
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("ended", onEnded);
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("loadedmetadata", onTime);
    };
  }, [ensureAudio, loadAndPlay]);

  const playTracks = useCallback(
    (tracks: AudioTrack[], startId?: string) => {
      if (!tracks.length) return;
      const start = startId
        ? Math.max(
            0,
            tracks.findIndex((t) => t.id === startId),
          )
        : 0;
      const i = start === -1 ? 0 : start;
      queueRef.current = tracks;
      indexRef.current = i;
      setQueue(tracks);
      setIndex(i);
      void loadAndPlay(tracks[i], true);
    },
    [loadAndPlay],
  );

  const playTrackIds = useCallback(
    (ids: string[], startId?: string) => {
      const tracks = ids
        .map((id) => getTrack(id))
        .filter((t): t is AudioTrack => Boolean(t));
      playTracks(tracks, startId);
    },
    [playTracks],
  );

  const play = useCallback(() => {
    const el = audioRef.current;
    const track = queueRef.current[indexRef.current];
    if (!track) return;
    queueMicrotask(() => requestMusicStart());
    if (!el?.src) {
      void loadAndPlay(track, true);
      return;
    }
    switchingRef.current = true;
    void el
      .play()
      .then(() => {
        setPlaying(true);
        setError(null);
      })
      .catch(() => {
        void loadAndPlay(track, true);
      })
      .finally(() => {
        window.setTimeout(() => {
          switchingRef.current = false;
        }, 0);
      });
  }, [loadAndPlay]);

  const toggle = useCallback(() => {
    if (playing) pause();
    else play();
  }, [playing, pause, play]);

  const next = useCallback(() => {
    const q = queueRef.current;
    const i = indexRef.current;
    if (i + 1 >= q.length) return;
    const nextI = i + 1;
    setIndex(nextI);
    indexRef.current = nextI;
    void loadAndPlay(q[nextI], true);
  }, [loadAndPlay]);

  const prev = useCallback(() => {
    const el = audioRef.current;
    const q = queueRef.current;
    const i = indexRef.current;
    if (el && el.currentTime > 3) {
      el.currentTime = 0;
      return;
    }
    if (i <= 0) {
      if (el) el.currentTime = 0;
      return;
    }
    const prevI = i - 1;
    setIndex(prevI);
    indexRef.current = prevI;
    void loadAndPlay(q[prevI], true);
  }, [loadAndPlay]);

  const seek = useCallback((ratio: number) => {
    const el = audioRef.current;
    if (!el || !el.duration) return;
    el.currentTime = Math.min(1, Math.max(0, ratio)) * el.duration;
  }, []);

  const jumpTo = useCallback(
    (queueIndex: number) => {
      const q = queueRef.current;
      if (queueIndex < 0 || queueIndex >= q.length) return;
      setIndex(queueIndex);
      indexRef.current = queueIndex;
      void loadAndPlay(q[queueIndex], true);
    },
    [loadAndPlay],
  );

  const close = useCallback(() => {
    pause();
    const el = audioRef.current;
    if (el) {
      el.removeAttribute("src");
    }
    if (prefetchRef.current) {
      prefetchRef.current.removeAttribute("src");
    }
    queueRef.current = [];
    indexRef.current = 0;
    setQueue([]);
    setIndex(0);
    setProgress(0);
    setDuration(0);
    setError(null);
    setQueueOpen(false);
  }, [pause]);

  useEffect(() => {
    if (current) prefetchNext(queue, index);
  }, [current, queue, index, prefetchNext]);

  const value = useMemo(
    () => ({
      queue,
      index,
      current,
      playing,
      progress,
      duration,
      error,
      queueOpen,
      setQueueOpen,
      playTracks,
      playTrackIds,
      toggle,
      play,
      pause,
      next,
      prev,
      seek,
      jumpTo,
      close,
    }),
    [
      queue,
      index,
      current,
      playing,
      progress,
      duration,
      error,
      queueOpen,
      playTracks,
      playTrackIds,
      toggle,
      play,
      pause,
      next,
      prev,
      seek,
      jumpTo,
      close,
    ],
  );

  return (
    <MusicPlayerContext.Provider value={value}>
      {children}
    </MusicPlayerContext.Provider>
  );
}

export function useMusicPlayer() {
  const ctx = useContext(MusicPlayerContext);
  if (!ctx) {
    throw new Error("useMusicPlayer must be used within MusicPlayerProvider");
  }
  return ctx;
}
