import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowRight, Sparkles } from 'lucide-react';

export const Door3Message = ({ doorData, onNext }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-24 z-10 overflow-hidden">
      {/* Soft Pastel Backlight */}
      <div className="absolute w-[650px] h-[650px] bg-radial from-[#F4C2C2]/20 via-[#D8BBFF]/10 to-transparent blur-3xl pointer-events-none rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.9 }}
        className="max-w-3xl w-full glass-card rounded-3xl p-6 md:p-12 relative z-10 border border-[#F4C2C2]/30 flex flex-col items-center gap-8 shadow-warm-shadow"
      >
        {/* Door Header */}
        <div className="flex items-center justify-between w-full pb-4 border-b border-[#F4C2C2]/20">
          <span className="text-2xl font-serif font-bold text-[#F4C2C2]">
            {doorData.number}
          </span>
          <span className="text-xs uppercase tracking-[0.3em] text-[#F9D5D6] font-semibold">
            {doorData.title}
          </span>
          <span className="text-xs text-[#D8BBFF] font-serif italic">
            Love Letter
          </span>
        </div>

        {/* Envelope Container */}
        {!isOpen ? (
          <motion.div
            initial={{ scale: 0.96 }}
            animate={{ scale: 1 }}
            className="flex flex-col items-center gap-6 py-6"
          >
            <div className="text-center space-y-2">
              <h3 className="text-3xl font-serif font-normal text-[#FFF1E6]">
                {doorData.tagline}
              </h3>
              <p className="text-xs text-[#F9D5D6]/85 font-serif italic">
                A letter sealed with love, waiting for you
              </p>
            </div>

            {/* Interactive Pastel Envelope */}
            <motion.div
              whileHover={{ scale: 1.04, rotate: 0.5 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setIsOpen(true)}
              className="relative w-72 h-48 md:w-96 md:h-56 rounded-2xl bg-gradient-to-b from-[#2E2236] via-[#1E1726] to-[#14111A] border-2 border-[#F4C2C2]/50 shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex flex-col items-center justify-center cursor-pointer group"
            >
              {/* Flap Graphic */}
              <div className="absolute top-0 inset-x-0 h-24 border-b border-[#F4C2C2]/30 bg-[#4D3352]/30 rounded-t-2xl [clip-path:polygon(0_0,50%_100%,100%_0)]" />

              {/* Wax Seal Icon */}
              <div className="relative z-10 w-14 h-14 rounded-full bg-gradient-to-br from-[#4D3352] to-[#2E2236] border-2 border-[#F4C2C2] shadow-[0_0_20px_rgba(244,194,194,0.4)] flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <Heart className="w-6 h-6 text-[#F4C2C2] fill-[#F4C2C2]" />
              </div>

              <span className="relative z-10 text-[10px] uppercase tracking-[0.25em] text-[#FFF1E6]/80 font-medium mt-4 group-hover:text-[#F4C2C2] transition-colors">
                TAP TO OPEN LETTER
              </span>
            </motion.div>
          </motion.div>
        ) : (
          /* Unfolded Parchment Letter View */
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full flex flex-col items-center gap-8"
          >
            {/* Parchment Paper Card */}
            <div className="w-full parchment-paper rounded-2xl p-8 md:p-12 relative">
              <div className="space-y-6 relative z-10">
                <div className="flex items-center gap-2 text-[#4D3352] text-xs font-serif uppercase tracking-widest font-semibold border-b border-[#4D3352]/20 pb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{doorData.letterTitle}</span>
                </div>

                <div className="font-handwriting text-xl md:text-2xl leading-relaxed text-[#2E2236] whitespace-pre-line italic">
                  {doorData.letterBody}
                </div>

                <div className="text-right pt-4 text-xs font-serif text-[#4D3352] font-semibold italic">
                  With all my love ❤️
                </div>
              </div>
            </div>

            {/* Photo preview below letter */}
            {doorData.photo && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="w-full max-w-md aspect-[16/9] rounded-2xl overflow-hidden border border-[#F4C2C2]/30 shadow-xl"
              >
                <img
                  src={doorData.photo}
                  alt="A message photo"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            )}

            {/* Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              onClick={onNext}
              className="inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#4D3352] to-[#2E2236] border border-[#F4C2C2]/40 text-[#FFF1E6] text-xs uppercase tracking-[0.2em] font-medium shadow-md hover:border-[#F4C2C2] hover:shadow-[0_0_25px_rgba(244,194,194,0.3)] transition-all group"
            >
              <span>{doorData.buttonText || "I'M READY FOR THE NEXT ONE →"}</span>
              <ArrowRight className="w-4 h-4 text-[#F4C2C2] group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
