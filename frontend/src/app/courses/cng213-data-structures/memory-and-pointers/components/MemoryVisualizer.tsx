import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MemoryTimelineStep, MemoryCell } from '../../../../../lib/types/memory';
import { MemoryBlock } from './MemoryBlock';
import { ArrowRight } from 'lucide-react';

interface MemoryVisualizerProps {
  step: MemoryTimelineStep;
}

export const MemoryVisualizer: React.FC<MemoryVisualizerProps> = ({ step }) => {
  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Title & Explanation */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <h3 className="text-xl font-bold text-[#051F20] mb-2">{step.title}</h3>
        <p className="text-slate-600">{step.explanation}</p>
      </div>

      {/* Memory Areas */}
      <div className="flex flex-col lg:flex-row gap-8 min-h-[400px]">
        
        {/* STACK */}
        <div className="flex-1 bg-white/60 backdrop-blur rounded-2xl p-6 border-2 border-dashed border-[#8EB69B]/50 relative">
          <div className="absolute -top-3 left-6 bg-[#F4F7F5] px-3 font-bold text-slate-500 uppercase tracking-widest text-sm">
            Stack
          </div>
          
          <div className="flex flex-col gap-3 mt-4">
            <AnimatePresence>
              {step.stackCells.map(cell => (
                <MemoryBlock key={cell.id} cell={cell} />
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* HEAP */}
        <div className="flex-1 bg-white/60 backdrop-blur rounded-2xl p-6 border-2 border-dashed border-amber-300/50 relative">
          <div className="absolute -top-3 left-6 bg-[#F4F7F5] px-3 font-bold text-amber-600 uppercase tracking-widest text-sm">
            Heap
          </div>
          
          <div className="flex flex-col gap-3 mt-4">
            <AnimatePresence>
              {step.heapCells.length > 0 ? (
                step.heapCells.map(cell => (
                  <MemoryBlock key={cell.id} cell={cell} />
                ))
              ) : (
                <div className="h-full flex items-center justify-center text-slate-400 italic">
                  Heap Empty
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>

    </div>
  );
};
