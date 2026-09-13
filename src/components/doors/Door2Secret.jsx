import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Sparkles, ArrowRight, Gift } from 'lucide-react';

export const Door2Secret = ({ doorData, onNext }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const fullMessage = doorData.secretMessage || "Sometimes I smile for no reason... then I realize I'm thinking about you.";

  useEffect(() => {
    if (isOpen) {
      let currentIndex = 0;
      setDisplayedText('');
      const interval = setInterval(() => {
        if (currentIndex < fullMessage.length) {
          setDisplayedText(fullMessage.substring(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 45);

      return () => clearInterval(interval);
    }
  }, [isOpen, fullMessage]);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-24 z-10 overflow-hidden">
      {/* Deep Quiet Pastel Backdrop Glow */}
      <div className="absolute w-[600px] h-[600px] bg-radial from-[#D8BBFF]/15 via-[#14111A] to-transparent blur-3xl pointer-events-none rounded-full" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.9 }}
        className="max-w-2xl w-full glass-card rounded-3xl p-8 md:p-12 relative z-10 border border-[#F4C2C2]/30 text-center flex flex-col items-center gap-8 shadow-warm-shadow"
      >
        {/* Door Header */}
        <div className="flex items-center justify-between w-full pb-4 border-b border-[#F4C2C2]/20">
          <span className="text-2xl font-serif font-bold text-[#F4C2C2]">
            {doorData.number}
          </span>
          <span className="text-xs uppercase tracking-[0.3em] text-[#F9D5D6] font-semibold">
            {doorData.title}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-[#D8BBFF] font-mono">
            {isOpen ? <Unlock className="w-3.5 h-3.5 text-[#F4C2C2]" /> : <Lock className="w-3.5 h-3.5 text-gray-500" />}
            {isOpen ? doorData.unlockedBadge : 'LOCKED'}
          </span>
        </div>

        {/* Teaser Header */}
        <div className="space-y-2">
          <h3 className="text-2xl md:text-3xl font-serif font-normal text-[#FFF1E6]">
            {doorData.tagline}
          </h3>
          <p className="text-xs text-[#F9D5D6]/85 italic font-serif">
            {isOpen ? "The secret is now unveiled..." : "Tap the velvet keepsake box to unlock"}
          </p>
        </div>

        {/* Keepsake Box Visual */}
        <div className="my-3 relative">
          <motion.div
            whileHover={{ scale: isOpen ? 1 : 1.04 }}
            whileTap={{ scale: isOpen ? 1 : 0.96 }}
            onClick={() => !isOpen && setIsOpen(true)}
            className={`relative w-40 h-40 md:w-44 md:h-44 rounded-3xl border-2 flex flex-col items-center justify-center cursor-pointer transition-all duration-700 ${
              isOpen
                ? 'border-[#F4C2C2] bg-gradient-to-b from-[#4D3352]/70 via-[#2E2236] to-[#14111A] shadow-[0_0_40px_rgba(244,194,194,0.3)]'
                : 'border-[#4D3352] bg-gradient-to-b from-[#2E2236]/80 to-[#14111A] hover:border-[#F4C2C2]/80 shadow-2xl animate-pulse-subtle'
            }`}
          >
            {/* Inner Inset */}
            <div className="absolute inset-2 rounded-2xl border border-dashed border-[#F4C2C2]/30 flex flex-col items-center justify-center p-4">
              {isOpen ? (
                <Sparkles className="w-10 h-10 text-[#F4C2C2] animate-spin-slow" />
              ) : (
                <Gift className="w-10 h-10 text-[#F9D5D6] animate-bounce" />
              )}
            </div>

            {!isOpen && (
              <span className="absolute bottom-3 text-[10px] uppercase tracking-[0.2em] text-[#F4C2C2] font-semibold">
                TAP TO UNLOCK
              </span>
            )}
          </motion.div>
        </div>

        {/* Secret Card Reveal */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              transition={{ duration: 0.8 }}
              className="w-full space-y-6"
            >
              {/* Revealed Secret Box */}
              <div className="p-6 rounded-2xl bg-[#14111A]/85 border border-[#F4C2C2]/30 shadow-inner relative">
                <blockquote className="text-xl md:text-2xl font-serif italic text-[#FFF1E6] leading-relaxed min-h-[60px]">
                  "{displayedText}"
                  <span className="inline-block w-1.5 h-5 bg-[#F4C2C2] ml-1 animate-pulse" />
                </blockquote>
              </div>

              {/* Photo preview */}
              {doorData.photo && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="w-full max-w-sm mx-auto aspect-[4/3] rounded-2xl overflow-hidden border border-[#F4C2C2]/30 shadow-xl"
                >
                  <img
                    src={doorData.photo}
                    alt="Secret moment"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              )}

              {/* Next Door Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
              >
                <button
                  onClick={onNext}
                  className="inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#4D3352] to-[#2E2236] border border-[#F4C2C2]/40 text-[#FFF1E6] text-xs uppercase tracking-[0.2em] font-medium shadow-md hover:border-[#F4C2C2] hover:shadow-[0_0_25px_rgba(244,194,194,0.3)] transition-all group"
                >
                  <span>NEXT DOOR →</span>
                  <ArrowRight className="w-4 h-4 text-[#F4C2C2] group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
