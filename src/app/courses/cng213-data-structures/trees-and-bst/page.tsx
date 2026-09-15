"use client";

import React, { useState, useEffect } from 'react';
import { TimeComplexityTable, ComplexityRow } from '../../../../components/visualizers/shared/TimeComplexityTable';
import { TreeNodeState, TreeRecord, TreeStep, TreeOperation } from '../../../../lib/types/tree';
import { 
  createInitialTree, 
  simulateRecursiveInsert, 
  simulateIterativeInsert,
  simulateIterativeDelete,
  simulateFindRecursive,
  simulateFindMinMax,
  simulateDFS,
  simulateLevelOrder
} from '../../../../lib/algorithms/treeSimulator';
import { TreeCanvas } from './TreeCanvas';
import { TreeControl } from './TreeControl';
import { TimeTravelControls } from '../../../../components/visualizers/shared/TimeTravelControls';
import { TreeCodePanel } from './TreeCodePanel';

export default function TreePage() {
  const [nodes, setNodes] = useState<TreeNodeState[]>([]);
  const [record, setRecord] = useState<TreeRecord>({ rootAddress: null, size: 0 });
  const [frames, setFrames] = useState<TreeStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    handleReset();
  }, []);

  const handleReset = () => {
    const initial = createInitialTree();
    setNodes(initial.nodes);
    setRecord(initial.record);
    setFrames([]);
    setCurrentStep(0);
  };

  const handleSimulate = (op: TreeOperation, val: number) => {
    // End of current frames state is our new starting point
    const startNodes = frames.length > 0 ? frames[frames.length - 1].nodes : nodes;
    const startRecord = frames.length > 0 ? frames[frames.length - 1].treeRecord : record;

    let newFrames: TreeStep[] = [];

    switch(op) {
      case 'insert_recursive':
        newFrames = simulateRecursiveInsert(startNodes, startRecord, val);
        break;
      case 'insert_iterative':
        newFrames = simulateIterativeInsert(startNodes, startRecord, val);
        break;
      case 'delete_iterative':
        newFrames = simulateIterativeDelete(startNodes, startRecord, val);
        break;
      case 'find_min_recursive':
      case 'find_max_recursive':
      case 'find_min_iterative':
      case 'find_max_iterative':
        newFrames = simulateFindMinMax(startNodes, startRecord, op);
        break;
      case 'find_iterative':
        newFrames = simulateFindRecursive(startNodes, startRecord, val);
        break;
      case 'traverse_preorder':
      case 'traverse_inorder':
      case 'traverse_postorder':
        newFrames = simulateDFS(startNodes, startRecord, op);
        break;
      case 'traverse_level':
        newFrames = simulateLevelOrder(startNodes, startRecord);
        break;
      // ... Add others later
    }

    if (newFrames.length > 0) {
      const finalState = newFrames[newFrames.length - 1];
      setNodes(finalState.nodes);
      setRecord(finalState.treeRecord);
    }

    setFrames(newFrames);
    setCurrentStep(0);
  };

  const currentFrame = frames[currentStep];
  
  // Use frame state if available, else baseline state
  const displayNodes = currentFrame ? currentFrame.nodes : nodes;
  const displayRecord = currentFrame ? currentFrame.treeRecord : record;
  const displayPointers = currentFrame ? currentFrame.pointers : { current: null, parent: null, tmp: null };
  const displayTraversal = currentFrame?.traversalResult;

  return (
    <div className="flex flex-col h-full min-h-[80vh]">
      
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-extrabold text-[#051F20] tracking-tight mb-2">
          Tree and BST ADT (İkili Arama Ağaçları)
        </h2>
        <p className="text-slate-600">
          Ağaç üzerindeki düğüm dolaşımlarını (traversal), rekürsif ve iteratif ekleme/arama işlemlerini adım adım izleyin.
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
              <TreeCanvas 
                nodes={displayNodes}
                treeRecord={displayRecord}
                pointers={displayPointers}
                traversalResult={displayTraversal}
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
              <TreeCanvas 
                nodes={nodes}
                treeRecord={record}
                pointers={{current: null, parent: null, tmp: null}}
                className="rounded-t-none opacity-90"
              />
            </div>
            
          </div>

          {/* Right: Compact Control Panel */}
          <div className="flex-shrink-0 w-80">
            <TreeControl
              onSimulate={handleSimulate}
              onReset={handleReset}
              explanation={currentFrame?.explanation || "İşlem seçin..."}
            />
          </div>
          
        </div>

        {/* Bottom: Code Panel */}
        {currentFrame && currentFrame.cCode && (
          <div className="mt-4">
            <TreeCodePanel 
              code={currentFrame.cCode} 
              activeLine={currentFrame.activeCodeLine} 
            />
          </div>
        )}
        
      </div>

      {/* Time Complexity Section */}
      <TimeComplexityTable rows={[
        { category: 'BST (Dengeli Ağaçta)', operation: 'Ekleme (Insert)', best: 'O(log N)', average: 'O(log N)', worst: 'O(N)', reason: 'Dengeli ağaçta her seviyede yarı elenip iner; en kötü durum: tek dallı (dejenere) ağaç.' },
        { category: 'BST (Dengeli Ağaçta)', operation: 'Silme (Delete)', best: 'O(log N)', average: 'O(log N)', worst: 'O(N)', reason: 'Silinecek düğümü bulmak için BST arama yapılır; en kötü durum dejenere ağaç.' },
        { category: 'BST (Dengeli Ağaçta)', operation: 'Arama (Search)', best: 'O(1)', average: 'O(log N)', worst: 'O(N)', reason: 'Kökte bulunursa sabit; dengeli ağaçta O(log N); dejenere ağaçta O(N) kötülüğüne düşer.' },
        { category: 'Gezinti (Traversal)', operation: 'Inorder', worst: 'O(N)', reason: 'Tüm düğümler bir kez ziyaret edilir; inorder BST\'de sıralı (çıktı üretir.' },
        { category: 'Gezinti (Traversal)', operation: 'Preorder', worst: 'O(N)', reason: 'Tüm düğümler bir kez ziyaret edilir; kök önce işlenir.' },
        { category: 'Gezinti (Traversal)', operation: 'Postorder', worst: 'O(N)', reason: 'Tüm düğümler bir kez ziyaret edilir; kök en son işlenir.' },
        { category: 'Gezinti (Traversal)', operation: 'Level Order (BFS)', worst: 'O(N)', reason: 'Tüm düğümler kuyruk yardımıyla seviye seviye ziyaret edilir.' },
        { category: 'Genel', operation: 'Alan Karmaşıklığı (Space)', worst: 'O(N)', reason: 'N düğüm için N birimlik bellek; yinelemeli gezintilerde ek O(H) stack alanı.' },
      ] as ComplexityRow[]} />
    </div>
  );
}
