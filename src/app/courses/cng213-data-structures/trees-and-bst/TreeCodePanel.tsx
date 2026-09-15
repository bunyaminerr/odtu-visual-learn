"use client";

import React, { useEffect, useRef } from 'react';

interface TreeCodePanelProps {
  code: string;
  activeLine: number;
}

export const TreeCodePanel: React.FC<TreeCodePanelProps> = ({ code, activeLine }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const activeLineEl = activeLineRef.current;
    
    if (container && activeLineEl) {
      const containerHeight = container.clientHeight;
      const elementOffsetTop = activeLineEl.offsetTop;
      const elementHeight = activeLineEl.clientHeight;
      
      container.scrollTo({
        top: elementOffsetTop - (containerHeight / 2) + (elementHeight / 2),
        behavior: 'smooth'
      });
    }
  }, [activeLine]);

  const lines = code.split('\n');

  return (
    <div className="bg-[#051F20] rounded-2xl overflow-hidden shadow-lg border border-slate-700/50 flex flex-col">
      <div className="flex items-center px-4 py-2 border-b border-slate-700/50 bg-[#0A2729]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-slate-600"></div>
          <div className="w-3 h-3 rounded-full bg-slate-600"></div>
          <div className="w-3 h-3 rounded-full bg-slate-600"></div>
        </div>
        <span className="ml-4 text-xs font-medium text-slate-400 font-mono">tree_operations.c</span>
      </div>
      
      <div 
        ref={containerRef}
        className="p-4 overflow-y-auto font-mono text-sm max-h-[250px]"
      >
        <div className="flex flex-col">
          {lines.map((line, index) => {
            const isLineActive = index + 1 === activeLine;
            return (
              <div 
                key={index}
                ref={isLineActive ? activeLineRef : null}
                className={`flex items-start px-2 py-0.5 rounded transition-colors duration-200 ${
                  isLineActive 
                    ? 'bg-[#235347]/40 border-l-2 border-emerald-400' 
                    : 'border-l-2 border-transparent hover:bg-white/5'
                }`}
              >
                <span className="w-8 shrink-0 text-slate-500 select-none text-right pr-4">
                  {index + 1}
                </span>
                <span className={`whitespace-pre ${isLineActive ? 'text-emerald-100' : 'text-slate-300'}`}>
                  {line || ' '}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
