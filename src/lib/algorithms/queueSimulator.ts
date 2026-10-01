import { 
  CngCircularQueue, 
  CngLinkedQueue, 
  CngQueueNode, 
  CngQueueFrame, 
  MIN_QUEUE_SIZE,
  RobotShopState
} from '../types/queue';

const generateAddress = () => '0x' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');

const cloneCircularQueue = (q: CngCircularQueue): CngCircularQueue => ({ ...q, array: [...q.array] });
const cloneLinkedNodes = (nodes: CngQueueNode[]): CngQueueNode[] => nodes.map(n => ({ ...n }));
const cloneLinkedRecord = (r: CngLinkedQueue): CngLinkedQueue => ({ ...r });

// ==========================================
// CIRCULAR ARRAY IMPLEMENTATION (Worksheet 7a)
// ==========================================

export const createInitialCircularQueue = (capacity: number = MIN_QUEUE_SIZE): CngCircularQueue => ({
  capacity,
  front: 1,
  rear: 0,
  size: 0,
  array: new Array(capacity).fill(null)
});

const succ = (value: number, capacity: number) => {
  if (++value === capacity) value = 0;
  return value;
};

export const simulateCircularEnqueue = (
  currentQueue: CngCircularQueue,
  val: number | string
): CngQueueFrame[] => {
  const frames: CngQueueFrame[] = [];
  let step = 0;
  const queue = cloneCircularQueue(currentQueue);

  const pushFrame = (exp: string, line: number) => {
    frames.push({
      stepIndex: step++,
      circularQueue: cloneCircularQueue(queue),
      explanation: exp,
      activeLineIndex: line,
      cCode: `void Enqueue(ElementType X, Queue Q) {\n  if( IsFull(Q) ) Error("Full queue");\n  else {\n    Q->Size++;\n    Q->Rear = Succ(Q->Rear, Q);\n    Q->Array[Q->Rear] = X;\n  }\n}`
    });
  };

  pushFrame("Enqueue işlemi başlatıldı.", 0);

  if (queue.size === queue.capacity) {
    pushFrame("Kuyruk dolu (Full queue)! İşlem iptal edildi.", 1);
    return frames;
  }

  queue.size++;
  pushFrame("Q->Size bir artırıldı.", 3);

  const oldRear = queue.rear;
  queue.rear = succ(queue.rear, queue.capacity);
  pushFrame(`Q->Rear = Succ(${oldRear}) ile ${queue.rear} indeksine ilerledi. (Dairesel sarma olabilir)`, 4);

  queue.array[queue.rear] = val;
  pushFrame(`Q->Array[${queue.rear}] = ${val} atandı. İşlem tamam.`, 5);

  return frames;
};

export const simulateCircularDequeue = (
  currentQueue: CngCircularQueue
): CngQueueFrame[] => {
  const frames: CngQueueFrame[] = [];
  let step = 0;
  const queue = cloneCircularQueue(currentQueue);

  const pushFrame = (exp: string, line: number) => {
    frames.push({
      stepIndex: step++,
      circularQueue: cloneCircularQueue(queue),
      explanation: exp,
      activeLineIndex: line,
      cCode: `void Dequeue(Queue Q) {\n  if( IsEmpty(Q) ) Error("Empty queue");\n  else {\n    Q->Size--;\n    Q->Front = Succ(Q->Front, Q);\n  }\n}`
    });
  };

  pushFrame("Dequeue işlemi başlatıldı.", 0);

  if (queue.size === 0) {
    pushFrame("Kuyruk boş (Empty queue)! İşlem iptal edildi.", 1);
    return frames;
  }

  const poppedVal = queue.array[queue.front];
  queue.array[queue.front] = null; // Visually clear it
  queue.size--;
  pushFrame(`En öndeki eleman (${poppedVal}) mantıksal olarak çıkartıldı. Q->Size azaltıldı.`, 3);

  const oldFront = queue.front;
  queue.front = succ(queue.front, queue.capacity);
  pushFrame(`Q->Front = Succ(${oldFront}) ile ${queue.front} indeksine ilerledi.`, 4);

  return frames;
};

// ==========================================
// LINKED LIST IMPLEMENTATION (Worksheet 7b)
// ==========================================

export const createInitialLinkedQueue = (): { nodes: CngQueueNode[], record: CngLinkedQueue } => {
  const dummyAddress = generateAddress();
  const dummyNode: CngQueueNode = {
    id: `dummy-${Date.now()}`,
    value: 'DUMMY',
    address: dummyAddress,
    nextAddress: null
  };

  return {
    nodes: [dummyNode],
    record: { frontAddress: dummyAddress, rearAddress: dummyAddress, size: 0 }
  };
};

export const simulateLinkedEnqueue = (
  currentNodes: CngQueueNode[],
  currentRecord: CngLinkedQueue,
  val: number | string
): CngQueueFrame[] => {
  const frames: CngQueueFrame[] = [];
  let step = 0;
  const nodes = cloneLinkedNodes(currentNodes);
  const record = cloneLinkedRecord(currentRecord);
  const pointers = { tmp: null as string | null, removeNode: null as string | null };

  const pushFrame = (exp: string, line: number) => {
    frames.push({
      stepIndex: step++,
      linkedNodes: cloneLinkedNodes(nodes),
      linkedRecord: cloneLinkedRecord(record),
      pointers: { ...pointers },
      explanation: exp,
      activeLineIndex: line,
      cCode: `void Enqueue(ElementType X, Queue Q) {\n  PtrToNode TmpCell = malloc(sizeof(struct Node));\n  if (TmpCell == NULL) Error("Out of space!");\n  else {\n    TmpCell->Element = X;\n    TmpCell->Next = NULL;\n    Q->Rear->Next = TmpCell;\n    Q->Rear = TmpCell;\n  }\n}`
    });
  };

  pushFrame("Enqueue işlemi başlatıldı.", 0);

  const newAddr = generateAddress();
  const tmpNode: CngQueueNode = {
    id: `node-${Date.now()}`,
    value: val,
    address: newAddr,
    nextAddress: null,
    isTemp: true
  };
  nodes.push(tmpNode);
  pointers.tmp = newAddr;
  pushFrame("TmpCell = malloc(...) çalıştı. Yeni düğüm ayrıldı.", 1);

  pushFrame(`TmpCell->Element = ${val}; TmpCell->Next = NULL;`, 4);

  const rearNode = nodes.find(n => n.address === record.rearAddress);
  if (rearNode) {
    rearNode.nextAddress = newAddr;
  }
  pushFrame("Q->Rear->Next = TmpCell; Mevcut son düğüm yeni düğümü gösteriyor.", 6);

  record.rearAddress = newAddr;
  record.size++;
  tmpNode.isTemp = false;
  pointers.tmp = null;
  pushFrame("Q->Rear = TmpCell; Kuyruk sonu işaretçisi (Rear) güncellendi.", 7);

  return frames;
};

export const simulateLinkedDequeue = (
  currentNodes: CngQueueNode[],
  currentRecord: CngLinkedQueue
): CngQueueFrame[] => {
  const frames: CngQueueFrame[] = [];
  let step = 0;
  let nodes = cloneLinkedNodes(currentNodes);
  const record = cloneLinkedRecord(currentRecord);
  const pointers = { tmp: null as string | null, removeNode: null as string | null };

  const pushFrame = (exp: string, line: number) => {
    frames.push({
      stepIndex: step++,
      linkedNodes: cloneLinkedNodes(nodes),
      linkedRecord: cloneLinkedRecord(record),
      pointers: { ...pointers },
      explanation: exp,
      activeLineIndex: line,
      cCode: `void Dequeue(Queue Q) {\n  PtrToNode TmpCell;\n  if (IsEmpty(Q)) Error("Empty queue");\n  else {\n    TmpCell = Q->Front->Next;\n    Q->Front->Next = TmpCell->Next;\n    if (Q->Rear == TmpCell) Q->Rear = Q->Front;\n    free(TmpCell);\n  }\n}`
    });
  };

  pushFrame("Dequeue işlemi başlatıldı.", 0);

  if (record.size === 0 || !record.frontAddress) {
    pushFrame("Kuyruk boş (Empty queue)! İşlem iptal edildi.", 2);
    return frames;
  }

  const dummyNode = nodes.find(n => n.address === record.frontAddress);
  if (!dummyNode || !dummyNode.nextAddress) return frames;

  const firstNode = nodes.find(n => n.address === dummyNode.nextAddress);
  if (!firstNode) return frames;

  pointers.removeNode = firstNode.address;
  firstNode.isTarget = true;
  pushFrame("TmpCell = Q->Front->Next; Silinecek düğüm belirlendi.", 4);

  dummyNode.nextAddress = firstNode.nextAddress;
  pushFrame("Q->Front->Next = TmpCell->Next; Dummy düğüm silinecek düğümü atladı.", 5);

  if (record.rearAddress === firstNode.address) {
    record.rearAddress = record.frontAddress;
    pushFrame("Kuyrukta tek eleman vardı. Q->Rear = Q->Front (Dummy) yapıldı.", 6);
  }

  nodes = nodes.filter(n => n.address !== firstNode.address);
  pointers.removeNode = null;
  record.size--;
  pushFrame("free(TmpCell); Bellek boşaltıldı.", 7);

  return frames;
};

// ==========================================
// PALINDROME SIMULATION (Stack + Queue)
// ==========================================

export interface PalindromeFrame {
  stepIndex: number;
  word: string;
  stackStr: string[]; // bottom to top
  queueStr: string[]; // front to rear
  currentIndex: number;
  phase: 'enqueue' | 'dequeue';
  status: 'PENDING' | 'MATCH' | 'MISMATCH' | 'SUCCESS';
  explanation: string;
}

export const simulatePalindromeTest = (word: string): PalindromeFrame[] => {
  const frames: PalindromeFrame[] = [];
  let step = 0;
  
  const stack: string[] = [];
  const queue: string[] = [];
  
  const pushFrame = (phase: 'enqueue'|'dequeue', currIdx: number, stat: 'PENDING'|'MATCH'|'MISMATCH'|'SUCCESS', exp: string) => {
    frames.push({
      stepIndex: step++,
      word,
      stackStr: [...stack],
      queueStr: [...queue],
      currentIndex: currIdx,
      phase,
      status: stat,
      explanation: exp
    });
  };

  pushFrame('enqueue', 0, 'PENDING', `Palindrom testi başladı. Kelime: "${word}"`);

  // Enqueue / Push Phase
  for (let i = 0; i < word.length; i++) {
    const char = word[i];
    stack.push(char); // Stack LIFO
    queue.push(char); // Queue FIFO
    pushFrame('enqueue', i, 'PENDING', `Harf '${char}' aynı anda Yığına (Push) ve Kuyruğa (Enqueue) eklendi.`);
  }

  // Dequeue / Pop Phase
  pushFrame('dequeue', word.length, 'PENDING', "Ekleme bitti. Şimdi sırayla çıkartıp karşılaştırma (Pop vs Dequeue) başlıyor.");

  for (let i = 0; i < word.length; i++) {
    const sChar = stack.pop();
    const qChar = queue.shift();
    
    if (sChar === qChar) {
      pushFrame('dequeue', i, 'MATCH', `Yığından '${sChar}' çıktı, Kuyruktan '${qChar}' çıktı. Eşleşti!`);
    } else {
      pushFrame('dequeue', i, 'MISMATCH', `Yığından '${sChar}' çıktı, Kuyruktan '${qChar}' çıktı. Uyuşmazlık! Palindrom DEĞİL.`);
      return frames;
    }
  }

  pushFrame('dequeue', word.length, 'SUCCESS', "Tüm harfler eşleşti. Kelime bir Palindromdur!");
  return frames;
};

// ==========================================
// ROBOT SHOP SIMULATION (Discrete-Event)
// ==========================================

export const runRobotSimulationStep = (prevState: RobotShopState): RobotShopState => {
  const state = { 
    ...prevState, 
    queue: [...prevState.queue], 
    servedCustomers: [...prevState.servedCustomers],
    robot: { ...prevState.robot }
  };

  if (state.isFinished) return state;

  // Is Robot finishing a service?
  if (state.robot.status === 'BUSY' && state.robot.servingCustomer && state.robot.busyUntilTime === state.currentTime) {
    state.servedCustomers.push(state.robot.servingCustomer);
    state.robot.status = 'FREE';
    state.robot.servingCustomer = undefined;
    state.robot.busyUntilTime = undefined;
  }

  // Is Queue not empty and Robot FREE?
  if (state.robot.status === 'FREE' && state.queue.length > 0) {
    const customer = state.queue.shift()!;
    state.robot.status = 'BUSY';
    state.robot.servingCustomer = customer;
    
    // WaitingTime calculation
    const waitingTime = state.currentTime - customer.arrivalTime;
    state.totalWaitingTime += waitingTime;
    
    // Start service
    customer.startServiceTime = state.currentTime;
    state.robot.busyUntilTime = state.currentTime + customer.serviceTime;
  }

  // Check if simulation ended
  if (state.queue.length === 0 && state.robot.status === 'FREE') {
    state.isFinished = true;
  } else {
    state.currentTime++;
  }

  return state;
};
