"use client";

import React, { useState } from 'react';
import { TimeComplexityTable, ComplexityRow } from '../../../../components/visualizers/shared/TimeComplexityTable';
import { CngOperationType, CngLinkedListFrame, CngNode } from '../../../../lib/types/cng213LinkedList';
import { 
  createInitialState, 
  simulateInsertEnd, 
  simulateSortedInsert, 
  simulateDelete, 
  simulateSwapFirstTwo,
  simulateInsertHead,
  simulateInsertIndex,
  simulateDeleteHead,
  simulateDeleteTail,
  simulateDeleteIndex,
  simulateGetElementAtPosition,
  simulateGetPositionOfElement,
  simulateHeadOfList,
  simulateTailOfList,
  simulateListSize,
  simulateIsEmpty
} from '../../../../lib/algorithms/cng213LinkedListSimulator';
import { CngLinkedListCanvas } from './CngLinkedListCanvas';
import { CngLinkedListControl } from './CngLinkedListControl';
import { TimeTravelControls } from '../../../../components/visualizers/shared/TimeTravelControls';

export default function Cng213LinkedListsPage() {
  const [activeOp, setActiveOp] = useState<CngOperationType>('insert_end');
  
  // We keep a single unified state representing the persistent memory across operations
  // so the user can build up the list step by step.
  const [persistentState, setPersistentState] = useState(() => createInitialState());
  
  const [frames, setFrames] = useState<CngLinkedListFrame[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleExecute = (val?: number, index?: number) => {
    let newFrames: CngLinkedListFrame[] = [];
    
    switch(activeOp) {
      case 'insert_head':
        newFrames = simulateInsertHead(persistentState.nodes, persistentState.listRecord, val || 0);
        break;
      case 'insert_end':
        newFrames = simulateInsertEnd(persistentState.nodes, persistentState.listRecord, val || 0);
        break;
      case 'insert_index':
        newFrames = simulateInsertIndex(persistentState.nodes, persistentState.listRecord, val || 0, index || 0);
        break;
      case 'insert_sorted':
        newFrames = simulateSortedInsert(persistentState.nodes, persistentState.listRecord, val || 0);
        break;
      case 'delete_head':
        newFrames = simulateDeleteHead(persistentState.nodes, persistentState.listRecord);
        break;
      case 'delete_tail':
        newFrames = simulateDeleteTail(persistentState.nodes, persistentState.listRecord);
        break;
      case 'delete_index':
        newFrames = simulateDeleteIndex(persistentState.nodes, persistentState.listRecord, index || 0);
        break;
      case 'delete':
        newFrames = simulateDelete(persistentState.nodes, persistentState.listRecord, val || 0);
        break;
      case 'swap_first_two':
        newFrames = simulateSwapFirstTwo(persistentState.nodes, persistentState.listRecord);
        break;
      case 'get_element_at_position':
        newFrames = simulateGetElementAtPosition(persistentState.nodes, persistentState.listRecord, index || 0);
        break;
      case 'get_position_of_element':
        newFrames = simulateGetPositionOfElement(persistentState.nodes, persistentState.listRecord, val || 0);
        break;
      case 'head_of_list':
        newFrames = simulateHeadOfList(persistentState.nodes, persistentState.listRecord);
        break;
      case 'tail_of_list':
        newFrames = simulateTailOfList(persistentState.nodes, persistentState.listRecord);
        break;
      case 'list_size':
        newFrames = simulateListSize(persistentState.nodes, persistentState.listRecord);
        break;
      case 'is_empty':
        newFrames = simulateIsEmpty(persistentState.nodes, persistentState.listRecord);
        break;
    }
    
    if (newFrames.length > 0) {
      setFrames(newFrames);
      // Immediately jump to the last frame so the user sees the updated list instantly!
      setCurrentStep(newFrames.length - 1);
      setIsPlaying(false);
      // Persist the final state of this operation so the next operation acts on the updated list
      const finalFrame = newFrames[newFrames.length - 1];
      setPersistentState({ nodes: finalFrame.nodes, listRecord: finalFrame.listRecord });
    }
  };

  const handleReset = () => {
    setPersistentState(createInitialState());
    setFrames([]);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const currentFrame = frames.length > 0 
    ? frames[currentStep] 
    : {
        stepIndex: 0,
        nodes: persistentState.nodes,
        listRecord: persistentState.listRecord,
        pointers: { current: null, tmp: null, removeNode: null, first: null, second: null },
        activeLineIndex: -1,
        explanation: "İşlem bekliyor..."
      };

  const getOrderedList = (nodes: CngNode[], headAddress: string | null) => {
    const ordered: CngNode[] = [];
    let curr = headAddress;
    while (curr) {
      const node = nodes.find((n) => n.address === curr);
      if (!node) break;
      ordered.push(node);
      curr = node.nextAddress;
    }
    return ordered;
  };

  const orderedPersistentList = getOrderedList(persistentState.nodes, persistentState.listRecord.headAddress);

  return (
    <div className="flex flex-col h-full min-h-[80vh]">
      
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-2 gap-4">
          <h2 className="text-3xl font-extrabold text-[#051F20] tracking-tight">
            Linked Lists (Bağlı Listeler) & Dummy Node
          </h2>
          <button 
            onClick={handleReset}
            className="px-4 py-2 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-xl font-bold text-sm transition-colors shadow-sm flex-shrink-0"
          >
            Listeyi Sıfırla (Reset)
          </button>
        </div>
        <p className="text-slate-600">
          ODTÜ CNG 213 standartlarına uygun <code>ListRecord</code> ve <strong>Dummy Header Node</strong> yapısı. 
          Pointer manipülasyonlarını <code>O(1)</code> mikro-adımlarla canlı izleyin.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1">
        
        {/* Left/Center: Visualizer Canvas & Timeline */}
        <div className="flex-1 flex flex-col gap-6">
          
          {/* Live State Tracker */}
          <div className="w-full bg-white border border-slate-200 rounded-lg p-3 shadow-sm flex items-center gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide mr-2 whitespace-nowrap">GÜNCEL LİSTE:</span>
            {orderedPersistentList.map((node, i) => (
              <React.Fragment key={node.id}>
                <div className={`px-3 py-1.5 rounded text-sm font-medium border flex-shrink-0 ${
                  node.value === 'DUMMY' ? 'bg-slate-100 text-slate-700 border-slate-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                }`}>
                  {node.value}
                </div>
                <svg className="w-4 h-4 text-slate-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </React.Fragment>
            ))}
            <div className="px-3 py-1.5 rounded text-sm font-medium bg-red-50 text-red-700 border border-red-200 flex-shrink-0">
              NULL
            </div>
          </div>

          <div className="flex-1 relative">
            <CngLinkedListCanvas frame={currentFrame} />
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
          <CngLinkedListControl 
            activeOp={activeOp}
            setActiveOp={setActiveOp}
            onExecute={handleExecute}
            activeLineIndex={currentFrame.activeLineIndex}
            explanation={currentFrame.explanation}
          />
        </div>

      </div>

      {/* Time Complexity Section */}
      <TimeComplexityTable rows={[
        { category: 'Ekleme', operation: 'Başa Ekle (Insert Head)', worst: 'O(1)', reason: 'Dummy Head sayesinde her zaman ilk düğümden önce ekleme yapılır, gezinti gerekmez.' },
        { category: 'Ekleme', operation: 'Sona Ekle (Insert Tail)', worst: 'O(1)', reason: 'Tail pointer sayesinde son düğüme doğrudan ulaşılır.' },
        { category: 'Ekleme', operation: 'İndekse Ekle (Insert At Index)', worst: 'O(N)', reason: 'Doğru konuma ulaşmak için liste başından tek tek gezilmek zorunda kalınır.' },
        { category: 'Ekleme', operation: 'Sıralı Ekle (Sorted Insert)', worst: 'O(N)', reason: 'Yeni elemanın doğru sıralı konumunu bulmak için liste doğrusal taranır.' },
        { category: 'Silme', operation: 'Baştan Sil (Delete Head)', worst: 'O(1)', reason: 'Dummy Head next pointer güncellenir; gezinti yok.' },
        { category: 'Silme', operation: 'Sondan Sil (Delete Tail)', worst: 'O(N)', reason: 'Tail önceki düğümü bulmak için baştan gezilmek gerekir.' },
        { category: 'Silme', operation: 'İndeksteki Elemanı Sil', worst: 'O(N)', reason: 'Silinecek düğüme ulaşmak için en kötü ihtimalde tüm liste taranır.' },
        { category: 'Silme', operation: 'Değere Göre Sil', worst: 'O(N)', reason: 'Değer bulunana dek her düğüm karşılaştırılır.' },
        { category: 'Arama & Bilgi', operation: 'İndeksteki Elemanı Getir', worst: 'O(N)', reason: 'Random access yoktur; baştan saymak zorunludur.' },
        { category: 'Arama & Bilgi', operation: 'Elemanın Konumunu Bul', worst: 'O(N)', reason: 'Eleman bulunana dek doğrusal tarama yapılır.' },
        { category: 'Arama & Bilgi', operation: 'Head (İlk Eleman)', worst: 'O(1)', reason: 'head->next ile doğrudan ilk gerçek elemana erişilir.' },
        { category: 'Arama & Bilgi', operation: 'Tail (Son Eleman)', worst: 'O(1)', reason: 'Tail pointer her zaman son elemanı gösterir.' },
        { category: 'Arama & Bilgi', operation: 'Liste Boyutu (Size)', worst: 'O(1)', reason: 'L->size değişkeni her işlemde güncellenir, tekrar sayılmaz.' },
        { category: 'Arama & Bilgi', operation: 'Liste Boş mu? (Is Empty)', worst: 'O(1)', reason: 'L->size == 0 kontrolü sabit zamanlıdır.' },
      ] as ComplexityRow[]} />
    </div>
  );
}
