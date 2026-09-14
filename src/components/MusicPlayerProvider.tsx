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

export function MusicPlayerProvider({ children }: { children: ReactNode }) {
  const [queue, setQueue] = useState<AudioTrack[]>([]);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [queueOpen, setQueueOpen] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const prefetchRef = useRef<HTMLAudioElement | null>(null);
  const indexRef = useRef(0);
  const queueRef = useRef<AudioTrack[]>([]);

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
      el.preload = "metadata";
      audioRef.current = el;
    }
    return audioRef.current;
  }, []);

  const prefetchNext = useCallback((q: AudioTrack[], i: number) => {
    const nextTrack = q[i + 1];
    if (!nextTrack) {
      if (prefetchRef.current) {
        prefetchRef.current.src = "";
      }
      return;
    }
    if (!prefetchRef.current) {
      prefetchRef.current = new Audio();
      prefetchRef.current.preload = "auto";
    }
    const url = resolveTrackUrl(nextTrack);
    if (prefetchRef.current.src !== url) {
      prefetchRef.current.src = url;
      void prefetchRef.current.load();
    }
  }, []);

  const loadAndPlay = useCallback(
    async (track: AudioTrack, shouldPlay: boolean) => {
      const el = ensureAudio();
      const url = resolveTrackUrl(track);
      queueMicrotask(() => requestMusicStart());
      if (el.src !== url) {
        el.src = url;
        el.load();
      }
      setProgress(0);
      if (shouldPlay) {
        try {
          await el.play();
          setPlaying(true);
        } catch {
          setPlaying(false);
        }
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
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);

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
    void el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
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
      el.load();
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
