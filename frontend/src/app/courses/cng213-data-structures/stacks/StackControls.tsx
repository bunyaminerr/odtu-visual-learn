import React, { useState } from 'react';
import { CngStackImplementation, StackOpType } from '../../../../lib/types/stack';
import { Play, RotateCcw, Info } from 'lucide-react';

interface StackControlsProps {
  implementation: CngStackImplementation;
  setImplementation: (imp: CngStackImplementation) => void;
  activeOp: StackOpType;
  setActiveOp: (op: StackOpType) => void;
  onExecute: (val?: string) => void;
  activeLineIndex: number;
  explanation: string;
  cCode?: string;
  onReset: (capacity: number) => void;
}

export const StackControls: React.FC<StackControlsProps> = ({
  implementation,
  setImplementation,
  activeOp,
  setActiveOp,
  onExecute,
  activeLineIndex,
  explanation,
  cCode,
  onReset
}) => {
  const [inputValue, setInputValue] = useState('');
  const [capacityInput, setCapacityInput] = useState('5');

  const needsValue = activeOp === 'push';

  return (
    <div className="w-full lg:w-96 flex flex-col gap-4 h-full shrink-0">
      {/* Capacity Settings (Array only) */}
      {implementation === 'array' && (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Kapasite Ayarı</h3>
            <button 
              onClick={() => onReset(parseInt(capacityInput) || 5)}
              className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded transition-colors"
              title="Yeniden Başlat"
            >
              <RotateCcw size={14} />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="2" max="10"
              value={capacityInput}
              onChange={(e) => setCapacityInput(e.target.value)}
              className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>
      )}

      {/* Operation Panel */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider border-b border-slate-100 pb-2">İşlemler</h3>
        
        <div className="grid grid-cols-2 gap-2 mb-4">
          <button
            onClick={() => setActiveOp('push')}
            className={`py-2 px-3 rounded text-[11px] font-semibold transition-colors border ${
              activeOp === 'push' 
                ? 'bg-[#235347] border-[#163832] text-white' 
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            Push
          </button>
          <button
            onClick={() => setActiveOp('pop')}
            className={`py-2 px-3 rounded text-[11px] font-semibold transition-colors border ${
              activeOp === 'pop' 
                ? 'bg-rose-600 border-rose-700 text-white' 
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            Pop
          </button>
        </div>

        {needsValue && (
          <div className="mb-4">
            <label className="text-[10px] font-bold text-slate-400 mb-1 block">Değer (Value)</label>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>
        )}

        <button
          onClick={() => onExecute(inputValue)}
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#DAF1DE] hover:bg-[#c2e4c8] text-[#051F20] rounded-lg text-sm font-bold shadow-sm transition-colors"
        >
          <Play size={16} /> Çalıştır
        </button>
      </div>

    </div>
  );
};
