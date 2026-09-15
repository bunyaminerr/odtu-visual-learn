import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrayElement, SortingFrame } from '../../../../lib/types/sorting';
import { ChevronDown } from 'lucide-react';

interface SearchingVisualizerProps {
  elements: ArrayElement[];
  frame: SortingFrame;
}

export const SearchingVisualizer: React.FC<SearchingVisualizerProps> = ({ elements, frame }) => {
  const getColorClass = (state: ArrayElement['state']) => {
    switch (state) {
      case 'comparing': return 'bg-amber-300 border-amber-400 text-amber-900 shadow-md ring-2 ring-amber-400 scale-105 z-10'; 
      case 'found': return 'bg-emerald-600 border-emerald-700 text-white shadow-lg ring-2 ring-emerald-400 scale-110 z-20';
      case 'eliminated': return 'bg-slate-100 border-slate-200 text-slate-300 opacity-40 grayscale';
      default: return 'bg-white border-slate-200 text-[#051F20]'; 
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-6 p-2">
      
      {/* Pointers Overlay (Low, Mid, High) */}
      <div className="flex w-full justify-center gap-2 relative h-12">
        {elements.map((el, idx) => (
          <div key={`ptr-${idx}`} className="w-16 flex flex-col items-center justify-end relative">
             <AnimatePresence>
               {frame.low === idx && (
                 <motion.div initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}} exit={{opacity:0}} className="absolute top-0 text-slate-500 flex flex-col items-center font-bold text-xs">
                   <span>L</span>
                   <ChevronDown size={16} />
                 </motion.div>
               )}
               {frame.high === idx && (
                 <motion.div initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}} exit={{opacity:0}} className="absolute top-0 text-slate-500 flex flex-col items-center font-bold text-xs">
                   <span>H</span>
                   <ChevronDown size={16} />
                 </motion.div>
               )}
               {frame.mid === idx && (
                 <motion.div initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}} exit={{opacity:0}} className="absolute top-0 text-amber-600 flex flex-col items-center font-bold text-xs">
                   <span>M</span>
                   <ChevronDown size={16} />
                 </motion.div>
               )}
             </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Array Boxes */}
      <div className="flex flex-wrap justify-center gap-2 max-w-4xl">
        <AnimatePresence mode="popLayout">
          {elements.map((el, index) => (
            <div key={el.id} className="flex flex-col items-center gap-1">
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className={`flex items-center justify-center w-16 h-16 rounded-xl border-2 font-bold font-mono text-xl transition-all duration-500 ${getColorClass(el.state)}`}
              >
                {el.value}
              </motion.div>
              {/* Indices */}
              <span className="text-xs text-slate-400 font-mono">{index}</span>
            </div>
          ))}
        </AnimatePresence>
      </div>
      
    </div>
  );
};
