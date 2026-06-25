import { useRef, useState, useEffect, useCallback } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const CelestialSound = () => {
  const [isMuted, setIsMuted] = useState(false); // Starts unmuted state, waiting for user interaction
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);

  const initAudio = useCallback(() => {
    if (audioCtxRef.current) return;

    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioContextClass();
    audioCtxRef.current = ctx;

    const masterGain = ctx.createGain();
    // Reduced base volume for a much softer, deep space ambient feel
    masterGain.gain.setValueAtTime(0.05, ctx.currentTime);
    masterGain.connect(ctx.destination);
    masterGainRef.current = masterGain;

    function createLayer(freq: number, type: OscillatorType, volume: number, panned: number, isTwinkle = false) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const pan = ctx.createPanner();

      osc.type = type;
      osc.frequency.setValueAtTime(freq + (Math.random() * 0.4 - 0.2), ctx.currentTime);
      pan.setPosition(Math.sin(panned), 0, Math.cos(panned));

      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 3);

      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      // Very slow LFO for space-like evolving drone
      lfo.frequency.setValueAtTime(isTwinkle ? 0.1 : 0.005 + Math.random() * 0.01, ctx.currentTime);
      lfoGain.gain.setValueAtTime(volume * 0.8, ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(gain.gain);
      lfo.start();

      osc.connect(gain);
      gain.connect(pan);
      pan.connect(masterGain);
      osc.start();
    }

    // Deep space open fifths (A1, E2, A2, E3, A3)
    const baseFreqs = [55.00, 82.41, 110.00, 164.81, 220.00]; 
    
    baseFreqs.forEach((freq, index) => {
      // Sub drone (Sine)
      createLayer(freq, 'sine', 0.04, index * 0.2);
      // Overtone warmth (Triangle)
      createLayer(freq * 1.5, 'triangle', 0.01, index * 0.3);
      // Distant eerie harmonic
      if (index > 2) {
        createLayer(freq * 2.5, 'sine', 0.005, index, true);
      }
    });

    // Massive Space Reverb simulation
    const delay = ctx.createDelay(3.0);
    const feedback = ctx.createGain();
    delay.delayTime.value = 2.4; // Long delay for vast space
    feedback.gain.value = 0.75; // Heavy feedback
    
    masterGain.connect(delay);
    delay.connect(feedback);
    feedback.connect(delay);
    delay.connect(ctx.destination);
  }, []);



  // Handle browser autoplay policies (Wait for first interaction)
  useEffect(() => {
    const unlockAudio = () => {
      if (!audioCtxRef.current) initAudio();
      
      const ctx = audioCtxRef.current!;
      if (ctx.state === 'suspended' && !isMuted) {
        ctx.resume();
      }
      
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
    };

    window.addEventListener('click', unlockAudio);
    window.addEventListener('keydown', unlockAudio);
    window.addEventListener('touchstart', unlockAudio);

    return () => {
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
    };
  }, [isMuted, initAudio]);

  const toggleMute = () => {
    if (!audioCtxRef.current) initAudio();
    
    const ctx = audioCtxRef.current!;
    if (ctx.state === 'suspended') ctx.resume();

    const targetGain = isMuted ? 0.08 : 0;
    masterGainRef.current?.gain.exponentialRampToValueAtTime(Math.max(targetGain, 0.0001), ctx.currentTime + 1.5);
    setIsMuted(!isMuted);
  };

  return (
    <button
      onClick={(e) => {
        e.stopPropagation(); // Prevents document click from interfering if clicking to mute instantly
        toggleMute();
      }}
      className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-accent/5 border border-accent/10 text-accent/40 hover:text-accent hover:border-accent/40 hover:bg-accent/10 transition-all backdrop-blur-xl group shadow-[0_0_20px_rgba(0,240,255,0.1)]"
      title={isMuted ? "Sincronizar Harmonia Celestial" : "Mutar Transmissão"}
    >
      {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} className="animate-pulse" />}
      <div className="absolute inset-0 rounded-full border border-accent/20 animate-ping opacity-0 group-hover:opacity-100" />
    </button>
  );
};

export default CelestialSound;
