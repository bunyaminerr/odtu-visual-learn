import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrayElement } from '../../../../lib/types/sorting';

interface SortingVisualizerProps {
  elements: ArrayElement[];
}

export const SortingVisualizer: React.FC<SortingVisualizerProps> = ({ elements }) => {
  // Find the maximum value to scale the bars relative to container height
  const maxVal = Math.max(...elements.map(e => e.value), 10); // Ensure at least 10 so bars don't disappear

  const getColorClass = (state: ArrayElement['state']) => {
    switch (state) {
      case 'comparing': return 'bg-amber-300 border-amber-400 text-amber-900'; // Adaçayı sarısı/amber
      case 'swapping': return 'bg-[#235347] border-[#163832] text-white shadow-lg z-10 scale-110'; // Zümrüt yeşili
      case 'sorted': return 'bg-emerald-600 border-emerald-700 text-white shadow-sm'; // Kalıcı yeşil
      default: return 'bg-white border-slate-200 text-[#051F20]'; // Beyaz kart
    }
  };

  return (
    <div className="w-full h-full flex items-end justify-center gap-2 p-2">
      <AnimatePresence mode="popLayout">
        {elements.map((el) => {
          // Let's use a minimum percentage and a larger minHeight so the number doesn't disappear
          const heightPercent = Math.max(15, (el.value / maxVal) * 85); 

          return (
            <motion.div
              key={el.id}
              layoutId={el.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
                mass: 0.5
              }}
              className={`relative flex flex-col justify-end items-center w-10 sm:w-14 rounded-t-xl border-t border-x overflow-hidden transition-colors duration-300 ${getColorClass(el.state)}`}
              style={{ height: `${heightPercent}%`, minHeight: '4rem' }}
            >
              <span className="font-bold font-mono text-lg mb-2">{el.value}</span>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
