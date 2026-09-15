import React from 'react';
import { Play, Pause, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

interface TimeTravelControlsProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  onReset: () => void;
  onTogglePlay?: () => void;
  isPlaying?: boolean;
}

export const TimeTravelControls: React.FC<TimeTravelControlsProps> = ({
  currentStep,
  totalSteps,
  onNext,
  onPrev,
  onReset,
  onTogglePlay,
  isPlaying = false,
}) => {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white px-6 py-3 rounded-full shadow-lg border border-slate-200 z-50">
      <button
        onClick={onReset}
        className="p-2 text-slate-500 hover:text-[#235347] transition-colors rounded-full hover:bg-slate-50"
        title="Reset"
      >
        <RotateCcw size={20} />
      </button>

      <div className="h-6 w-px bg-slate-200 mx-2" />

      <button
        onClick={onPrev}
        disabled={currentStep === 0}
        className="p-2 text-slate-700 hover:text-[#235347] disabled:opacity-30 transition-colors rounded-full hover:bg-slate-50"
      >
        <ChevronLeft size={24} />
      </button>

      {onTogglePlay && (
        <button
          onClick={onTogglePlay}
          className="p-3 bg-[#235347] text-white hover:bg-[#1a3f36] transition-colors rounded-full shadow-md mx-2"
        >
          {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
        </button>
      )}

      <button
        onClick={onNext}
        disabled={currentStep === totalSteps - 1}
        className="p-2 text-slate-700 hover:text-[#235347] disabled:opacity-30 transition-colors rounded-full hover:bg-slate-50"
      >
        <ChevronRight size={24} />
      </button>

      <div className="h-6 w-px bg-slate-200 mx-2" />

      <div className="text-sm font-medium text-slate-500 font-mono w-16 text-center">
        {currentStep + 1} / {totalSteps}
      </div>
    </div>
  );
};
