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
import { getGenreSound } from "@/lib/genreSounds";

interface SoundContextValue {
  enabled: boolean;
  toggle: () => void;
  playGenre: (slug: string, intensity?: 1 | 2 | 3) => void;
  stop: () => void;
  activeGenre: string | null;
}

const SoundContext = createContext<SoundContextValue | null>(null);

export function SoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const [activeGenre, setActiveGenre] = useState<string | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{
    osc: OscillatorNode;
    gain: GainNode;
    filter: BiquadFilterNode;
    lfo: OscillatorNode;
    timer?: number;
  } | null>(null);

  const ensureCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    return ctxRef.current;
  }, []);

  const stop = useCallback(() => {
    const bag = nodesRef.current;
    if (bag) {
      try {
        bag.osc.stop();
        bag.lfo.stop();
      } catch {
        /* already stopped */
      }
      if (bag.timer) window.clearInterval(bag.timer);
      nodesRef.current = null;
    }
    setActiveGenre(null);
  }, []);

  const playGenre = useCallback(
    (slug: string, intensity: 1 | 2 | 3 = 2) => {
      if (!enabled) return;
      const profile = getGenreSound(slug);
      const ctx = ensureCtx();
      void ctx.resume();
      stop();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();

      osc.type = profile.wave;
      osc.frequency.value = profile.baseFreq * (0.9 + intensity * 0.08);

      filter.type = "lowpass";
      filter.frequency.value = profile.filterFreq * (0.7 + intensity * 0.2);
      filter.Q.value = 1.2;

      lfo.type = "sine";
      lfo.frequency.value = intensity === 3 ? 6 : intensity === 2 ? 3.5 : 2;
      lfoGain.gain.value = 0.015 * intensity;

      const master = 0.035 * intensity;
      gain.gain.value = 0;

      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      lfo.start();
      gain.gain.linearRampToValueAtTime(master, ctx.currentTime + 0.08);

      const stepMs = (60_000 / profile.bpm) / 2;
      let step = 0;
      const timer = window.setInterval(() => {
        const on = profile.pattern[step % profile.pattern.length];
        const t = ctx.currentTime;
        if (on) {
          gain.gain.cancelScheduledValues(t);
          gain.gain.setValueAtTime(master * 0.3, t);
          gain.gain.linearRampToValueAtTime(master, t + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.0001, t + stepMs / 1000);
        }
        step += 1;
      }, stepMs);

      nodesRef.current = { osc, gain, filter, lfo, timer };
      setActiveGenre(slug);
    },
    [enabled, ensureCtx, stop],
  );

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      if (prev) stop();
      return !prev;
    });
  }, [stop]);

  useEffect(() => () => stop(), [stop]);

  const value = useMemo(
    () => ({ enabled, toggle, playGenre, stop, activeGenre }),
    [enabled, toggle, playGenre, stop, activeGenre],
  );

  return (
    <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
  );
}

export function useSound() {
  const ctx = useContext(SoundContext);
  if (!ctx) {
    throw new Error("useSound must be used within SoundProvider");
  }
  return ctx;
}
