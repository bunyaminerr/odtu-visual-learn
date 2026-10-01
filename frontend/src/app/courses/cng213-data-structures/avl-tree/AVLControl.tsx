import React, { useState } from 'react';
import { Play, RotateCcw, Info } from 'lucide-react';
import { AVLOperation } from '../../../../lib/types/avl';

interface AVLControlProps {
  onSimulate: (op: AVLOperation, val: number) => void;
  onReset: () => void;
  isAnimating: boolean;
}

export const AVLControl: React.FC<AVLControlProps> = ({
  onSimulate,
  onReset,
  isAnimating
}) => {
  const [val, setVal] = useState('');

  return (
    <div className="w-full lg:w-96 flex flex-col gap-4 h-full shrink-0">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-2">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">İşlem Seçimi</h3>
          <button 
            onClick={onReset}
            disabled={isAnimating}
            className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded transition-colors disabled:opacity-50"
            title="Ağacı Sıfırla"
          >
            <RotateCcw size={14} />
          </button>
        </div>

        <div className="mb-4">
          <label className="text-[10px] font-bold text-slate-400 mb-1 block">Değer (Value)</label>
          <input
            type="number"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            disabled={isAnimating}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#8EB69B]"
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
                onClick={() => { if(val) { onSimulate('delete', parseInt(val)); setVal(''); } }} 
                disabled={isAnimating || !val}
                className="px-2 py-1.5 bg-rose-600 text-white rounded text-[11px] font-semibold hover:bg-rose-700 transition-colors flex items-center justify-between disabled:opacity-50"
              >
                <span className="text-left">Delete</span><Play size={10}/>
              </button>
            </div>
          </div>
          
          <div>
            <h4 className="text-[10px] font-bold text-slate-400 mb-1">ARAMA (SEARCH)</h4>
            <div className="grid grid-cols-2 gap-1">
              <button 
                onClick={() => { if(val) { onSimulate('find', parseInt(val)); setVal(''); } }} 
                disabled={isAnimating || !val}
                className="px-2 py-1.5 bg-indigo-600 text-white rounded text-[11px] font-semibold hover:bg-indigo-700 transition-colors col-span-2 flex items-center justify-between disabled:opacity-50"
              >
                <span className="text-left">Find</span><Play size={10}/>
              </button>
              <button 
                onClick={() => onSimulate('find_min', 0)}
                disabled={isAnimating}
                className="px-2 py-1.5 bg-indigo-500 text-white rounded text-[11px] font-semibold hover:bg-indigo-600 transition-colors flex items-center justify-between disabled:opacity-50"
              >
                <span className="text-left">Min</span><Play size={10}/>
              </button>
              <button 
                onClick={() => onSimulate('find_max', 0)}
                disabled={isAnimating}
                className="px-2 py-1.5 bg-indigo-500 text-white rounded text-[11px] font-semibold hover:bg-indigo-600 transition-colors flex items-center justify-between disabled:opacity-50"
              >
                <span className="text-left">Max</span><Play size={10}/>
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-bold text-slate-400 mb-1">AĞAÇ ANALİZİ (ANALYSIS)</h4>
            <div className="grid grid-cols-2 gap-1">
              <button 
                onClick={() => onSimulate('tree_height', 0)} 
                disabled={isAnimating}
                className="col-span-2 px-2 py-1.5 bg-amber-600 text-white rounded text-[11px] font-semibold hover:bg-amber-700 transition-colors disabled:opacity-50"
              >
                Yükseklik
              </button>
              <button 
                onClick={() => onSimulate('is_avl', 0)} 
                disabled={isAnimating}
                className="px-2 py-1.5 bg-amber-500 text-white rounded text-[11px] font-semibold hover:bg-amber-600 transition-colors disabled:opacity-50"
              >
                Is AVL?
              </button>
              <button 
                onClick={() => onSimulate('count_nodes', 0)} 
                disabled={isAnimating}
                className="px-2 py-1.5 bg-amber-500 text-white rounded text-[11px] font-semibold hover:bg-amber-600 transition-colors disabled:opacity-50"
              >
                Düğüm (N)
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex gap-2 text-slate-600 bg-slate-50 p-3 rounded-xl text-xs leading-relaxed border border-slate-100 mt-auto">
        <Info size={16} className="text-[#8EB69B] shrink-0 mt-0.5" />
        <p>Denge (Balance) sağlayan İkili Arama Ağacı (BST). Yükseklik farkı 2 olduğunda rotasyon yapılır.</p>
      </div>
    </div>
  );
};
