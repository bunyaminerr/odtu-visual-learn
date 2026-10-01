import React, { useState } from 'react';
import { AlgorithmType } from '../../../../lib/types/sorting';
import { algorithmDictionary } from '../../../../lib/algorithms/algorithmMetadata';
import { Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { BlockMath } from 'react-katex';

interface AlgorithmCodePanelProps {
  algorithm: AlgorithmType;
  activeLineIndex: number;
}

export const AlgorithmCodePanel: React.FC<AlgorithmCodePanelProps> = ({ algorithm, activeLineIndex }) => {
  const metadata = algorithmDictionary[algorithm];
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  if (!metadata) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(metadata.cCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const codeLines = metadata.cCode.split('\n');

  return (
    <div className="w-full mt-6 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden font-sans">
      
      {/* Header / Toggle */}
      <div 
        className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <h3 className="text-[#051F20] font-bold text-lg">{metadata.title} Kodu & Analizi</h3>
          <span className="text-xs bg-[#235347] text-white px-2 py-1 rounded-md shadow-sm">C / C++</span>
        </div>
        <button className="p-1 text-slate-400 hover:text-slate-700">
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>

      {isExpanded && (
        <div className="flex flex-col lg:flex-row min-h-[400px] lg:h-[450px]">
          
          {/* Left Column: Code Editor */}
          <div className="flex-1 flex flex-col bg-[#051F20] border-r border-slate-200 lg:w-1/2 overflow-hidden">
            {/* Editor Header */}
            <div className="flex justify-between items-center px-4 py-2 bg-[#031516] border-b border-[#163832]">
              <span className="text-slate-400 text-xs font-mono">{metadata.id}_sort.c</span>
              <button 
                onClick={handleCopy}
                className="flex items-center gap-1 text-slate-400 hover:text-white text-xs transition-colors"
              >
                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                {copied ? "Kopyalandı" : "Kopyala"}
              </button>
            </div>
            
            {/* Editor Body */}
            <div className="flex-1 overflow-y-auto p-4 text-xs font-mono text-[#DAF1DE] leading-relaxed">
              {codeLines.map((line, idx) => {
                const isActive = idx === activeLineIndex;
                return (
                  <div 
                    key={idx} 
                    className={`flex items-start px-2 py-0.5 rounded transition-colors duration-200 ${
                      isActive ? 'bg-[#163832] text-white border-l-2 border-[#8EB69B] -ml-2 pl-3.5 font-bold shadow-inner' : 'border-l-2 border-transparent'
                    }`}
                  >
                    <span className="w-8 flex-shrink-0 text-slate-500 select-none text-right pr-3">{idx + 1}</span>
                    <span className="whitespace-pre">{line}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Deep Analysis (Code Walkthrough) */}
          <div className="flex-1 flex flex-col bg-white overflow-y-auto lg:w-1/2 p-6 gap-6">
            
            {/* Invariants */}
            <section>
              <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                Döngü & İndeks Mantığı
              </h4>
              <ul className="space-y-2">
                {metadata.invariants.map((inv, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="text-slate-400 mt-0.5">•</span>
                    <span>{inv}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Complexity Insight */}
            <section>
              <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                Karmaşıklık Analizi
              </h4>
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                <p className="text-sm text-slate-600 mb-3">{metadata.complexityInsight.text}</p>
                <div className="text-[#235347] font-semibold flex justify-center py-2 bg-white rounded-lg shadow-sm">
                  <BlockMath math={metadata.complexityInsight.formula} />
                </div>
              </div>
            </section>

            {/* Pitfalls */}
            <section>
              <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                ODTÜ Lab & Sınav Püf Noktaları
              </h4>
              <div className="space-y-3">
                {metadata.pitfalls.map((pitfall, idx) => (
                  <div key={idx} className="bg-rose-50 border border-rose-100 rounded-lg p-3 text-sm text-rose-800 flex items-start gap-2">
                    <span className="font-bold text-rose-400">!</span>
                    <span>{pitfall}</span>
                  </div>
                ))}
              </div>
            </section>

          </div>

        </div>
      )}
    </div>
  );
};
