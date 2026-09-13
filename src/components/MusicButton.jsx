import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const MusicButton = ({ isPlaying, onToggle }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={onToggle}
        className={`group relative flex items-center gap-2.5 px-4 py-3 rounded-full border transition-all duration-300 ${
          isPlaying
            ? 'bg-[#2E2236]/70 border-[#F4C2C2]/50 text-[#FFF1E6] shadow-[0_0_20px_rgba(244,194,194,0.25)]'
            : 'bg-[#14111A]/70 border-[#2E2236] text-[#FFF1E6]/50 hover:text-[#FFF1E6]'
        } backdrop-blur-md`}
        title={isPlaying ? "Mute Background Music" : "Play Background Music"}
      >
        <div className="relative flex items-center justify-center">
          {isPlaying ? (
            <Volume2 className="w-4 h-4 text-[#F4C2C2] animate-pulse" />
          ) : (
            <VolumeX className="w-4 h-4 text-gray-500" />
          )}

          {isPlaying && (
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F9D5D6] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F4C2C2]"></span>
            </span>
          )}
        </div>

        <span className="text-[10px] uppercase tracking-[0.2em] font-medium">
          {isPlaying ? 'Music ON' : 'Music OFF'}
        </span>
      </button>
    </div>
  );
};
