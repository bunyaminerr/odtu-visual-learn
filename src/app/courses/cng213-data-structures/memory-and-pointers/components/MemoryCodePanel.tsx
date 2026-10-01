import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MemoryCodePanelProps {
  code: string;
  activeLineIndex: number;
}

export const MemoryCodePanel: React.FC<MemoryCodePanelProps> = ({ code, activeLineIndex }) => {
  return (
    <div className="bg-[#1E1E1E] rounded-xl overflow-hidden shadow-lg h-full border border-slate-700/50 flex flex-col">
      <div className="bg-[#2D2D2D] px-4 py-2 border-b border-slate-700/50 flex items-center justify-between">
        <span className="text-slate-300 font-mono text-sm">cng213_code.c</span>
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500"></div>
          <div className="w-3 h-3 rounded-full bg-amber-500"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
        </div>
      </div>
      <div className="p-4 overflow-auto flex-1 text-sm font-mono leading-relaxed relative">
        <SyntaxHighlighter
          language="c"
          style={vscDarkPlus}
          customStyle={{ background: 'transparent', padding: 0, margin: 0 }}
          wrapLines={true}
          lineProps={(lineNumber: number) => {
            const isActive = lineNumber === activeLineIndex;
            return {
              style: {
                display: 'block',
                backgroundColor: isActive ? 'rgba(35, 83, 71, 0.4)' : 'transparent',
                borderLeft: isActive ? '3px solid #235347' : '3px solid transparent',
                paddingLeft: '10px'
              }
            };
          }}
          showLineNumbers={true}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};
