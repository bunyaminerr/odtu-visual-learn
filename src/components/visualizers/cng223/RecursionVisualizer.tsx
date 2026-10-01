"use client";

import React, { useState, useEffect } from 'react';
import { RecursionSimulationResult, RecursionEvent } from '@/lib/types/cng223Recursion';
import { simulateRecursion, AlgorithmType } from '@/lib/algorithms/recursionSimulator';

export default function RecursionVisualizer() {
  const [algo, setAlgo] = useState<AlgorithmType>('fibonacci');
  const [inputVal, setInputVal] = useState<number>(4);
  const [simulation, setSimulation] = useState<RecursionSimulationResult | null>(null);
  
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    // Generate simulation data whenever input changes
    try {
      const sim = simulateRecursion(algo, inputVal);
      setSimulation(sim);
      setCurrentStep(0);
      setIsPlaying(false);
    } catch (e) {
      console.error(e);
    }
  }, [algo, inputVal]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && simulation && currentStep < simulation.events.length) {
      timer = setTimeout(() => {
        setCurrentStep(s => s + 1);
      }, 800); // 800ms per step
    } else if (isPlaying && simulation && currentStep >= simulation.events.length) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, simulation]);

  const handlePlayPause = () => {
    if (simulation && currentStep >= simulation.events.length) {
      setCurrentStep(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
  };

  const visibleEvents = simulation ? simulation.events.slice(0, currentStep) : [];

  // Determine current active call stack
  const activeStack: RecursionEvent[] = [];
  visibleEvents.forEach(ev => {
    if (ev.type === 'CALL') {
      activeStack.push(ev);
    } else {
      // Find and remove matching call from stack
      const idx = activeStack.map(s => s.nodeId).lastIndexOf(ev.nodeId);
      if (idx !== -1) {
        activeStack.splice(idx, 1);
      }
    }
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col min-h-[600px]">
      
      {/* Controls */}
      <div className="p-6 border-b border-slate-200 bg-slate-50">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Recursion Call Stack & Trace Simülatörü</h3>
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          
          <div className="flex items-center gap-3">
            <label className="font-bold text-slate-700">Algoritma:</label>
            <select 
              value={algo} 
              onChange={e => setAlgo(e.target.value as AlgorithmType)}
              className="px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 bg-white"
            >
              <option value="fibonacci">Fibonacci(n)</option>
              <option value="factorial">Factorial(n)</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <label className="font-bold text-slate-700">N Değeri:</label>
            <input 
              type="number" 
              min={0}
              max={8}
              value={inputVal} 
              onChange={e => setInputVal(Math.min(8, Math.max(0, parseInt(e.target.value || '0', 10))))}
              className="w-20 px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 font-mono"
            />
            <span className="text-xs text-slate-400">(Max: 8)</span>
          </div>

        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row">
        
        {/* Left: Call Stack Visualizer */}
        <div className="w-full lg:w-1/3 bg-slate-800 p-6 flex flex-col border-b lg:border-b-0 lg:border-r border-slate-700">
          <h4 className="text-slate-300 font-bold uppercase tracking-wider text-xs mb-4">Call Stack (Çağrı Yığını)</h4>
          <div className="flex-1 flex flex-col-reverse gap-2 overflow-y-auto">
            {activeStack.length === 0 ? (
              <div className="text-slate-500 italic text-sm text-center my-10">Stack boş.</div>
            ) : (
              activeStack.map((stackItem, idx) => (
                <div key={idx} className="bg-slate-700 border border-slate-600 rounded-lg p-3 shadow-sm animate-fade-in">
                  <div className="text-indigo-400 font-mono font-bold text-sm">
                    {stackItem.name}({stackItem.args.join(', ')})
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    Node ID: {stackItem.nodeId}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right: Trace Events & Player */}
        <div className="w-full lg:w-2/3 p-6 flex flex-col bg-slate-50/50">
          
          <div className="flex justify-between items-center mb-6">
            <h4 className="font-bold text-slate-700">İşlem Adımları (Trace)</h4>
            
            {/* Player Controls */}
            <div className="flex items-center gap-2 bg-white px-2 py-1.5 rounded-xl shadow-sm border border-slate-200">
              <button onClick={handleReset} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-600">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" /></svg>
              </button>
              <button 
                onClick={handlePlayPause} 
                className="px-4 py-1.5 rounded-lg font-bold text-white transition-colors bg-indigo-600 hover:bg-indigo-700"
              >
                {isPlaying ? 'Pause' : 'Play'}
              </button>
              <button 
                onClick={() => setCurrentStep(s => Math.min(s + 1, simulation?.events.length || 0))} 
                disabled={currentStep >= (simulation?.events.length || 0)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-600 disabled:opacity-50"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.334-4z" /></svg>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto bg-white rounded-xl border border-slate-200 p-4 font-mono text-sm space-y-2 max-h-[400px]">
            {visibleEvents.length === 0 ? (
              <div className="text-slate-400 italic">Başlatmak için Play tuşuna basın.</div>
            ) : (
              visibleEvents.map((ev, i) => (
                <div key={i} className={`p-3 rounded-lg border flex gap-3 ${
                  ev.type === 'CALL' 
                    ? 'bg-blue-50 border-blue-100 text-blue-800' 
                    : 'bg-emerald-50 border-emerald-100 text-emerald-800'
                }`}>
                  <span className="font-bold opacity-50 w-6">{(i + 1).toString().padStart(2, '0')}</span>
                  <span className="font-bold w-12">{ev.type}</span>
                  <span>{ev.message}</span>
                </div>
              ))
            )}
            {simulation && currentStep >= simulation.events.length && (
              <div className="p-3 mt-4 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-900 font-bold flex justify-between items-center">
                <span>SIMULATION COMPLETE</span>
                <span className="text-lg">Final Result = {simulation.finalResult}</span>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
