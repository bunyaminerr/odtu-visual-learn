import React, { useState } from 'react';
import { Play, RotateCcw, Info } from 'lucide-react';
import { HeapOperation, HeapMode } from '../../../../lib/types/heap';

interface HeapControlProps {
  onSimulate: (op: HeapOperation, val: number, arr?: number[]) => void;
  onReset: () => void;
  isAnimating: boolean;
  mode: HeapMode;
  onModeChange: (mode: HeapMode) => void;
}

export const HeapControl: React.FC<HeapControlProps> = ({
  onSimulate,
  onReset,
  isAnimating,
  mode,
  onModeChange
}) => {
  const [val, setVal] = useState('');
  const [arrStr, setArrStr] = useState('92,47,21,20,12,45,63');

  return (
    <div className="w-full lg:w-96 flex flex-col gap-4 h-full shrink-0">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-2">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">İşlem Seçimi</h3>
          <button 
            onClick={onReset}
            disabled={isAnimating}
            className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded transition-colors disabled:opacity-50"
            title="Heap'i Sıfırla"
          >
            <RotateCcw size={14} />
          </button>
        </div>

        {/* Mode Toggle */}
        <div className="flex bg-slate-100 p-1 rounded-lg mb-4">
          <button
            disabled={isAnimating}
            onClick={() => onModeChange('min')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${mode === 'min' ? 'bg-white shadow text-slate-800' : 'text-slate-500 hover:bg-slate-200'}`}
          >
            Min-Heap
          </button>
          <button
            disabled={isAnimating}
            onClick={() => onModeChange('max')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${mode === 'max' ? 'bg-white shadow text-slate-800' : 'text-slate-500 hover:bg-slate-200'}`}
          >
            Max-Heap
          </button>
        </div>

        <div className="mb-4">
          <label className="text-[10px] font-bold text-slate-400 mb-1 block">Değer (Value)</label>
          <input
            type="number"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={isAnimating}
          />
        </div>
        
        <div className="space-y-4">
          <div>
            <h4 className="text-[10px] font-bold text-slate-400 mb-1">TEMEL İŞLEMLER</h4>
            <div className="grid grid-cols-2 gap-1">
              <button 
                onClick={() => { if(val) { onSimulate('insert', parseInt(val)); setVal(''); } }} 
                disabled={isAnimating || !val}
                className="px-2 py-1.5 bg-[#235347] text-white rounded text-[11px] font-semibold hover:bg-[#163832] transition-colors flex items-center justify-between disabled:opacity-50"
              >
                <span className="text-left">Insert</span><Play size={10}/>
              </button>
              <button 
                onClick={() => onSimulate('delete', 0)}
                disabled={isAnimating}
                className="px-2 py-1.5 bg-rose-600 text-white rounded text-[11px] font-semibold hover:bg-rose-700 transition-colors flex items-center justify-between disabled:opacity-50"
              >
                <span className="text-left">Delete {mode === 'min' ? 'Min' : 'Max'}</span><Play size={10}/>
              </button>
            </div>
          </div>
          
          <div>
            <h4 className="text-[10px] font-bold text-slate-400 mb-1">BUILD HEAP (Toplu)</h4>
            <div className="flex flex-col gap-1">
              <input
                type="text"
                value={arrStr}
                onChange={(e) => setArrStr(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="10,20,30"
                disabled={isAnimating}
              />
              <button 
                onClick={() => {
                  const arr = arrStr.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
                  if(arr.length > 0) onSimulate('heapify', 0, arr);
                }}
                disabled={isAnimating || !arrStr}
                className="w-full flex items-center justify-between px-2 py-1.5 bg-amber-600 text-white rounded-lg text-[11px] font-semibold hover:bg-amber-700 transition-colors disabled:opacity-50"
              >
                <span className="text-left">Build Heap</span><Play size={10}/>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex gap-2 text-slate-600 bg-slate-50 p-3 rounded-xl text-xs leading-relaxed border border-slate-100 mt-auto">
        <Info size={16} className="text-[#8EB69B] shrink-0 mt-0.5" />
        <p>Dizi tabanlı Heap yapısı. Min-Heap kökte en küçük, Max-Heap kökte en büyük değeri tutar.</p>
      </div>
    </div>
  );
};
