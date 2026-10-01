import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { simulatePalindromeTest, PalindromeFrame } from '../../../../lib/algorithms/queueSimulator';
import { TimeTravelControls } from '../../../../components/visualizers/shared/TimeTravelControls';

export const PalindromeTestCanvas = () => {
  const [inputValue, setInputValue] = useState('radar');
  const [frames, setFrames] = useState<PalindromeFrame[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const executeTest = () => {
    if (!inputValue) return;
    const newFrames = simulatePalindromeTest(inputValue);
    setFrames(newFrames);
    setCurrentStep(0);
    setIsPlaying(true);
  };

  const currentFrame = frames.length > 0 ? frames[currentStep] : null;

  return (
    <div className="w-full h-full flex flex-col p-6">
      
      {/* Controls */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toLowerCase())}
            placeholder="Kelime (örn: radar)"
            className="w-48 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#235347]/20"
          />
          <button onClick={executeTest} className="px-6 py-2 bg-[#235347] text-white font-bold rounded-lg text-sm hover:bg-[#1a3e35]">
            Test Et
          </button>
        </div>
        <div className="text-sm text-slate-500 font-medium">
          Stack (LIFO) vs Queue (FIFO)
        </div>
      </div>

      <div className="flex-1 flex gap-8">
        
        {/* Left: Stack */}
        <div className="w-64 bg-white border border-slate-200 rounded-xl shadow-sm p-4 flex flex-col items-center justify-end overflow-hidden relative">
          <h3 className="absolute top-4 w-full text-center text-sm font-bold text-slate-500 uppercase tracking-wide">
            Stack (Yığın)
          </h3>
          <div className="w-32 border-b-4 border-l-4 border-r-4 border-slate-800 rounded-b-xl flex flex-col-reverse justify-start p-2 gap-1 min-h-[300px]">
            <AnimatePresence>
              {currentFrame?.stackStr.map((char, idx) => (
                <motion.div
                  key={`stack-${idx}`}
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  className="w-full aspect-square bg-slate-100 border-2 border-slate-300 rounded shadow-sm flex items-center justify-center text-2xl font-black text-slate-700 uppercase"
                >
                  {char}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <span className="mt-2 text-xs font-bold text-slate-400">LIFO</span>
        </div>

        {/* Center: Arena */}
        <div className="flex-1 bg-white border border-slate-200 rounded-xl shadow-sm p-6 flex flex-col items-center justify-center relative">
          
          <div className="text-center mb-8 h-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFrame?.explanation}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-lg font-bold text-slate-700"
              >
                {currentFrame?.explanation || "Başlamak için bir kelime girin ve Test Et butonuna basın."}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-12 h-32">
            <AnimatePresence mode="popLayout">
              {currentFrame?.phase === 'dequeue' && currentFrame.status !== 'PENDING' && (
                <>
                  <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-20 h-20 bg-slate-100 border-2 border-slate-300 rounded flex items-center justify-center text-4xl font-black text-slate-700 uppercase"
                  >
                    {currentFrame.word[currentFrame.word.length - 1 - currentFrame.currentIndex]}
                  </motion.div>
                  
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex flex-col items-center gap-2"
                  >
                    {currentFrame.status === 'MATCH' && (
                      <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 border-4 border-emerald-300">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                    {currentFrame.status === 'MISMATCH' && (
                      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-600 border-4 border-red-300">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                    )}
                    {currentFrame.status === 'SUCCESS' && (
                      <div className="text-xl font-black text-emerald-600 bg-emerald-50 px-4 py-2 rounded-lg border border-emerald-200">
                        PALINDROME!
                      </div>
                    )}
                  </motion.div>

                  <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-20 h-20 bg-emerald-50 border-2 border-[#235347] rounded flex items-center justify-center text-4xl font-black text-[#235347] uppercase"
                  >
                    {currentFrame.word[currentFrame.currentIndex]}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
          
          {frames.length > 0 && (
            <div className="absolute bottom-6 w-3/4 max-w-lg">
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

        {/* Right: Queue */}
        <div className="w-64 bg-white border border-slate-200 rounded-xl shadow-sm p-4 flex flex-col items-center justify-start overflow-hidden relative">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-8">
            Queue (Kuyruk)
          </h3>
          <div className="h-full w-32 border-l-4 border-r-4 border-[#235347] rounded flex flex-col justify-end p-2 gap-1">
            <AnimatePresence>
              {currentFrame?.queueStr.map((char, idx) => (
                <motion.div
                  key={`queue-${idx}`}
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="w-full aspect-square bg-emerald-50 border-2 border-[#235347] rounded shadow-sm flex items-center justify-center text-2xl font-black text-[#235347] uppercase"
                >
                  {char}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <span className="mt-2 text-xs font-bold text-emerald-600/70">FIFO</span>
        </div>

      </div>
    </div>
  );
};
