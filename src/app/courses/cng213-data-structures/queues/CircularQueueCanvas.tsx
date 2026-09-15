import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createInitialCircularQueue, simulateCircularEnqueue, simulateCircularDequeue } from '../../../../lib/algorithms/queueSimulator';
import { CngQueueFrame } from '../../../../lib/types/queue';
import { TimeTravelControls } from '../../../../components/visualizers/shared/TimeTravelControls';

export const CircularQueueCanvas = () => {
  const [queueState, setQueueState] = useState(() => createInitialCircularQueue());
  const [frames, setFrames] = useState<CngQueueFrame[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const [inputValue, setInputValue] = useState('');
  const [capacityInput, setCapacityInput] = useState('5');

  const executeOp = (type: 'enqueue' | 'dequeue') => {
    let newFrames: CngQueueFrame[] = [];
    if (type === 'enqueue') {
      let val: number | string = parseInt(inputValue);
      if (isNaN(val)) val = inputValue || 'X';
      newFrames = simulateCircularEnqueue(queueState, val);
    } else {
      newFrames = simulateCircularDequeue(queueState);
    }

    if (newFrames.length > 0) {
      setFrames(newFrames);
      setCurrentStep(newFrames.length - 1);
      setIsPlaying(false);
      const finalFrame = newFrames[newFrames.length - 1];
      if (finalFrame.circularQueue) setQueueState(finalFrame.circularQueue);
    }
  };

  const resetQueue = () => {
    const cap = parseInt(capacityInput) || 5;
    const newQ = createInitialCircularQueue(cap > 10 ? 10 : cap); // cap at 10 for layout
    setQueueState(newQ);
    setFrames([]);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const currentFrame = frames.length > 0 ? frames[currentStep] : {
    stepIndex: 0,
    circularQueue: queueState,
    explanation: "İşlem bekliyor...",
    activeLineIndex: -1
  };

  const q = currentFrame.circularQueue;

  return (
    <div className="w-full h-full flex flex-col p-6">
      
      {/* Controls */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4 mb-6 flex-wrap">
        <input
          type="number"
          min="2" max="10"
          value={capacityInput}
          onChange={(e) => setCapacityInput(e.target.value)}
          placeholder="Size (Kapasite)"
          className="w-32 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
        <button onClick={resetQueue} className="px-4 py-2 bg-blue-50 text-blue-700 font-bold rounded-lg text-sm border border-blue-200 hover:bg-blue-100">
          Sıfırla
        </button>
        <div className="w-px h-8 bg-slate-200 mx-2"></div>
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
        <div className="flex-1 flex flex-col items-center justify-center relative bg-white border border-slate-200 rounded-xl shadow-sm p-8">
          <h3 className="absolute top-4 left-4 text-sm font-bold text-slate-500 uppercase tracking-wide">
            Ring Buffer (Circular Array)
          </h3>
          
          {q && (
            <div className="flex gap-4 items-center mb-12">
              {q.array.map((val, idx) => {
                const isFront = q.front === idx;
                const isRear = q.rear === idx;

                return (
                  <div key={idx} className="relative flex flex-col items-center">
                    {/* Front Pointer */}
                    <div className="h-12 flex items-end justify-center pb-2">
                      <AnimatePresence>
                        {isFront && (
                          <motion.div 
                            layoutId="front-arrow"
                            className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded shadow-sm border border-emerald-200"
                          >
                            Front
                            <div className="mx-auto w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-emerald-400 mt-1"></div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Array Cell */}
                    <motion.div
                      layout
                      className={`w-20 h-20 flex items-center justify-center text-2xl font-black rounded-xl border-4 shadow-sm relative z-10
                        ${val !== null ? 'bg-emerald-50 border-[#235347] text-[#235347]' : 'bg-slate-50 border-slate-200 text-slate-300'}
                      `}
                    >
                      {val !== null ? val : ''}
                      <div className="absolute -bottom-6 text-xs text-slate-400 font-mono font-bold">
                        [{idx}]
                      </div>
                    </motion.div>

                    {/* Rear Pointer */}
                    <div className="h-12 flex items-start justify-center pt-8">
                      <AnimatePresence>
                        {isRear && (
                          <motion.div 
                            layoutId="rear-arrow"
                            className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded shadow-sm border border-blue-200 flex flex-col items-center"
                          >
                            <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[6px] border-b-blue-400 mb-1"></div>
                            Rear
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Center Info */}
          {q && (
            <div className="flex flex-col items-center mt-8">
              <span className="text-3xl font-extrabold text-slate-700">{q.size}</span>
              <span className="text-xs text-slate-500 uppercase font-bold tracking-widest">Size</span>
            </div>
          )}
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
