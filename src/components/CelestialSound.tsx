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
    // Reduced base volume for a much softer, ambient feel
    masterGain.gain.setValueAtTime(0.08, ctx.currentTime);
    masterGain.connect(ctx.destination);
    masterGainRef.current = masterGain;

    // Pentatonic ambient scale for richer, harmonious variation (D2, E2, G2, A2, B2)
    const baseFreqs = [73.42, 82.41, 98.00, 110.00, 123.47]; 
    
    baseFreqs.forEach((freq, index) => {
      // Primary Pad (Sine)
      createLayer(freq, 'sine', 0.03, index * 0.2);
      // Overtone Layer (Triangle for warmth)
      createLayer(freq * 1.5, 'triangle', 0.015, index * 0.3); // Fifth harmonic
      // High Twinkle Layer (Sine with fast LFO)
      if (index > 1) {
        createLayer(freq * 4, 'sine', 0.008, index, true);
      }
    });

    // Reverb simulation (Subtle delay network with more echo)
    const delay = ctx.createDelay(2.0);
    const feedback = ctx.createGain();
    delay.delayTime.value = 1.2;
    feedback.gain.value = 0.5;
    
    masterGain.connect(delay);
    delay.connect(feedback);
    feedback.connect(delay);
    delay.connect(ctx.destination);
  }, []);

  const createLayer = (freq: number, type: OscillatorType, volume: number, panned: number, isTwinkle = false) => {
    const ctx = audioCtxRef.current!;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const pan = ctx.createPanner();

    osc.type = type;
    // Slight detune for a chorusing, drifting effect
    osc.frequency.setValueAtTime(freq + (Math.random() * 0.4 - 0.2), ctx.currentTime);

    // Stereo Panning
    pan.setPosition(Math.sin(panned), 0, Math.cos(panned));

    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 3); // Slow fade in

    // Subtle LFO for organic movement
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.setValueAtTime(isTwinkle ? Math.random() * 2 + 1 : 0.02 + Math.random() * 0.05, ctx.currentTime);
    lfoGain.gain.setValueAtTime(volume * 0.6, ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(gain.gain);
    lfo.start();

    osc.connect(gain);
    gain.connect(pan);
    pan.connect(masterGainRef.current!);
    osc.start();
  };

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
  }, [isMuted]);

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
