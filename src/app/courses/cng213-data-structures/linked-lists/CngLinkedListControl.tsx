import React from 'react';
import { CngOperationType } from '../../../../lib/types/cng213LinkedList';
import { cng213Algorithms } from '../../../../lib/algorithms/cng213AlgorithmMetadata';
import { Play, SkipForward, Copy, Check } from 'lucide-react';

interface CngLinkedListControlProps {
  activeOp: CngOperationType;
  setActiveOp: (op: CngOperationType) => void;
  onExecute: (val?: number, index?: number) => void;
  activeLineIndex: number;
  explanation: string;
}

export const CngLinkedListControl: React.FC<CngLinkedListControlProps> = ({
  activeOp,
  setActiveOp,
  onExecute,
  activeLineIndex,
  explanation
}) => {
  const metadata = cng213Algorithms[activeOp];
  const [copied, setCopied] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('42');
  const [indexValue, setIndexValue] = React.useState('1');

  const handleCopy = () => {
    navigator.clipboard.writeText(metadata.cCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const codeLines = metadata.cCode.split('\n');

  // Helper to determine if we need a value input
  const needsValue = ['insert_head', 'insert_end', 'insert_index', 'insert_sorted', 'delete', 'get_position_of_element'].includes(activeOp);
  // Helper to determine if we need an index input
  const needsIndex = ['insert_index', 'delete_index', 'get_element_at_position'].includes(activeOp);

  return (
    <div className="w-full lg:w-96 flex flex-col gap-4">
      
      {/* Action Buttons */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">İşlem Seçimi</h3>
        
        <div className="space-y-4 mb-4">
          <div>
            <h4 className="text-[10px] font-bold text-slate-400 mb-1">EKLEME İŞLEMLERİ</h4>
            <div className="grid grid-cols-3 gap-1">
              {['insert_head', 'insert_end', 'insert_index'].map((op) => (
                <button
                  key={op}
                  onClick={() => setActiveOp(op as CngOperationType)}
                  className={`px-1 py-1.5 rounded text-[11px] font-semibold transition-colors ${activeOp === op ? 'bg-[#235347] text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border'}`}
                >
                  {op === 'insert_head' ? 'Başa' : op === 'insert_end' ? 'Sona' : 'Index\'e'}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-[10px] font-bold text-slate-400 mb-1">SİLME İŞLEMLERİ</h4>
            <div className="grid grid-cols-3 gap-1">
              {['delete_head', 'delete_tail', 'delete_index', 'delete'].map((op) => (
                <button
                  key={op}
                  onClick={() => setActiveOp(op as CngOperationType)}
                  className={`px-1 py-1.5 rounded text-[11px] font-semibold transition-colors ${activeOp === op ? 'bg-rose-600 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border'}`}
                >
                  {op === 'delete_head' ? 'Baştan' : op === 'delete_tail' ? 'Sondan' : op === 'delete_index' ? 'Index\'i' : 'Değeri'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-bold text-slate-400 mb-1">ARAMA VE BİLGİ İŞLEMLERİ</h4>
            <div className="grid grid-cols-3 gap-1">
              {['get_element_at_position', 'get_position_of_element', 'head_of_list', 'tail_of_list', 'list_size', 'is_empty'].map((op) => (
                <button
                  key={op}
                  onClick={() => setActiveOp(op as CngOperationType)}
                  className={`px-1 py-1.5 rounded text-[10px] font-semibold transition-colors leading-tight ${activeOp === op ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border'}`}
                >
                  {op === 'get_element_at_position' ? 'Index Ara' : 
                   op === 'get_position_of_element' ? 'Değer Ara' : 
                   op === 'head_of_list' ? 'Head(İlk)' : 
                   op === 'tail_of_list' ? 'Tail(Son)' : 
                   op === 'list_size' ? 'Size' : 'Empty?'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-bold text-slate-400 mb-1">ÖZEL</h4>
            <div className="grid grid-cols-2 gap-1">
              <button
                onClick={() => setActiveOp('insert_sorted')}
                className={`px-1 py-1.5 rounded text-[11px] font-semibold transition-colors ${activeOp === 'insert_sorted' ? 'bg-amber-600 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border'}`}
              >
                Sıralı Ekle
              </button>
              <button
                onClick={() => setActiveOp('swap_first_two')}
                className={`px-1 py-1.5 rounded text-[11px] font-semibold transition-colors ${activeOp === 'swap_first_two' ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border'}`}
              >
                Takas (O(1))
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-2 items-center">
          {needsValue && (
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 font-bold ml-1">Değer</span>
              <input 
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
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
            onClick={() => onExecute(needsValue ? parseInt(inputValue) || 0 : undefined, needsIndex ? parseInt(indexValue) || 0 : undefined)}
            className="flex-1 self-end h-[38px] flex items-center justify-center gap-2 bg-[#DAF1DE] hover:bg-[#c2e4c8] text-[#051F20] font-bold rounded-lg text-sm transition-colors shadow-sm"
          >
            <Play size={16} /> Başlat
          </button>
        </div>
      </div>

      {/* Mintlify C Terminal */}
      <div className="flex flex-col bg-[#051F20] border border-[#163832] rounded-xl overflow-hidden shadow-sm">
        <div className="flex justify-between items-center px-4 py-2 bg-[#031516] border-b border-[#163832]">
          <span className="text-slate-400 text-xs font-mono">{activeOp}.c</span>
          <button onClick={handleCopy} className="flex items-center gap-1 text-slate-400 hover:text-white text-[10px] transition-colors">
            {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
            {copied ? "Kopyalandı" : "Kopyala"}
          </button>
        </div>
        
        <div className="p-4 text-[11px] font-mono text-[#DAF1DE] leading-relaxed max-h-64 overflow-y-auto">
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
        <p className="text-sm text-slate-600 mb-4">{metadata.explanation}</p>
        
        <div className="bg-slate-50 border border-slate-100 rounded-lg p-3">
          <h4 className="text-[10px] font-bold text-slate-400 uppercase mb-1">Adım Açıklaması</h4>
          <p className="text-sm font-semibold text-[#051F20] leading-snug">{explanation || "İşlem seçin..."}</p>
        </div>
      </div>

    </div>
  );
};
