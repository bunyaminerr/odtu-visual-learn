import React from 'react';
import { motion } from 'framer-motion';
import { MemoryCell } from '../../../../../lib/types/memory';

interface MemoryBlockProps {
  cell: MemoryCell;
  layoutId?: string;
}

export const MemoryBlock: React.FC<MemoryBlockProps> = ({ cell, layoutId }) => {
  return (
    <motion.div
      layoutId={layoutId}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative flex items-center justify-between w-full h-12 bg-white shadow-sm border ${
        cell.isHighlighted ? 'border-[#235347] ring-1 ring-[#235347]' : 'border-slate-200'
      } ${cell.isFree ? 'bg-slate-100 opacity-60 grayscale' : ''} mb-1 overflow-hidden font-mono text-sm`}
    >
      {/* Address Column */}
      <div className="flex items-center justify-center h-full px-3 bg-slate-50 border-r border-slate-200 text-slate-400 text-xs w-24 flex-shrink-0">
        {cell.address}
      </div>

      {/* Variable Name Column (if exists) */}
      <div className="flex items-center px-3 h-full border-r border-slate-100 text-[#235347] font-semibold w-20 flex-shrink-0 truncate">
        {cell.varName || ''}
      </div>

      {/* Value Column */}
      <div className="flex-1 flex items-center justify-center px-3 h-full text-[#051F20] truncate">
        {cell.value !== undefined ? String(cell.value) : <span className="text-slate-300 italic">garbage</span>}
      </div>

      {/* Type & Size Column */}
      <div className="flex flex-col justify-center items-end px-2 h-full bg-slate-50 border-l border-slate-200 text-[10px] text-slate-400 w-16 flex-shrink-0">
        <span>{cell.type}</span>
        <span>{cell.sizeBytes}B</span>
      </div>
    </motion.div>
  );
};
