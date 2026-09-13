import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Moon, ArrowRight, Heart } from 'lucide-react';

export const Door4Promise = ({ doorData, onNext }) => {
  const [showLine2, setShowLine2] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowLine2(true), 1800);
    const timer2 = setTimeout(() => setShowButton(true), 3800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-24 z-10 overflow-hidden">
      {/* Serene Pastel Night Sky Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F0D14] via-[#1A1424] to-[#14111A] pointer-events-none" />

      {/* Moonlit Soft Pastel Glow */}
      <div className="absolute top-16 right-16 md:top-24 md:right-32 w-36 h-36 rounded-full bg-radial from-[#D8BBFF]/15 via-[#F4C2C2]/5 to-transparent blur-2xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2 }}
        className="max-w-3xl w-full glass-card rounded-3xl p-8 md:p-14 relative z-10 border border-[#F4C2C2]/30 flex flex-col items-center text-center gap-10 shadow-warm-shadow"
      >
        {/* Door Header */}
        <div className="flex items-center justify-between w-full pb-4 border-b border-[#F4C2C2]/20">
          <span className="text-2xl font-serif font-bold text-[#F4C2C2]">
            {doorData.number}
          </span>
          <span className="text-xs uppercase tracking-[0.3em] text-[#F9D5D6] font-semibold">
            {doorData.title}
          </span>
          <div className="flex items-center gap-1.5 text-xs text-[#D8BBFF]">
            <Moon className="w-3.5 h-3.5 text-[#F4C2C2]" />
            <span className="font-serif italic">Serenity</span>
          </div>
        </div>

        {/* Photo Container */}
        {doorData.photo && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="w-full max-w-sm aspect-[4/3] rounded-2xl overflow-hidden border border-[#F4C2C2]/30 shadow-2xl relative"
          >
            <img
              src={doorData.photo}
              alt="A Promise"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#14111A]/70 via-transparent to-transparent pointer-events-none" />
          </motion.div>
        )}

        {/* Staggered Promise Text Reveal */}
        <div className="space-y-6 max-w-xl min-h-[130px] flex flex-col justify-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="text-xl md:text-2xl font-serif font-light text-[#FFF1E6]/90 italic leading-relaxed"
          >
            "{doorData.line1}"
          </motion.p>

          {showLine2 && (
            <motion.p
              initial={{ opacity: 0, y: 15, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.5 }}
              className="text-2xl md:text-4xl font-serif font-normal text-[#F4C2C2] text-pastel-pink leading-tight"
            >
              "{doorData.line2}"
            </motion.p>
          )}
        </div>

        {/* Button to Final Door */}
        {showButton && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="pt-2"
          >
            <button
              onClick={onNext}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#F4C2C2] via-[#4D3352] to-[#2E2236] border border-[#F4C2C2] text-[#FFF1E6] text-xs uppercase tracking-[0.25em] font-semibold shadow-lg hover:shadow-[0_0_30px_rgba(244,194,194,0.4)] hover:scale-105 transition-all group"
            >
              <Heart className="w-4 h-4 text-[#FFF1E6] fill-[#FFF1E6] animate-pulse" />
              <span>{doorData.buttonText || "ONE LAST DOOR →"}</span>
              <ArrowRight className="w-4 h-4 text-[#FFF1E6] group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
