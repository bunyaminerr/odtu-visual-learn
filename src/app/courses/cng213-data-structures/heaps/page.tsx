"use client";

import React, { useState, useRef, useEffect } from 'react';
import { TimeComplexityTable, ComplexityRow } from '../../../../components/visualizers/shared/TimeComplexityTable';
import { HeapControl } from './HeapControl';
import { HeapCanvas } from './HeapCanvas';
import { HeapNodeState, HeapRecord, HeapStep, HeapOperation, HeapMode } from '../../../../lib/types/heap';
import { simulateHeapInsert, simulateHeapDelete, simulateBuildHeap } from '../../../../lib/algorithms/heapSimulator';
import { TreeCodePanel as CodePanel } from '../trees-and-bst/TreeCodePanel';
import { Play, Pause, SkipBack, SkipForward, RotateCcw } from 'lucide-react';

export default function HeapsPage() {
  const [nodes, setNodes] = useState<HeapNodeState[]>([]);
  const [record, setRecord] = useState<HeapRecord>({ size: 0, capacity: 15, mode: 'min' });
  
  const [steps, setSteps] = useState<HeapStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1000);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleSimulate = (op: HeapOperation, val: number, arr?: number[]) => {
    let newSteps: HeapStep[] = [];
    if (op === 'insert') {
      newSteps = simulateHeapInsert(nodes, record, val);
    } else if (op === 'delete') {
      newSteps = simulateHeapDelete(nodes, record);
    } else if (op === 'heapify' && arr) {
      newSteps = simulateBuildHeap(nodes, record, arr);
    }
    
    if (newSteps.length > 0) {
      setSteps(newSteps);
      setCurrentStepIndex(0);
      setIsAnimating(true);
    }
  };

  const handleReset = () => {
    setNodes([]);
    setRecord({ size: 0, capacity: 15, mode: record.mode });
    setSteps([]);
    setCurrentStepIndex(0);
    setIsAnimating(false);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const handleModeChange = (newMode: HeapMode) => {
    setRecord({ ...record, mode: newMode });
    setNodes([]); // Clear nodes on mode change to prevent invalid states
  };

  useEffect(() => {
    if (isAnimating && steps.length > 0) {
      timerRef.current = setTimeout(() => {
        if (currentStepIndex < steps.length - 1) {
          setCurrentStepIndex(prev => prev + 1);
        } else {
          setIsAnimating(false);
          const finalStep = steps[steps.length - 1];
          setNodes(finalStep.nodes.map(n => ({ ...n, isActive: false, isTarget: false, isTemp: false })));
          setRecord(finalStep.record);
        }
      }, playbackSpeed);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isAnimating, currentStepIndex, steps, playbackSpeed]);

  const currentStep = steps[currentStepIndex];
  const displayNodes = currentStep ? currentStep.nodes : nodes;
  const displayRecord = currentStep ? currentStep.record : record;
  const displayPointers = currentStep ? currentStep.pointers : { i: null, child: null, parent: null, tmp: null };

  return (
    <>
      <div className="flex h-[calc(100vh-4rem)]">
        <div className="flex-1 flex flex-col min-w-0 bg-slate-50">
        
        <div className="flex-1 relative flex flex-col">
          <HeapCanvas 
            nodes={displayNodes} 
            record={displayRecord} 
            pointers={displayPointers}
          />
          
          {/* Explanation Overlay */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md px-6 py-4 rounded-2xl shadow-lg border border-slate-200 z-30 max-w-2xl w-full text-center">
            <h3 className="font-bold text-slate-800 mb-1">{currentStep ? currentStep.title : 'Priority Queue (Heap) Bekliyor'}</h3>
            <p className="text-slate-600 text-sm">{currentStep ? currentStep.explanation : 'Sağ panelden bir işlem seçin.'}</p>
          </div>
        </div>

        {/* Code & Animation Controls */}
        <div className="h-64 border-t border-slate-200 bg-white flex shrink-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-20">
          <div className="flex-1 flex flex-col border-r border-slate-200">
            <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100 bg-slate-50/50">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">C Algoritması (Implicit Tree Array)</span>
            </div>
            <div className="flex-1 overflow-hidden relative bg-[#FAFAFA]">
              {currentStep ? (
                <CodePanel 
                  code={currentStep.cCode} 
                  activeLine={currentStep.activeCodeLine || -1} 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm font-medium">
                  İşlem başladığında kod burada görünecek...
                </div>
              )}
            </div>
          </div>

          <div className="w-80 flex flex-col p-4 bg-slate-50/50">
            <div className="mb-auto">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-3">Animasyon Kontrolü</span>
              
              <div className="flex items-center justify-between gap-2 mb-4 bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
                <button onClick={() => { setIsAnimating(false); setCurrentStepIndex(0); }} disabled={!currentStep || isAnimating} className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors disabled:opacity-50">
                  <SkipBack size={18} />
                </button>
                <button onClick={() => setIsAnimating(!isAnimating)} disabled={!currentStep || currentStepIndex === steps.length - 1} className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center justify-center transition-colors shadow-sm disabled:opacity-50">
                  {isAnimating ? <Pause size={20} /> : <Play size={20} className="ml-1" />}
                </button>
                <button onClick={() => { setIsAnimating(false); setCurrentStepIndex(steps.length - 1); }} disabled={!currentStep || isAnimating || currentStepIndex === steps.length - 1} className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors disabled:opacity-50">
                  <SkipForward size={18} />
                </button>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium text-slate-500">
                  <span>Hız</span>
                  <span>{playbackSpeed}ms</span>
                </div>
                <input type="range" min="100" max="2000" step="100" value={playbackSpeed} onChange={(e) => setPlaybackSpeed(Number(e.target.value))} className="w-full accent-indigo-600" />
              </div>
            </div>

            {currentStep && (
              <div className="mt-4 pt-4 border-t border-slate-200">
                <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  <span>İlerleme</span>
                  <span>{currentStepIndex + 1} / {steps.length}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-indigo-600 h-full rounded-full transition-all duration-300" style={{ width: (((currentStepIndex + 1) / (steps.length || 1)) * 100) + '%' }}></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <HeapControl 
        onSimulate={handleSimulate}
        onReset={handleReset}
        isAnimating={isAnimating}
        mode={record.mode}
        onModeChange={handleModeChange}
      />
      </div>

      <TimeComplexityTable rows={[
        { category: 'Heap İşlemleri', operation: 'Ekleme (Insert)', worst: 'O(log N)', reason: 'Yeni eleman son konuma eklenir, sonra Percolate Up (Yukarı Kaydırma) ile yerine taşınır; seviye sayısı = log N.' },
        { category: 'Heap İşlemleri', operation: 'Min/Max Sil (Delete Top)', worst: 'O(log N)', reason: 'Kök (min/max) çıkarılır, son eleman köke alınır, Percolate Down (Aşağı Kaydırma) ile yerli yerine öteler.' },
        { category: 'Heap İşlemleri', operation: "Min/Max'a Bak (Peek)", worst: 'O(1)', reason: "Kök, heap'in en tepesidir; array[0] doğrudan okunur." },
        { category: 'Heap İşlemleri', operation: 'Heap İnşa Et (Build Heap)', worst: 'O(N)', reason: "Her elemanı ayrı ayrı eklemek O(N log N) olurdu; ancak Floyd algoritması ile tüm dizi O(N) sürede heap'e dönüştürülür." },
        { category: 'Heap Sort', operation: 'Heap Sort', best: 'O(N log N)', average: 'O(N log N)', worst: 'O(N log N)', reason: 'Build Heap O(N) + N kez O(log N) silme = O(N log N); kararsız (unstable) sıralamadır.' },
        { category: 'Genel', operation: 'Alan Karmaşıklığı (Space)', worst: 'O(N)', reason: 'Heap bir dizi ile ifade edilir; solçocuk 2i+1, sağçocuk 2i+2 formülüyle alanı optimize eder.' },
      ] as ComplexityRow[]} />
    </>
  );
}
