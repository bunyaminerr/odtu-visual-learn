import React, { useState } from 'react';
import { TreeOperation } from '../../../../lib/types/tree';
import { Play, RotateCcw, Info } from 'lucide-react';

interface TreeControlProps {
  onSimulate: (op: TreeOperation, val: number) => void;
  onReset: () => void;
  explanation: string;
}

export const TreeControl: React.FC<TreeControlProps> = ({ onSimulate, onReset, explanation }) => {
  const [val, setVal] = useState<string>("42");

  return (
    <div className="w-full lg:w-96 flex flex-col gap-4 h-full shrink-0">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-2">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">İşlem Seçimi</h3>
          <button 
            onClick={onReset}
            className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded transition-colors"
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
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#8EB69B]"
          />
        </div>
        
        <div className="space-y-4">
          <div>
            <h4 className="text-[10px] font-bold text-slate-400 mb-1">EKLEME & SİLME</h4>
            <div className="grid grid-cols-2 gap-1">
              <button onClick={() => onSimulate('insert_recursive', parseInt(val) || 0)} className="px-2 py-1.5 bg-[#235347] text-white rounded text-[11px] font-semibold hover:bg-[#163832] transition-colors flex items-center justify-between"><span className="text-left">Insert (Rec)</span><Play size={10}/></button>
              <button onClick={() => onSimulate('insert_iterative', parseInt(val) || 0)} className="px-2 py-1.5 bg-[#235347] text-white rounded text-[11px] font-semibold hover:bg-[#163832] transition-colors flex items-center justify-between"><span className="text-left">Insert (Iter)</span><Play size={10}/></button>
              <button onClick={() => onSimulate('delete_iterative', parseInt(val) || 0)} className="px-2 py-1.5 bg-rose-600 text-white rounded text-[11px] font-semibold hover:bg-rose-700 transition-colors col-span-2 flex items-center justify-between"><span className="text-left">Delete (Iter)</span><Play size={10}/></button>
            </div>
          </div>
          
          <div>
            <h4 className="text-[10px] font-bold text-slate-400 mb-1">ARAMA (SEARCH)</h4>
            <div className="grid grid-cols-2 gap-1">
              <button onClick={() => onSimulate('find_iterative', parseInt(val) || 0)} className="px-2 py-1.5 bg-indigo-600 text-white rounded text-[11px] font-semibold hover:bg-indigo-700 transition-colors col-span-2 flex items-center justify-between"><span className="text-left">Find (Generic)</span><Play size={10}/></button>
              <button onClick={() => onSimulate('find_min_iterative', parseInt(val) || 0)} className="px-2 py-1.5 bg-indigo-500 text-white rounded text-[11px] font-semibold hover:bg-indigo-600 transition-colors flex items-center justify-between"><span className="text-left">Min (Iter)</span><Play size={10}/></button>
              <button onClick={() => onSimulate('find_max_iterative', parseInt(val) || 0)} className="px-2 py-1.5 bg-indigo-500 text-white rounded text-[11px] font-semibold hover:bg-indigo-600 transition-colors flex items-center justify-between"><span className="text-left">Max (Iter)</span><Play size={10}/></button>
              <button onClick={() => onSimulate('find_min_recursive', parseInt(val) || 0)} className="px-2 py-1.5 bg-indigo-500 text-white rounded text-[11px] font-semibold hover:bg-indigo-600 transition-colors flex items-center justify-between"><span className="text-left">Min (Rec)</span><Play size={10}/></button>
              <button onClick={() => onSimulate('find_max_recursive', parseInt(val) || 0)} className="px-2 py-1.5 bg-indigo-500 text-white rounded text-[11px] font-semibold hover:bg-indigo-600 transition-colors flex items-center justify-between"><span className="text-left">Max (Rec)</span><Play size={10}/></button>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-bold text-slate-400 mb-1">GEZİNTİ (TRAVERSAL)</h4>
            <div className="grid grid-cols-2 gap-1">
              <button onClick={() => onSimulate('traverse_preorder', 0)} className="px-2 py-1.5 bg-amber-600 text-white rounded text-[11px] font-semibold hover:bg-amber-700 transition-colors">Pre-order</button>
              <button onClick={() => onSimulate('traverse_inorder', 0)} className="px-2 py-1.5 bg-amber-600 text-white rounded text-[11px] font-semibold hover:bg-amber-700 transition-colors">In-order</button>
              <button onClick={() => onSimulate('traverse_postorder', 0)} className="px-2 py-1.5 bg-amber-600 text-white rounded text-[11px] font-semibold hover:bg-amber-700 transition-colors">Post-order</button>
              <button onClick={() => onSimulate('traverse_level', 0)} className="px-2 py-1.5 bg-amber-600 text-white rounded text-[11px] font-semibold hover:bg-amber-700 transition-colors">Level-order</button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex gap-2 text-slate-600 bg-slate-50 p-3 rounded-xl text-xs leading-relaxed border border-slate-100 mt-auto">
        <Info size={16} className="text-[#8EB69B] shrink-0 mt-0.5" />
        <p>{explanation}</p>
      </div>
    </div>
  );
};
