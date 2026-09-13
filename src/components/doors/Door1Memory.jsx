import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Calendar, ArrowRight } from 'lucide-react';

export const Door1Memory = ({ doorData, onNext }) => {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const photos = doorData.photos || ["/photos/photo1.jpeg", "/photos/photo2.jpeg"];

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-24 z-10 overflow-hidden">
      {/* Soft Pastel Backlight */}
      <div className="absolute w-[650px] h-[650px] bg-radial from-[#F4C2C2]/20 via-[#D8BBFF]/10 to-transparent blur-3xl pointer-events-none rounded-full" />

      {/* Main Glass Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 25 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl w-full glass-card rounded-3xl p-6 md:p-12 relative z-10 border border-[#F4C2C2]/30 shadow-warm-shadow"
      >
        {/* Header Ribbon */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#F4C2C2]/20">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-serif font-bold text-[#F4C2C2]">
              {doorData.number}
            </span>
            <span className="text-xs uppercase tracking-[0.3em] text-[#F9D5D6] font-semibold">
              {doorData.title}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#FFF1E6]/80 font-serif italic">
            <Calendar className="w-3.5 h-3.5 text-[#F4C2C2]" />
            <span>{doorData.date}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Polaroid Frame Section */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="polaroid-frame w-full max-w-sm">
              <div className="w-full aspect-[4/5] rounded overflow-hidden relative group">
                <motion.img
                  key={activePhotoIndex}
                  initial={{ opacity: 0.3, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  src={photos[activePhotoIndex]}
                  alt="Cherished Memory"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="pt-3 flex items-center justify-between text-xs text-[#2E2236] font-serif italic">
                <span className="font-medium tracking-wide">Do you remember this?</span>
                <Heart className="w-3.5 h-3.5 text-[#4D3352] fill-[#4D3352]" />
              </div>
            </div>

            {/* Switcher dots */}
            {photos.length > 1 && (
              <div className="flex items-center gap-2 mt-5">
                {photos.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActivePhotoIndex(idx)}
                    className={`h-2 rounded-full transition-all ${
                      activePhotoIndex === idx
                        ? 'bg-[#F4C2C2] w-6'
                        : 'bg-white/20 hover:bg-white/40 w-2'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Text Content */}
          <div className="lg:col-span-6 flex flex-col justify-center gap-6">
            <span className="text-xs font-serif italic text-[#F4C2C2] uppercase tracking-[0.2em]">
              "{doorData.tagline}"
            </span>

            <blockquote className="text-2xl md:text-3xl font-serif font-normal text-[#FFF1E6] leading-snug border-l-2 border-[#F4C2C2] pl-4 italic">
              "{doorData.quote}"
            </blockquote>

            <p className="text-sm text-[#FFF1E6]/85 leading-relaxed font-light">
              {doorData.description}
            </p>

            {/* Next Button */}
            <div className="pt-2">
              <button
                onClick={onNext}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#4D3352] to-[#2E2236] border border-[#F4C2C2]/40 text-[#FFF1E6] text-xs uppercase tracking-[0.2em] font-medium shadow-md hover:border-[#F4C2C2] hover:shadow-[0_0_25px_rgba(244,194,194,0.3)] transition-all group"
              >
                <span>NEXT DOOR →</span>
                <ArrowRight className="w-4 h-4 text-[#F4C2C2] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
