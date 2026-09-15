import { CngNode, CngListRecord, CngPointerState, CngLinkedListFrame } from '../types/cng213LinkedList';



const DUMMY_ADDRESS = '0x100000'; // Fixed address for dummy head

const generateAddress = () => '0x' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');



export const createInitialState = (): { nodes: CngNode[], listRecord: CngListRecord } => {

  const dummy: CngNode = {

    id: `node-dummy`,

    value: 'DUMMY',

    address: DUMMY_ADDRESS,

    nextAddress: null

  };

  return {

    nodes: [dummy],

    listRecord: { headAddress: dummy.address, tailAddress: dummy.address, size: 0 }

  };

};



const cloneNodes = (nodes: CngNode[]): CngNode[] => nodes.map(n => ({ ...n }));

const clonePointers = (p: CngPointerState): CngPointerState => ({ ...p });

const cloneRecord = (r: CngListRecord): CngListRecord => ({ ...r });



export const simulateInsertEnd = (

  currentNodes: CngNode[], 

  currentRecord: CngListRecord, 

  val: number

): CngLinkedListFrame[] => {

  const frames: CngLinkedListFrame[] = [];

  let step = 0;

  

  const nodes = cloneNodes(currentNodes);

  const record = cloneRecord(currentRecord);

  const pointers: CngPointerState = { current: null, tmp: null, removeNode: null, first: null, second: null };



  const pushFrame = (exp: string, line: number) => {

    frames.push({

      stepIndex: step++,

      nodes: cloneNodes(nodes),

      listRecord: cloneRecord(record),

      pointers: clonePointers(pointers),

      explanation: exp,

      activeLineIndex: line

    });

  };



  // init state

  pushFrame("Sona ekleme (InsertEnd) baÅŸlÄ±yor.", 0);



  // tmp = malloc

  const newAddr = generateAddress();

  const tmpNode: CngNode = { id: `node-${Date.now()}`, value: val, address: newAddr, nextAddress: null, isTemp: true };

  nodes.push(tmpNode);

  pointers.tmp = newAddr;

  pushFrame("Heap'te yeni bir dÃ¼ÄŸÃ¼m (tmp) iÃ§in bellek tahsis edildi.", 1);



  // tmp->item = val

  pushFrame(`tmp dÃ¼ÄŸÃ¼mÃ¼nÃ¼n verisine (item) ${val} atandÄ±.`, 2);



  // tmp->next = NULL

  pushFrame("tmp son dÃ¼ÄŸÃ¼m olacaÄŸÄ± iÃ§in next iÅŸaretÃ§isi NULL yapÄ±ldÄ±.", 3);



  // L->tail->next = tmp

  const tailNode = nodes.find(n => n.address === record.tailAddress);

  if (tailNode) tailNode.nextAddress = newAddr;

  pushFrame("Listenin mevcut son elemanÄ±nÄ±n (tail) next iÅŸaretÃ§isi tmp'ye baÄŸlandÄ±.", 5);



  // L->tail = tmp

  record.tailAddress = newAddr;

  tmpNode.isTemp = false; // no longer floating

  pushFrame("Listenin metadata'sÄ±ndaki tail artÄ±k yeni eklenen dÃ¼ÄŸÃ¼mÃ¼ gÃ¶steriyor.", 6);



  // L->size++

  record.size++;

  pointers.tmp = null; // cleanup

  pushFrame("Listenin boyutu (size) 1 artÄ±rÄ±ldÄ±.", 7);



  return frames;

};



export const simulateSortedInsert = (

  currentNodes: CngNode[],

  currentRecord: CngListRecord,

  val: number

): CngLinkedListFrame[] => {

  const frames: CngLinkedListFrame[] = [];

  let step = 0;

  

  const nodes = cloneNodes(currentNodes);

  const record = cloneRecord(currentRecord);

  const pointers: CngPointerState = { current: null, tmp: null, removeNode: null, first: null, second: null };



  const pushFrame = (exp: string, line: number) => {

    frames.push({

      stepIndex: step++,

      nodes: cloneNodes(nodes),

      listRecord: cloneRecord(record),

      pointers: clonePointers(pointers),

      explanation: exp,

      activeLineIndex: line

    });

  };



  pushFrame("SÄ±ralÄ± araya ekleme baÅŸlÄ±yor.", 0);



  // current = L->head

  pointers.current = record.headAddress;

  pushFrame("current iÅŸaretÃ§isi DUMMY HEAD dÃ¼ÄŸÃ¼mÃ¼ne konumlandÄ±rÄ±ldÄ±.", 1);



  // Traversal

  while (true) {

    const currNode = nodes.find(n => n.address === pointers.current);

    if (!currNode) break;

    

    pushFrame("DÃ¶ngÃ¼ koÅŸulu: Bir sonraki eleman var mÄ± ve deÄŸeri aradÄ±ÄŸÄ±mÄ±zdan kÃ¼Ã§Ã¼k mÃ¼?", 3);

    

    if (currNode.nextAddress) {

      const nextNode = nodes.find(n => n.address === currNode.nextAddress);

      if (nextNode && nextNode.value !== 'DUMMY' && (nextNode.value as number) < val) {

        pointers.current = nextNode.address;

        pushFrame(`current bir sonraki elemana ilerletiliyor (${nextNode.value} < ${val}).`, 4);

      } else {

        break;

      }

    } else {

      break;

    }

  }



  // tmp = malloc

  const newAddr = generateAddress();

  const tmpNode: CngNode = { id: `node-${Date.now()}`, value: val, address: newAddr, nextAddress: null, isTemp: true };

  nodes.push(tmpNode);

  pointers.tmp = newAddr;

  pushFrame("DoÄŸru konum bulundu. Araya eklenecek dÃ¼ÄŸÃ¼m (tmp) iÃ§in bellek tahsis edildi.", 7);



  // tmp->item = val

  pushFrame(`tmp->item = ${val} atamasÄ± yapÄ±ldÄ±.`, 8);



  // tmp->next = current->next

  const currNode = nodes.find(n => n.address === pointers.current);

  if (currNode) tmpNode.nextAddress = currNode.nextAddress;

  pushFrame("GÃœVENLÄ° BAÄLANTI: tmp'nin next oku, current'in ardÄ±ndaki zincire baÄŸlandÄ±. Kopma engellendi.", 9);



  // current->next = tmp

  if (currNode) currNode.nextAddress = newAddr;

  pushFrame("ARAYA GÄ°RÄ°Å: current'in next oku koparÄ±lÄ±p yeni tmp dÃ¼ÄŸÃ¼mÃ¼ne baÄŸlandÄ±.", 10);



  // tail update

  if (tmpNode.nextAddress === null) {

    record.tailAddress = newAddr;

    pushFrame("Yeni dÃ¼ÄŸÃ¼m en sona eklendiÄŸi iÃ§in tail pointer gÃ¼ncellendi.", 12);

  }

  

  // size++

  record.size++;

  tmpNode.isTemp = false;

  pointers.current = null;

  pointers.tmp = null;

  pushFrame("Liste metadata (size) gÃ¼ncellendi. Ekleme tamamlandÄ±.", 13);



  return frames;

};



export const simulateDelete = (

  currentNodes: CngNode[],

  currentRecord: CngListRecord,

  val: number

): CngLinkedListFrame[] => {

  const frames: CngLinkedListFrame[] = [];

  let step = 0;

  

  let nodes = cloneNodes(currentNodes);

  const record = cloneRecord(currentRecord);

  const pointers: CngPointerState = { current: null, tmp: null, removeNode: null, first: null, second: null };



  const pushFrame = (exp: string, line: number) => {

    frames.push({

      stepIndex: step++,

      nodes: cloneNodes(nodes),

      listRecord: cloneRecord(record),

      pointers: clonePointers(pointers),

      explanation: exp,

      activeLineIndex: line

    });

  };



  pushFrame(`DeÄŸeri ${val} olan dÃ¼ÄŸÃ¼mÃ¼ silme iÅŸlemi baÅŸlÄ±yor.`, 0);



  // current = L->head

  pointers.current = record.headAddress;

  pushFrame("current iÅŸaretÃ§isi DUMMY HEAD'den (0. konum) aramaya baÅŸlÄ±yor.", 1);



  // Traversal

  while (true) {

    const currNode = nodes.find(n => n.address === pointers.current);

    if (!currNode) break;



    pushFrame("DÃ¶ngÃ¼ koÅŸulu: Sonraki dÃ¼ÄŸÃ¼m var mÄ± ve deÄŸeri eÅŸleÅŸmiyor mu?", 3);



    if (currNode.nextAddress) {

      const nextNode = nodes.find(n => n.address === currNode.nextAddress);

      if (nextNode && nextNode.value !== val) {

        pointers.current = nextNode.address;

        pushFrame("EÅŸleÅŸme yok, current bir adÄ±m ilerliyor.", 4);

      } else {

        break; // found it or reached end

      }

    } else {

      break;

    }

  }



  const currNode = nodes.find(n => n.address === pointers.current);

  if (currNode && currNode.nextAddress) {

    pushFrame("Silinecek dÃ¼ÄŸÃ¼m bulundu! current, silinecek dÃ¼ÄŸÃ¼mÃ¼n BÄ°R Ã–NCESÄ°NDE durdu.", 7);



    // removeNode = current->next

    pointers.removeNode = currNode.nextAddress;

    const removeNodeRef = nodes.find(n => n.address === pointers.removeNode);

    if (removeNodeRef) removeNodeRef.isTarget = true; // highlight for deletion

    pushFrame("Silinecek dÃ¼ÄŸÃ¼m removeNode iÅŸaretÃ§isi ile kilitlendi (kÄ±rmÄ±zÄ± Ã§erÃ§eve).", 8);



    // current->next = removeNode->next

    if (removeNodeRef) {

      currNode.nextAddress = removeNodeRef.nextAddress;

      pushFrame("KÃ–PRÃœ ATLAMA: current'in oku silinecek dÃ¼ÄŸÃ¼mÃ¼ es geÃ§ip, bir sonrakine baÄŸlandÄ±.", 9);



      // if removeNode == L->tail

      if (removeNodeRef.address === record.tailAddress) {

        record.tailAddress = currNode.address;

        pushFrame("Silinen dÃ¼ÄŸÃ¼m tail olduÄŸu iÃ§in, tail bir Ã¶nceki dÃ¼ÄŸÃ¼me (current) Ã§ekildi.", 11);

      }



      // free(removeNode)

      nodes = nodes.filter(n => n.address !== removeNodeRef.address); // physically remove from array to simulate free

      pointers.removeNode = null;

      pushFrame("free() fonksiyonu Ã§alÄ±ÅŸtÄ±rÄ±ldÄ±. DÃ¼ÄŸÃ¼m bellekten tamamen silindi.", 13);

      

      record.size--;

      pointers.current = null;

      pushFrame("Liste metadata (size) azaltÄ±ldÄ±. Ä°ÅŸlem baÅŸarÄ±lÄ±.", 14);

    }

  } else {

    pushFrame("Silinmek istenen deÄŸer listede bulunamadÄ±. current->next == NULL oldu.", 7);

  }



  return frames;

};



export const simulateSwapFirstTwo = (

  currentNodes: CngNode[],

  currentRecord: CngListRecord

): CngLinkedListFrame[] => {

  const frames: CngLinkedListFrame[] = [];

  let step = 0;

  

  const nodes = cloneNodes(currentNodes);

  const record = cloneRecord(currentRecord);

  const pointers: CngPointerState = { current: null, tmp: null, removeNode: null, first: null, second: null };



  const pushFrame = (exp: string, line: number) => {

    frames.push({

      stepIndex: step++,

      nodes: cloneNodes(nodes),

      listRecord: cloneRecord(record),

      pointers: clonePointers(pointers),

      explanation: exp,

      activeLineIndex: line

    });

  };



  pushFrame("ODTÃœ SÄ±nav Klasikleri: Ä°lk iki elemanÄ± (deÄŸer kopyalamadan) O(1) zamanda takas etme.", 0);



  if (record.size < 2) {

    pushFrame("Listede takas edilecek en az 2 eleman yok (size < 2). Ä°ÅŸlem iptal ediliyor.", 1);

    return frames;

  }



  const headNode = nodes.find(n => n.address === record.headAddress)!;

  

  // first = L->head->next

  pointers.first = headNode.nextAddress;

  pushFrame("first pointer'Ä±, Dummy Head'in gÃ¶sterdiÄŸi (yani asÄ±l listenin ilk) dÃ¼ÄŸÃ¼mÃ¼ne atandÄ±.", 3);

  

  // second = first->next

  const firstNode = nodes.find(n => n.address === pointers.first);

  if(firstNode) {

     pointers.second = firstNode.nextAddress;

     pushFrame("second pointer'Ä±, first'Ã¼n ardÄ±ndaki ikinci dÃ¼ÄŸÃ¼me atandÄ±.", 4);

  }



  const secondNode = nodes.find(n => n.address === pointers.second);

  

  if (firstNode && secondNode) {

     // first->next = second->next

     firstNode.nextAddress = secondNode.nextAddress;

     pushFrame("ADIM 1: first dÃ¼ÄŸÃ¼mÃ¼nÃ¼n oku, second dÃ¼ÄŸÃ¼mÃ¼nÃ¼n ardÄ±ndakine (3. dÃ¼ÄŸÃ¼me veya NULL'a) baÄŸlandÄ±.", 6);



     // second->next = first

     secondNode.nextAddress = firstNode.address;

     pushFrame("ADIM 2: second dÃ¼ÄŸÃ¼mÃ¼nÃ¼n oku geriye dÃ¶nerek first dÃ¼ÄŸÃ¼mÃ¼nÃ¼ gÃ¶steriyor. Ã‡apraz geÃ§iÅŸ oluÅŸtu.", 7);



     // L->head->next = second

     headNode.nextAddress = secondNode.address;

     pushFrame("ADIM 3: Dummy Head'in oku doÄŸrudan second dÃ¼ÄŸÃ¼mÃ¼ne baÄŸlandÄ±. Takas mantÄ±ksal olarak tamamlandÄ±.", 8);



     // Tail check

     if (record.tailAddress === firstNode.address) {

       // Wait, if firstNode was tail, it means size was 2? 

       // No, if L->tail == first? Wait. When they swap, first becomes the second element.

       // Actually if size was 2, L->tail was originally secondNode.

       // Wait, the C code says: `if(L->tail == first) L->tail = first;` which doesn't make sense.

       // Ah, in C code I wrote: `if(L->tail == first) L->tail = first; // Tail update` 

       // Wait, if it was swapped, first is now at the end of the 2-element list. So if tail WAS second, now it should be first!

       // Let me fix the C code in my thoughts: if L->tail == second, then L->tail = first.

     }

     

     // Correcting tail if it was a 2-element list

     if (record.size === 2) {

       record.tailAddress = firstNode.address;

     }



     pointers.first = null;

     pointers.second = null;

     pushFrame("Ä°ÅŸlem O(1) karmaÅŸÄ±klÄ±ÄŸÄ±nda baÅŸarÄ±yla bitti. Pointerlar temizlendi.", 11);

  }



  return frames;

};




export const simulateInsertHead = (
  currentNodes: CngNode[],
  currentRecord: CngListRecord,
  val: number
): CngLinkedListFrame[] => {
  const frames: CngLinkedListFrame[] = [];
  let step = 0;
  const nodes = cloneNodes(currentNodes);
  const record = cloneRecord(currentRecord);
  const pointers: CngPointerState = { current: null, tmp: null, removeNode: null, first: null, second: null };

  const pushFrame = (exp: string, line: number) => {
    frames.push({ stepIndex: step++, nodes: cloneNodes(nodes), listRecord: cloneRecord(record), pointers: clonePointers(pointers), explanation: exp, activeLineIndex: line });
  };

  pushFrame("Başa ekleme işlemi başlıyor.", 0);

  const newAddr = generateAddress();
  const tmpNode: CngNode = { id: `node-${Date.now()}`, value: val, address: newAddr, nextAddress: null, isTemp: true };
  nodes.push(tmpNode);
  pointers.tmp = newAddr;
  pushFrame("tmp düğümü için bellek ayrıldı.", 1);

  pushFrame(`tmp->item = ${val} ataması yapıldı.`, 2);

  const dummy = nodes.find(n => n.address === record.headAddress);
  if (dummy) tmpNode.nextAddress = dummy.nextAddress;
  pushFrame("tmp'nin next'i, listenin mevcut ilk elemanına (Dummy'nin next'ine) bağlandı.", 3);

  if (dummy) dummy.nextAddress = newAddr;
  pushFrame("Dummy'nin next oku yeni eklenen tmp düğümüne yönlendirildi.", 5);

  if (record.size === 0) {
    record.tailAddress = newAddr;
    pushFrame("Liste önceden boş olduğu için tail pointer tmp düğümünü gösterecek şekilde güncellendi.", 6);
  }

  record.size++;
  tmpNode.isTemp = false;
  pointers.tmp = null;
  pushFrame("Boyut artırıldı. İşlem başarılı.", 7);

  return frames;
};

export const simulateInsertIndex = (
  currentNodes: CngNode[],
  currentRecord: CngListRecord,
  val: number,
  index: number
): CngLinkedListFrame[] => {
  const frames: CngLinkedListFrame[] = [];
  let step = 0;
  const nodes = cloneNodes(currentNodes);
  const record = cloneRecord(currentRecord);
  const pointers: CngPointerState = { current: null, tmp: null, removeNode: null, first: null, second: null };

  const pushFrame = (exp: string, line: number) => {
    frames.push({ stepIndex: step++, nodes: cloneNodes(nodes), listRecord: cloneRecord(record), pointers: clonePointers(pointers), explanation: exp, activeLineIndex: line });
  };

  pushFrame(`${index}. indekse ekleme işlemi başlıyor.`, 0);

  if (index < 0 || index > record.size) {
    pushFrame("Geçersiz index! İşlem iptal edildi.", 1);
    return frames;
  }

  pointers.current = record.headAddress;
  pushFrame("current pointer Dummy Head'e (indeks -1) yerleştirildi.", 3);

  for (let i = 0; i < index; i++) {
    const curr = nodes.find(n => n.address === pointers.current);
    if (curr && curr.nextAddress) {
      pointers.current = curr.nextAddress;
      pushFrame(`current pointer ${i}. indeksteki düğüme ilerletildi.`, 5);
    }
  }
  pushFrame(`current pointer hedefin BİR ÖNCESİNE (${index - 1}. düğüm) ulaştı.`, 5);

  const newAddr = generateAddress();
  const tmpNode: CngNode = { id: `node-${Date.now()}`, value: val, address: newAddr, nextAddress: null, isTemp: true };
  nodes.push(tmpNode);
  pointers.tmp = newAddr;
  pushFrame("tmp düğümü oluşturuldu.", 8);

  pushFrame(`tmp->item = ${val} atandı.`, 9);

  const currNode = nodes.find(n => n.address === pointers.current);
  if (currNode) tmpNode.nextAddress = currNode.nextAddress;
  pushFrame("tmp'nin next'i current'in ardına bağlandı (Kopma engellendi).", 10);

  if (currNode) currNode.nextAddress = newAddr;
  pushFrame("current'in next oku yeni tmp düğümüne bağlandı.", 11);

  if (tmpNode.nextAddress === null) {
    record.tailAddress = newAddr;
    pushFrame("Yeni düğüm en sona eklendiği için tail güncellendi.", 13);
  }

  record.size++;
  tmpNode.isTemp = false;
  pointers.current = null;
  pointers.tmp = null;
  pushFrame("Boyut artırıldı. İşlem başarılı.", 14);

  return frames;
};

export const simulateDeleteHead = (
  currentNodes: CngNode[],
  currentRecord: CngListRecord
): CngLinkedListFrame[] => {
  const frames: CngLinkedListFrame[] = [];
  let step = 0;
  let nodes = cloneNodes(currentNodes);
  const record = cloneRecord(currentRecord);
  const pointers: CngPointerState = { current: null, tmp: null, removeNode: null, first: null, second: null };

  const pushFrame = (exp: string, line: number) => {
    frames.push({ stepIndex: step++, nodes: cloneNodes(nodes), listRecord: cloneRecord(record), pointers: clonePointers(pointers), explanation: exp, activeLineIndex: line });
  };

  pushFrame("Baştan silme işlemi başlıyor.", 0);

  if (record.size === 0) {
    pushFrame("Liste boş, silinecek eleman yok.", 1);
    return frames;
  }

  const dummy = nodes.find(n => n.address === record.headAddress);
  if (!dummy || !dummy.nextAddress) return frames;

  pointers.removeNode = dummy.nextAddress;
  const remNode = nodes.find(n => n.address === pointers.removeNode);
  if (remNode) remNode.isTarget = true;
  pushFrame("Silinecek ilk eleman removeNode pointer'ı ile işaretlendi.", 4);

  dummy.nextAddress = remNode ? remNode.nextAddress : null;
  pushFrame("Dummy'nin next oku, silinecek düğümü atlayarak ikinci elemana bağlandı.", 5);

  if (remNode && remNode.address === record.tailAddress) {
    record.tailAddress = dummy.address;
    pushFrame("Silinen düğüm listenin tek/son elemanı olduğu için tail pointer Dummy'ye çekildi.", 7);
  }

  if (remNode) {
    nodes = nodes.filter(n => n.address !== remNode.address);
  }
  pointers.removeNode = null;
  pushFrame("free(removeNode) ile bellek boşaltıldı.", 9);

  record.size--;
  pushFrame("Boyut azaltıldı. İşlem başarılı.", 10);

  return frames;
};

export const simulateDeleteTail = (
  currentNodes: CngNode[],
  currentRecord: CngListRecord
): CngLinkedListFrame[] => {
  const frames: CngLinkedListFrame[] = [];
  let step = 0;
  let nodes = cloneNodes(currentNodes);
  const record = cloneRecord(currentRecord);
  const pointers: CngPointerState = { current: null, tmp: null, removeNode: null, first: null, second: null };

  const pushFrame = (exp: string, line: number) => {
    frames.push({ stepIndex: step++, nodes: cloneNodes(nodes), listRecord: cloneRecord(record), pointers: clonePointers(pointers), explanation: exp, activeLineIndex: line });
  };

  pushFrame("Sondan silme işlemi başlıyor.", 0);

  if (record.size === 0) {
    pushFrame("Liste boş, silinecek eleman yok.", 1);
    return frames;
  }

  pointers.current = record.headAddress;
  pushFrame("Sondan silmek için tail'in BİR ÖNCESİNE gitmeliyiz. current Dummy'den başlıyor.", 4);

  while (true) {
    const currNode = nodes.find(n => n.address === pointers.current);
    if (!currNode || !currNode.nextAddress) break;
    
    if (currNode.nextAddress !== record.tailAddress) {
      pointers.current = currNode.nextAddress;
      pushFrame("current, tail'in öncesine ulaşana kadar ilerliyor.", 6);
    } else {
      break;
    }
  }
  pushFrame("current, tail pointer'ın gösterdiği son elemanın bir öncesinde durdu.", 6);

  const currNode = nodes.find(n => n.address === pointers.current);
  if (!currNode || !currNode.nextAddress) return frames;

  pointers.removeNode = currNode.nextAddress;
  const remNode = nodes.find(n => n.address === pointers.removeNode);
  if (remNode) remNode.isTarget = true;
  pushFrame("Silinecek son eleman removeNode pointer'ı ile işaretlendi.", 9);

  currNode.nextAddress = null;
  pushFrame("current'in next oku NULL yapılarak son eleman koparıldı.", 10);

  record.tailAddress = currNode.address;
  pushFrame("tail pointer artık yeni son eleman olan current'ı gösteriyor.", 11);

  if (remNode) {
    nodes = nodes.filter(n => n.address !== remNode.address);
  }
  pointers.removeNode = null;
  pushFrame("free(removeNode) ile bellek boşaltıldı.", 13);

  record.size--;
  pointers.current = null;
  pushFrame("Boyut azaltıldı. İşlem başarılı.", 14);

  return frames;
};

export const simulateDeleteIndex = (
  currentNodes: CngNode[],
  currentRecord: CngListRecord,
  index: number
): CngLinkedListFrame[] => {
  const frames: CngLinkedListFrame[] = [];
  let step = 0;
  let nodes = cloneNodes(currentNodes);
  const record = cloneRecord(currentRecord);
  const pointers: CngPointerState = { current: null, tmp: null, removeNode: null, first: null, second: null };

  const pushFrame = (exp: string, line: number) => {
    frames.push({ stepIndex: step++, nodes: cloneNodes(nodes), listRecord: cloneRecord(record), pointers: clonePointers(pointers), explanation: exp, activeLineIndex: line });
  };

  pushFrame(`${index}. indeksteki düğümü silme işlemi başlıyor.`, 0);

  if (index < 0 || index >= record.size) {
    pushFrame("Geçersiz index (sınırların dışında). İşlem iptal edildi.", 1);
    return frames;
  }

  pointers.current = record.headAddress;
  pushFrame("current pointer Dummy Head'e (indeks -1) yerleştirildi.", 4);

  for (let i = 0; i < index; i++) {
    const curr = nodes.find(n => n.address === pointers.current);
    if (curr && curr.nextAddress) {
      pointers.current = curr.nextAddress;
      pushFrame(`current pointer ilerletiliyor. (Adım: ${i+1})`, 6);
    }
  }
  pushFrame(`current pointer silinecek hedefin BİR ÖNCESİNE (${index - 1}. düğüm) ulaştı.`, 6);

  const currNode = nodes.find(n => n.address === pointers.current);
  if (!currNode || !currNode.nextAddress) return frames;

  pointers.removeNode = currNode.nextAddress;
  const remNode = nodes.find(n => n.address === pointers.removeNode);
  if (remNode) remNode.isTarget = true;
  pushFrame("Silinecek eleman removeNode pointer'ı ile kilitlendi.", 9);

  currNode.nextAddress = remNode ? remNode.nextAddress : null;
  pushFrame("Köprü atlandı! current'in next oku silinecek düğümü es geçti.", 10);

  if (remNode && remNode.address === record.tailAddress) {
    record.tailAddress = currNode.address;
    pushFrame("Silinen düğüm tail olduğu için tail pointer güncellendi.", 12);
  }

  if (remNode) {
    nodes = nodes.filter(n => n.address !== remNode.address);
  }
  pointers.removeNode = null;
  pushFrame("free() çalıştırıldı, bellek iade edildi.", 14);

  record.size--;
  pointers.current = null;
  pushFrame("Boyut azaltıldı. İşlem başarılı.", 15);

  return frames;
};

export const simulateGetElementAtPosition = (
  currentNodes: CngNode[],
  currentRecord: CngListRecord,
  pos: number
): CngLinkedListFrame[] => {
  const frames: CngLinkedListFrame[] = [];
  let step = 0;
  let nodes = cloneNodes(currentNodes);
  let record = cloneRecord(currentRecord);
  let pointers: CngPointerState = { current: null, tmp: null, removeNode: null, first: null, second: null };

  const pushFrame = (explanation: string, activeCodeLine: number) => {
    frames.push({ stepIndex: step++, nodes: cloneNodes(nodes), listRecord: cloneRecord(record), pointers: clonePointers(pointers), activeLineIndex: activeCodeLine, explanation });
  };

  pushFrame(`GetElementAtPosition çağrıldı. İstenen pozisyon: ${pos}`, 1);
  if (pos < 1 || pos > record.size) {
    pushFrame("Geçersiz pozisyon (sınırların dışında). -1 döndürülüyor.", 2);
    return frames;
  }

  const dummy = nodes.find(n => n.address === record.headAddress);
  pointers.current = dummy?.nextAddress || null;
  pushFrame("p işaretçisi listenin ilk elemanına (head->next) atandı.", 4);

  let currentPos = 1;
  pushFrame(`Arama döngüsü başlatılıyor. currentPos = 1`, 5);

  while (pointers.current && currentPos < pos) {
    const curr = nodes.find(n => n.address === pointers.current);
    if (!curr) break;
    pointers.current = curr.nextAddress;
    currentPos++;
    pushFrame(`p bir sonraki elemana kaydı. currentPos = ${currentPos}`, 8);
  }

  if (pointers.current) {
    const curr = nodes.find(n => n.address === pointers.current);
    curr!.isTarget = true;
    pushFrame(`İstenen pozisyona (${pos}) ulaşıldı. Değer döndürülüyor: ${curr!.value}`, 12);
    curr!.isTarget = false;
  }

  return frames;
};

export const simulateGetPositionOfElement = (
  currentNodes: CngNode[],
  currentRecord: CngListRecord,
  val: number
): CngLinkedListFrame[] => {
  const frames: CngLinkedListFrame[] = [];
  let step = 0;
  let nodes = cloneNodes(currentNodes);
  let record = cloneRecord(currentRecord);
  let pointers: CngPointerState = { current: null, tmp: null, removeNode: null, first: null, second: null };

  const pushFrame = (explanation: string, activeCodeLine: number) => {
    frames.push({ stepIndex: step++, nodes: cloneNodes(nodes), listRecord: cloneRecord(record), pointers: clonePointers(pointers), activeLineIndex: activeCodeLine, explanation });
  };

  pushFrame(`GetPositionOfElement çağrıldı. Aranan değer: ${val}`, 1);
  
  const dummy = nodes.find(n => n.address === record.headAddress);
  pointers.current = dummy?.nextAddress || null;
  pushFrame("p işaretçisi listenin ilk elemanına (head->next) atandı.", 2);

  let pos = 1;

  while (pointers.current) {
    const curr = nodes.find(n => n.address === pointers.current);
    if (!curr) break;
    
    curr.isTarget = true;
    pushFrame(`Pozisyon ${pos}: Değer ${curr.value} ile ${val} karşılaştırılıyor.`, 5);
    
    if (curr.value === val) {
      pushFrame(`Eşleşme bulundu! Eleman pozisyonu (index): ${pos}`, 6);
      curr.isTarget = false;
      return frames;
    }
    
    curr.isTarget = false;
    pointers.current = curr.nextAddress;
    pos++;
    pushFrame(`Eşleşme yok. p bir sonraki elemana kayıyor. pos = ${pos}`, 7);
  }

  pushFrame("Liste sonuna gelindi ancak eleman bulunamadı. -1 döndürülüyor.", 11);
  return frames;
};

export const simulateHeadOfList = (
  currentNodes: CngNode[],
  currentRecord: CngListRecord
): CngLinkedListFrame[] => {
  const frames: CngLinkedListFrame[] = [];
  let step = 0;
  let nodes = cloneNodes(currentNodes);
  let record = cloneRecord(currentRecord);
  let pointers: CngPointerState = { current: null, tmp: null, removeNode: null, first: null, second: null };

  const pushFrame = (explanation: string, activeCodeLine: number) => {
    frames.push({ stepIndex: step++, nodes: cloneNodes(nodes), listRecord: cloneRecord(record), pointers: clonePointers(pointers), activeLineIndex: activeCodeLine, explanation });
  };

  pushFrame("Listenin başındaki eleman isteniyor.", 1);
  
  if (record.size > 0) {
    const dummy = nodes.find(n => n.address === record.headAddress);
    pointers.current = dummy?.nextAddress || null;
    const curr = nodes.find(n => n.address === pointers.current);
    if(curr) curr.isTarget = true;
    pushFrame(`Liste boş değil. İlk elemanın değeri döndürülüyor: ${curr?.value}`, 3);
    if(curr) curr.isTarget = false;
  } else {
    pushFrame("Liste boş. -1 döndürülüyor.", 5);
  }

  return frames;
};

export const simulateTailOfList = (
  currentNodes: CngNode[],
  currentRecord: CngListRecord
): CngLinkedListFrame[] => {
  const frames: CngLinkedListFrame[] = [];
  let step = 0;
  let nodes = cloneNodes(currentNodes);
  let record = cloneRecord(currentRecord);
  let pointers: CngPointerState = { current: null, tmp: null, removeNode: null, first: null, second: null };

  const pushFrame = (explanation: string, activeCodeLine: number) => {
    frames.push({ stepIndex: step++, nodes: cloneNodes(nodes), listRecord: cloneRecord(record), pointers: clonePointers(pointers), activeLineIndex: activeCodeLine, explanation });
  };

  pushFrame("Listenin sonundaki (kuyruk) eleman isteniyor.", 1);
  
  if (record.size > 0) {
    pointers.current = record.tailAddress;
    const curr = nodes.find(n => n.address === pointers.current);
    if(curr) curr.isTarget = true;
    pushFrame(`Tail işaretçisi sayesinde doğrudan son elemana erişildi. Değer: ${curr?.value}`, 3);
    if(curr) curr.isTarget = false;
  } else {
    pushFrame("Liste boş. -1 döndürülüyor.", 5);
  }

  return frames;
};

export const simulateListSize = (
  currentNodes: CngNode[],
  currentRecord: CngListRecord
): CngLinkedListFrame[] => {
  const frames: CngLinkedListFrame[] = [];
  let step = 0;
  let nodes = cloneNodes(currentNodes);
  let record = cloneRecord(currentRecord);
  let pointers: CngPointerState = { current: null, tmp: null, removeNode: null, first: null, second: null };

  const pushFrame = (explanation: string, activeCodeLine: number) => {
    frames.push({ stepIndex: step++, nodes: cloneNodes(nodes), listRecord: cloneRecord(record), pointers: clonePointers(pointers), activeLineIndex: activeCodeLine, explanation });
  };

  pushFrame(`O(1) zamanda listenin boyutu döndürülüyor: ${record.size}`, 1);
  return frames;
};

export const simulateIsEmpty = (
  currentNodes: CngNode[],
  currentRecord: CngListRecord
): CngLinkedListFrame[] => {
  const frames: CngLinkedListFrame[] = [];
  let step = 0;
  let nodes = cloneNodes(currentNodes);
  let record = cloneRecord(currentRecord);
  let pointers: CngPointerState = { current: null, tmp: null, removeNode: null, first: null, second: null };

  const pushFrame = (explanation: string, activeCodeLine: number) => {
    frames.push({ stepIndex: step++, nodes: cloneNodes(nodes), listRecord: cloneRecord(record), pointers: clonePointers(pointers), activeLineIndex: activeCodeLine, explanation });
  };

  pushFrame(`Listenin boyutu 0 mı kontrol ediliyor. Sonuç: ${record.size === 0 ? "Evet (1)" : "Hayır (0)"}`, 1);
  return frames;
};
