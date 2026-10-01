import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createInitialLinkedQueue, simulateLinkedEnqueue, simulateLinkedDequeue } from '../../../../lib/algorithms/queueSimulator';
import { CngQueueFrame } from '../../../../lib/types/queue';
import { TimeTravelControls } from '../../../../components/visualizers/shared/TimeTravelControls';

export const LinkedQueueCanvas = () => {
  const [queueState, setQueueState] = useState(() => createInitialLinkedQueue());
  const [frames, setFrames] = useState<CngQueueFrame[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const [inputValue, setInputValue] = useState('');

  const executeOp = (type: 'enqueue' | 'dequeue') => {
    let newFrames: CngQueueFrame[] = [];
    if (type === 'enqueue') {
      let val: number | string = parseInt(inputValue);
      if (isNaN(val)) val = inputValue || 'X';
      newFrames = simulateLinkedEnqueue(queueState.nodes, queueState.record, val);
    } else {
      newFrames = simulateLinkedDequeue(queueState.nodes, queueState.record);
    }

    if (newFrames.length > 0) {
      setFrames(newFrames);
      setCurrentStep(newFrames.length - 1);
      setIsPlaying(false);
      const finalFrame = newFrames[newFrames.length - 1];
      if (finalFrame.linkedNodes && finalFrame.linkedRecord) {
        setQueueState({ nodes: finalFrame.linkedNodes, record: finalFrame.linkedRecord });
      }
    }
  };

  const currentFrame = frames.length > 0 ? frames[currentStep] : {
    stepIndex: 0,
    linkedNodes: queueState.nodes,
    linkedRecord: queueState.record,
    explanation: "İşlem bekliyor...",
    activeLineIndex: -1
  };

  const nodes = currentFrame.linkedNodes;
  const record = currentFrame.linkedRecord;

  return (
    <div className="w-full h-full flex flex-col p-6">
      
      {/* Controls */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4 mb-6">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Değer..."
          className="w-32 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
        />
        <button onClick={() => executeOp('enqueue')} className="px-4 py-2 bg-[#235347] text-white font-bold rounded-lg text-sm hover:bg-[#1a3e35]">
          Enqueue (Ekle)
        </button>
        <button onClick={() => executeOp('dequeue')} className="px-4 py-2 bg-red-50 text-red-700 border border-red-200 font-bold rounded-lg text-sm hover:bg-red-100">
          Dequeue (Sil)
        </button>
      </div>

      <div className="flex-1 flex gap-8">
        
        {/* Canvas Area */}
        <div className="flex-1 relative bg-white border border-slate-200 rounded-xl shadow-sm p-8 overflow-hidden flex flex-col items-center">
          <h3 className="absolute top-4 left-4 text-sm font-bold text-slate-500 uppercase tracking-wide">
            Linked List Queue (Dummy Header)
          </h3>

          <div className="flex gap-4 mt-16 relative">
            <AnimatePresence mode="popLayout">
              {nodes && record && (() => {
                const ordered = [];
                let curr = record.frontAddress;
                while (curr) {
                  const node = nodes.find(n => n.address === curr);
                  if (!node) break;
                  ordered.push(node);
                  curr = node.nextAddress;
                }

                return ordered.map((node, i) => {
                  const isDummy = i === 0;
                  return (
                    <React.Fragment key={node.id}>
                      <div className="flex flex-col items-center">
                        <motion.div
                          layout
                          initial={{ opacity: 0, y: -50, scale: 0.8 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 50, scale: 0.8 }}
                          className={`w-32 flex flex-col rounded-xl border-2 shadow-sm relative overflow-hidden bg-white
                            ${isDummy ? 'border-slate-300' : 'border-[#235347]'}
                            ${node.isTarget ? 'border-red-400 shadow-[0_0_15px_rgba(248,113,113,0.4)]' : ''}
                            ${node.isTemp ? 'border-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.4)]' : ''}
                          `}
                        >
                          <div className={`py-1 px-2 text-center text-[10px] font-mono border-b-2
                            ${isDummy ? 'bg-slate-100 text-slate-500 border-slate-300' : 'bg-emerald-50 text-emerald-800 border-emerald-200'}
                          `}>
                            {node.address}
                          </div>
                          
                          <div className={`py-6 text-center text-xl font-black ${isDummy ? 'text-slate-400 text-sm' : 'text-slate-800'}`}>
                            {node.value}
                          </div>
                          
                          <div className={`py-1 px-2 text-center text-[10px] font-mono border-t-2 break-all
                            ${isDummy ? 'bg-slate-100 text-slate-500 border-slate-300' : 'bg-emerald-50 text-emerald-800 border-emerald-200'}
                          `}>
                            next: {node.nextAddress || 'NULL'}
                          </div>

                          {/* Record Pointers (Front / Rear) */}
                          <AnimatePresence>
                            {record.frontAddress === node.address && (
                              <motion.div layoutId="q-front" className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200">
                                Q-&gt;Front
                              </motion.div>
                            )}
                            {record.rearAddress === node.address && (
                              <motion.div layoutId="q-rear" className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded border border-blue-200">
                                Q-&gt;Rear
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                        
                        <div className="mt-8 h-8 flex items-center justify-center">
                          {!node.nextAddress && (
                            <div className="bg-red-50 text-red-700 font-mono text-[10px] font-bold px-2 py-1 rounded border border-red-200">
                              NULL
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Arrow to Next */}
                      {node.nextAddress && (
                        <motion.div layout className="flex items-center text-slate-300 px-2 pt-12">
                          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </motion.div>
                      )}
                    </React.Fragment>
                  );
                });
              })()}
            </AnimatePresence>
            
            {/* TmpCell Pointer */}
            {currentFrame.pointers?.tmp && (
              <motion.div 
                layoutId="tmp-pointer"
                className="absolute right-0 top-0 bg-emerald-50 border border-emerald-200 p-2 rounded shadow-md text-emerald-800 font-bold text-xs"
              >
                TmpCell
              </motion.div>
            )}
          </div>
        </div>

        {/* C Code Terminal */}
        <div className="w-96 flex flex-col h-full gap-4">
          <div className="flex-1 bg-[#1e1e1e] rounded-xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
            <div className="p-3 bg-[#2d2d2d] border-b border-black/50 text-emerald-400 font-mono text-sm leading-relaxed">
              {'>'} {currentFrame.explanation}
            </div>
            <div className="flex-1 relative p-4 bg-[#1e1e1e] overflow-auto">
              <pre className="text-[13px] font-mono leading-[19px] text-slate-300">
                <code>{currentFrame.cCode || "Bekleniyor..."}</code>
              </pre>
              {currentFrame.activeLineIndex >= 0 && (
                <div 
                  className="absolute left-0 w-full bg-yellow-500/20 border-l-2 border-yellow-500 pointer-events-none transition-all duration-300"
                  style={{ top: `${(currentFrame.activeLineIndex * 19) + 16}px`, height: '19px' }}
                />
              )}
            </div>
          </div>
          
          {frames.length > 0 && (
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
              <TimeTravelControls
                currentStep={currentStep}
                totalSteps={frames.length}
                onStepChange={setCurrentStep}
                isPlaying={isPlaying}
                onPlayToggle={setIsPlaying}
              />
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
