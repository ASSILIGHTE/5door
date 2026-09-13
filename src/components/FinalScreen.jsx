import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Heart, Sparkles } from 'lucide-react';

export const FinalScreen = ({ finalData, onReplay }) => {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-20 z-10 text-center overflow-hidden">
      {/* Soft Pastel Ambient Radial Light */}
      <div className="absolute w-[650px] h-[650px] bg-radial from-[#F4C2C2]/20 via-[#D8BBFF]/10 to-transparent blur-3xl pointer-events-none rounded-full" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-xl w-full glass-card rounded-3xl p-8 md:p-12 border border-[#F4C2C2]/30 shadow-warm-shadow relative z-10 flex flex-col items-center gap-8"
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2E2236]/60 border border-[#F4C2C2]/30 text-[#F4C2C2] text-[11px] uppercase tracking-[0.3em] font-medium">
          <Sparkles className="w-3.5 h-3.5 text-[#F4C2C2]" />
          <span>Journey Complete</span>
        </div>

        {/* Polaroid Framed Photo */}
        <div className="polaroid-frame w-full max-w-xs">
          <div className="w-full aspect-[4/5] rounded overflow-hidden relative group">
            <img
              src={finalData.mainPhoto || "/photos/photo5.jpeg"}
              alt="Final memory"
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="pt-3 flex items-center justify-center gap-2 text-xs font-serif text-[#2E2236] italic">
            <Heart className="w-3.5 h-3.5 text-[#4D3352] fill-[#4D3352]" />
            <span>Every Door led me to you</span>
          </div>
        </div>

        {/* Thank You Statements */}
        <div className="space-y-3 max-w-md">
          <h2 className="text-3xl md:text-4xl font-serif font-normal text-[#FFF1E6] leading-tight">
            {finalData.thankYouText}
          </h2>

          <p className="text-sm md:text-base text-[#F9D5D6] font-serif italic">
            "{finalData.quoteText}"
          </p>
        </div>

        {/* Replay Button */}
        <div className="pt-2">
          <button
            onClick={onReplay}
            className="group flex items-center gap-3 px-6 py-3 rounded-full bg-[#2E2236]/50 border border-[#F4C2C2]/30 text-[#FFF1E6]/80 hover:text-[#FFF1E6] hover:border-[#F4C2C2] hover:bg-[#4D3352]/50 transition-all text-[11px] uppercase tracking-[0.2em] font-medium backdrop-blur-md shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#F4C2C2] group-hover:rotate-180 transition-transform duration-700" />
            <span>{finalData.replayText || "REPLAY THE JOURNEY ↻"}</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
