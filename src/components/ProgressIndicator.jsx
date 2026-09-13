import React from 'react';
import { ArrowLeft } from 'lucide-react';

export const ProgressIndicator = ({
  currentStep,
  totalSteps = 5,
  completedDoors = [],
  onBackToRoom,
  showBackButton = false
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-6 py-4 flex items-center justify-between pointer-events-auto">
      {/* Left side */}
      <div className="flex items-center gap-3">
        {showBackButton ? (
          <button
            onClick={onBackToRoom}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#2E2236]/60 border border-[#F4C2C2]/30 text-[#FFF1E6] hover:border-[#F4C2C2] hover:bg-[#4D3352]/50 transition-all text-[11px] tracking-[0.2em] uppercase font-medium backdrop-blur-md shadow-md"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#F4C2C2]" />
            <span>Back to Room</span>
          </button>
        ) : (
          <div className="text-[11px] uppercase tracking-[0.3em] text-[#F4C2C2] font-serif italic">
            The 5 Doors
          </div>
        )}
      </div>

      {/* Right side progress counter */}
      <div className="flex items-center gap-4 bg-[#14111A]/80 border border-[#2E2236] px-4 py-2 rounded-full backdrop-blur-md shadow-sm">
        <span className="text-xs font-mono text-[#F4C2C2]">
          0{Math.min(currentStep, totalSteps)} / 0{totalSteps}
        </span>
        <div className="flex items-center gap-1.5">
          {Array.from({ length: totalSteps }).map((_, idx) => {
            const doorNum = idx + 1;
            const isCompleted = completedDoors.includes(doorNum);
            const isCurrent = currentStep === doorNum;

            return (
              <span
                key={idx}
                className={`w-2 h-2 rounded-full transition-all duration-500 ${
                  isCompleted
                    ? 'bg-[#F4C2C2] shadow-[0_0_8px_#F4C2C2]'
                    : isCurrent
                    ? 'bg-[#F9D5D6] scale-125 shadow-[0_0_8px_#F9D5D6]'
                    : 'bg-white/20'
                }`}
                title={`Door 0${doorNum}`}
              />
            );
          })}
        </div>
      </div>
    </header>
  );
};
