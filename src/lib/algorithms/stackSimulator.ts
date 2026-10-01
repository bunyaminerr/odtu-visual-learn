import { CngArrayStack, CngLinkedStack, CngStackNode, CngStackFrame, EMPTY_TOS, MIN_STACK_SIZE } from '../types/stack';

const generateAddress = () => '0x' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');

const cloneArrayStack = (s: CngArrayStack): CngArrayStack => ({ ...s, array: [...s.array] });
const cloneLinkedNodes = (nodes: CngStackNode[]): CngStackNode[] => nodes.map(n => ({ ...n }));
const cloneLinkedRecord = (r: CngLinkedStack): CngLinkedStack => ({ ...r });

// ==========================================
// ARRAY IMPLEMENTATION (Worksheet 6a)
// ==========================================

export const createInitialArrayStack = (capacity: number = MIN_STACK_SIZE): CngArrayStack => ({
  capacity,
  topOfStack: EMPTY_TOS,
  array: new Array(capacity).fill(null)
});

export const simulateArrayPush = (
  currentStack: CngArrayStack,
  val: number | string
): CngStackFrame[] => {
  const frames: CngStackFrame[] = [];
  let step = 0;
  const stack = cloneArrayStack(currentStack);

  const pushFrame = (exp: string, line: number) => {
    frames.push({
      stepIndex: step++,
      arrayStack: cloneArrayStack(stack),
      explanation: exp,
      activeLineIndex: line,
      cCode: `void PushStack(int X, Stack S) {\n  if( IsFullStack(S) ) Error("Full stack");\n  else S->array[ ++S->topOfStack ] = X;\n}`
    });
  };

  pushFrame("Push işlemi başlatıldı.", 0);

  if (stack.topOfStack === stack.capacity - 1) {
    pushFrame("Stack dolu (Full stack)! Push işlemi iptal edildi.", 1);
    return frames;
  }

  stack.topOfStack++;
  pushFrame("S->topOfStack bir artırıldı.", 2);

  stack.array[stack.topOfStack] = val;
  pushFrame(`Eleman (${val}) diziye S->array[S->topOfStack] konumuna yerleştirildi.`, 2);

  return frames;
};

export const simulateArrayPop = (
  currentStack: CngArrayStack
): CngStackFrame[] => {
  const frames: CngStackFrame[] = [];
  let step = 0;
  const stack = cloneArrayStack(currentStack);

  const pushFrame = (exp: string, line: number) => {
    frames.push({
      stepIndex: step++,
      arrayStack: cloneArrayStack(stack),
      explanation: exp,
      activeLineIndex: line,
      cCode: `void PopStack(Stack S) {\n  if( IsEmptyStack(S) ) Error("Empty stack");\n  else S->topOfStack--;\n}`
    });
  };

  pushFrame("Pop işlemi başlatıldı.", 0);

  if (stack.topOfStack === EMPTY_TOS) {
    pushFrame("Stack boş (Empty stack)! Pop işlemi iptal edildi.", 1);
    return frames;
  }

  const poppedVal = stack.array[stack.topOfStack];
  stack.array[stack.topOfStack] = null; // Visually clear it
  pushFrame(`En üstteki eleman (${poppedVal}) mantıksal olarak silindi.`, 2);

  stack.topOfStack--;
  pushFrame("S->topOfStack bir azaltıldı.", 2);

  return frames;
};

// ==========================================
// LINKED LIST IMPLEMENTATION (Worksheet 6b)
// ==========================================

export const createInitialLinkedStack = (): { nodes: CngStackNode[], record: CngLinkedStack } => {
  return {
    nodes: [],
    record: { topAddress: null, size: 0 }
  };
};

export const simulateLinkedPush = (
  currentNodes: CngStackNode[],
  currentRecord: CngLinkedStack,
  val: number | string
): CngStackFrame[] => {
  const frames: CngStackFrame[] = [];
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
      cCode: `void PushStack(int X, Stack S) {\n  struct Node* TmpCell = malloc(sizeof(struct Node));\n  if (TmpCell == NULL) Error("Out of space!");\n  else {\n    TmpCell->val = X;\n    TmpCell->next = S->next;\n    S->next = TmpCell;\n  }\n}`
    });
  };

  pushFrame("Push işlemi başlatıldı.", 0);

  const newAddr = generateAddress();
  const tmpNode: CngStackNode = {
    id: `node-${Date.now()}`,
    value: val,
    address: newAddr,
    nextAddress: null,
    isTemp: true
  };
  nodes.push(tmpNode);
  pointers.tmp = newAddr;
  pushFrame("TmpCell = malloc(...) çalıştı. Yeni düğüm bellekte ayrıldı.", 1);

  pushFrame(`TmpCell->val = ${val} atandı.`, 4);

  tmpNode.nextAddress = record.topAddress;
  pushFrame("TmpCell->next, Stack'in mevcut en üst (Top) elemanını gösterecek şekilde bağlandı.", 5);

  record.topAddress = newAddr;
  record.size++;
  tmpNode.isTemp = false;
  pointers.tmp = null;
  pushFrame("Stack'in başı (S->next) artık yeni düğümü gösteriyor. Push başarılı.", 6);

  return frames;
};

export const simulateLinkedPop = (
  currentNodes: CngStackNode[],
  currentRecord: CngLinkedStack
): CngStackFrame[] => {
  const frames: CngStackFrame[] = [];
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
      cCode: `void PopStack(Stack S) {\n  struct Node* FirstCell;\n  if (IsEmptyStack(S)) Error("Empty stack");\n  else {\n    FirstCell = S->next;\n    S->next = S->next->next;\n    free(FirstCell);\n  }\n}`
    });
  };

  pushFrame("Pop işlemi başlatıldı.", 0);

  if (!record.topAddress) {
    pushFrame("Stack boş (Empty stack)! İşlem iptal edildi.", 2);
    return frames;
  }

  const topNode = nodes.find(n => n.address === record.topAddress);
  if (!topNode) return frames;

  pointers.removeNode = topNode.address;
  topNode.isTarget = true;
  pushFrame("FirstCell = S->Next. Silinecek en üst düğüm işaretlendi.", 4);

  record.topAddress = topNode.nextAddress;
  pushFrame("S->next = S->next->next. Top pointer'ı silinecek düğümü atlayıp bir sonrakine geçti.", 5);

  nodes = nodes.filter(n => n.address !== topNode.address);
  pointers.removeNode = null;
  record.size--;
  pushFrame("free(FirstCell) çalıştı. Bellek boşaltıldı.", 6);

  return frames;
};
