"use client";

import React, { useState } from 'react';
import { TimeComplexityTable, ComplexityRow } from '../../../../components/visualizers/shared/TimeComplexityTable';
import { 
  createInitialDll, 
  simulateDllInsertHead,
  simulateDllInsertTail,
  simulateDllInsertIndex,
  simulateDllInsertBefore,
  simulateDllInsertAfter,
  simulateDllDeleteHead,
  simulateDllDeleteTail,
  simulateDllDeleteIndex,
  simulateDllDeleteBefore,
  simulateDllDeleteAfter,
  simulateDllDeleteNode,
  simulateDllTraversal, 
  simulateDllReverse 
} from '../../../../lib/algorithms/dllSimulator';
import { DllCanvas } from './DllCanvas';
import { DllControl } from './DllControl';
import { TimeTravelControls } from '../../../../components/visualizers/shared/TimeTravelControls';
import { DListStep, DllOperation, DNodeState } from '../../../../lib/types/dll';

export default function DoublyLinkedListPage() {
  const [activeOp, setActiveOp] = useState<DllOperation>('insert_after');
  
  // Unified persistent state
  const [persistentState, setPersistentState] = useState(() => createInitialDll(3));
  
  const [frames, setFrames] = useState<DListStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleExecute = (val?: number, index?: number, targetAddr?: string, direction?: 'forward' | 'backward') => {
    let newFrames: DListStep[] = [];
    
    switch(activeOp) {
      case 'insert_head':
        newFrames = simulateDllInsertHead(persistentState.nodes, persistentState.record, val || 42);
        break;
      case 'insert_tail':
        newFrames = simulateDllInsertTail(persistentState.nodes, persistentState.record, val || 42);
        break;
      case 'insert_index':
        newFrames = simulateDllInsertIndex(persistentState.nodes, persistentState.record, index || 0, val || 42);
        break;
      case 'insert_before':
        newFrames = simulateDllInsertBefore(persistentState.nodes, persistentState.record, targetAddr || null, val || 42);
        break;
      case 'insert_after':
        newFrames = simulateDllInsertAfter(persistentState.nodes, persistentState.record, targetAddr || null, val || 42);
        break;
        
      case 'delete_head':
        newFrames = simulateDllDeleteHead(persistentState.nodes, persistentState.record);
        break;
      case 'delete_tail':
        newFrames = simulateDllDeleteTail(persistentState.nodes, persistentState.record);
        break;
      case 'delete_index':
        newFrames = simulateDllDeleteIndex(persistentState.nodes, persistentState.record, index || 0);
        break;
      case 'delete_before':
        newFrames = simulateDllDeleteBefore(persistentState.nodes, persistentState.record, targetAddr || '');
        break;
      case 'delete_after':
        newFrames = simulateDllDeleteAfter(persistentState.nodes, persistentState.record, targetAddr || '');
        break;
      case 'delete_node':
        newFrames = simulateDllDeleteNode(persistentState.nodes, persistentState.record, targetAddr || '');
        break;
        
      case 'traverse':
        newFrames = simulateDllTraversal(persistentState.nodes, persistentState.record, direction || 'forward');
        break;
      case 'reverse':
        newFrames = simulateDllReverse(persistentState.nodes, persistentState.record);
        break;
    }
    
    if (newFrames.length > 0) {
      setFrames(newFrames);
      setCurrentStep(newFrames.length - 1);
      setIsPlaying(false);
      
      const finalFrame = newFrames[newFrames.length - 1];
      setPersistentState({ nodes: finalFrame.nodes, record: finalFrame.listRecord });
    }
  };

  const handleReset = () => {
    setPersistentState(createInitialDll(0));
    setFrames([]);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const currentFrame = frames.length > 0 
    ? frames[currentStep] 
    : {
        stepNumber: 0,
        title: "Hazır",
        explanation: "Doubly Linked List operasyonları bekliyor...",
        activeCodeLine: -1,
        cCode: "// Çift Yönlü Bağlı Liste (DLL)\n// struct DNode { int item; DNode* prev; DNode* next; };",
        nodes: persistentState.nodes,
        listRecord: persistentState.record,
        activePointers: [],
        pointers: { tmp: null, current: null, target: null }
      };

  const getOrderedList = (nodes: DNodeState[], headAddress: string | null) => {
    const ordered: DNodeState[] = [];
    let curr = headAddress;
    const visited = new Set();
    while (curr && !visited.has(curr)) {
      visited.add(curr);
      const node = nodes.find((n) => n.address === curr);
      if (!node) break;
      ordered.push(node);
      curr = node.nextAddress;
    }
    return ordered;
  };

  const orderedPersistentList = getOrderedList(persistentState.nodes, persistentState.record.headAddress);

  return (
    <div className="flex flex-col h-full min-h-[85vh]">
      
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-2 gap-4">
          <h2 className="text-3xl font-extrabold text-[#051F20] tracking-tight">
            Doubly Linked Lists (Çift Yönlü Bağlı Listeler)
          </h2>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-xl font-bold text-sm transition-colors shadow-sm flex-shrink-0"
          >
            Listeyi Sıfırla (Reset)
          </button>
        </div>
        <p className="text-slate-600 max-w-3xl">
          Singly Linked List'ten farklı olarak her düğümde hem <strong>next</strong> hem de <strong>prev</strong> işaretçisi bulunur. 
          Bu sayede geriye doğru gezinti yapılabilir ve arama gerektirmeyen O(1) silme işlemleri gerçekleştirilebilir.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1">
        
        {/* Left/Center: Visualizer Canvas & Timeline */}
        <div className="flex-1 flex flex-col gap-6">
          
          {/* Live State Tracker */}
          <div className="w-full bg-white border border-slate-200 rounded-lg p-3 shadow-sm flex items-center gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide mr-2 whitespace-nowrap">GÜNCEL LİSTE:</span>
            {persistentState.record.headAddress === null && (
               <div className="px-3 py-1.5 rounded text-sm font-medium bg-red-50 text-red-700 border border-red-200">NULL</div>
            )}
            {orderedPersistentList.map((node, i) => (
              <React.Fragment key={node.id}>
                {i === 0 && (
                   <span className="text-[10px] text-emerald-600 font-bold mr-1">HEAD&rarr;</span>
                )}
                <div className={`px-3 py-1.5 rounded text-sm font-medium border flex-shrink-0 flex items-center gap-1 ${node.isDummy ? 'bg-slate-100 text-slate-500 border-slate-300' : 'bg-[#F2F7F4] text-[#051F20] border-[#8EB69B]'}`}>
                  <span className={`text-[8px] font-mono opacity-50 ${node.isDummy ? 'text-slate-400' : 'text-blue-500'}`}>&larr;p</span>
                  {node.val}
                  <span className={`text-[8px] font-mono opacity-50 ${node.isDummy ? 'text-slate-400' : 'text-emerald-500'}`}>n&rarr;</span>
                </div>
                {i < orderedPersistentList.length - 1 && (
                  <div className="flex flex-col justify-center h-4 mx-1">
                    <svg className="w-4 h-2 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                    <svg className="w-4 h-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                    </svg>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="flex-1 relative">
            <DllCanvas frame={currentFrame} />
          </div>
          
          {/* Unified Timeline Dock */}
          {frames.length > 0 && (
            <div className="w-full flex justify-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="w-full max-w-2xl">
                <TimeTravelControls
                  currentStep={currentStep}
                  totalSteps={frames.length}
                  onStepChange={setCurrentStep}
                  isPlaying={isPlaying}
                  onPlayToggle={setIsPlaying}
                />
              </div>
            </div>
          )}
        </div>

        {/* Right: Controls & C Code Terminal */}
        <div className="flex-shrink-0">
          <DllControl 
            activeOp={activeOp}
            setActiveOp={setActiveOp}
            onExecute={handleExecute}
            activeLineIndex={currentFrame.activeCodeLine}
            explanation={currentFrame.explanation}
            cCode={currentFrame.cCode}
            nodes={persistentState.nodes}
          />
        </div>

      </div>

      {/* Time Complexity Section */}
      <TimeComplexityTable rows={[
        { category: 'Ekleme', operation: 'Başa Ekle (Insert Head)', worst: 'O(1)', reason: 'Dummy Node (Kukla Düğüm) sayesinde liste başı eklemelerde özel durum kontrolü gerekmez; her zaman Dummy->next güncellenir.' },
        { category: 'Ekleme', operation: 'Sona Ekle (Insert Tail)', worst: 'O(1)', reason: 'Tail pointer sayesinde son düğüme anında erişilir, listeyi gezmek gerekmez.' },
        { category: 'Ekleme', operation: 'İndekse Ekle (Insert At Index)', worst: 'O(N)', reason: 'İstenen konuma ulaşmak için liste başından tek tek ilerlenmek zorunda kalınır.' },
        { category: 'Ekleme', operation: 'Önüne Ekle (Insert Before)', worst: 'O(1)*', reason: 'Hedef düğümün prev pointer sayesinde öncesine O(1) ekleme yapılır. (Düğüm adresi biliniyorsa)' },
        { category: 'Ekleme', operation: 'Arkasına Ekle (Insert After)', worst: 'O(1)*', reason: 'Hedef düğümün next pointer sayesinde sonrasına O(1) ekleme yapılır. (Düğüm adresi biliniyorsa)' },
        { category: 'Silme', operation: 'Baştan Sil (Delete Head)', worst: 'O(1)', reason: 'Dummy Node sayesinde, silinecek ilk düğüm her zaman Dummy->next konumundadır.' },
        { category: 'Silme', operation: 'Sondan Sil (Delete Tail)', worst: 'O(1)', reason: 'DLL sayesinde tail.prev ile bir önceki düğüme O(1) erişilir; tek yönlü listeden farkı budur.' },
        { category: 'Silme', operation: 'İndekse Göre Sil', worst: 'O(N)', reason: 'Konuma ulaşmak için liste başından ilerlemek gerekir.' },
        { category: 'Silme', operation: 'Düğümü Sil (By Address)', worst: 'O(1)', reason: 'DLL, düğümün prev ve next pointerları sayesinde listenin geri kalanına erişmeden silme yapar.' },
        { category: 'Gezinti', operation: 'İleri Gezinti (Traverse Forward)', worst: 'O(N)', reason: 'Tüm liste next pointer ile baştan sona gezilir.' },
        { category: 'Gezinti', operation: 'Geri Gezinti (Traverse Backward)', worst: 'O(N)', reason: 'Tüm liste prev pointer ile sondan başa gezilir; SLL bunu yapamaz.' },
        { category: 'Gezinti', operation: 'Listeyi Tersine Çevir (Reverse)', worst: 'O(N)', reason: 'Her düğümün prev ve next pointerları takas edilir, tüm liste bir kez taranır.' },
      ] as ComplexityRow[]} />
    </div>
  );
}
