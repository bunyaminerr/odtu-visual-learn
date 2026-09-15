import { DNodeState, DListRecord, DListStep } from '../types/dll';

const generateAddress = () => '0x' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase();

const cloneNodes = (nodes: DNodeState[]): DNodeState[] => JSON.parse(JSON.stringify(nodes));
const cloneRecord = (r: DListRecord): DListRecord => ({ ...r });

export const createInitialDll = (count: number = 3): { nodes: DNodeState[], record: DListRecord } => {
  const dummyAddr = generateAddress();
  const dummyNode: DNodeState = {
    id: `dnode-dummy`,
    val: 'DUMMY',
    address: dummyAddr,
    prevAddress: null,
    nextAddress: null,
    isDummy: true
  };
  
  const nodes: DNodeState[] = [dummyNode];
  const record: DListRecord = { headAddress: dummyAddr, tailAddress: dummyAddr, size: 0 };
  
  let prevAddr = dummyAddr;
  for (let i = 0; i < count; i++) {
    const addr = generateAddress();
    const node: DNodeState = {
      id: `dnode-${Date.now()}-${i}`,
      val: (i + 1) * 10,
      address: addr,
      prevAddress: prevAddr,
      nextAddress: null
    };
    
    const prevNode = nodes.find(n => n.address === prevAddr);
    if(prevNode) prevNode.nextAddress = addr;
    
    nodes.push(node);
    prevAddr = addr;
  }
  
  record.tailAddress = prevAddr;
  record.size = count;
  
  return { nodes, record };
};

// ==========================================
// EKLEME İŞLEMLERİ
// ==========================================

const cCodeInsertHead = `void InsertHead(DList L, int X) {
  DNode* newNode = malloc(sizeof(struct DNode));
  newNode->item = X;
  newNode->prev = L->head;
  newNode->next = L->head->next;
  
  if (L->head->next != NULL)
    L->head->next->prev = newNode;
  else
    L->tail = newNode;
    
  L->head->next = newNode;
}`;

export const simulateDllInsertHead = (currentNodes: DNodeState[], currentRecord: DListRecord, val: number): DListStep[] => {
  const frames: DListStep[] = [];
  let step = 0;
  const nodes = cloneNodes(currentNodes);
  const record = cloneRecord(currentRecord);
  const pointers = { tmp: null as string | null, current: null, target: null };
  
  const pushFrame = (title: string, exp: string, line: number, actPtrs: string[] = []) => {
    frames.push({ stepNumber: step++, title, explanation: exp, activeCodeLine: line, cCode: cCodeInsertHead, nodes: cloneNodes(nodes), listRecord: cloneRecord(record), activePointers: actPtrs, pointers: { ...pointers } });
  };
  
  pushFrame("Başlangıç", "Başa ekleme (InsertHead) işlemi başlıyor. Yeni eleman Dummy düğüm sonrasına eklenecek.", 0);
  
  const newAddr = generateAddress();
  const newNode: DNodeState = { id: `dnode-${Date.now()}-new`, val, address: newAddr, prevAddress: null, nextAddress: null, isTemp: true };
  nodes.push(newNode);
  pointers.tmp = newAddr;
  pushFrame("Bellek Tahsisi", "malloc ile yeni düğüm (newNode) ayrıldı.", 1);
  
  const dummyNode = nodes.find(n => n.address === record.headAddress);
  if (!dummyNode) return frames;

  newNode.prevAddress = dummyNode.address;
  newNode.nextAddress = dummyNode.nextAddress;
  pushFrame("Pointer Bağlantıları", "newNode->prev = L->head; ve newNode->next = L->head->next;", 4, ["newNode_prev", "newNode_next"]);
  
  if (dummyNode.nextAddress) {
    const nextNode = nodes.find(n => n.address === dummyNode.nextAddress);
    if (nextNode) nextNode.prevAddress = newAddr;
    pushFrame("Eski İlk Düğüm", "L->head->next->prev = newNode; (Sağdaki düğüm yeni düğüme bağlandı)", 7, ["nextNode_prev"]);
  } else {
    record.tailAddress = newAddr;
    pushFrame("Tail Güncellemesi", "Liste boştu, bu yüzden tail de yeni düğüm oldu.", 9);
  }
  
  dummyNode.nextAddress = newAddr;
  newNode.isTemp = false;
  pointers.tmp = null;
  record.size++;
  pushFrame("Dummy Güncellemesi", "L->head->next = newNode; Dummy düğüm yeni düğüme bağlandı.", 11);
  
  return frames;
};

const cCodeInsertTail = `void InsertTail(DList L, int X) {
  DNode* newNode = malloc(sizeof(struct DNode));
  newNode->item = X;
  newNode->next = NULL;
  newNode->prev = L->tail;
  
  L->tail->next = newNode;
  L->tail = newNode;
}`;

export const simulateDllInsertTail = (currentNodes: DNodeState[], currentRecord: DListRecord, val: number): DListStep[] => {
  const frames: DListStep[] = [];
  let step = 0;
  const nodes = cloneNodes(currentNodes);
  const record = cloneRecord(currentRecord);
  const pointers = { tmp: null as string | null, current: null, target: null };
  
  const pushFrame = (title: string, exp: string, line: number, actPtrs: string[] = []) => {
    frames.push({ stepNumber: step++, title, explanation: exp, activeCodeLine: line, cCode: cCodeInsertTail, nodes: cloneNodes(nodes), listRecord: cloneRecord(record), activePointers: actPtrs, pointers: { ...pointers } });
  };
  
  pushFrame("Başlangıç", "Sona ekleme (InsertTail) işlemi başlıyor.", 0);
  
  const newAddr = generateAddress();
  const newNode: DNodeState = { id: `dnode-${Date.now()}-new`, val, address: newAddr, prevAddress: null, nextAddress: null, isTemp: true };
  nodes.push(newNode);
  pointers.tmp = newAddr;
  pushFrame("Bellek Tahsisi", "malloc ile yeni düğüm (newNode) ayrıldı.", 1);
  
  newNode.nextAddress = null;
  newNode.prevAddress = record.tailAddress;
  pushFrame("Pointer Bağlantıları", "newNode->prev = L->tail; (Yeni düğüm mevcut tail'i gösterir, boşsa Dummy'i gösterir)", 4, ["newNode_prev"]);
  
  const tailNode = nodes.find(n => n.address === record.tailAddress);
  if (tailNode) tailNode.nextAddress = newAddr;
  pushFrame("Eski Tail Güncellemesi", "L->tail->next = newNode; (Eski tail yeni düğüme bağlandı)", 6, ["prevNode_next"]);
  
  record.tailAddress = newAddr;
  newNode.isTemp = false;
  pointers.tmp = null;
  record.size++;
  pushFrame("Tail Güncellemesi", "L->tail = newNode; İşlem tamamlandı.", 7);
  
  return frames;
};

const cCodeInsertBefore = `void InsertBefore(int X, DNode* current) {
  DNode* newNode = malloc(sizeof(struct DNode));
  newNode->item = X;
  
  newNode->prev = current->prev;
  newNode->next = current;
  
  current->prev->next = newNode;
  current->prev = newNode;
}`;

export const simulateDllInsertBefore = (currentNodes: DNodeState[], currentRecord: DListRecord, targetAddr: string | null, val: number): DListStep[] => {
  const frames: DListStep[] = [];
  let step = 0;
  const nodes = cloneNodes(currentNodes);
  const record = cloneRecord(currentRecord);
  const pointers = { tmp: null as string | null, current: targetAddr, target: null };
  
  const pushFrame = (title: string, exp: string, line: number, actPtrs: string[] = []) => {
    frames.push({ stepNumber: step++, title, explanation: exp, activeCodeLine: line, cCode: cCodeInsertBefore, nodes: cloneNodes(nodes), listRecord: cloneRecord(record), activePointers: actPtrs, pointers: { ...pointers } });
  };
  
  pushFrame("Başlangıç", "Belirli düğümden ÖNCE ekleme işlemi başlıyor.", 0);
  const current = nodes.find(n => n.address === targetAddr);
  if (!current || current.isDummy) { pushFrame("Hata", "Geçersiz current node.", 0); return frames; }
  
  const newAddr = generateAddress();
  const newNode: DNodeState = { id: `dnode-${Date.now()}-new`, val, address: newAddr, prevAddress: null, nextAddress: null, isTemp: true };
  nodes.push(newNode);
  pointers.tmp = newAddr;
  pushFrame("Bellek Tahsisi", "malloc ile yeni düğüm oluşturuldu.", 1);
  
  newNode.prevAddress = current.prevAddress;
  newNode.nextAddress = current.address;
  pushFrame("Pointer 1 & 2", "newNode->prev = current->prev; ve newNode->next = current;", 4, ["newNode_prev", "newNode_next"]);
  
  if (current.prevAddress) {
    const prevNode = nodes.find(n => n.address === current.prevAddress);
    if (prevNode) prevNode.nextAddress = newAddr;
    pushFrame("Pointer 3", "current->prev->next = newNode; (Sol düğümün oku yeni düğüme bağlandı)", 7, ["newNode_prev", "newNode_next", "prevNode_next"]);
  }
  
  current.prevAddress = newAddr;
  newNode.isTemp = false;
  pointers.tmp = null;
  record.size++;
  pushFrame("Pointer 4", "current->prev = newNode; (Sağ düğümün sol oku yeni düğüme bağlandı)", 8, ["nextNode_prev"]);
  
  return frames;
};

const cCodeInsertAfter = `void InsertAfter(DList L, int X, DNode* current) {
  DNode* newNode = malloc(sizeof(struct DNode));
  newNode->item = X;
  
  newNode->next = current->next;
  newNode->prev = current;
  
  if (current->next != NULL)
    current->next->prev = newNode;
  else
    L->tail = newNode;
    
  current->next = newNode;
}`;

export const simulateDllInsertAfter = (currentNodes: DNodeState[], currentRecord: DListRecord, targetAddr: string | null, val: number): DListStep[] => {
  const frames: DListStep[] = [];
  let step = 0;
  const nodes = cloneNodes(currentNodes);
  const record = cloneRecord(currentRecord);
  const pointers = { tmp: null as string | null, current: targetAddr, target: null };
  
  const pushFrame = (title: string, exp: string, line: number, actPtrs: string[] = []) => {
    frames.push({ stepNumber: step++, title, explanation: exp, activeCodeLine: line, cCode: cCodeInsertAfter, nodes: cloneNodes(nodes), listRecord: cloneRecord(record), activePointers: actPtrs, pointers: { ...pointers } });
  };
  
  pushFrame("Başlangıç", "Araya ekleme (InsertAfter) işlemi başlıyor.", 0);
  const current = nodes.find(n => n.address === targetAddr);
  if (!current || current.isDummy) return frames;
  
  const newAddr = generateAddress();
  const newNode: DNodeState = { id: `dnode-${Date.now()}-new`, val, address: newAddr, prevAddress: null, nextAddress: null, isTemp: true };
  nodes.push(newNode);
  pointers.tmp = newAddr;
  pushFrame("Bellek Tahsisi", "malloc ile yeni düğüm için bellek ayrıldı.", 1);
  
  newNode.nextAddress = current.nextAddress;
  newNode.prevAddress = current.address;
  pushFrame("Pointer 1 & 2", "newNode->next = current->next; ve newNode->prev = current;", 4, ["newNode_next", "newNode_prev"]);
  
  if (current.nextAddress) {
    const nextNode = nodes.find(n => n.address === current.nextAddress);
    if (nextNode) nextNode.prevAddress = newAddr;
    pushFrame("Pointer 3", "current->next->prev = newNode (Sağdaki düğümün sol oku yeni düğüme bağlandı)", 8, ["newNode_next", "newNode_prev", "nextNode_prev"]);
  } else {
    record.tailAddress = newAddr;
    pushFrame("Tail Güncellemesi", "current tail idi, tail güncellendi.", 10);
  }
  
  current.nextAddress = newAddr;
  newNode.isTemp = false;
  pointers.tmp = null;
  record.size++;
  pushFrame("Pointer 4", "current->next = newNode (Soldaki düğümün sağ oku yeni düğüme bağlandı)", 12, ["current_next"]);
  
  return frames;
};

const cCodeInsertIndex = `void InsertAtIndex(DList L, int index, int X) {
  if (index == 0) { InsertHead(L, X); return; }
  
  DNode* current = L->head->next; // Dummy'den sonrakinden basla
  for (int i = 0; i < index - 1 && current != NULL; i++) {
    current = current->next;
  }
  
  if (current != NULL) {
    InsertAfter(L, X, current);
  }
}`;

export const simulateDllInsertIndex = (currentNodes: DNodeState[], currentRecord: DListRecord, index: number, val: number): DListStep[] => {
  if (index === 0) return simulateDllInsertHead(currentNodes, currentRecord, val);
  
  const frames: DListStep[] = [];
  let step = 0;
  const nodes = cloneNodes(currentNodes);
  const record = cloneRecord(currentRecord);
  const dummyNode = nodes.find(n => n.address === record.headAddress);
  const pointers = { tmp: null as string | null, current: dummyNode?.nextAddress || null, target: null };
  
  const pushFrame = (title: string, exp: string, line: number) => {
    frames.push({ stepNumber: step++, title, explanation: exp, activeCodeLine: line, cCode: cCodeInsertIndex, nodes: cloneNodes(nodes), listRecord: cloneRecord(record), activePointers: [], pointers: { ...pointers } });
  };
  
  pushFrame("Başlangıç", `Index ${index}'e ekleme (InsertAtIndex) başlıyor. Arama yapılacak.`, 0);
  
  for (let i = 0; i < index - 1; i++) {
    const currNode = nodes.find(n => n.address === pointers.current);
    if (!currNode || !currNode.nextAddress) {
      pushFrame("Hata", "Index listeden büyük!", 5);
      return frames;
    }
    pointers.current = currNode.nextAddress;
    pushFrame("Arama", `İlerleniyor: Index ${i+1}`, 5);
  }
  
  pushFrame("Bulundu", `Eklenecek konum bulundu. InsertAfter çağrılıyor.`, 9);
  const subFrames = simulateDllInsertAfter(nodes, record, pointers.current, val);
  subFrames.forEach(f => {
    f.cCode = cCodeInsertIndex + '\n\n' + cCodeInsertAfter;
    f.stepNumber = step++;
    frames.push(f);
  });
  
  return frames;
};

// ==========================================
// SİLME İŞLEMLERİ
// ==========================================

const cCodeDeleteHead = `void DeleteHead(DList L) {
  if (L->head->next == NULL) return; // Liste bos
  
  DNode* temp = L->head->next;
  L->head->next = temp->next;
  
  if (temp->next != NULL)
    temp->next->prev = L->head;
  else
    L->tail = L->head; // Liste bosaldi
    
  free(temp);
}`;

export const simulateDllDeleteHead = (currentNodes: DNodeState[], currentRecord: DListRecord): DListStep[] => {
  const frames: DListStep[] = [];
  let step = 0;
  let nodes = cloneNodes(currentNodes);
  const record = cloneRecord(currentRecord);
  const dummyNode = nodes.find(n => n.address === record.headAddress);
  const pointers = { tmp: null as string | null, current: null, target: dummyNode?.nextAddress || null };
  
  const pushFrame = (title: string, exp: string, line: number, actPtrs: string[] = []) => {
    frames.push({ stepNumber: step++, title, explanation: exp, activeCodeLine: line, cCode: cCodeDeleteHead, nodes: cloneNodes(nodes), listRecord: cloneRecord(record), activePointers: actPtrs, pointers: { ...pointers } });
  };
  
  pushFrame("Başlangıç", "Baştan silme (DeleteHead) işlemi başlıyor.", 0);
  if (!dummyNode || !dummyNode.nextAddress) { pushFrame("Hata", "Liste zaten boş.", 1); return frames; }
  
  pointers.tmp = dummyNode.nextAddress;
  const targetNode = nodes.find(n => n.address === dummyNode.nextAddress);
  if (targetNode) targetNode.isTarget = true;
  pushFrame("Temp İşaretçisi", "temp = L->head->next; (Silinecek düğüm temp'e alındı)", 3);
  
  dummyNode.nextAddress = targetNode?.nextAddress || null;
  pushFrame("Head Güncelle", "L->head->next = temp->next; (Dummy düğüm silinecek düğümü atladı)", 4);
  
  if (dummyNode.nextAddress) {
    const newFirst = nodes.find(n => n.address === dummyNode.nextAddress);
    if (newFirst) newFirst.prevAddress = dummyNode.address;
    pushFrame("Prev Temizle", "temp->next->prev = L->head; (Yeni ilk düğüm Dummy'e bağlandı)", 7);
  } else {
    record.tailAddress = dummyNode.address;
    pushFrame("Tail Temizle", "Liste tamamen boşaldı, tail = Dummy yapıldı.", 9);
  }
  
  nodes = nodes.filter(n => n.address !== pointers.tmp);
  record.size--;
  pointers.tmp = null;
  pointers.target = null;
  pushFrame("Free", "free(temp); bellek boşaltıldı.", 11);
  
  return frames;
};

const cCodeDeleteTail = `void DeleteTail(DList L) {
  if (L->head->next == NULL) return; // Liste bos
  
  DNode* temp = L->tail;
  L->tail = temp->prev;
  L->tail->next = NULL;
  
  free(temp);
}`;

export const simulateDllDeleteTail = (currentNodes: DNodeState[], currentRecord: DListRecord): DListStep[] => {
  const frames: DListStep[] = [];
  let step = 0;
  let nodes = cloneNodes(currentNodes);
  const record = cloneRecord(currentRecord);
  const pointers = { tmp: null as string | null, current: null, target: record.tailAddress };
  const dummyNode = nodes.find(n => n.address === record.headAddress);
  
  const pushFrame = (title: string, exp: string, line: number, actPtrs: string[] = []) => {
    frames.push({ stepNumber: step++, title, explanation: exp, activeCodeLine: line, cCode: cCodeDeleteTail, nodes: cloneNodes(nodes), listRecord: cloneRecord(record), activePointers: actPtrs, pointers: { ...pointers } });
  };
  
  pushFrame("Başlangıç", "Sondan silme (DeleteTail) işlemi başlıyor.", 0);
  if (!dummyNode || !dummyNode.nextAddress || record.tailAddress === dummyNode.address) { pushFrame("Hata", "Liste zaten boş.", 1); return frames; }
  
  pointers.tmp = record.tailAddress;
  const targetNode = nodes.find(n => n.address === record.tailAddress);
  if (targetNode) targetNode.isTarget = true;
  pushFrame("Temp İşaretçisi", "temp = L->tail; (Silinecek düğüm temp'e alındı)", 3);
  
  record.tailAddress = targetNode?.prevAddress || dummyNode.address;
  pushFrame("Tail Güncelle", "L->tail = temp->prev; (Tail bir sola kaydırıldı)", 4);
  
  const newTail = nodes.find(n => n.address === record.tailAddress);
  if (newTail) newTail.nextAddress = null;
  pushFrame("Next Temizle", "L->tail->next = NULL; (Yeni tail'in sağı NULL yapıldı)", 5);
  
  nodes = nodes.filter(n => n.address !== pointers.tmp);
  record.size--;
  pointers.tmp = null;
  pointers.target = null;
  pushFrame("Free", "free(temp); bellek boşaltıldı.", 7);
  
  return frames;
};

const cCodeDeleteNode = `void DeleteNode(DList L, DNode* X) {
  X->prev->next = X->next;
    
  if (X->next != NULL)
    X->next->prev = X->prev;
  else
    L->tail = X->prev; // Sonda ise tail'i guncelle
    
  free(X);
}`;

export const simulateDllDeleteNode = (currentNodes: DNodeState[], currentRecord: DListRecord, targetAddr: string): DListStep[] => {
  const frames: DListStep[] = [];
  let step = 0;
  let nodes = cloneNodes(currentNodes);
  const record = cloneRecord(currentRecord);
  const pointers = { tmp: null as string | null, current: null as string | null, target: targetAddr as string | null };
  
  const pushFrame = (title: string, exp: string, line: number, actPtrs: string[] = []) => {
    frames.push({ stepNumber: step++, title, explanation: exp, activeCodeLine: line, cCode: cCodeDeleteNode, nodes: cloneNodes(nodes), listRecord: cloneRecord(record), activePointers: actPtrs, pointers: { ...pointers } });
  };
  
  pushFrame("Başlangıç", "O(1) Silme (DeleteNode) işlemi başlıyor.", 0);
  const target = nodes.find(n => n.address === targetAddr);
  if (!target || target.isDummy) return frames;
  target.isTarget = true;
  
  if (target.prevAddress) {
    const prevNode = nodes.find(n => n.address === target.prevAddress);
    if (prevNode) prevNode.nextAddress = target.nextAddress;
    pushFrame("Pointer 1 (Next)", "X->prev->next = X->next (Sol düğüm sağ düğüme bağlandı)", 1, ["prevNode_next"]);
  }
  
  if (target.nextAddress) {
    const nextNode = nodes.find(n => n.address === target.nextAddress);
    if (nextNode) nextNode.prevAddress = target.prevAddress;
    pushFrame("Pointer 2 (Prev)", "X->next->prev = X->prev (Sağ düğüm sol düğüme bağlandı)", 4, ["nextNode_prev"]);
  } else {
    record.tailAddress = target.prevAddress;
    pushFrame("Tail Güncellemesi", "Hedef Tail idi, Tail sola kaydırıldı.", 6);
  }
  
  nodes = nodes.filter(n => n.address !== targetAddr);
  pointers.target = null;
  record.size--;
  pushFrame("Free", "free(X); ile bellek silindi.", 8);
  
  return frames;
};

const cCodeDeleteIndex = `void DeleteAtIndex(DList L, int index) {
  if (index == 0) { DeleteHead(L); return; }
  
  DNode* current = L->head->next; // Ilk gercek eleman
  for (int i = 0; i < index && current != NULL; i++) {
    current = current->next;
  }
  
  if (current != NULL) {
    DeleteNode(L, current);
  }
}`;

export const simulateDllDeleteIndex = (currentNodes: DNodeState[], currentRecord: DListRecord, index: number): DListStep[] => {
  if (index === 0) return simulateDllDeleteHead(currentNodes, currentRecord);
  
  const frames: DListStep[] = [];
  let step = 0;
  const nodes = cloneNodes(currentNodes);
  const record = cloneRecord(currentRecord);
  const dummyNode = nodes.find(n => n.address === record.headAddress);
  const pointers = { tmp: null as string | null, current: dummyNode?.nextAddress || null, target: null };
  
  const pushFrame = (title: string, exp: string, line: number) => {
    frames.push({ stepNumber: step++, title, explanation: exp, activeCodeLine: line, cCode: cCodeDeleteIndex, nodes: cloneNodes(nodes), listRecord: cloneRecord(record), activePointers: [], pointers: { ...pointers } });
  };
  
  pushFrame("Başlangıç", `Index ${index}'i silme (DeleteAtIndex) başlıyor. Arama yapılacak.`, 0);
  
  for (let i = 0; i < index; i++) {
    const currNode = nodes.find(n => n.address === pointers.current);
    if (!currNode || !currNode.nextAddress) {
      pushFrame("Hata", "Index listeden büyük!", 4);
      return frames;
    }
    pointers.current = currNode.nextAddress;
    pushFrame("Arama", `İlerleniyor: Index ${i+1}`, 5);
  }
  
  pushFrame("Bulundu", `Silinecek konum bulundu. DeleteNode çağrılıyor.`, 9);
  if (pointers.current) {
    const subFrames = simulateDllDeleteNode(nodes, record, pointers.current);
    subFrames.forEach(f => {
      f.cCode = cCodeDeleteIndex + '\n\n' + cCodeDeleteNode;
      f.stepNumber = step++;
      frames.push(f);
    });
  }
  
  return frames;
};

const cCodeDeleteBefore = `void DeleteBefore(DList L, DNode* X) {
  if (X->prev != L->head) { // Dummy disinda
    DeleteNode(L, X->prev);
  }
}`;

export const simulateDllDeleteBefore = (currentNodes: DNodeState[], currentRecord: DListRecord, targetAddr: string): DListStep[] => {
  const frames: DListStep[] = [];
  let step = 0;
  const nodes = cloneNodes(currentNodes);
  const record = cloneRecord(currentRecord);
  const pointers = { tmp: null as string | null, current: targetAddr, target: null };
  
  const pushFrame = (title: string, exp: string, line: number) => {
    frames.push({ stepNumber: step++, title, explanation: exp, activeCodeLine: line, cCode: cCodeDeleteBefore, nodes: cloneNodes(nodes), listRecord: cloneRecord(record), activePointers: [], pointers: { ...pointers } });
  };
  
  pushFrame("Başlangıç", "Belirli bir düğümden ÖNCEKİNİ silme işlemi başlıyor.", 0);
  const current = nodes.find(n => n.address === targetAddr);
  if (!current || !current.prevAddress || current.prevAddress === record.headAddress) {
    pushFrame("Hata", "Önceki düğüm Dummy Node olduğu için (veya hiç olmadığı için) silinemez.", 1);
    return frames;
  }
  
  pushFrame("Yönlendirme", "DeleteNode(L, X->prev) çağrılıyor.", 2);
  const subFrames = simulateDllDeleteNode(nodes, record, current.prevAddress);
  subFrames.forEach(f => {
    f.cCode = cCodeDeleteBefore + '\n\n' + cCodeDeleteNode;
    f.stepNumber = step++;
    frames.push(f);
  });
  
  return frames;
};

const cCodeDeleteAfter = `void DeleteAfter(DList L, DNode* X) {
  if (X->next != NULL) {
    DeleteNode(L, X->next);
  }
}`;

export const simulateDllDeleteAfter = (currentNodes: DNodeState[], currentRecord: DListRecord, targetAddr: string): DListStep[] => {
  const frames: DListStep[] = [];
  let step = 0;
  const nodes = cloneNodes(currentNodes);
  const record = cloneRecord(currentRecord);
  const pointers = { tmp: null as string | null, current: targetAddr, target: null };
  
  const pushFrame = (title: string, exp: string, line: number) => {
    frames.push({ stepNumber: step++, title, explanation: exp, activeCodeLine: line, cCode: cCodeDeleteAfter, nodes: cloneNodes(nodes), listRecord: cloneRecord(record), activePointers: [], pointers: { ...pointers } });
  };
  
  pushFrame("Başlangıç", "Belirli bir düğümden SONRAKİNİ silme işlemi başlıyor.", 0);
  const current = nodes.find(n => n.address === targetAddr);
  if (!current || !current.nextAddress) {
    pushFrame("Hata", "Sonraki düğüm yok (NULL) veya düğüm bulunamadı.", 1);
    return frames;
  }
  
  pushFrame("Yönlendirme", "DeleteNode(L, X->next) çağrılıyor.", 2);
  const subFrames = simulateDllDeleteNode(nodes, record, current.nextAddress);
  subFrames.forEach(f => {
    f.cCode = cCodeDeleteAfter + '\n\n' + cCodeDeleteNode;
    f.stepNumber = step++;
    frames.push(f);
  });
  
  return frames;
};

// ==========================================
// DİĞER İŞLEMLER
// ==========================================

const cCodeTraverse = `void Traverse(DList L) {
  DNode* current = L->head->next; // Dummy'den sonrakinden basla
  while (current != NULL) {
    // Process(current->item);
    current = current->next; // Veya current->prev
  }
}`;

export const simulateDllTraversal = (currentNodes: DNodeState[], currentRecord: DListRecord, direction: 'forward' | 'backward'): DListStep[] => {
  const frames: DListStep[] = [];
  let step = 0;
  const nodes = cloneNodes(currentNodes);
  const dummyNode = nodes.find(n => n.address === currentRecord.headAddress);
  
  const pointers = { tmp: null as string | null, current: direction === 'forward' ? (dummyNode?.nextAddress || null) : currentRecord.tailAddress, target: null };
  
  // If traversing backward and tail is dummy, it means list is empty
  if (direction === 'backward' && pointers.current === currentRecord.headAddress) {
    pointers.current = null;
  }
  
  const pushFrame = (title: string, exp: string, line: number) => {
    frames.push({ stepNumber: step++, title, explanation: exp, activeCodeLine: line, cCode: cCodeTraverse, nodes: cloneNodes(nodes), listRecord: cloneRecord(currentRecord), activePointers: [], pointers: { ...pointers } });
  };
  
  pushFrame("Başlangıç", direction === 'forward' ? "L->head->next'ten başlayarak ileri (next) tarama." : "L->tail'den başlayarak geri (prev) tarama (Dummy hariç).", 1);
  
  while (pointers.current && pointers.current !== currentRecord.headAddress) {
    pushFrame("Ziyaret", `Düğüm ziyaret ediliyor: ${pointers.current}`, 3);
    const currNode = nodes.find(n => n.address === pointers.current);
    if (currNode) {
      pointers.current = direction === 'forward' ? currNode.nextAddress : currNode.prevAddress;
      
      // If we hit dummy node going backward, stop
      if (pointers.current === currentRecord.headAddress) {
        pointers.current = null;
      }
      
      pushFrame("İlerleme", direction === 'forward' ? "current = current->next" : "current = current->prev", 5);
    } else {
      break;
    }
  }
  
  pushFrame("Bitiş", "Traversal tamamlandı.", 2);
  return frames;
};

const cCodeReverse = `void Reverse(DList L) {
  DNode* current = L->head->next; // Ilk gercek eleman
  DNode* temp = NULL;
  
  L->tail = current; // Eski ilk eleman tail oldu
  
  while (current != NULL) {
    temp = current->prev;
    current->prev = current->next;
    current->next = temp;
    current = current->prev; // Aslinda next'e ilerledik
  }
  
  if (temp != NULL) {
    // temp eski listedeki sondan bir onceki elemandir
    // temp->prev eski son elemandir (yeni head->next)
    L->head->next = temp->prev; 
    temp->prev->prev = L->head; // Yeni ilk elemani dummy'e bagla
  }
}`;

export const simulateDllReverse = (currentNodes: DNodeState[], currentRecord: DListRecord): DListStep[] => {
  const frames: DListStep[] = [];
  let step = 0;
  const nodes = cloneNodes(currentNodes);
  const record = cloneRecord(currentRecord);
  const dummyNode = nodes.find(n => n.address === record.headAddress);
  const pointers = { tmp: null as string | null, current: dummyNode?.nextAddress || null, target: null };
  
  const pushFrame = (title: string, exp: string, line: number) => {
    frames.push({ stepNumber: step++, title, explanation: exp, activeCodeLine: line, cCode: cCodeReverse, nodes: cloneNodes(nodes), listRecord: cloneRecord(record), activePointers: [], pointers: { ...pointers } });
  };
  
  pushFrame("Başlangıç", "Listenin (Dummy hariç) prev ve next okları takas edilerek tersine çevrilmesi başlıyor.", 1);
  
  record.tailAddress = pointers.current; // old first node becomes tail
  pushFrame("Tail Güncellemesi", "L->tail = current; (Eski ilk düğüm, yeni tail olacak)", 4);
  
  while (pointers.current) {
    const currNode = nodes.find(n => n.address === pointers.current);
    if (!currNode) break;
    
    pointers.tmp = currNode.prevAddress;
    pushFrame("Temp Yedek", `temp = current->prev (${pointers.tmp || 'NULL'})`, 7);
    
    currNode.prevAddress = currNode.nextAddress;
    pushFrame("Prev Guncelle", "current->prev = current->next", 8);
    
    currNode.nextAddress = pointers.tmp;
    pushFrame("Next Guncelle", "current->next = temp (Oklar takas edildi!)", 9);
    
    pointers.current = currNode.prevAddress;
    pushFrame("Ilerle", "current = current->prev (Oklar ters çevrildiği için aslında eski next'e ilerliyoruz)", 10);
  }
  
  if (pointers.tmp) {
    const lastNodeBeforeSwap = nodes.find(n => n.address === pointers.tmp);
    if (lastNodeBeforeSwap && lastNodeBeforeSwap.prevAddress) {
      const newFirstRealNode = nodes.find(n => n.address === lastNodeBeforeSwap.prevAddress);
      
      if (newFirstRealNode && dummyNode) {
        dummyNode.nextAddress = newFirstRealNode.address;
        newFirstRealNode.prevAddress = dummyNode.address;
        
        pushFrame("Dummy Baglantisi", "L->head->next = temp->prev; (Yeni ilk eleman Dummy'e bağlandı)", 15);
      }
    }
  }
  
  pointers.tmp = null;
  pushFrame("Bitiş", "Reverse (Tersine Çevirme) işlemi bitti.", 17);
  
  return frames;
};
