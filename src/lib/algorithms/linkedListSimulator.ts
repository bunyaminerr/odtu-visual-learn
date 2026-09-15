import { LinkedListNode, MemoryPointer, LinkedListStep } from "../types/dsa";

// Rastgele bellek adresi üretici
const generateAddress = () => {
    return '0x' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
};

const cloneNodes = (nodes: LinkedListNode[]): LinkedListNode[] => {
    return nodes.map(n => ({ ...n }));
};

const clonePointers = (pointers: MemoryPointer): MemoryPointer => {
    return { ...pointers };
};

export const simulateInsertHead = (
    currentNodes: LinkedListNode[],
    currentPointers: MemoryPointer,
    value: number | string
): LinkedListStep[] => {
    const steps: LinkedListStep[] = [];
    let stepIndex = 0;
    
    let nodes = cloneNodes(currentNodes);
    let pointers = clonePointers(currentPointers);

    const recordStep = (title: string, exp: string, code: string, highlight?: string) => {
        steps.push({
            stepIndex: stepIndex++,
            title,
            explanation: exp,
            cCodeSnippet: code,
            nodes: cloneNodes(nodes),
            pointers: clonePointers(pointers),
            highlightAddress: highlight
        });
    };

    // Adım 1: Malloc
    const newAddress = generateAddress();
    const newNode: LinkedListNode = {
        id: `node-${Date.now()}`,
        value: "?", // henüz atanmadı
        address: newAddress,
        nextAddress: null
    };
    nodes.push(newNode);
    pointers.temp = newAddress;
    
    recordStep(
        "Bellek Tahsisi (Allocation)",
        "Heap belleğinden yeni bir 'struct node' boyutu kadar yer ayrıldı. 'temp' pointer'ı bu yeni adresi gösteriyor.",
        "struct node *temp = (struct node*)malloc(sizeof(struct node));",
        newAddress
    );

    // Adım 2: Değer ataması
    const nodeRef = nodes.find(n => n.address === newAddress)!;
    nodeRef.value = value;
    
    recordStep(
        "Veri Ataması",
        "Oluşturulan yeni düğümün 'data' (value) alanına girilen değer atandı.",
        "temp->data = value;",
        newAddress
    );

    // Adım 3: Next pointer'ı eski head'e bağlama
    nodeRef.nextAddress = pointers.head;
    
    recordStep(
        "Eski Listeye Bağlama",
        "Yeni düğümün 'next' pointer'ı mevcut listenin başını (head) gösterecek şekilde ayarlandı.",
        "temp->next = head;",
        newAddress
    );

    // Adım 4: Head'i güncelleme
    pointers.head = newAddress;
    pointers.temp = null; // C'de temp fonksiyon bitince yok olur ama biz görselde head ile temp'i aynı yere de koyabilirdik. Burada temizliyoruz.
    
    recordStep(
        "Head'i Güncelleme",
        "'head' pointer'ı artık listemizin yeni başı olan düğümü gösteriyor. İşlem tamamlandı.",
        "head = temp;",
        newAddress
    );

    return steps;
};

export const simulateInsertTail = (
    currentNodes: LinkedListNode[],
    currentPointers: MemoryPointer,
    value: number | string
): LinkedListStep[] => {
    const steps: LinkedListStep[] = [];
    let stepIndex = 0;
    
    let nodes = cloneNodes(currentNodes);
    let pointers = clonePointers(currentPointers);

    const recordStep = (title: string, exp: string, code: string, highlight?: string) => {
        steps.push({
            stepIndex: stepIndex++,
            title,
            explanation: exp,
            cCodeSnippet: code,
            nodes: cloneNodes(nodes),
            pointers: clonePointers(pointers),
            highlightAddress: highlight
        });
    };

    // Adım 1: Malloc
    const newAddress = generateAddress();
    const newNode: LinkedListNode = {
        id: `node-${Date.now()}`,
        value: "?",
        address: newAddress,
        nextAddress: null
    };
    nodes.push(newNode);
    pointers.temp = newAddress;
    recordStep(
        "Bellek Tahsisi (Allocation)",
        "Yeni eklenecek düğüm için bellek ayrıldı. 'temp' bu adresi gösteriyor.",
        "struct node *temp = (struct node*)malloc(sizeof(struct node));",
        newAddress
    );

    // Adım 2: Atamalar
    const nodeRef = nodes.find(n => n.address === newAddress)!;
    nodeRef.value = value;
    nodeRef.nextAddress = null;
    recordStep(
        "Veri Ataması",
        "Yeni düğüme veri eklendi ve son düğüm olacağı için next'i NULL yapıldı.",
        "temp->data = value;\ntemp->next = NULL;",
        newAddress
    );

    // Adım 3: Traversal veya Doğrudan ekleme
    if (!pointers.head) {
        pointers.head = newAddress;
        pointers.temp = null;
        recordStep(
            "Head'e Atama (Liste Boş)",
            "Liste boş olduğu için yeni düğüm doğrudan head olarak belirlendi.",
            "if (head == NULL) {\n    head = temp;\n}",
            newAddress
        );
        return steps;
    }

    // Traversal
    pointers.current = pointers.head;
    recordStep(
        "Gezinti (Traversal) Başlangıcı",
        "Listenin sonunu bulmak için 'current' adında bir pointer head'e konumlandırıldı.",
        "struct node *current = head;",
        pointers.current
    );

    let currNode = nodes.find(n => n.address === pointers.current);
    while (currNode && currNode.nextAddress) {
        pointers.current = currNode.nextAddress;
        currNode = nodes.find(n => n.address === pointers.current);
        recordStep(
            "Gezinti İlerliyor",
            "'current' pointer'ı listenin bir sonraki düğümüne ilerledi.",
            "current = current->next;",
            pointers.current!
        );
    }

    // Sona Ekleme
    if (currNode) {
        currNode.nextAddress = newAddress;
        recordStep(
            "Sona Ekleme",
            "Listenin sonundaki düğümün next pointer'ı artık yeni düğümü gösteriyor.",
            "current->next = temp;",
            currNode.address
        );
    }

    // Temizlik
    pointers.current = null;
    pointers.temp = null;
    recordStep(
        "İşlem Tamamlandı",
        "Sona ekleme başarılı. Yerel pointerlar bellekten silindi.",
        "// Fonksiyon sonu",
        newAddress
    );

    return steps;
};

export const simulateDeleteNode = (
    currentNodes: LinkedListNode[],
    currentPointers: MemoryPointer,
    value: number | string
): LinkedListStep[] => {
    const steps: LinkedListStep[] = [];
    let stepIndex = 0;
    let nodes = cloneNodes(currentNodes);
    let pointers = clonePointers(currentPointers);

    const recordStep = (title: string, exp: string, code: string, highlight?: string) => {
        steps.push({
            stepIndex: stepIndex++,
            title,
            explanation: exp,
            cCodeSnippet: code,
            nodes: cloneNodes(nodes),
            pointers: clonePointers(pointers),
            highlightAddress: highlight
        });
    };

    if (!pointers.head) {
        recordStep("Silme Hatası", "Liste boş, silinecek eleman yok.", "if (head == NULL) return;");
        return steps;
    }

    pointers.temp = pointers.head;
    pointers.prev = null;
    recordStep("Gezinti Başlangıcı", "'temp' head'i, 'prev' ise NULL'ı gösteriyor.", "struct node *temp = head;\nstruct node *prev = NULL;", pointers.temp);

    let tempNode = nodes.find(n => n.address === pointers.temp);
    
    // Head silinmesi
    if (tempNode && tempNode.value == value) { // == is used for number/string loose match if needed, or strict ===
        pointers.head = tempNode.nextAddress;
        recordStep("Head Siliniyor", "Silinecek eleman baştaki eleman. Head pointer bir sonrakine kaydırıldı.", "head = temp->next;", pointers.head || undefined);
        
        nodes = nodes.filter(n => n.address !== tempNode!.address);
        pointers.temp = null;
        recordStep("Bellekten Silme (Free)", "'free(temp)' çağrısıyla bellek iade edildi.", "free(temp);");
        return steps;
    }

    // Traversal
    while (tempNode && tempNode.value != value) {
        pointers.prev = pointers.temp;
        pointers.temp = tempNode.nextAddress;
        tempNode = nodes.find(n => n.address === pointers.temp);
        
        if (pointers.temp) {
            recordStep("Gezinti İlerliyor", "'prev' ve 'temp' birer adım ileri kaydırıldı.", "prev = temp;\ntemp = temp->next;", pointers.temp);
        }
    }

    if (!tempNode) {
        recordStep("Bulunamadı", "Aranan değer listede bulunamadı.", "if (temp == NULL) return;");
        pointers.temp = null;
        pointers.prev = null;
        return steps;
    }

    // Silme
    const prevNode = nodes.find(n => n.address === pointers.prev);
    if (prevNode) {
        prevNode.nextAddress = tempNode.nextAddress;
        recordStep("Bağlantıların Güncellenmesi", "Silinecek düğümün (temp) atlanması için prev'in next'i güncellendi.", "prev->next = temp->next;", prevNode.address);
    }

    nodes = nodes.filter(n => n.address !== tempNode!.address);
    pointers.temp = null;
    pointers.prev = null;
    recordStep("Bellekten Silme (Free)", "'free(temp)' çağrısıyla bellek iade edildi.", "free(temp);");

    return steps;
};

export const simulateReverse = (
    currentNodes: LinkedListNode[],
    currentPointers: MemoryPointer
): LinkedListStep[] => {
    const steps: LinkedListStep[] = [];
    let stepIndex = 0;
    let nodes = cloneNodes(currentNodes);
    let pointers = clonePointers(currentPointers);

    const recordStep = (title: string, exp: string, code: string, highlight?: string) => {
        steps.push({
            stepIndex: stepIndex++,
            title,
            explanation: exp,
            cCodeSnippet: code,
            nodes: cloneNodes(nodes),
            pointers: clonePointers(pointers),
            highlightAddress: highlight
        });
    };

    pointers.prev = null;
    pointers.current = pointers.head;
    pointers.next = null;
    
    recordStep("Tersine Çevirme Başlangıcı", "Gerekli üç işaretçi (prev, current, next) tanımlandı.", "struct node *prev = NULL;\nstruct node *current = head;\nstruct node *next = NULL;");

    while (pointers.current) {
        const currNode = nodes.find(n => n.address === pointers.current);
        if (!currNode) break;

        pointers.next = currNode.nextAddress;
        recordStep("Next'i Saklama", "Mevcut düğümün bir sonraki adresi 'next' işaretçisinde saklandı.", "next = current->next;", pointers.current);

        currNode.nextAddress = pointers.prev;
        recordStep("Bağlantıyı Ters Çevirme", "Mevcut düğümün next'i 'prev'i (önceki düğümü) gösterecek şekilde tersine çevrildi.", "current->next = prev;", currNode.address);

        pointers.prev = pointers.current;
        pointers.current = pointers.next;
        
        if (pointers.current) {
            recordStep("İşaretçileri İlerletme", "Prev ve Current bir sonraki adıma geçmek için kaydırıldı.", "prev = current;\ncurrent = next;", pointers.prev);
        } else {
            recordStep("Döngü Sonu", "Current NULL oldu, döngü bitti.", "prev = current;\ncurrent = next;", pointers.prev!);
        }
    }

    pointers.head = pointers.prev;
    pointers.prev = null;
    pointers.current = null;
    pointers.next = null;
    
    recordStep("Head'i Güncelleme", "Liste tersine çevrildiği için yeni head eski son düğüm (prev) oldu.", "head = prev;", pointers.head || undefined);

    return steps;
};

