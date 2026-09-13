import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export const Door5Surprise = ({ doorData, onCompleteFinal }) => {
  const [phase, setPhase] = useState('intro'); // 'intro' | 'countdown' | 'reveal'
  const [count, setCount] = useState(3);

  const startCountdown = () => {
    setPhase('countdown');
    setCount(3);
  };

  useEffect(() => {
    if (phase === 'countdown') {
      if (count > 1) {
        const timer = setTimeout(() => setCount(count - 1), 1000);
        return () => clearTimeout(timer);
      } else if (count === 1) {
        const timer = setTimeout(() => {
          triggerConfetti();
          setPhase('reveal');
        }, 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [phase, count]);

  const triggerConfetti = () => {
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#F4C2C2', '#F9D5D6', '#D8BBFF', '#FFF1E6', '#D8E2DC', '#FDE2E4']
    };

    confetti({
      ...defaults,
      particleCount: 100,
      spread: 75,
      startVelocity: 42,
    });

    confetti({
      ...defaults,
      particleCount: 80,
      angle: 60,
      spread: 60,
      startVelocity: 38,
    });

    confetti({
      ...defaults,
      particleCount: 80,
      angle: 120,
      spread: 60,
      startVelocity: 38,
    });
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-20 z-10 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-radial from-[#F4C2C2]/15 via-[#2E2236]/30 to-[#14111A] pointer-events-none" />

      {/* PHASE 1: INTRO */}
      {phase === 'intro' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="max-w-2xl w-full glass-card rounded-3xl p-8 md:p-14 text-center border-2 border-[#F4C2C2] shadow-warm-shadow flex flex-col items-center gap-8 relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F4C2C2]/15 border border-[#F4C2C2]/50 text-[#F4C2C2] text-xs font-semibold uppercase tracking-[0.3em]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Grand Finale</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#FFF1E6] tracking-wide text-pastel-pink">
            DOOR 05 — THE SURPRISE
          </h2>

          <p className="text-base md:text-lg text-[#F9D5D6] font-serif italic max-w-md">
            You have unlocked every memory, secret, message, and promise. Are you ready for what awaits inside?
          </p>

          <button
            onClick={startCountdown}
            className="group relative inline-flex items-center gap-4 px-10 py-4 rounded-full bg-gradient-to-r from-[#F4C2C2] via-[#4D3352] to-[#2E2236] border-2 border-[#F4C2C2] text-[#FFF1E6] text-xs uppercase tracking-[0.25em] font-bold shadow-lg hover:scale-105 hover:shadow-[0_0_40px_rgba(244,194,194,0.45)] transition-all"
          >
            <span>REVEAL THE SURPRISE</span>
            <Heart className="w-4 h-4 text-[#FFF1E6] fill-[#FFF1E6] animate-pulse" />
          </button>
        </motion.div>
      )}

      {/* PHASE 2: COUNTDOWN */}
      {phase === 'countdown' && (
        <div className="fixed inset-0 z-50 bg-[#14111A] flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={count}
              initial={{ scale: 0.3, opacity: 0, filter: 'blur(10px)' }}
              animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
              exit={{ scale: 1.8, opacity: 0, filter: 'blur(15px)' }}
              transition={{ duration: 0.8 }}
              className="text-8xl md:text-9xl font-serif font-bold text-[#F4C2C2]"
            >
              {count}
            </motion.div>
          </AnimatePresence>
          <span className="text-xs uppercase tracking-[0.35em] text-[#F9D5D6] mt-8 font-serif">
            Preparing your surprise...
          </span>
        </div>
      )}

      {/* PHASE 3: REVEAL */}
      {phase === 'reveal' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl w-full glass-card rounded-3xl p-6 md:p-12 border border-[#F4C2C2]/50 shadow-warm-shadow relative z-10 text-center flex flex-col items-center gap-10"
        >
          {/* Main Statement */}
          <div className="space-y-4 max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xs uppercase tracking-[0.35em] text-[#F4C2C2] font-semibold"
            >
              {doorData.headingText || "You made it to the end."}
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="text-2xl md:text-3xl font-serif font-light italic text-[#FFF1E6]/90"
            >
              "{doorData.wonderText}"
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(6px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ delay: 1.8, duration: 1.2 }}
              className="py-3"
            >
              <h3 className="text-3xl md:text-5xl font-serif font-bold text-[#F4C2C2] text-pastel-pink leading-tight">
                {doorData.revealText}
              </h3>
            </motion.div>
          </div>

          {/* Photo Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4, duration: 1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full"
          >
            {(doorData.photos || []).map((img, idx) => (
              <div
                key={idx}
                className="aspect-square rounded-2xl overflow-hidden border border-[#F4C2C2]/30 shadow-lg transform hover:scale-105 transition-transform duration-500"
              >
                <img
                  src={img}
                  alt={`Surprise moment ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </motion.div>

          {/* Final Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.2 }}
            className="space-y-6 pt-2"
          >
            <p className="text-sm md:text-base text-[#FFF1E6]/90 font-serif italic max-w-lg mx-auto leading-relaxed">
              "{doorData.finalMessage}"
            </p>

            <button
              onClick={onCompleteFinal}
              className="inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#4D3352] via-[#2E2236] to-[#4D3352] border border-[#F4C2C2] text-[#FFF1E6] text-xs uppercase tracking-[0.2em] font-bold shadow-md hover:shadow-[0_0_30px_rgba(244,194,194,0.35)] transition-all group"
            >
              <span>COMPLETE THE JOURNEY →</span>
              <ArrowRight className="w-4 h-4 text-[#F4C2C2] group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};
