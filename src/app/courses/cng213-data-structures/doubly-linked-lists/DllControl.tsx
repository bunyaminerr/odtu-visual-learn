import React from 'react';
import { DllOperation, DNodeState } from '../../../../lib/types/dll';
import { Play, Copy, Check } from 'lucide-react';

interface DllControlProps {
  activeOp: DllOperation;
  setActiveOp: (op: DllOperation) => void;
  onExecute: (val?: number, index?: number, targetAddr?: string, direction?: 'forward' | 'backward') => void;
  activeLineIndex: number;
  explanation: string;
  cCode: string;
  nodes: DNodeState[];
}

export const DllControl: React.FC<DllControlProps> = ({
  activeOp,
  setActiveOp,
  onExecute,
  activeLineIndex,
  explanation,
  cCode,
  nodes
}) => {
  const [copied, setCopied] = React.useState(false);
  const [valInput, setValInput] = React.useState('42');
  const [indexValue, setIndexValue] = React.useState('1');
  const [targetAddress, setTargetAddress] = React.useState(nodes[0]?.address || '');
  const [direction, setDirection] = React.useState<'forward' | 'backward'>('forward');

  // Update default selected address if available and currently empty
  React.useEffect(() => {
    if (!targetAddress && nodes.length > 0) {
      setTargetAddress(nodes[0].address);
    }
  }, [nodes, targetAddress]);

  const handleCopy = () => {
    navigator.clipboard.writeText(cCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const codeLines = cCode.split('\n');

  // Input requirement checks
  const needsValue = ['insert_head', 'insert_tail', 'insert_index', 'insert_before', 'insert_after'].includes(activeOp);
  const needsIndex = ['insert_index', 'delete_index'].includes(activeOp);
  const needsTarget = ['insert_before', 'insert_after', 'delete_before', 'delete_after', 'delete_node'].includes(activeOp);

  return (
    <div className="w-full lg:w-96 flex flex-col gap-4 h-full">
      
      {/* Action Buttons */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">İşlem Seçimi</h3>
        
        <div className="space-y-4 mb-4">
          <div>
            <h4 className="text-[10px] font-bold text-slate-400 mb-1">EKLEME İŞLEMLERİ</h4>
            <div className="grid grid-cols-3 gap-1">
              <button onClick={() => setActiveOp('insert_head')} className={`px-1 py-1.5 rounded text-[11px] font-semibold transition-colors ${activeOp === 'insert_head' ? 'bg-[#235347] text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border'}`}>Başa</button>
              <button onClick={() => setActiveOp('insert_tail')} className={`px-1 py-1.5 rounded text-[11px] font-semibold transition-colors ${activeOp === 'insert_tail' ? 'bg-[#235347] text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border'}`}>Sona</button>
              <button onClick={() => setActiveOp('insert_index')} className={`px-1 py-1.5 rounded text-[11px] font-semibold transition-colors ${activeOp === 'insert_index' ? 'bg-[#235347] text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border'}`}>Index'e</button>
              <button onClick={() => setActiveOp('insert_before')} className={`col-span-1 px-1 py-1.5 rounded text-[11px] font-semibold transition-colors ${activeOp === 'insert_before' ? 'bg-[#235347] text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border'}`}>Öncesine</button>
              <button onClick={() => setActiveOp('insert_after')} className={`col-span-2 px-1 py-1.5 rounded text-[11px] font-semibold transition-colors ${activeOp === 'insert_after' ? 'bg-[#235347] text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border'}`}>Sonrasına</button>
            </div>
          </div>
          
          <div>
            <h4 className="text-[10px] font-bold text-slate-400 mb-1">SİLME İŞLEMLERİ</h4>
            <div className="grid grid-cols-3 gap-1">
              <button onClick={() => setActiveOp('delete_head')} className={`px-1 py-1.5 rounded text-[11px] font-semibold transition-colors ${activeOp === 'delete_head' ? 'bg-rose-600 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border'}`}>Baştan</button>
              <button onClick={() => setActiveOp('delete_tail')} className={`px-1 py-1.5 rounded text-[11px] font-semibold transition-colors ${activeOp === 'delete_tail' ? 'bg-rose-600 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border'}`}>Sondan</button>
              <button onClick={() => setActiveOp('delete_index')} className={`px-1 py-1.5 rounded text-[11px] font-semibold transition-colors ${activeOp === 'delete_index' ? 'bg-rose-600 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border'}`}>Index'i</button>
              <button onClick={() => setActiveOp('delete_before')} className={`col-span-1 px-1 py-1.5 rounded text-[11px] font-semibold transition-colors ${activeOp === 'delete_before' ? 'bg-rose-600 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border'}`}>Öncesini</button>
              <button onClick={() => setActiveOp('delete_after')} className={`col-span-1 px-1 py-1.5 rounded text-[11px] font-semibold transition-colors ${activeOp === 'delete_after' ? 'bg-rose-600 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border'}`}>Sonrasını</button>
              <button onClick={() => setActiveOp('delete_node')} className={`col-span-1 px-1 py-1.5 rounded text-[11px] font-semibold transition-colors ${activeOp === 'delete_node' ? 'bg-rose-600 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border'}`}>Kendisini</button>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-bold text-slate-400 mb-1">ÖZEL</h4>
            <div className="grid grid-cols-2 gap-1">
              <button onClick={() => setActiveOp('traverse')} className={`px-1 py-1.5 rounded text-[11px] font-semibold transition-colors ${activeOp === 'traverse' ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border'}`}>Gezinti (Traverse)</button>
              <button onClick={() => setActiveOp('reverse')} className={`px-1 py-1.5 rounded text-[11px] font-semibold transition-colors ${activeOp === 'reverse' ? 'bg-amber-600 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border'}`}>Ters Çevir (Reverse)</button>
            </div>
          </div>
        </div>

        {/* Dynamic Options Selection */}
        {(needsTarget || activeOp === 'traverse') && (
          <div className="bg-slate-50 p-2 rounded border border-slate-200 mb-4 space-y-2">
            {needsTarget && (
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 font-bold mb-1">Hedef Düğüm (X / Current)</span>
                <select 
                  value={targetAddress}
                  onChange={(e) => setTargetAddress(e.target.value)}
                  className="w-full p-1 bg-white border border-slate-200 rounded text-xs font-mono"
                >
                  {nodes.length === 0 && <option value="">(Liste Boş)</option>}
                  {nodes.map(n => <option key={n.id} value={n.address}>{n.address} (val: {n.val})</option>)}
                </select>
              </div>
            )}
            {activeOp === 'traverse' && (
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 font-bold mb-1">Yön (Direction)</span>
                <div className="flex gap-1">
                  <button onClick={() => setDirection('forward')} className={`flex-1 py-1 text-xs font-medium rounded border ${direction === 'forward' ? 'bg-white text-emerald-800 shadow-sm border-emerald-200' : 'bg-transparent text-slate-500 border-transparent hover:bg-slate-100'}`}>İleri</button>
                  <button onClick={() => setDirection('backward')} className={`flex-1 py-1 text-xs font-medium rounded border ${direction === 'backward' ? 'bg-white text-blue-800 shadow-sm border-blue-200' : 'bg-transparent text-slate-500 border-transparent hover:bg-slate-100'}`}>Geri</button>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="flex gap-2 items-center">
          {needsValue && (
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 font-bold ml-1">Değer</span>
              <input 
                type="number"
                value={valInput}
                onChange={(e) => setValInput(e.target.value)}
                className="w-16 px-2 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-center focus:outline-none focus:ring-2 focus:ring-[#8EB69B]"
              />
            </div>
          )}
          {needsIndex && (
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 font-bold ml-1">Index</span>
              <input 
                type="number"
                value={indexValue}
                onChange={(e) => setIndexValue(e.target.value)}
                className="w-16 px-2 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-center focus:outline-none focus:ring-2 focus:ring-[#8EB69B]"
                min="0"
              />
            </div>
          )}
          <button
            onClick={() => onExecute(needsValue ? parseInt(valInput) || 0 : undefined, needsIndex ? parseInt(indexValue) || 0 : undefined, targetAddress, direction)}
            className="flex-1 self-end h-[38px] flex items-center justify-center gap-2 bg-[#DAF1DE] hover:bg-[#c2e4c8] text-[#051F20] font-bold rounded-lg text-sm transition-colors shadow-sm"
          >
            <Play size={16} /> Başlat
          </button>
        </div>
      </div>

      {/* Mintlify C Terminal */}
      <div className="flex flex-col bg-[#051F20] border border-[#163832] rounded-xl overflow-hidden shadow-sm flex-1">
        <div className="flex justify-between items-center px-4 py-2 bg-[#031516] border-b border-[#163832]">
          <span className="text-slate-400 text-xs font-mono">dll_operations.c</span>
          <button onClick={handleCopy} className="flex items-center gap-1 text-slate-400 hover:text-white text-[10px] transition-colors">
            {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
            {copied ? "Kopyalandı" : "Kopyala"}
          </button>
        </div>
        
        <div className="p-4 text-[11px] font-mono text-[#DAF1DE] leading-relaxed overflow-y-auto">
          {codeLines.map((line, idx) => {
            const isActive = idx === activeLineIndex;
            return (
              <div 
                key={idx} 
                className={`flex items-start px-1 py-0.5 rounded transition-colors duration-200 ${
                  isActive ? 'bg-[#163832] text-white border-l-2 border-[#8EB69B] -ml-2 pl-2.5 font-bold shadow-inner' : 'border-l-2 border-transparent'
                }`}
              >
                <span className="w-5 flex-shrink-0 text-slate-500 select-none text-right pr-2">{idx + 1}</span>
                <span className="whitespace-pre">{line}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pedagogical Explanation Card */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <h4 className="text-[10px] font-bold text-slate-400 uppercase mb-2 flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-blue-500"></span> Analiz & Püf Nokta
        </h4>
        <div className="bg-slate-50 border border-slate-100 rounded-lg p-3">
          <p className="text-sm font-semibold text-[#051F20] leading-snug">{explanation || "İşlem seçin..."}</p>
        </div>
      </div>

    </div>
  );
};
