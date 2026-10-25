import { useEffect, useRef, useCallback } from 'react';
import { useSimulation } from '../store/simulationContext';

export function useAudioFx() {
  const { audioEnabled } = useSimulation();
  const audioCtxRef = useRef<AudioContext | null>(null);
  const droneNodesRef = useRef<{ osc1: OscillatorNode; osc2: OscillatorNode; filter: BiquadFilterNode; gain: GainNode } | null>(null);

  // Initialize Web Audio context on demand
  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        audioCtxRef.current = new AudioCtxClass();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  // Ambient deep space binaural drone
  useEffect(() => {
    if (!audioEnabled) {
      if (droneNodesRef.current) {
        try {
          droneNodesRef.current.gain.gain.linearRampToValueAtTime(0.001, (audioCtxRef.current?.currentTime || 0) + 0.8);
          setTimeout(() => {
            droneNodesRef.current?.osc1.stop();
            droneNodesRef.current?.osc2.stop();
            droneNodesRef.current = null;
          }, 900);
        } catch {
          droneNodesRef.current = null;
        }
      }
      return;
    }

    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(55, ctx.currentTime); // Low A1
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(56.5, ctx.currentTime); // 1.5 Hz binaural beat

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(140, ctx.currentTime);
      filter.Q.setValueAtTime(2, ctx.currentTime);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 2); // Soft volume

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();

      droneNodesRef.current = { osc1, osc2, filter, gain };
    } catch {
      // Audio autoplay policy or browser restriction
    }

    return () => {
      if (droneNodesRef.current) {
        try {
          droneNodesRef.current.osc1.stop();
          droneNodesRef.current.osc2.stop();
        } catch {}
        droneNodesRef.current = null;
      }
    };
  }, [audioEnabled, getAudioContext]);

  // UI chime sound
  const playChime = useCallback((frequency: number = 440, type: OscillatorType = 'sine') => {
    if (!audioEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(frequency * 1.5, ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.32);
    } catch {}
  }, [audioEnabled, getAudioContext]);

  return { playChime };
}
