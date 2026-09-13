import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Check, Sparkles, Key } from 'lucide-react';

export const DoorRoom = ({
  doorsData,
  completedDoors,
  activeDoorId,
  onSelectDoor,
}) => {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-20 z-10 overflow-hidden">
      {/* Soft pastel corridor backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#14111A] via-[#2E2236]/30 to-[#14111A] pointer-events-none" />

      {/* Header Room Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-14 relative z-10"
      >
        <span className="text-[11px] uppercase tracking-[0.35em] text-[#F4C2C2] font-medium block mb-2">
          The Gallery of 5 Doors
        </span>
        <h2 className="text-3xl md:text-5xl font-serif font-normal text-[#FFF1E6] tracking-tight">
          Choose a Door to Discover
        </h2>
        <p className="text-xs md:text-sm text-[#F9D5D6]/85 italic mt-2 font-serif">
          Each doorway reveals a chapter of my heart
        </p>
      </motion.div>

      {/* 5 Architectural Doors Container */}
      <div className="w-full max-w-7xl relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-5 justify-center items-stretch perspective-1200">
          {doorsData.map((door, index) => {
            const doorNumber = door.id;
            const isCompleted = completedDoors.includes(doorNumber);
            const isUnlocked = doorNumber === 1 || completedDoors.includes(doorNumber - 1);
            const isMiddle = doorNumber === 3;

            return (
              <motion.div
                key={door.id}
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: index * 0.12 }}
                onClick={() => isUnlocked && onSelectDoor(doorNumber)}
                className={`relative flex flex-col justify-between rounded-2xl p-5 md:p-6 border transition-all duration-500 group cursor-pointer ${
                  isMiddle ? 'lg:-translate-y-4 shadow-[0_20px_50px_rgba(0,0,0,0.85)]' : ''
                } ${
                  isCompleted
                    ? 'bg-gradient-to-b from-[#2E2236]/80 via-[#1E1726]/90 to-[#14111A] border-[#F4C2C2]/60 shadow-[0_15px_45px_rgba(244,194,194,0.18)]'
                    : isUnlocked
                    ? 'bg-gradient-to-b from-[#2E2236]/50 via-[#1A1422]/80 to-[#14111A] border-[#4D3352] hover:border-[#F4C2C2]/80 hover:shadow-[0_20px_50px_rgba(244,194,194,0.22)] hover:-translate-y-2'
                    : 'bg-[#14111A]/90 border-[#2E2236]/40 opacity-45 cursor-not-allowed filter grayscale-[40%]'
                } backdrop-blur-md min-h-[380px] md:min-h-[420px] overflow-hidden`}
              >
                {/* Soft pastel floor light leak when unlocked */}
                {isUnlocked && (
                  <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#F4C2C2]/25 via-[#F4C2C2]/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                )}

                {/* Top Door Header: Number & Status */}
                <div className="flex items-center justify-between relative z-10">
                  <span className="text-3xl md:text-4xl font-serif font-bold text-[#F4C2C2]/90 group-hover:text-[#FFF1E6] transition-colors">
                    {door.number}
                  </span>

                  <div>
                    {isCompleted ? (
                      <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded-full bg-[#F4C2C2]/20 border border-[#F4C2C2]/50 text-[#F4C2C2]">
                        <Check className="w-3 h-3" />
                        Discovered
                      </span>
                    ) : isUnlocked ? (
                      <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest font-medium px-2.5 py-1 rounded-full bg-[#D8E2DC]/15 border border-[#D8E2DC]/40 text-[#D8E2DC]">
                        <Key className="w-3 h-3 text-[#F4C2C2]" />
                        Unlocked
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest font-medium px-2.5 py-1 rounded-full bg-[#14111A] border border-[#2E2236] text-gray-500">
                        <Lock className="w-3 h-3" />
                        Locked
                      </span>
                    )}
                  </div>
                </div>

                {/* Door Model */}
                <div className="my-5 relative flex flex-col items-center justify-center flex-1 z-10">
                  <div className={`w-full max-w-[130px] h-[190px] rounded-t-full border-2 relative flex flex-col items-center justify-between p-3 transition-all duration-700 ${
                    isCompleted
                      ? 'border-[#F4C2C2] bg-gradient-to-b from-[#4D3352]/60 via-[#2E2236] to-[#14111A] shadow-[inset_0_2px_8px_rgba(244,194,194,0.3)]'
                      : isUnlocked
                      ? 'border-[#4D3352] group-hover:border-[#F4C2C2]/90 bg-gradient-to-b from-[#2E2236]/70 via-[#1E1726] to-[#14111A]'
                      : 'border-[#2E2236] bg-[#14111A]'
                  }`}>
                    {/* Inner Arch Panel Inset */}
                    <div className="w-full h-[65%] rounded-t-full border border-white/10 bg-[#14111A]/40 flex items-center justify-center p-2 relative shadow-inner">
                      {isUnlocked ? (
                        <Sparkles className="w-5 h-5 text-[#F4C2C2] group-hover:scale-125 transition-transform duration-500" />
                      ) : (
                        <Lock className="w-5 h-5 text-gray-600" />
                      )}
                    </div>

                    {/* Bottom Panel Inset */}
                    <div className="w-full h-[28%] rounded-sm border border-white/10 bg-[#14111A]/40 shadow-inner flex items-center justify-center">
                      <div className="w-[80%] h-[2px] bg-[#F4C2C2]/25" />
                    </div>

                    {/* Brass/Rose Knob */}
                    <div className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gradient-to-br from-[#FFF1E6] to-[#F4C2C2] shadow-[0_2px_5px_rgba(0,0,0,0.8),0_0_6px_rgba(244,194,194,0.4)]" />
                  </div>
                </div>

                {/* Bottom Door Titles */}
                <div className="relative z-10 text-center">
                  <h3 className="text-base md:text-lg font-serif font-normal text-[#FFF1E6] tracking-wider uppercase group-hover:text-[#F4C2C2] transition-colors">
                    {door.title}
                  </h3>
                  <p className="text-[11px] text-[#F9D5D6]/80 mt-1 font-serif italic truncate">
                    {door.tagline}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
