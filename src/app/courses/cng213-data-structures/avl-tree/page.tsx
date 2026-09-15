"use client";

import React, { useState, useEffect } from 'react';
import { TimeComplexityTable, ComplexityRow } from '../../../../components/visualizers/shared/TimeComplexityTable';
import { AVLNodeState, AVLRecord, AVLStep, AVLOperation } from '../../../../lib/types/avl';
import { createInitialAVL, simulateAVLInsert, simulateAVLDelete, simulateAVLFind, simulateAVLFindMinMax, simulateAVLAnalysis, generateRandomAVL } from '../../../../lib/algorithms/avlSimulator';
import { AVLCanvas } from './AVLCanvas';
import { AVLControl } from './AVLControl';
import { TreeCodePanel as CodePanel } from '../trees-and-bst/TreeCodePanel';
import { TimeTravelControls } from '../../../../components/visualizers/shared/TimeTravelControls';

export default function AVLTreeVisualizer() {
  const [nodes, setNodes] = useState<AVLNodeState[]>([]);
  const [record, setRecord] = useState<AVLRecord>({ rootAddress: null, size: 0 });
  const [frames, setFrames] = useState<AVLStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    handleReset();
  }, []);

  const handleReset = () => {
    const { nodes: initialNodes, record: initialRecord } = createInitialAVL();
    setNodes(initialNodes);
    setRecord(initialRecord);
    setFrames([]);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const handleSimulate = (op: AVLOperation, val: number) => {
    if (isPlaying) setIsPlaying(false);
    
    const startNodes = frames.length > 0 && currentStep === frames.length - 1 
      ? frames[frames.length - 1].nodes 
      : nodes;
      
    const startRecord = frames.length > 0 && currentStep === frames.length - 1
      ? frames[frames.length - 1].treeRecord
      : record;

    let newFrames: AVLStep[] = [];

    switch (op) {
      case 'insert':
        newFrames = simulateAVLInsert(startNodes, startRecord, val);
        break;
      case 'delete':
        newFrames = simulateAVLDelete(startNodes, startRecord, val);
        break;
      case 'find':
        newFrames = simulateAVLFind(startNodes, startRecord, val);
        break;
      case 'find_min':
      case 'find_max':
        newFrames = simulateAVLFindMinMax(startNodes, startRecord, op);
        break;
      case 'tree_height':
      case 'count_nodes':
      case 'count_leaves':
      case 'is_avl':
      case 'traverse_inorder':
      case 'traverse_preorder':
      case 'traverse_postorder':
      case 'traverse_levelorder':
        newFrames = simulateAVLAnalysis(startNodes, startRecord, op);
        break;
      case 'random_tree':
        const { nodes: randomNodes, record: randomRecord } = generateRandomAVL();
        setNodes(randomNodes);
        setRecord(randomRecord);
        setFrames([]);
        setCurrentStep(0);
        return; // Early return because random_tree doesn't generate animation frames
    }

    if (newFrames.length > 0) {
      setFrames(newFrames);
      setCurrentStep(0);
      setNodes(newFrames[newFrames.length - 1].nodes);
      setRecord(newFrames[newFrames.length - 1].treeRecord);
    }
  };

  const currentFrame = frames[currentStep];
  
  const displayNodes = currentFrame ? currentFrame.nodes : nodes;
  const displayRecord = currentFrame ? currentFrame.treeRecord : record;
  const displayPointers = currentFrame ? currentFrame.pointers : { t: null, k1: null, k2: null, k3: null };

  return (
    <div className="flex flex-col h-full min-h-[80vh]">
      
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">AVL Tree ADT</h1>
        <p className="text-slate-600">
          AVL Ağaçlarındaki (Adelson-Velsky and Landis) ekleme ve otomatik dengeleme (Rotation) işlemlerini adım adım izleyin.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        
        {/* Top: Visualizer & Control Panel */}
        <div className="flex gap-6 h-[500px]">
          
          {/* Main Visualizer Area - Two Columns */}
          <div className="flex-1 flex gap-4 min-w-0">
            
            {/* Simulation Column */}
            <div className="flex-1 flex flex-col min-w-0">
              <div className="bg-[#051F20] text-emerald-400 text-xs font-bold px-4 py-2 rounded-t-xl border border-[#8EB69B]/40 border-b-0 uppercase tracking-wider flex justify-between items-center">
                <span>Animasyon (Adım Adım)</span>
                {frames.length > 0 && (
                  <span className="text-emerald-200/50">
                    Adım {currentStep + 1} / {frames.length}
                  </span>
                )}
              </div>
              <AVLCanvas 
                nodes={displayNodes}
                treeRecord={displayRecord}
                pointers={displayPointers as any}
                className="rounded-t-none"
              />
              
              {/* Bottom Dock: TimeTravelControls */}
              <div className="mt-4 flex justify-center shrink-0">
                {frames.length > 0 && (
                  <div className="w-full">
                    <TimeTravelControls
                      currentStep={currentStep}
                      totalSteps={frames.length}
                      onStepChange={setCurrentStep}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Current Tree Column */}
            <div className="flex-1 flex flex-col min-w-0">
              <div className="bg-[#0A2729] text-white/80 text-xs font-bold px-4 py-2 rounded-t-xl border border-[#8EB69B]/40 border-b-0 uppercase tracking-wider">
                Güncel Ağaç (Son Durum)
              </div>
              <AVLCanvas 
                nodes={nodes}
                treeRecord={record}
                pointers={{t: null, k1: null, k2: null, k3: null} as any}
                className="rounded-t-none opacity-90"
              />
            </div>
            
          </div>
          
          {/* Right: Compact Control Panel */}
          <div className="flex-shrink-0 w-80 flex flex-col gap-4">
            
            {/* Controls */}
            <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <AVLControl 
                onSimulate={handleSimulate}
                onReset={handleReset}
                isAnimating={isPlaying}
              />
            </div>
            
            {/* Explanation Panel */}
            <div className="h-48 bg-[#f8fafc] rounded-xl border border-slate-200 p-4 shadow-inner overflow-y-auto">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Açıklama</h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                {currentFrame?.explanation || "Ağaca yeni bir değer eklemek için sol taraftan değer girin ve 'Insert' tuşuna basın."}
              </p>
            </div>
            
          </div>
          
        </div>

        {/* Bottom: Code Panel */}
        {currentFrame && currentFrame.cCode && (
          <div className="mt-4">
            <CodePanel 
              code={currentFrame.cCode} 
              activeLine={currentFrame.activeCodeLine || -1} 
            />
          </div>
        )}
        
      </div>

      {/* Time Complexity Section */}
      <TimeComplexityTable rows={[
        { category: 'AVL Ağaç', operation: 'Ekleme (Insert)', best: 'O(log N)', average: 'O(log N)', worst: 'O(log N)', reason: 'AVL otomatik dengeler; yükseklik her zaman O(log N) olduğundan arama yolu hiç O(N)\'e düşmez.' },
        { category: 'AVL Ağaç', operation: 'Silme (Delete)', best: 'O(log N)', average: 'O(log N)', worst: 'O(log N)', reason: 'Silme sonrası en fazla O(log N) rotasyon yapılarak denge yeniden sağlanır.' },
        { category: 'AVL Ağaç', operation: 'Arama (Search)', best: 'O(1)', average: 'O(log N)', worst: 'O(log N)', reason: 'Yükseklik garantisi sayesinde en kötü durum bile logaritmik kalır; BST\'nin O(N) kötülüğü yoktur.' },
        { category: 'AVL Ağaç', operation: 'Min / Max Bul', worst: 'O(log N)', reason: 'Min en sol düğüm, max en sağ düğümdür; dengeli yükseklik sayesinde logaritmiktir.' },
        { category: 'Rotasyon', operation: 'LL / RR Rotasyon', worst: 'O(1)', reason: 'Tek rotasyon: sabit sayıda pointer takası yapılır.' },
        { category: 'Rotasyon', operation: 'LR / RL Çift Rotasyon', worst: 'O(1)', reason: 'İki ardışık tek rotasyondan oluşur; yine sabit sayıda pointer takası.' },
        { category: 'Gezinti (Traversal)', operation: 'Inorder / Preorder / Postorder', worst: 'O(N)', reason: 'Tüm düğümler bir kez ziyaret edilir; ağaç yüksekliğinden bağımsız.' },
        { category: 'Genel', operation: 'Alan Karmaşıklığı (Space)', worst: 'O(N)', reason: 'N düğüm + her düğümde ek olarak height bilgisi tutulur.' },
      ] as ComplexityRow[]} />
    </div>
  );
}
