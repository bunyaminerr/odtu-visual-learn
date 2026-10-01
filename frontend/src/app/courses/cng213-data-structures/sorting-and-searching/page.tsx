"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { TimeComplexityTable, ComplexityRow } from '../../../../components/visualizers/shared/TimeComplexityTable';
import { AlgorithmType, SortingFrame } from '../../../../lib/types/sorting';
import { getSortingFrames } from '../../../../lib/algorithms/sortingSimulator';
import { simulateLinearSearch, simulateBinarySearch } from '../../../../lib/algorithms/searchingSimulator';
import { ControlPanel } from './ControlPanel';
import { SortingVisualizer } from './SortingVisualizer';
import { SearchingVisualizer } from './SearchingVisualizer';
import { TimeTravelControls } from '../../../../components/visualizers/shared/TimeTravelControls';

import { AlgorithmCodePanel } from './AlgorithmCodePanel';

const generateRandomArray = (size = 15, max = 99) => 
  Array.from({ length: size }, () => Math.floor(Math.random() * max) + 1);

export default function SortingAndSearchingPage() {
  const [algorithm, setAlgorithm] = useState<AlgorithmType>('selection');
  const [initialArray, setInitialArray] = useState<number[]>([]);
  const [frames, setFrames] = useState<SortingFrame[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  // Initialize random array on mount
  useEffect(() => {
    handleRandomize();
  }, []);

  const handleRandomize = (size?: number) => {
    const defaultSize = algorithm === 'binary' || algorithm === 'linear' ? 10 : 15;
    const newArr = generateRandomArray(size || defaultSize);
    setInitialArray(newArr);
    setCurrentStep(0);
  };

  const handleCustomArray = (arr: number[]) => {
    if(arr.length > 0) {
      setInitialArray(arr);
      setCurrentStep(0);
    }
  };

  // Recalculate frames whenever algorithm or initial array changes
  useEffect(() => {
    if (initialArray.length === 0) return;
    
    let newFrames: SortingFrame[] = [];
    if (algorithm === 'linear') {
      const target = Math.random() > 0.3 ? initialArray[Math.floor(Math.random() * initialArray.length)] : 101;
      newFrames = simulateLinearSearch(initialArray, target);
    } else if (algorithm === 'binary') {
      const sortedArr = [...initialArray].sort((a,b)=>a-b);
      const target = Math.random() > 0.3 ? sortedArr[Math.floor(Math.random() * sortedArr.length)] : 101;
      newFrames = simulateBinarySearch(initialArray, target);
    } else {
      newFrames = getSortingFrames(initialArray, algorithm);
    }
    
    setFrames(newFrames);
    setCurrentStep(0);
  }, [algorithm, initialArray]);

  const currentFrame = frames[currentStep];
  const isSorting = !['linear', 'binary'].includes(algorithm);

  return (
    <div className="flex flex-col h-full min-h-[80vh]">
      
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-extrabold text-[#051F20] tracking-tight mb-2">
          Sorting & Searching Visualizer
        </h2>
        <p className="text-slate-600">
          Algoritmaların mantığını adım adım izleyin. Sıralama algoritmalarında çubukların takasını, arama algoritmalarında ise arama uzayının nasıl daraldığını gözlemleyin.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Main Layout: Two Columns on large screens */}
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* LEFT COLUMN: Visualizer + Code Panel */}
          <div className="flex-1 flex flex-col gap-6">
            
            {/* Hero Visualizer Canvas */}
            <div className="flex flex-col bg-[#F2F7F4] border border-[#8EB69B]/40 rounded-2xl p-4 shadow-inner relative overflow-hidden h-fit">
              {/* Main Visual Area */}
              <div className="w-full flex items-center justify-center min-h-[250px] py-4">
                {currentFrame && (
                  isSorting ? (
                    <SortingVisualizer elements={currentFrame.elements} />
                  ) : (
                    <SearchingVisualizer elements={currentFrame.elements} frame={currentFrame} />
                  )
                )}
              </div>

              {/* Bottom Dock: TimeTravelControls */}
              <div className="mt-2 flex justify-center">
                 {frames.length > 0 && (
                    <div className="w-full max-w-xl">
                      <TimeTravelControls
                        currentStep={currentStep}
                        totalSteps={frames.length}
                        onStepChange={setCurrentStep}
                        extraInfo={isSorting && currentFrame?.swapCount !== undefined ? `Takas: ${currentFrame.swapCount}` : undefined}
                      />
                    </div>
                 )}
              </div>
            </div>

            {/* Code Walkthrough Panel */}
            {currentFrame && (
              <AlgorithmCodePanel 
                algorithm={algorithm} 
                activeLineIndex={currentFrame.activeLineIndex} 
              />
            )}
          </div>

          {/* RIGHT COLUMN: Compact Control Panel */}
          <div className="flex-shrink-0">
            <ControlPanel
              algorithm={algorithm}
              setAlgorithm={setAlgorithm}
              onRandomize={handleRandomize}
              onCustomArray={handleCustomArray}
              explanation={currentFrame?.explanation || "Hazırlanıyor..."}
            />
          </div>
        </div>
      </div>

      {/* Time Complexity Section */}
      <TimeComplexityTable rows={[
        { category: 'Sıralama', operation: 'Bubble Sort', best: 'O(N)', average: 'O(N²)', worst: 'O(N²)', space: 'O(1)', reason: 'Her geçişte komşu elemanlar karşılaştırılır; en iyi durum zaten sıralı listede tek geçiş yeterlidir.' },
        { category: 'Sıralama', operation: 'Insertion Sort', best: 'O(N)', average: 'O(N²)', worst: 'O(N²)', space: 'O(1)', reason: 'Zaten sıralı dizide her eleman bir kez kontrol edilir; ters sıralı dizide her eleman tüm geçmiş elemanlarla karşılaştırılır.' },
        { category: 'Sıralama', operation: 'Selection Sort', best: 'O(N²)', average: 'O(N²)', worst: 'O(N²)', space: 'O(1)', reason: 'Her adımda minimum eleman için tüm kalan dizi taranmak zorundadır; düzen fark etmez.' },
        { category: 'Sıralama', operation: 'Merge Sort', best: 'O(N log N)', average: 'O(N log N)', worst: 'O(N log N)', space: 'O(N)', reason: 'Her seviyede N karşılaştırma var ve log N seviye vardır; ekstra dizi alani gerektirir.' },
        { category: 'Sıralama', operation: 'Quick Sort', best: 'O(N log N)', average: 'O(N log N)', worst: 'O(N²)', space: 'O(log N)', reason: 'Pivot iyi seçilirse bölünmeler dengeli olur; en kötü durumda pivot hep min/max olur.' },
        { category: 'Arama', operation: 'Linear Search (Doğrusal Arama)', best: 'O(1)', average: 'O(N)', worst: 'O(N)', space: 'O(1)', reason: 'Aranan eleman en baştaysa sabit; en sonda veya hiç yoksa tüm dizi taranmak zorundadır.' },
        { category: 'Arama', operation: 'Binary Search (İkili Arama)', best: 'O(1)', average: 'O(log N)', worst: 'O(log N)', space: 'O(1)', reason: 'Her adımda arama alanı yarıya iner; sadece SİRALI dizilerde çalışır.' },
      ] as ComplexityRow[]} />
    </div>
  );
}
