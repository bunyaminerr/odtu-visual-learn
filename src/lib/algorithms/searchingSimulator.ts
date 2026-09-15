import { ArrayElement, SortingFrame } from '../types/sorting';

const createInitialElements = (arr: number[]): ArrayElement[] => {
  return arr.map((val, idx) => ({ id: `el-${val}-${idx}`, value: val, state: 'default' }));
};

const copyElements = (elements: ArrayElement[]): ArrayElement[] => {
  return elements.map(e => ({ ...e }));
};

export const simulateLinearSearch = (initialArray: number[], target: number): SortingFrame[] => {
  const frames: SortingFrame[] = [];
  const elements = createInitialElements(initialArray);
  let step = 0;

  frames.push({ stepNumber: step++, elements: copyElements(elements), explanation: `Arama başlıyor. Hedef: ${target}`, activeLineIndex: 0 });

  for (let i = 0; i < elements.length; i++) {
    elements[i].state = 'comparing';
    frames.push({
      stepNumber: step++,
      elements: copyElements(elements),
      explanation: `İndeks ${i} kontrol ediliyor. Değer: ${elements[i].value}. Hedef ${target} ile aynı mı?`,
      activeLineIndex: 2 // if (arr[i] == x)
    });

    if (elements[i].value === target) {
      elements[i].state = 'found';
      frames.push({
        stepNumber: step++,
        elements: copyElements(elements),
        explanation: `Hedef ${target} bulundu! Arama sona erdi.`,
        activeLineIndex: 3 // return i;
      });
      return frames;
    } else {
      elements[i].state = 'eliminated';
      frames.push({
        stepNumber: step++,
        elements: copyElements(elements),
        explanation: `${elements[i].value} hedef değil. Sonraki elemana geçiliyor.`,
        activeLineIndex: 1 // for loop increment
      });
    }
  }

  frames.push({
    stepNumber: step++,
    elements: copyElements(elements),
    explanation: `Dizinin sonuna gelindi. Hedef ${target} bulunamadı.`,
    activeLineIndex: 6 // return -1;
  });

  return frames;
};

export const simulateBinarySearch = (initialArray: number[], target: number): SortingFrame[] => {
  const frames: SortingFrame[] = [];
  // Binary search requires sorted array
  const sortedArray = [...initialArray].sort((a, b) => a - b);
  const elements = createInitialElements(sortedArray);
  let step = 0;

  let low = 0;
  let high = elements.length - 1;

  frames.push({ 
    stepNumber: step++, 
    elements: copyElements(elements), 
    explanation: `Binary Search (İkili Arama) başlıyor. Hedef: ${target}. (Dizi sıralı olmalıdır)`,
    low, high,
    activeLineIndex: 0
  });

  while (low <= high) {
    frames.push({
      stepNumber: step++,
      elements: copyElements(elements),
      explanation: `Döngü koşulu kontrolü: low (${low}) <= high (${high}).`,
      low, high,
      activeLineIndex: 1 // while (low <= high)
    });

    const mid = Math.floor((low + high) / 2);
    
    // reset previous comparings
    elements.forEach(e => { if (e.state === 'comparing') e.state = 'default'; });
    
    elements[mid].state = 'comparing';
    
    frames.push({
      stepNumber: step++,
      elements: copyElements(elements),
      explanation: `Mid noktası: ${mid}. Değer: ${elements[mid].value} kontrol ediliyor.`,
      low, mid, high,
      activeLineIndex: 2 // int mid = low + (high - low) / 2;
    });

    frames.push({
      stepNumber: step++,
      elements: copyElements(elements),
      explanation: `Hedefe eşit mi?`,
      low, mid, high,
      activeLineIndex: 3 // if (arr[mid] == x)
    });

    if (elements[mid].value === target) {
      elements[mid].state = 'found';
      elements.forEach((e, idx) => { if (idx !== mid) e.state = 'eliminated'; });
      frames.push({
        stepNumber: step++,
        elements: copyElements(elements),
        explanation: `Hedef ${target} ${mid}. indekste bulundu!`,
        low, mid, high,
        activeLineIndex: 4 // return mid;
      });
      return frames;
    }

    frames.push({
      stepNumber: step++,
      elements: copyElements(elements),
      explanation: `Değer hedeften küçük mü?`,
      low, mid, high,
      activeLineIndex: 5 // if (arr[mid] < x)
    });

    if (elements[mid].value < target) {
      for(let i = low; i <= mid; i++) elements[i].state = 'eliminated';
      frames.push({
        stepNumber: step++,
        elements: copyElements(elements),
        explanation: `${elements[mid].value} hedeften küçük. Sol yarı elendi. Low = ${mid + 1} yapılıyor.`,
        low, mid, high,
        activeLineIndex: 6 // low = mid + 1;
      });
      low = mid + 1;
    } else {
      for(let i = mid; i <= high; i++) elements[i].state = 'eliminated';
      frames.push({
        stepNumber: step++,
        elements: copyElements(elements),
        explanation: `${elements[mid].value} hedeften büyük. Sağ yarı elendi. High = ${mid - 1} yapılıyor.`,
        low, mid, high,
        activeLineIndex: 8 // high = mid - 1;
      });
      high = mid - 1;
    }
  }

  frames.push({
    stepNumber: step++,
    elements: copyElements(elements),
    explanation: `Low > High oldu. Arama aralığı tükendi. Hedef ${target} bulunamadı.`,
    low, high,
    activeLineIndex: 10 // return -1;
  });

  return frames;
};
