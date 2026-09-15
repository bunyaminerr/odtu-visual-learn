"use client";

import React, { useState, useEffect } from 'react';
import { TimeComplexityTable, ComplexityRow } from '../../../../components/visualizers/shared/TimeComplexityTable';
import { MemoryVisualizer } from './components/MemoryVisualizer';
import { MemoryCodePanel } from './components/MemoryCodePanel';
import { TimeTravelControls } from './components/TimeTravelControls';

import { 
  getPointerBasicsSteps,
  getPointerArraySteps,
  getDynamicMemorySteps,
  getStructArraySteps
} from '../../../../lib/algorithms/memorySimulator';

const TABS = [
  { id: 'basics', label: '1. Temel Pointers & Adresler' },
  { id: 'arrays', label: '2. Diziler & Pointer Aritmetiği' },
  { id: 'dynamic', label: '3. Dinamik Bellek (malloc/free)' },
  { id: 'structs', label: '4. Struct Dizileri & Dinamik Bellek' }
];

export default function MemoryAndPointersPage() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const [currentStep, setCurrentStep] = useState(0);

  // Reset steps when tab changes
  useEffect(() => {
    setCurrentStep(0);
  }, [activeTab]);

  // Load the steps for the current tab
  const getActiveSteps = () => {
    switch (activeTab) {
      case 'basics': return getPointerBasicsSteps();
      case 'arrays': return getPointerArraySteps();
      case 'dynamic': return getDynamicMemorySteps();
      case 'structs': return getStructArraySteps();
      default: return getPointerBasicsSteps();
    }
  };

  const steps = getActiveSteps();
  const stepData = steps[currentStep];

  return (
    <div className="min-h-screen bg-[#F4F7F5] text-slate-800 font-sans">
      
      {/* Background Canvas (Micro Grid) */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: 0.4
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-[#051F20] tracking-tight mb-3">
            Pointers & Memory Management
          </h1>
          <p className="text-slate-600 max-w-3xl leading-relaxed">
            CNG 213 kaynak kodlarına (p1.c - p11.c) uygun olarak hazırlanmış Bellek Simülatörü. 
            Adım adım kod çalıştırarak bellekte (Stack ve Heap) olan biten her şeyi görsel olarak takip edebilirsiniz.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-slate-300/60 mb-6 overflow-x-auto pb-1">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-t-lg font-medium text-sm transition-colors whitespace-nowrap
                ${activeTab === tab.id 
                  ? 'bg-white text-[#235347] border-t border-x border-slate-200 shadow-sm relative top-[1px]' 
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Visualizer */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-[#F2F7F4]/80 backdrop-blur-sm border border-slate-200/60 p-6 rounded-2xl shadow-sm min-h-[500px]">
              <MemoryVisualizer step={stepData} />
            </div>

            <TimeTravelControls 
              currentStep={currentStep}
              totalSteps={steps.length}
              onNext={() => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1))}
              onPrev={() => setCurrentStep(prev => Math.max(prev - 1, 0))}
              onReset={() => setCurrentStep(0)}
            />
          </div>

          {/* Right Column: Code Panel */}
          <div className="h-full min-h-[500px] lg:min-h-0">
            <MemoryCodePanel 
              code={stepData.cCodeSnippet} 
              activeLineIndex={stepData.activeLineIndex} 
            />
          </div>
        </div>

      </div>

      {/* Time Complexity Section */}
      <TimeComplexityTable
        title="Bellek & Pointer İşlemleri Karmaşıklığı"
        rows={[
          { operation: 'Değişken Atama (int x = 5)', worst: 'O(1)', reason: "Derleme zamanında bilinen sabit boyutlu değer stack'e doğrudan yazılır." },
          { operation: 'Pointer Atama (p = &x)', worst: 'O(1)', reason: "Bellek adresi kaydedilir; başka işlem yapılmaz." },
          { operation: 'Dereference (*p)', worst: 'O(1)', reason: "Adresteki değer tek hamleyle okunur veya yazılır." },
          { operation: 'malloc(n * sizeof)', worst: 'O(N)', reason: "Heap'te N birimlik alan ayrılır; işletim sistemi bu alanları sıfırlamak zorunda kalabilir." },
          { operation: 'free(ptr)', worst: 'O(1)', reason: "Bellek yöneticisine blök iade edilir; yüksek seviyede O(1) olarak kabul edilir." },
          { operation: 'calloc(n, size)', worst: 'O(N)', reason: "malloc gibi yer ayırır, ancak ek olarak tüm byte'ları sıfırlar." },
          { operation: 'Pointer Aritmetiği (p + i)', worst: 'O(1)', reason: "Adres + offset hesaplaması CPU'da tek işlemde yapılır." },
          { operation: 'Dizi Erişimi arr[i]', worst: 'O(1)', reason: "arr + i * sizeof(T) hesabıyla doğrudan adrese gidilir." },
        ] as ComplexityRow[]}
      />
    </div>
  );
}
