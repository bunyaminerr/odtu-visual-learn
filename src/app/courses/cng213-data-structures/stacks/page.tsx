"use client";

import React, { useState } from 'react';
import { TimeComplexityTable, ComplexityRow } from '../../../../components/visualizers/shared/TimeComplexityTable';
import { StackOpType, CngStackImplementation, CngStackFrame } from '../../../../lib/types/stack';
import { 
  createInitialArrayStack, 
  createInitialLinkedStack, 
  simulateArrayPush, 
  simulateArrayPop, 
  simulateLinkedPush, 
  simulateLinkedPop 
} from '../../../../lib/algorithms/stackSimulator';
import { StackCanvas } from './StackCanvas';
import { StackControls } from './StackControls';
import { StackApplications } from './StackApplications';
import { TimeTravelControls } from '../../../../components/visualizers/shared/TimeTravelControls';

export default function StackADTPage() {
  const [activeTab, setActiveTab] = useState<'static' | 'dynamic' | 'applications'>('static');
  const [implementation, setImplementation] = useState<CngStackImplementation>('array');
  const [activeOp, setActiveOp] = useState<StackOpType>('push');
  
  const [arrayState, setArrayState] = useState(() => createInitialArrayStack());
  const [linkedState, setLinkedState] = useState(() => createInitialLinkedStack());
  
  const [frames, setFrames] = useState<CngStackFrame[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // When tab changes, update implementation state
  React.useEffect(() => {
    if (activeTab === 'static') setImplementation('array');
    if (activeTab === 'dynamic') setImplementation('linked_list');
    
    setFrames([]);
    setCurrentStep(0);
    setIsPlaying(false);
  }, [activeTab]);

  const handleExecute = (valStr?: string) => {
    let newFrames: CngStackFrame[] = [];
    
    // Convert string to number if possible, else keep string
    let val: number | string = 0;
    if (valStr) {
      const parsed = parseInt(valStr);
      val = isNaN(parsed) ? valStr : parsed;
    }

    if (implementation === 'array') {
      if (activeOp === 'push') {
        newFrames = simulateArrayPush(arrayState, val);
      } else if (activeOp === 'pop') {
        newFrames = simulateArrayPop(arrayState);
      }
      
      if (newFrames.length > 0) {
        setFrames(newFrames);
        setCurrentStep(newFrames.length - 1);
        setIsPlaying(false);
        const finalFrame = newFrames[newFrames.length - 1];
        if (finalFrame.arrayStack) setArrayState(finalFrame.arrayStack);
      }
    } else {
      if (activeOp === 'push') {
        newFrames = simulateLinkedPush(linkedState.nodes, linkedState.record, val);
      } else if (activeOp === 'pop') {
        newFrames = simulateLinkedPop(linkedState.nodes, linkedState.record);
      }
      
      if (newFrames.length > 0) {
        setFrames(newFrames);
        setCurrentStep(newFrames.length - 1);
        setIsPlaying(false);
        const finalFrame = newFrames[newFrames.length - 1];
        if (finalFrame.linkedNodes && finalFrame.linkedRecord) {
          setLinkedState({ nodes: finalFrame.linkedNodes, record: finalFrame.linkedRecord });
        }
      }
    }
  };

  const handleReset = (capacity: number) => {
    if (implementation === 'array') {
      const cap = capacity > 10 ? 10 : capacity; // Limit for visual reasons
      setArrayState(createInitialArrayStack(cap));
    } else {
      setLinkedState(createInitialLinkedStack());
    }
    setFrames([]);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const currentFrame = frames.length > 0 
    ? frames[currentStep] 
    : {
        stepIndex: 0,
        arrayStack: implementation === 'array' ? arrayState : undefined,
        linkedNodes: implementation === 'linked_list' ? linkedState.nodes : undefined,
        linkedRecord: implementation === 'linked_list' ? linkedState.record : undefined,
        explanation: "İşlem bekliyor...",
        activeLineIndex: -1
      };

  return (
    <div className="flex flex-col h-full min-h-[85vh]">
      
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-extrabold text-[#051F20] tracking-tight mb-2">
          Stack (Yığın) ADT
        </h2>
        <p className="text-slate-600 max-w-3xl">
          CNG 213 (Data Structures) <strong>Worksheet 6a ve 6b</strong>'ye göre 
          Array (Statik) ve Linked List (Dinamik) tabanlı LIFO (Last In First Out) bellek modelleri ve klasik algoritmaları.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200 mb-6 pb-2">
        <button
          onClick={() => setActiveTab('static')}
          className={`px-6 py-2.5 rounded-t-lg font-bold transition-colors ${
            activeTab === 'static' ? 'bg-[#235347] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          1. Static Stack (Worksheet 6a)
        </button>
        <button
          onClick={() => setActiveTab('dynamic')}
          className={`px-6 py-2.5 rounded-t-lg font-bold transition-colors ${
            activeTab === 'dynamic' ? 'bg-[#235347] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          2. Dynamic Stack (Worksheet 6b)
        </button>
        <button
          onClick={() => setActiveTab('applications')}
          className={`px-6 py-2.5 rounded-t-lg font-bold transition-colors ${
            activeTab === 'applications' ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          3. Uygulamalar (Applications)
        </button>
      </div>

      {activeTab === 'applications' ? (
        <div className="flex-1 min-h-[500px]">
          <StackApplications />
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6 flex-1">
          
          {/* Left/Center: Visualizer Canvas & Timeline */}
          <div className="flex-1 flex flex-col gap-6">
            <div className="flex-1 relative min-h-[500px]">
              <StackCanvas frame={currentFrame} implementation={implementation} />
            </div>
            
            {/* Unified Timeline Dock */}
            {frames.length > 0 && (
              <div className="w-full flex justify-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6">
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
          <div className="flex-shrink-0 w-full lg:w-96">
            <StackControls 
              implementation={implementation}
              setImplementation={setImplementation}
              activeOp={activeOp}
              setActiveOp={setActiveOp}
              onExecute={handleExecute}
              onReset={handleReset}
              activeLineIndex={currentFrame.activeLineIndex}
              explanation={currentFrame.explanation}
              cCode={currentFrame.cCode}
            />
          </div>

        </div>
      )}

      {/* Time Complexity Section */}
      <TimeComplexityTable rows={[
        { category: 'Dizi (Array) Impl.', operation: 'Push (Eleman Ekle)', worst: 'O(1)', reason: 'Top indeksi arttırılıp diziın ilgili hücresi doldurulur; sabittir.' },
        { category: 'Dizi (Array) Impl.', operation: 'Pop (Eleman Çıkar)', worst: 'O(1)', reason: 'Top indeksi azaltılır; herhangi bir kaydırma yapılmaz.' },
        { category: 'Dizi (Array) Impl.', operation: "Peek (Top'a Bak)", worst: 'O(1)', reason: 'Sadece top indeksindeki değer okunur.' },
        { category: 'Dizi (Array) Impl.', operation: 'Is Empty / Is Full', worst: 'O(1)', reason: 'Top indeksi ile sabit bir karşılaştırma yapilir.' },
        { category: 'Bağlı Liste Impl.', operation: 'Push (Eleman Ekle)', worst: 'O(1)', reason: 'Yeni düğüm başa eklenir; gezinti yoktur.' },
        { category: 'Bağlı Liste Impl.', operation: 'Pop (Eleman Çıkar)', worst: 'O(1)', reason: 'Baş düğüm silinir, head bir sonrakine güncellenir.' },
        { category: 'Bağlı Liste Impl.', operation: "Peek (Top'a Bak)", worst: 'O(1)', reason: 'Head pointerdan ilk düğümün değeri okunur.' },
        { category: 'Bağlı Liste Impl.', operation: 'Is Empty', worst: 'O(1)', reason: 'Head == NULL kontrolü sabittir.' },
        { category: 'Genel', operation: 'Alan Karmaşıklığı (Space)', worst: 'O(N)', reason: 'Stackte N eleman varsa N birimlik bellek tutulur; yedek alan yok.' },
      ] as ComplexityRow[]} />
    </div>
  );
}
