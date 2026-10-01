import React, { useState } from 'react';
import { AlgorithmType } from '../../../../lib/types/sorting';
import 'katex/dist/katex.min.css';
import { Info } from 'lucide-react';

interface ControlPanelProps {
  algorithm: AlgorithmType;
  setAlgorithm: (algo: AlgorithmType) => void;
  onRandomize: (size?: number) => void;
  onCustomArray: (arr: number[]) => void;
  explanation: string;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  algorithm,
  setAlgorithm,
  onRandomize,
  onCustomArray,
  explanation,
}) => {
  const [sizeInput, setSizeInput] = useState('15');
  const [customArrInput, setCustomArrInput] = useState('');

  const getComplexity = (algo: AlgorithmType) => {
    switch (algo) {
      case 'selection': return { best: 'O(n^2)', worst: 'O(n^2)' };
      case 'insertion': return { best: 'O(n)', worst: 'O(n^2)' };
      case 'bubble': return { best: 'O(n)', worst: 'O(n^2)' };
      case 'merge': return { best: 'O(n \log n)', worst: 'O(n \log n)' };
      case 'quick': return { best: 'O(n \log n)', worst: 'O(n^2)' };
      case 'linear': return { best: 'O(1)', worst: 'O(n)' };
      case 'binary': return { best: 'O(1)', worst: 'O(\log n)' };
      default: return { best: '', worst: '' };
    }
  };

  const { best, worst } = getComplexity(algorithm);

  return (
    <div className="w-full lg:w-80 flex flex-col gap-4 h-full shrink-0">
      
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Algoritma Seçimi</h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="text-[10px] font-bold text-slate-400 mb-1">SIRALAMA</h4>
            <div className="grid grid-cols-2 gap-1">
              {(['selection', 'insertion', 'bubble', 'merge', 'quick'] as AlgorithmType[]).map(algo => (
                <button
                  key={algo}
                  onClick={() => setAlgorithm(algo)}
                  className={`text-left px-2 py-1.5 rounded text-[11px] font-semibold transition-colors ${
                    algorithm === algo
                      ? 'bg-[#235347] text-white shadow-sm'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-100'
                  } ${algo === 'quick' ? 'col-span-2' : ''}`}
                >
                  {algo.charAt(0).toUpperCase() + algo.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-bold text-slate-400 mb-1">ARAMA</h4>
            <div className="grid grid-cols-2 gap-1">
              {(['linear', 'binary'] as AlgorithmType[]).map(algo => (
                <button
                  key={algo}
                  onClick={() => setAlgorithm(algo)}
                  className={`text-left px-2 py-1.5 rounded text-[11px] font-semibold transition-colors ${
                    algorithm === algo
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-100'
                  }`}
                >
                  {algo.charAt(0).toUpperCase() + algo.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          <div className="pt-2 border-t border-slate-100 mt-2">
            <h4 className="text-[10px] font-bold text-slate-400 mb-2">DİZİ AYARLARI</h4>
            
            {/* Randomize with Size */}
            <div className="flex gap-2 mb-3">
              <input 
                type="number"
                min="2" max="50"
                value={sizeInput}
                onChange={(e) => setSizeInput(e.target.value)}
                className="w-16 px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-xs font-bold text-center focus:outline-none focus:ring-1 focus:ring-[#8EB69B]"
                placeholder="Boyut"
              />
              <button
                onClick={() => onRandomize(parseInt(sizeInput) || 15)}
                className="flex-1 bg-[#DAF1DE] hover:bg-[#c2e4c8] text-[#051F20] font-bold py-1.5 rounded-md text-[11px] transition-colors shadow-sm"
              >
                Rastgele Üret
              </button>
            </div>

            {/* Custom Array Input */}
            <div className="flex flex-col gap-1.5">
              <input
                type="text"
                value={customArrInput}
                onChange={(e) => setCustomArrInput(e.target.value)}
                placeholder="Örn: 5, 2, 9, 1"
                className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-xs font-mono focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
              <button
                onClick={() => {
                  const arr = customArrInput.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
                  if(arr.length > 0) {
                     onCustomArray(arr);
                     setSizeInput(arr.length.toString());
                  }
                }}
                className="w-full bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold py-1.5 rounded-md text-[11px] transition-colors shadow-sm"
              >
                Kendi Dizimi Kullan
              </button>
            </div>
          </div>

        </div>
      </div>

      <div className="flex gap-2 text-slate-600 bg-slate-50 p-3 rounded-xl text-xs leading-relaxed border border-slate-100 mt-auto">
        <Info size={16} className="text-[#8EB69B] shrink-0 mt-0.5" />
        <p>{explanation || "Hazırlanıyor..."}</p>
      </div>

    </div>
  );
};
