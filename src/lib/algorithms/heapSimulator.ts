import { HeapNodeState, HeapRecord, HeapStep, HeapPointers, HeapMode } from '../types/heap';

export const cCodeHeap = `void InsertPriorityQueue(int val, PriorityQueue h) {
    int i;
    if (IsFullPriorityQueue(h)) return;
    
    // Percolate up
    for (i = ++h->size; i > 1 && (h->elements[i/2] > val); i /= 2) {
        h->elements[i] = h->elements[i/2];
    }
    h->elements[i] = val;
}

int DeletePriorityQueue(PriorityQueue h) {
    int i, child, minElement, lastElement;
    if (IsEmptyPriorityQueue(h)) return h->elements[0];
    
    minElement = h->elements[1];
    lastElement = h->elements[h->size--];
    
    // Percolate down
    for (i = 1; i * 2 <= h->size; i = child) {
        child = i * 2;
        if (child != h->size && h->elements[child+1] < h->elements[child])
            child++; // right child is smaller
            
        if (lastElement > h->elements[child])
            h->elements[i] = h->elements[child];
        else
            break;
    }
    h->elements[i] = lastElement;
    return minElement;
}

void Heapify(int a[], int i, int n) {
    int child, tmp;
    for (tmp = a[i]; i * 2 <= n; i = child) {
        child = i * 2;
        if (child != n && a[child+1] < a[child])
            child++;
        if (tmp > a[child])
            a[i] = a[child];
        else
            break;
    }
    a[i] = tmp;
}

void BuildPriorityQueue(int n, int a[]) {
    // ... initialize elements ...
    for (int i = n / 2; i > 0; i--) {
        Heapify(h->elements, i, n);
    }
}`;

const cloneNodes = (n: HeapNodeState[]) => JSON.parse(JSON.stringify(n));
const cloneRecord = (r: HeapRecord) => ({ ...r });

const shouldSwap = (parentVal: number, childVal: number, mode: HeapMode) => {
  if (mode === 'min') return parentVal > childVal;
  return parentVal < childVal; // max heap
};

export const simulateHeapInsert = (
  initialNodes: HeapNodeState[],
  initialRecord: HeapRecord,
  val: number
): HeapStep[] => {
  const frames: HeapStep[] = [];
  const nodes = cloneNodes(initialNodes);
  const record = cloneRecord(initialRecord);
  const pointers: HeapPointers = { i: null, child: null, parent: null, tmp: null };
  const activePointers: string[] = [];
  let step = 0;

  const pushFrame = (title: string, exp: string, line: number | null) => {
    frames.push({
      stepNumber: step++, title, explanation: exp, activeCodeLine: line,
      cCode: cCodeHeap, nodes: cloneNodes(nodes), record: cloneRecord(record),
      pointers: { ...pointers }, activePointers: [...activePointers]
    });
  };

  pushFrame("Başlangıç", `Insert(${val}) işlemi başlatıldı.`, 1);

  if (record.size >= record.capacity) {
    pushFrame("Kapasite Dolu", "Heap kapasitesi dolu, ekleme yapılamaz.", 3);
    return frames;
  }

  record.size++;
  const newIndex = record.size;
  
  // Create a hole at the end
  const newNode: HeapNodeState = {
    id: `node_${Date.now()}_${Math.random()}`,
    val: val,
    index: newIndex,
    isTemp: true // Mark as temp while percolating
  };
  nodes.push(newNode);
  
  pointers.i = newIndex;
  activePointers.push('i');
  pushFrame("Eleman Eklendi", `Dizinin sonuna (i=${newIndex}) eleman geçici olarak eklendi.`, 6);

  let i = newIndex;
  
  while (i > 1) {
    const parentIndex = Math.floor(i / 2);
    pointers.parent = parentIndex;
    if (!activePointers.includes('parent')) activePointers.push('parent');
    
    const parentNode = nodes.find((n: any) => n.index === parentIndex)!;
    
    pushFrame("Karşılaştırma (Percolate Up)", `Ebeveyn (index: ${parentIndex}, değer: ${parentNode.val}) ile yeni değer (${val}) karşılaştırılıyor.`, 6);

    if (shouldSwap(parentNode.val, val, record.mode)) {
      pushFrame("Yer Değiştirme (Swap)", `${record.mode === 'min' ? 'Ebeveyn daha büyük' : 'Ebeveyn daha küçük'}, yer değiştirilecek.`, 7);
      
      // We physically swap their indices for the array representation
      const currentNode = nodes.find((n: any) => n.index === i)!;
      
      currentNode.index = parentIndex;
      parentNode.index = i;
      
      i = parentIndex;
      pointers.i = i;
      pushFrame("İndeks Güncellendi", `i işaretçisi ${i} oldu. İşlem devam ediyor.`, 6);
    } else {
      pushFrame("Koşul Sağlandı", `Ebeveynin değeri uygun, Percolate Up bitti.`, 9);
      break;
    }
  }

  const finalNode = nodes.find((n: any) => n.index === i)!;
  finalNode.isTemp = false;
  finalNode.isTarget = true;
  
  pointers.i = null;
  pointers.parent = null;
  activePointers.length = 0;
  pushFrame("Bitiş", `Değer nihai yerine (${i}. indeks) yerleştirildi.`, 10);
  
  finalNode.isTarget = false;
  return frames;
};

export const simulateHeapDelete = (
  initialNodes: HeapNodeState[],
  initialRecord: HeapRecord
): HeapStep[] => {
  const frames: HeapStep[] = [];
  const nodes = cloneNodes(initialNodes);
  const record = cloneRecord(initialRecord);
  const pointers: HeapPointers = { i: null, child: null, parent: null, tmp: null };
  const activePointers: string[] = [];
  let step = 0;

  const pushFrame = (title: string, exp: string, line: number | null) => {
    frames.push({
      stepNumber: step++, title, explanation: exp, activeCodeLine: line,
      cCode: cCodeHeap, nodes: cloneNodes(nodes), record: cloneRecord(record),
      pointers: { ...pointers }, activePointers: [...activePointers]
    });
  };

  pushFrame("Başlangıç", `Delete ${record.mode === 'min' ? 'Min' : 'Max'} işlemi başlatıldı.`, 13);

  if (record.size === 0) {
    pushFrame("Heap Boş", "Silinecek eleman yok.", 14);
    return frames;
  }

  const rootNode = nodes.find((n: any) => n.index === 1)!;
  rootNode.isTarget = true;
  pushFrame("Kök Siliniyor", `Kök eleman (${rootNode.val}) silinmek üzere işaretlendi.`, 16);

  const lastNode = nodes.find((n: any) => n.index === record.size)!;
  lastNode.isTemp = true;
  
  pushFrame("Son Eleman Alınıyor", `Dizideki son eleman (${lastNode.val}) geçici olarak hafızaya alındı.`, 17);
  
  // Remove root node from array
  const rootIndexInArr = nodes.findIndex((n: any) => n.index === 1);
  nodes.splice(rootIndexInArr, 1);
  
  record.size--;
  if (record.size === 0) {
    // We just removed the only element
    pushFrame("Bitiş", "Heap tamamen boşaldı.", 29);
    return frames;
  }

  // Move last node to root
  lastNode.index = 1;
  pointers.i = 1;
  activePointers.push('i');
  pushFrame("Kök Değişimi", `Son eleman köke (index: 1) taşındı. Şimdi aşağı kaydırma (Percolate Down) başlayacak.`, 20);

  let i = 1;
  
  while (i * 2 <= record.size) {
    let childIndex = i * 2;
    pointers.child = childIndex;
    if (!activePointers.includes('child')) activePointers.push('child');
    
    pushFrame("Çocuk Kontrolü", `Sol çocuk (index: ${childIndex}) kontrol ediliyor.`, 21);

    // If there is a right child, see if it is "better" than the left child
    if (childIndex != record.size) {
      const leftChild = nodes.find((n: any) => n.index === childIndex)!;
      const rightChild = nodes.find((n: any) => n.index === childIndex + 1)!;
      
      let chooseRight = false;
      if (record.mode === 'min' && rightChild.val < leftChild.val) chooseRight = true;
      if (record.mode === 'max' && rightChild.val > leftChild.val) chooseRight = true;
      
      if (chooseRight) {
        childIndex++;
        pointers.child = childIndex;
        pushFrame("Sağ Çocuk Daha Uygun", `Sağ çocuğun değeri (${rightChild.val}) sol çocuktan (${leftChild.val}) daha uygun olduğu için sağ çocuk seçildi.`, 23);
      }
    }

    const childNode = nodes.find((n: any) => n.index === childIndex)!;
    const currentNode = nodes.find((n: any) => n.index === i)!;
    
    pushFrame("Karşılaştırma", `Geçici değer (${currentNode.val}) ile seçilen çocuk (${childNode.val}) karşılaştırılıyor.`, 25);

    if (shouldSwap(currentNode.val, childNode.val, record.mode)) {
      pushFrame("Yer Değiştirme (Swap)", `Kural bozulduğu için çocuk ile yer değiştiriliyor.`, 26);
      
      currentNode.index = childIndex;
      childNode.index = i;
      
      i = childIndex;
      pointers.i = i;
      pushFrame("İndeks Güncellendi", `i işaretçisi ${i} oldu. Percolate Down devam ediyor.`, 20);
    } else {
      pushFrame("Koşul Sağlandı", `Geçici değer yerini buldu. Percolate Down bitti.`, 28);
      break;
    }
  }

  const finalNode = nodes.find((n: any) => n.index === i)!;
  finalNode.isTemp = false;
  finalNode.isTarget = true;
  
  pointers.i = null;
  pointers.child = null;
  activePointers.length = 0;
  pushFrame("Bitiş", `Değer nihai yerine (${i}. indeks) oturdu.`, 30);
  
  finalNode.isTarget = false;
  finalNode.isTarget = false;
  return frames;
};

export const simulateBuildHeap = (
  initialNodes: HeapNodeState[],
  initialRecord: HeapRecord,
  arr: number[]
): HeapStep[] => {
  const frames: HeapStep[] = [];
  const record = cloneRecord(initialRecord);
  const pointers: HeapPointers = { i: null, child: null, parent: null, tmp: null };
  const activePointers: string[] = [];
  let step = 0;

  record.size = Math.min(arr.length, record.capacity);
  const nodes: HeapNodeState[] = arr.slice(0, record.size).map((val, idx) => ({
    id: `node_init_${idx}`,
    val,
    index: idx + 1
  }));

  const pushFrame = (title: string, exp: string, line: number | null) => {
    frames.push({
      stepNumber: step++, title, explanation: exp, activeCodeLine: line,
      cCode: cCodeHeap, nodes: cloneNodes(nodes), record: cloneRecord(record),
      pointers: { ...pointers }, activePointers: [...activePointers]
    });
  };

  pushFrame("Build Heap Başladı", "Dizi elemanları sırayla yerleştirildi. Şimdi sondan başa doğru (N/2'den 1'e) Heapify işlemi yapılacak.", 42);

  for (let rootIndex = Math.floor(record.size / 2); rootIndex > 0; rootIndex--) {
    let i = rootIndex;
    pointers.i = i;
    activePointers.push('i');
    pushFrame(`Heapify (i=${i})`, `${i}. indeks için Heapify (Aşağı Kaydırma) başlatıldı.`, 44);

    while (i * 2 <= record.size) {
      let childIndex = i * 2;
      pointers.child = childIndex;
      if (!activePointers.includes('child')) activePointers.push('child');

      if (childIndex != record.size) {
        const leftChild = nodes.find((n: any) => n.index === childIndex)!;
        const rightChild = nodes.find((n: any) => n.index === childIndex + 1)!;
        
        let chooseRight = false;
        if (record.mode === 'min' && rightChild.val < leftChild.val) chooseRight = true;
        if (record.mode === 'max' && rightChild.val > leftChild.val) chooseRight = true;
        
        if (chooseRight) {
          childIndex++;
          pointers.child = childIndex;
        }
      }

      const childNode = nodes.find((n: any) => n.index === childIndex)!;
      const currentNode = nodes.find((n: any) => n.index === i)!;
      
      if (shouldSwap(currentNode.val, childNode.val, record.mode)) {
        pushFrame("Yer Değiştirme (Swap)", `Kural bozulduğu için çocuk ile yer değiştiriliyor.`, 39);
        currentNode.index = childIndex;
        childNode.index = i;
        
        i = childIndex;
        pointers.i = i;
      } else {
        pushFrame("Koşul Sağlandı", `Heapify tamamlandı.`, 40);
        break;
      }
    }
    pointers.i = null;
    pointers.child = null;
    activePointers.length = 0;
  }

  pushFrame("Bitiş", "Build Heap işlemi tamamlandı.", 46);
  return frames;
};
