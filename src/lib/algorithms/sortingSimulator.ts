import { ArrayElement, SortingFrame } from '../types/sorting';

const createInitialElements = (arr: number[]): ArrayElement[] => {
  return arr.map((val, idx) => ({ id: `el-${val}-${idx}`, value: val, state: 'default' }));
};

const copyElements = (elements: ArrayElement[]): ArrayElement[] => {
  return elements.map(e => ({ ...e }));
};

export const simulateSelectionSort = (initialArray: number[]): SortingFrame[] => {
  const frames: SortingFrame[] = [];
  const elements = createInitialElements(initialArray);
  let step = 0;
  let swapCount = 0;

  frames.push({ stepNumber: step++, swapCount, elements: copyElements(elements), explanation: "Başlangıç dizisi.", activeLineIndex: 0 });

  for (let i = 0; i < elements.length - 1; i++) {
    let minIdx = i;
    frames.push({ stepNumber: step++, swapCount, elements: copyElements(elements), explanation: `i = ${i}, min_idx = ${i} atanıyor.`, activeLineIndex: 3 });
    
    for (let j = i + 1; j < elements.length; j++) {
      elements[minIdx].state = 'comparing';
      elements[j].state = 'comparing';
      frames.push({
        stepNumber: step++,
        swapCount,
        elements: copyElements(elements),
        explanation: `${elements[j].value} ile şu anki en küçük ${elements[minIdx].value} karşılaştırılıyor.`,
        activeLineIndex: 5 // if (arr[j] < arr[min_idx])
      });

      if (elements[j].value < elements[minIdx].value) {
        elements[minIdx].state = 'default';
        minIdx = j;
        elements[minIdx].state = 'comparing';
        frames.push({
          stepNumber: step++,
          swapCount,
          elements: copyElements(elements),
          explanation: `Yeni minimum ${elements[minIdx].value} bulundu.`,
          activeLineIndex: 6 // min_idx = j;
        });
      } else {
        elements[j].state = 'default';
      }
    }

    if (minIdx !== i) {
      swapCount++;
      elements[i].state = 'swapping';
      elements[minIdx].state = 'swapping';
      frames.push({
        stepNumber: step++,
        swapCount,
        elements: copyElements(elements),
        explanation: `En küçük eleman ${elements[minIdx].value}, ${elements[i].value} ile takas ediliyor.`,
        activeLineIndex: 10 // swap(&arr[min_idx], &arr[i]);
      });

      const temp = elements[i];
      elements[i] = elements[minIdx];
      elements[minIdx] = temp;
    }

    elements[i].state = 'sorted';
    if (minIdx !== i) elements[minIdx].state = 'default';
    
    frames.push({
      stepNumber: step++,
      swapCount,
      elements: copyElements(elements),
      explanation: `${elements[i].value} sıralandı ve yerine oturdu.`,
      activeLineIndex: 12 // end of outer loop
    });
  }
  
  // Last element is implicitly sorted
  if(elements.length > 0) elements[elements.length - 1].state = 'sorted';
  frames.push({ stepNumber: step++, swapCount, elements: copyElements(elements), explanation: "Dizi tamamen sıralandı.", activeLineIndex: 13 });

  return frames;
};

export const simulateBubbleSort = (initialArray: number[]): SortingFrame[] => {
  const frames: SortingFrame[] = [];
  const elements = createInitialElements(initialArray);
  let step = 0;
  let swapCount = 0;

  frames.push({ stepNumber: step++, swapCount, elements: copyElements(elements), explanation: "Başlangıç dizisi.", activeLineIndex: 0 });

  const n = elements.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      elements[j].state = 'comparing';
      elements[j+1].state = 'comparing';
      frames.push({
        stepNumber: step++,
        swapCount,
        elements: copyElements(elements),
        explanation: `Yan yana duran ${elements[j].value} ve ${elements[j+1].value} karşılaştırılıyor.`,
        activeLineIndex: 4 // if (arr[j] > arr[j + 1])
      });

      if (elements[j].value > elements[j+1].value) {
        swapCount++;
        elements[j].state = 'swapping';
        elements[j+1].state = 'swapping';
        frames.push({
          stepNumber: step++,
          swapCount,
          elements: copyElements(elements),
          explanation: `${elements[j].value} daha büyük olduğu için sağa itiliyor (takas).`,
          activeLineIndex: 5 // swap(&arr[j], &arr[j + 1]);
        });

        const temp = elements[j];
        elements[j] = elements[j+1];
        elements[j+1] = temp;
      }

      elements[j].state = 'default';
      elements[j+1].state = 'default';
    }
    elements[n - i - 1].state = 'sorted';
    frames.push({
      stepNumber: step++,
      swapCount,
      elements: copyElements(elements),
      explanation: `En büyük eleman ${elements[n - i - 1].value} en sağa yerleşti.`,
      activeLineIndex: 8 // end of inner loop
    });
  }
  if(elements.length > 0) elements[0].state = 'sorted';
  frames.push({ stepNumber: step++, swapCount, elements: copyElements(elements), explanation: "Dizi tamamen sıralandı.", activeLineIndex: 10 });

  return frames;
};

export const simulateInsertionSort = (initialArray: number[]): SortingFrame[] => {
  const frames: SortingFrame[] = [];
  const elements = createInitialElements(initialArray);
  let step = 0;
  let swapCount = 0;

  frames.push({ stepNumber: step++, swapCount, elements: copyElements(elements), explanation: "Başlangıç dizisi.", activeLineIndex: 0 });
  if(elements.length > 0) elements[0].state = 'sorted'; // First element is conceptually sorted

  const n = elements.length;
  for (let i = 1; i < n; i++) {
    elements[i].state = 'comparing';
    frames.push({ stepNumber: step++, swapCount, elements: copyElements(elements), explanation: `${elements[i].value} seçildi.`, activeLineIndex: 4 });
    
    let j = i - 1;
    // We visually swap elements down instead of purely assigning to demonstrate the shift
    while (j >= 0 && elements[j].value > elements[j+1].value) {
       swapCount++;
       elements[j].state = 'swapping';
       elements[j+1].state = 'swapping';
       frames.push({ stepNumber: step++, swapCount, elements: copyElements(elements), explanation: `${elements[j].value} daha büyük, sağa kaydırılıyor.`, activeLineIndex: 6 });
       
       const temp = elements[j];
       elements[j] = elements[j+1];
       elements[j+1] = temp;
       
       elements[j].state = 'comparing';
       elements[j+1].state = 'sorted';
       frames.push({ stepNumber: step++, swapCount, elements: copyElements(elements), explanation: `Kaydırma yapıldı.`, activeLineIndex: 7 });
       j--;
    }
    
    elements[j+1].state = 'sorted';
    frames.push({ stepNumber: step++, swapCount, elements: copyElements(elements), explanation: `Eleman doğru yerine yerleştirildi.`, activeLineIndex: 9 });
  }

  frames.push({ stepNumber: step++, swapCount, elements: copyElements(elements), explanation: "Dizi tamamen sıralandı.", activeLineIndex: 11 });
  return frames;
};

export const simulateMergeSort = (initialArray: number[]): SortingFrame[] => {
  const frames: SortingFrame[] = [];
  const elements = createInitialElements(initialArray);
  let step = 0;
  let swapCount = 0;

  frames.push({ stepNumber: step++, swapCount, elements: copyElements(elements), explanation: "Başlangıç dizisi.", activeLineIndex: 0 });

  const doMerge = (arr: ArrayElement[], l: number, m: number, r: number) => {
    // In-place merge simulation for visualizer
    let i = l, j = m + 1;
    while (i <= m && j <= r) {
      arr[i].state = 'comparing';
      arr[j].state = 'comparing';
      frames.push({ stepNumber: step++, elements: copyElements(arr), explanation: `Birleştirme: ${arr[i].value} ile ${arr[j].value} karşılaştırılıyor.`, activeLineIndex: 6 }); // merge()
      
      if (arr[i].value <= arr[j].value) {
        arr[i].state = 'sorted';
        i++;
      } else {
        const val = arr[j];
        for (let k = j; k > i; k--) {
          arr[k] = arr[k - 1];
        }
        swapCount++;
        arr[i] = val;
        arr[i].state = 'sorted';
        i++; m++; j++;
      }
      frames.push({ stepNumber: step++, elements: copyElements(arr), explanation: `Eleman yerleşti.`, activeLineIndex: 6 });
    }
    for(let k = l; k <= r; k++) arr[k].state = 'default';
  };

  const mergeSort = (arr: ArrayElement[], l: number, r: number) => {
    if (l < r) {
      const m = Math.floor(l + (r - l) / 2);
      frames.push({ stepNumber: step++, elements: copyElements(arr), explanation: `Bölme: low=${l}, high=${r}, mid=${m}`, activeLineIndex: 2 }); // int m = ...
      mergeSort(arr, l, m);
      frames.push({ stepNumber: step++, elements: copyElements(arr), explanation: `Sol yarı sıralandı.`, activeLineIndex: 3 }); // mergeSort(l, m)
      mergeSort(arr, m + 1, r);
      frames.push({ stepNumber: step++, elements: copyElements(arr), explanation: `Sağ yarı sıralandı. Şimdi birleşecekler.`, activeLineIndex: 4 }); // mergeSort(m+1, r)
      doMerge(arr, l, m, r);
    }
  };

  mergeSort(elements, 0, elements.length - 1);
  elements.forEach(e => e.state = 'sorted');
  frames.push({ stepNumber: step++, swapCount, elements: copyElements(elements), explanation: "Dizi tamamen sıralandı.", activeLineIndex: 8 });

  return frames;
};

export const simulateQuickSort = (initialArray: number[]): SortingFrame[] => {
  const frames: SortingFrame[] = [];
  const elements = createInitialElements(initialArray);
  let step = 0;
  let swapCount = 0;

  frames.push({ stepNumber: step++, swapCount, elements: copyElements(elements), explanation: "Başlangıç dizisi.", activeLineIndex: 0 });

  const partition = (arr: ArrayElement[], low: number, high: number): number => {
    const pivot = arr[high].value;
    arr[high].state = 'comparing'; // highlight pivot
    frames.push({ stepNumber: step++, elements: copyElements(arr), explanation: `Pivot seçildi: ${pivot}`, activeLineIndex: 2 });
    
    let i = (low - 1);
    for (let j = low; j <= high - 1; j++) {
      arr[j].state = 'comparing';
      frames.push({ stepNumber: step++, elements: copyElements(arr), explanation: `${arr[j].value} ile pivot (${pivot}) karşılaştırılıyor.`, activeLineIndex: 2 });
      if (arr[j].value < pivot) {
        i++;
        swapCount++;
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        frames.push({ stepNumber: step++, elements: copyElements(arr), explanation: `${arr[i].value} pivottan küçük, sola atıldı.`, activeLineIndex: 2 });
      }
      arr[j].state = 'default';
    }
    swapCount++;
    const temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    
    arr[i + 1].state = 'sorted'; // Pivot is in its final place
    frames.push({ stepNumber: step++, elements: copyElements(arr), explanation: `Pivot (${pivot}) kesin yerine yerleşti.`, activeLineIndex: 2 });
    return (i + 1);
  };

  const quickSort = (arr: ArrayElement[], low: number, high: number) => {
    if (low < high) {
      const pi = partition(arr, low, high);
      frames.push({ stepNumber: step++, elements: copyElements(arr), explanation: `Sol yarı sıralanacak.`, activeLineIndex: 3 });
      quickSort(arr, low, pi - 1);
      frames.push({ stepNumber: step++, elements: copyElements(arr), explanation: `Sağ yarı sıralanacak.`, activeLineIndex: 4 });
      quickSort(arr, pi + 1, high);
    } else if (low === high) {
      arr[low].state = 'sorted';
    }
  };

  quickSort(elements, 0, elements.length - 1);
  elements.forEach(e => e.state = 'sorted');
  frames.push({ stepNumber: step++, swapCount, elements: copyElements(elements), explanation: "Dizi tamamen sıralandı.", activeLineIndex: 6 });

  return frames;
};

export const getSortingFrames = (arr: number[], algo: string): SortingFrame[] => {
  switch(algo) {
    case 'selection': return simulateSelectionSort(arr);
    case 'bubble': return simulateBubbleSort(arr);
    case 'insertion': return simulateInsertionSort(arr);
    case 'merge': return simulateMergeSort(arr);
    case 'quick': return simulateQuickSort(arr);
    default: return simulateSelectionSort(arr);
  }
};
