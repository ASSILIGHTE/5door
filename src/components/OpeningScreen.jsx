import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

export const OpeningScreen = ({ onEnter, data }) => {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 text-center overflow-hidden z-10">
      {/* Soft Pastel Backdrop Light */}
      <div className="absolute w-[650px] h-[650px] bg-radial from-[#F4C2C2]/20 via-[#D8BBFF]/10 to-transparent blur-3xl pointer-events-none rounded-full" />

      {/* Main Content Container */}
      <motion.div
        initial={{ opacity: 0, filter: 'blur(8px)', y: 25 }}
        animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-3xl flex flex-col items-center gap-9 relative z-10"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#2E2236]/60 border border-[#F4C2C2]/40 text-[#F4C2C2] text-[11px] uppercase tracking-[0.3em] font-medium backdrop-blur-md shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#F4C2C2]" />
          <span>A Private Romantic Journey</span>
        </motion.div>

        {/* Heading text */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="text-4xl md:text-6xl lg:text-7xl font-serif font-normal text-[#FFF1E6] tracking-tight leading-[1.15]"
        >
          {data.heading}
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ duration: 1.5, delay: 1.1 }}
          className="text-lg md:text-xl font-serif italic text-[#F9D5D6] tracking-widest font-light"
        >
          "{data.subtext}"
        </motion.p>

        {/* Enter Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.6 }}
          className="mt-4"
        >
          <button
            onClick={onEnter}
            className="group relative inline-flex items-center gap-4 px-9 py-4 rounded-full bg-gradient-to-r from-[#2E2236] via-[#4D3352] to-[#2E2236] border border-[#F4C2C2]/50 text-[#FFF1E6] text-xs uppercase tracking-[0.25em] font-medium shadow-[0_15px_40px_rgba(0,0,0,0.6)] hover:shadow-[0_0_35px_rgba(244,194,194,0.3)] hover:border-[#F4C2C2] transition-all duration-500 overflow-hidden transform hover:-translate-y-0.5"
          >
            {/* Soft inner shimmer */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <span className="relative z-10">{data.buttonText}</span>
            <ArrowRight className="w-4 h-4 text-[#F4C2C2] relative z-10 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </motion.div>

      {/* Footer Ambient Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.45 }}
        transition={{ delay: 2.2, duration: 1.5 }}
        className="absolute bottom-8 text-[11px] tracking-[0.25em] text-[#D8BBFF]/80 uppercase font-serif italic"
      >
        Best experienced with sound enabled
      </motion.div>
    </div>
  );
};
