import { AVLNodeState, AVLRecord, AVLStep, AVLPointers } from '../types/avl';

const cCodeAVL = `AVLTree InsertElement(int val, AVLTree t) {
  if (t == NULL) {
    t = malloc(sizeof(struct Node));
    t->val = val; t->height = 0;
    t->left = t->right = NULL;
  }
  else if (val < t->val) {
    t->left = InsertElement(val, t->left);
    if (Height(t->left) - Height(t->right) == 2)
      if (val < t->left->val) t = SingleRotateWithRight(t);
      else t = DoubleRotateWithLeft(t);
  }
  else if (val > t->val) {
    t->right = InsertElement(val, t->right);
    if (Height(t->right) - Height(t->left) == 2)
      if (val > t->right->val) t = SingleRotateWithLeft(t);
      else t = DoubleRotateWithRight(t);
  }
  t->height = Max(Height(t->left), Height(t->right)) + 1;
  return t;
}`;

// Helper logic
const generateAddress = () => `0x${Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0').toUpperCase()}`;
const cloneNodes = (nodes: AVLNodeState[]) => nodes.map(n => ({ ...n }));
const cloneRecord = (r: AVLRecord) => ({ ...r });

const getHeight = (nodes: AVLNodeState[], addr: string | null) => {
  if (addr === null) return -1;
  const n = nodes.find(x => x.address === addr);
  return n ? n.height : -1;
};

export const createInitialAVL = (): { nodes: AVLNodeState[], record: AVLRecord } => {
  return { nodes: [], record: { rootAddress: null, size: 0 } };
};

export const simulateAVLInsert = (
  currentNodes: AVLNodeState[],
  currentRecord: AVLRecord,
  val: number
): AVLStep[] => {
  const frames: AVLStep[] = [];
  let step = 0;
  
  const nodes = cloneNodes(currentNodes);
  const record = cloneRecord(currentRecord);
  const pointers: AVLPointers = { t: null, k1: null, k2: null, k3: null };
  const activePointers: string[] = [];

  const pushFrame = (title: string, exp: string, line: number) => {
    frames.push({
      stepNumber: step++, title, explanation: exp, activeCodeLine: line,
      cCode: cCodeAVL, nodes: cloneNodes(nodes), treeRecord: cloneRecord(record),
      pointers: { ...pointers }, activePointers: [...activePointers]
    });
  };

  const SingleRotateWithRight = (k2_addr: string): string => {
    // LL Imbalance: k2 is root, k1 is left child. Rotate Right.
    pointers.k2 = k2_addr;
    const k2 = nodes.find(n => n.address === k2_addr)!;
    pointers.k1 = k2.leftAddress;
    const k1 = nodes.find(n => n.address === pointers.k1)!;
    
    activePointers.push('k2', 'k1');
    pushFrame("SingleRotateWithRight (LL)", "Sol-Sol (LL) dengesizliği saptandı. K2 düğümü etrafında Sağa Rotasyon yapılacak. K1 (K2'nin sol çocuğu) yeni kök olacak.", 10);
    
    k2.leftAddress = k1.rightAddress;
    k1.rightAddress = k2_addr;
    
    pushFrame("Bağlantılar Güncellendi", "K2'nin soluna K1'in sağı bağlandı. K1'in sağına ise K2 bağlandı.", 10);

    k2.height = Math.max(getHeight(nodes, k2.leftAddress), getHeight(nodes, k2.rightAddress)) + 1;
    k1.height = Math.max(getHeight(nodes, k1.leftAddress), k2.height) + 1;

    pushFrame("Yükseklikler Güncellendi", "Döndürme sonrası K1 ve K2'nin yükseklikleri (height) yeniden hesaplandı.", 10);
    
    activePointers.length = 0;
    pointers.k1 = null; pointers.k2 = null;
    return k1.address;
  };

  const SingleRotateWithLeft = (k1_addr: string): string => {
    // RR Imbalance: k1 is root, k2 is right child. Rotate Left.
    pointers.k1 = k1_addr;
    const k1 = nodes.find(n => n.address === k1_addr)!;
    pointers.k2 = k1.rightAddress;
    const k2 = nodes.find(n => n.address === pointers.k2)!;

    activePointers.push('k1', 'k2');
    pushFrame("SingleRotateWithLeft (RR)", "Sağ-Sağ (RR) dengesizliği saptandı. K1 düğümü etrafında Sola Rotasyon yapılacak. K2 (K1'in sağ çocuğu) yeni kök olacak.", 16);

    k1.rightAddress = k2.leftAddress;
    k2.leftAddress = k1_addr;

    pushFrame("Bağlantılar Güncellendi", "K1'in sağına K2'nin solu bağlandı. K2'nin soluna ise K1 bağlandı.", 16);

    k1.height = Math.max(getHeight(nodes, k1.leftAddress), getHeight(nodes, k1.rightAddress)) + 1;
    k2.height = Math.max(getHeight(nodes, k2.rightAddress), k1.height) + 1;

    pushFrame("Yükseklikler Güncellendi", "Döndürme sonrası K1 ve K2'nin yükseklikleri (height) yeniden hesaplandı.", 16);
    
    activePointers.length = 0;
    pointers.k1 = null; pointers.k2 = null;
    return k2.address;
  };

  const DoubleRotateWithLeft = (k3_addr: string): string => {
    // LR Imbalance
    pushFrame("DoubleRotateWithLeft (LR)", "Sol-Sağ (LR) dengesizliği saptandı. Çift rotasyon (Önce Sola, sonra Sağa) yapılacak.", 11);
    const k3 = nodes.find(n => n.address === k3_addr)!;
    
    pushFrame("Adım 1: Sol Çocuğa Sola Rotasyon", "K3'ün sol çocuğuna (K1) Sola Rotasyon uygulanıyor.", 11);
    k3.leftAddress = SingleRotateWithLeft(k3.leftAddress!);
    
    pushFrame("Adım 2: Kök'e Sağa Rotasyon", "Şimdi K3 düğümüne Sağa Rotasyon uygulanıyor.", 11);
    return SingleRotateWithRight(k3_addr);
  };

  const DoubleRotateWithRight = (k3_addr: string): string => {
    // RL Imbalance
    pushFrame("DoubleRotateWithRight (RL)", "Sağ-Sol (RL) dengesizliği saptandı. Çift rotasyon (Önce Sağa, sonra Sola) yapılacak.", 17);
    const k3 = nodes.find(n => n.address === k3_addr)!;
    
    pushFrame("Adım 1: Sağ Çocuğa Sağa Rotasyon", "K3'ün sağ çocuğuna (K2) Sağa Rotasyon uygulanıyor.", 17);
    k3.rightAddress = SingleRotateWithRight(k3.rightAddress!);
    
    pushFrame("Adım 2: Kök'e Sola Rotasyon", "Şimdi K3 düğümüne Sola Rotasyon uygulanıyor.", 17);
    return SingleRotateWithLeft(k3_addr);
  };

  const recurse = (nodeAddr: string | null): string => {
    pointers.t = nodeAddr;
    activePointers.push('t');

    if (nodeAddr === null) {
      const newAddr = generateAddress();
      const newNode: AVLNodeState = {
        id: `avlnode-${Date.now()}-${Math.random()}`,
        address: newAddr, val: val, height: 0,
        leftAddress: null, rightAddress: null,
        isActive: true
      };
      nodes.push(newNode);
      pushFrame("Düğüm Ekleme", "t == NULL ulaşıldı. Yeni düğüm bellekten ayrıldı ve eklendi.", 3);
      newNode.isActive = false;
      activePointers.pop();
      return newAddr;
    }

    const node = nodes.find(n => n.address === nodeAddr)!;
    node.isActive = true;

    if (val < node.val) {
      pushFrame("Sola İlerleme", `${val} < ${node.val} olduğu için sol alt ağaca (t->left) iniliyor.`, 8);
      node.isActive = false;
      activePointers.pop();
      
      node.leftAddress = recurse(node.leftAddress);
      
      pointers.t = nodeAddr;
      activePointers.push('t');
      node.isActive = true;

      // Balance check
      if (getHeight(nodes, node.leftAddress) - getHeight(nodes, node.rightAddress) === 2) {
        pushFrame("Denge Kontrolü", `t->left ve t->right arasındaki yükseklik farkı 2! Denge bozuldu.`, 9);
        if (val < nodes.find(n => n.address === node.leftAddress)!.val) {
          node.isActive = false;
          const newRoot = SingleRotateWithRight(nodeAddr);
          nodes.find(n => n.address === newRoot)!.isActive = true;
          nodeAddr = newRoot;
        } else {
          node.isActive = false;
          const newRoot = DoubleRotateWithLeft(nodeAddr);
          nodes.find(n => n.address === newRoot)!.isActive = true;
          nodeAddr = newRoot;
        }
      }
    } 
    else if (val > node.val) {
      pushFrame("Sağa İlerleme", `${val} > ${node.val} olduğu için sağ alt ağaca (t->right) iniliyor.`, 14);
      node.isActive = false;
      activePointers.pop();

      node.rightAddress = recurse(node.rightAddress);

      pointers.t = nodeAddr;
      activePointers.push('t');
      node.isActive = true;

      // Balance check
      if (getHeight(nodes, node.rightAddress) - getHeight(nodes, node.leftAddress) === 2) {
        pushFrame("Denge Kontrolü", `t->right ve t->left arasındaki yükseklik farkı 2! Denge bozuldu.`, 15);
        if (val > nodes.find(n => n.address === node.rightAddress)!.val) {
          node.isActive = false;
          const newRoot = SingleRotateWithLeft(nodeAddr);
          nodes.find(n => n.address === newRoot)!.isActive = true;
          nodeAddr = newRoot;
        } else {
          node.isActive = false;
          const newRoot = DoubleRotateWithRight(nodeAddr);
          nodes.find(n => n.address === newRoot)!.isActive = true;
          nodeAddr = newRoot;
        }
      }
    }
    else {
      pushFrame("Değer Zaten Var", `${val} değeri ağaçta zaten bulunuyor, ekleme yapılmayacak.`, 18);
    }

    const currentRootNode = nodes.find(n => n.address === nodeAddr)!;
    currentRootNode.height = Math.max(getHeight(nodes, currentRootNode.leftAddress), getHeight(nodes, currentRootNode.rightAddress)) + 1;
    pushFrame("Yükseklik Güncelleme", `Düğümün yeni yüksekliği hesaplandı: ${currentRootNode.height}`, 19);
    
    currentRootNode.isActive = false;
    activePointers.pop();
    return nodeAddr;
  };

  pushFrame("Başlangıç", `AVL Ekleme işlemi ${val} değeri için başlatıldı.`, 1);
  
  const newRoot = recurse(record.rootAddress);
  if (record.rootAddress !== newRoot) {
    record.rootAddress = newRoot;
  }
  if (nodes.length > currentNodes.length) {
    record.size++;
  }

  pointers.t = null;
  pushFrame("Bitiş", "AVL Ekleme ve dengeleme işlemleri tamamlandı.", 20);

  return frames;
};
export const cCodeAVLDelete = `AvlTree DeleteElement(int val, AvlTree t) {
    if (t == NULL) return NULL;
    
    if (val < t->element) {
        t->left = DeleteElement(val, t->left);
    } else if (val > t->element) {
        t->right = DeleteElement(val, t->right);
    } else {
        if (t->left != NULL && t->right != NULL) {
            AvlTree tmp = FindMin(t->right);
            t->element = tmp->element;
            t->right = DeleteElement(t->element, t->right);
        } else {
            AvlTree tmp = t;
            if (t->left == NULL) t = t->right;
            else if (t->right == NULL) t = t->left;
            free(tmp);
        }
    }
    
    if (t == NULL) return t;
    
    t->height = max(TreeHeight(t->left), TreeHeight(t->right)) + 1;
    
    if (TreeHeight(t->left) - TreeHeight(t->right) == 2) {
        if (TreeHeight(t->left->left) - TreeHeight(t->left->right) >= 0)
            t = SingleRotateWithRight(t);
        else
            t = DoubleRotateWithLeft(t);
    } else if (TreeHeight(t->right) - TreeHeight(t->left) == 2) {
        if (TreeHeight(t->right->right) - TreeHeight(t->right->left) >= 0)
            t = SingleRotateWithLeft(t);
        else
            t = DoubleRotateWithRight(t);
    }
    return t;
}`;

export const simulateAVLDelete = (
  initialNodes: AVLNodeState[],
  initialRecord: AVLRecord,
  val: number
): AVLStep[] => {
  const steps: AVLStep[] = [];
  const nodes = initialNodes.map(n => ({ ...n, isActive: false, isTarget: false, isTemp: false }));
  const record = { ...initialRecord };
  
  const pointers: AVLPointers = { t: null, k1: null, k2: null, k3: null };
  const activePointers: string[] = [];

  const pushFrame = (explanation: string, activeCodeLine: number | null = null) => {
    steps.push({
      nodes: JSON.parse(JSON.stringify(nodes)),
      treeRecord: { ...record },
      pointers: { ...pointers },
      activePointers: [...activePointers],
      stepNumber: steps.length,
      title: "AVL İşlemi",
      explanation,
      cCode: cCodeAVLDelete,
      activeCodeLine
    });
  };

  pushFrame(`AVL Ağacından ${val} değerini silme işlemi başlıyor...`, 1);

  const getHeight = (nodeAddr: string | null): number => {
    if (!nodeAddr) return -1;
    return nodes.find(n => n.address === nodeAddr)!.height;
  };

  const updateHeight = (nodeAddr: string | null) => {
    if (!nodeAddr) return;
    const node = nodes.find(n => n.address === nodeAddr)!;
    node.height = Math.max(getHeight(node.leftAddress), getHeight(node.rightAddress)) + 1;
  };

  // Rotation Helpers - Exact copy from Insertion, adapted for delete context
  const SingleRotateWithRight = (k2Addr: string): string => {
    pointers.k2 = k2Addr;
    activePointers.push('k2');
    const k2 = nodes.find(n => n.address === k2Addr)!;
    pushFrame("SingleRotateWithRight (LL): k2 atandı.", 29);

    const k1Addr = k2.leftAddress!;
    pointers.k1 = k1Addr;
    activePointers.push('k1');
    const k1 = nodes.find(n => n.address === k1Addr)!;
    pushFrame("SingleRotateWithRight (LL): k1 = k2->left atandı.", 29);

    k2.leftAddress = k1.rightAddress;
    pushFrame("SingleRotateWithRight (LL): k2->left = k1->right", 29);

    k1.rightAddress = k2Addr;
    pushFrame("SingleRotateWithRight (LL): k1->right = k2", 29);

    updateHeight(k2Addr);
    updateHeight(k1Addr);
    
    pointers.k2 = null;
    pointers.k1 = null;
    activePointers.pop();
    activePointers.pop();
    return k1Addr;
  };

  const SingleRotateWithLeft = (k1Addr: string): string => {
    pointers.k1 = k1Addr;
    activePointers.push('k1');
    const k1 = nodes.find(n => n.address === k1Addr)!;
    pushFrame("SingleRotateWithLeft (RR): k1 atandı.", 34);

    const k2Addr = k1.rightAddress!;
    pointers.k2 = k2Addr;
    activePointers.push('k2');
    const k2 = nodes.find(n => n.address === k2Addr)!;
    pushFrame("SingleRotateWithLeft (RR): k2 = k1->right atandı.", 34);

    k1.rightAddress = k2.leftAddress;
    pushFrame("SingleRotateWithLeft (RR): k1->right = k2->left", 34);

    k2.leftAddress = k1Addr;
    pushFrame("SingleRotateWithLeft (RR): k2->left = k1", 34);

    updateHeight(k1Addr);
    updateHeight(k2Addr);

    pointers.k1 = null;
    pointers.k2 = null;
    activePointers.pop();
    activePointers.pop();
    return k2Addr;
  };

  const DoubleRotateWithLeft = (k3Addr: string): string => {
    pointers.k3 = k3Addr;
    activePointers.push('k3');
    const k3 = nodes.find(n => n.address === k3Addr)!;
    pushFrame("DoubleRotateWithLeft (LR): k3 atandı.", 31);

    k3.leftAddress = SingleRotateWithLeft(k3.leftAddress!);
    pushFrame("DoubleRotateWithLeft (LR): İç rotasyon (RR) tamamlandı.", 31);

    const newRoot = SingleRotateWithRight(k3Addr);
    pointers.k3 = null;
    activePointers.pop();
    pushFrame("DoubleRotateWithLeft (LR): Dış rotasyon (LL) tamamlandı.", 31);
    
    return newRoot;
  };

  const DoubleRotateWithRight = (k1Addr: string): string => {
    pointers.k1 = k1Addr;
    activePointers.push('k1');
    const k1 = nodes.find(n => n.address === k1Addr)!;
    pushFrame("DoubleRotateWithRight (RL): k1 atandı.", 36);

    k1.rightAddress = SingleRotateWithRight(k1.rightAddress!);
    pushFrame("DoubleRotateWithRight (RL): İç rotasyon (LL) tamamlandı.", 36);

    const newRoot = SingleRotateWithLeft(k1Addr);
    pointers.k1 = null;
    activePointers.pop();
    pushFrame("DoubleRotateWithRight (RL): Dış rotasyon (RR) tamamlandı.", 36);
    
    return newRoot;
  };

  const findMin = (nodeAddr: string): string => {
    let curr = nodeAddr;
    while (true) {
      const node = nodes.find(n => n.address === curr)!;
      if (!node.leftAddress) break;
      curr = node.leftAddress;
    }
    return curr;
  };

  const recurseDelete = (nodeAddr: string | null, targetVal: number): string | null => {
    pointers.t = nodeAddr;
    activePointers.push('t');
    pushFrame(`Silme işlemi için t işaretçisi atandı.`, 2);

    if (!nodeAddr) {
      pushFrame("Düğüm bulunamadı (t == NULL).", 2);
      activePointers.pop();
      return null;
    }

    const node = nodes.find(n => n.address === nodeAddr)!;
    node.isActive = true;

    if (targetVal < node.val) {
      pushFrame(`${targetVal} < ${node.val} olduğu için sol alt ağaca gidiliyor.`, 5);
      node.isActive = false;
      activePointers.pop();
      node.leftAddress = recurseDelete(node.leftAddress, targetVal);
      pointers.t = nodeAddr;
      activePointers.push('t');
      node.isActive = true;
    } else if (targetVal > node.val) {
      pushFrame(`${targetVal} > ${node.val} olduğu için sağ alt ağaca gidiliyor.`, 7);
      node.isActive = false;
      activePointers.pop();
      node.rightAddress = recurseDelete(node.rightAddress, targetVal);
      pointers.t = nodeAddr;
      activePointers.push('t');
      node.isActive = true;
    } else {
      pushFrame("Düğüm bulundu!", 9);
      node.isTarget = true;
      
      if (node.leftAddress && node.rightAddress) {
        pushFrame("Düğümün iki çocuğu var. Inorder successor (sağ alt ağacın en küçüğü) bulunuyor.", 10);
        const minAddr = findMin(node.rightAddress);
        const minNode = nodes.find(n => n.address === minAddr)!;
        minNode.isTemp = true;
        pushFrame(`Successor bulundu: ${minNode.val}`, 11);
        
        node.val = minNode.val;
        node.isTarget = false;
        minNode.isTemp = false;
        node.isActive = false;
        pushFrame(`Değer kopyalandı. Şimdi ${node.val} değerini sağ alt ağaçtan silmek için recursion çağrılıyor.`, 12);
        
        activePointers.pop();
        node.rightAddress = recurseDelete(node.rightAddress, node.val);
        pointers.t = nodeAddr;
        activePointers.push('t');
        node.isActive = true;
      } else {
        pushFrame("Düğümün bir veya sıfır çocuğu var.", 15);
        const childAddr = node.leftAddress ? node.leftAddress : node.rightAddress;
        
        // Remove from nodes array physically for visualization
        const index = nodes.findIndex(n => n.address === nodeAddr);
        nodes.splice(index, 1);
        record.size -= 1;
        
        pushFrame("Düğüm silindi.", 19);
        activePointers.pop();
        
        return childAddr;
      }
    }

    // Rebalancing
    updateHeight(nodeAddr);
    pushFrame("Yükseklik güncellendi.", 24);

    const leftH = getHeight(node.leftAddress);
    const rightH = getHeight(node.rightAddress);

    if (leftH - rightH === 2) {
      pushFrame("Denge bozuldu! Sol taraf ağır basıyor.", 27);
      const leftChild = nodes.find(n => n.address === node.leftAddress)!;
      if (getHeight(leftChild.leftAddress) - getHeight(leftChild.rightAddress) >= 0) {
        node.isActive = false;
        const newRoot = SingleRotateWithRight(nodeAddr);
        nodes.find(n => n.address === newRoot)!.isActive = true;
        activePointers.pop();
        return newRoot;
      } else {
        node.isActive = false;
        const newRoot = DoubleRotateWithLeft(nodeAddr);
        nodes.find(n => n.address === newRoot)!.isActive = true;
        activePointers.pop();
        return newRoot;
      }
    } else if (rightH - leftH === 2) {
      pushFrame("Denge bozuldu! Sağ taraf ağır basıyor.", 32);
      const rightChild = nodes.find(n => n.address === node.rightAddress)!;
      if (getHeight(rightChild.rightAddress) - getHeight(rightChild.leftAddress) >= 0) {
        node.isActive = false;
        const newRoot = SingleRotateWithLeft(nodeAddr);
        nodes.find(n => n.address === newRoot)!.isActive = true;
        activePointers.pop();
        return newRoot;
      } else {
        node.isActive = false;
        const newRoot = DoubleRotateWithRight(nodeAddr);
        nodes.find(n => n.address === newRoot)!.isActive = true;
        activePointers.pop();
        return newRoot;
      }
    }

    node.isActive = false;
    activePointers.pop();
    return nodeAddr;
  };

  record.rootAddress = recurseDelete(record.rootAddress, val);
  pushFrame("Silme ve dengeleme işlemi tamamlandı.");
  return steps;
};

export const cCodeAVLFind = `AvlTree Find(int val, AvlTree t) {
    if (t == NULL) return NULL;
    if (val < t->element)
        return Find(val, t->left);
    else if (val > t->element)
        return Find(val, t->right);
    else
        return t;
}`;

export const cCodeAVLFindMinMax = `AvlTree FindMin(AvlTree t) {
    if (t == NULL) return NULL;
    else if (t->left == NULL) return t;
    else return FindMin(t->left);
}

AvlTree FindMax(AvlTree t) {
    if (t != NULL)
        while (t->right != NULL)
            t = t->right;
    return t;
}`;

export const simulateAVLFind = (
  initialNodes: AVLNodeState[],
  initialRecord: AVLRecord,
  val: number
): AVLStep[] => {
  const steps: AVLStep[] = [];
  const nodes = initialNodes.map(n => ({ ...n, isActive: false, isTarget: false, isTemp: false }));
  
  const pointers: AVLPointers = { t: null, k1: null, k2: null, k3: null };
  const activePointers: string[] = [];

  const pushFrame = (explanation: string, activeCodeLine: number | null = null) => {
    steps.push({
      nodes: JSON.parse(JSON.stringify(nodes)),
      treeRecord: { ...initialRecord },
      pointers: { ...pointers },
      activePointers: [...activePointers],
      stepNumber: steps.length,
      title: "AVL İşlemi",
      explanation,
      cCode: cCodeAVLFind,
      activeCodeLine
    });
  };

  pushFrame(`AVL Ağacında ${val} değerini arama işlemi başlıyor...`, 1);

  const recurseFind = (nodeAddr: string | null): string | null => {
    pointers.t = nodeAddr;
    activePointers.push('t');
    pushFrame(`Arama için t işaretçisi atandı.`, 1);

    if (!nodeAddr) {
      pushFrame("Düğüm bulunamadı (t == NULL). Arama başarısız.", 2);
      activePointers.pop();
      return null;
    }

    const node = nodes.find(n => n.address === nodeAddr)!;
    node.isActive = true;

    if (val < node.val) {
      pushFrame(`${val} < ${node.val} olduğu için sol alt ağaca gidiliyor.`, 4);
      node.isActive = false;
      activePointers.pop();
      const res = recurseFind(node.leftAddress);
      
      pointers.t = nodeAddr;
      activePointers.push('t');
      node.isActive = true;
      pushFrame("Rekürsif çağrıdan dönüldü.", 4);
      
      node.isActive = false;
      activePointers.pop();
      return res;
    } else if (val > node.val) {
      pushFrame(`${val} > ${node.val} olduğu için sağ alt ağaca gidiliyor.`, 6);
      node.isActive = false;
      activePointers.pop();
      const res = recurseFind(node.rightAddress);
      
      pointers.t = nodeAddr;
      activePointers.push('t');
      node.isActive = true;
      pushFrame("Rekürsif çağrıdan dönüldü.", 6);
      
      node.isActive = false;
      activePointers.pop();
      return res;
    } else {
      pushFrame(`Değer bulundu (${val} == ${node.val})! İşlem başarılı.`, 8);
      node.isTarget = true;
      
      node.isActive = false;
      activePointers.pop();
      return nodeAddr;
    }
  };

  recurseFind(initialRecord.rootAddress);
  pushFrame("Arama işlemi tamamlandı.");
  return steps;
};

export const simulateAVLFindMinMax = (
  initialNodes: AVLNodeState[],
  initialRecord: AVLRecord,
  op: 'find_min' | 'find_max'
): AVLStep[] => {
  const steps: AVLStep[] = [];
  const nodes = initialNodes.map(n => ({ ...n, isActive: false, isTarget: false, isTemp: false }));
  
  const pointers: AVLPointers = { t: null, k1: null, k2: null, k3: null };
  const activePointers: string[] = [];

  const pushFrame = (explanation: string, activeCodeLine: number | null = null) => {
    steps.push({
      nodes: JSON.parse(JSON.stringify(nodes)),
      treeRecord: { ...initialRecord },
      pointers: { ...pointers },
      activePointers: [...activePointers],
      stepNumber: steps.length,
      title: "AVL İşlemi",
      explanation,
      cCode: cCodeAVLFindMinMax,
      activeCodeLine
    });
  };

  pushFrame(`AVL Ağacında en ${op === 'find_min' ? 'küçük' : 'büyük'} değeri bulma işlemi başlıyor...`, op === 'find_min' ? 1 : 7);

  if (op === 'find_min') {
    const recurseMin = (nodeAddr: string | null): string | null => {
      pointers.t = nodeAddr;
      activePointers.push('t');
      pushFrame(`t işaretçisi atandı.`, 1);

      if (!nodeAddr) {
        pushFrame("Ağaç boş (t == NULL).", 2);
        activePointers.pop();
        return null;
      }

      const node = nodes.find(n => n.address === nodeAddr)!;
      node.isActive = true;
      pushFrame("Düğüm kontrol ediliyor.", 3);

      if (!node.leftAddress) {
        pushFrame("Sol çocuk yok (t->left == NULL). En küçük düğüm bu!", 3);
        node.isTarget = true;
        node.isActive = false;
        activePointers.pop();
        return nodeAddr;
      } else {
        pushFrame("Sol çocuk var. Rekürsif olarak sola iniliyor.", 4);
        node.isActive = false;
        activePointers.pop();
        const res = recurseMin(node.leftAddress);
        
        pointers.t = nodeAddr;
        activePointers.push('t');
        node.isActive = true;
        pushFrame("Rekürsif çağrıdan dönüldü.", 4);
        
        node.isActive = false;
        activePointers.pop();
        return res;
      }
    };
    recurseMin(initialRecord.rootAddress);
  } else {
    // Find Max Iterative
    pointers.t = initialRecord.rootAddress;
    activePointers.push('t');
    pushFrame(`t kök düğüme atandı.`, 8);
    
    if (pointers.t) {
      let node = nodes.find(n => n.address === pointers.t)!;
      node.isActive = true;
      
      while (node.rightAddress) {
        pushFrame("Sağ çocuk var (t->right != NULL). Sağa iniliyor.", 9);
        node.isActive = false;
        pointers.t = node.rightAddress;
        node = nodes.find(n => n.address === pointers.t)!;
        node.isActive = true;
        pushFrame("t işaretçisi güncellendi (t = t->right).", 10);
      }
      
      pushFrame("Sağ çocuk yok. En büyük düğüm bulundu!", 11);
      node.isTarget = true;
      node.isActive = false;
    } else {
      pushFrame("Ağaç boş.", 8);
    }
    activePointers.pop();
  }

  pushFrame("İşlem tamamlandı.");
  return steps;
};

export const cCodeAVLAnalysis = `int TreeHeight(AvlTree t) {
    if (t == NULL) return -1;
    return 1 + max(TreeHeight(t->left), TreeHeight(t->right));
}

int CountNodes(AvlTree t) {
    if (t == NULL) return 0;
    return 1 + CountNodes(t->left) + CountNodes(t->right);
}

int CountLeaves(AvlTree t) {
    if (t == NULL) return 0;
    if (t->left == NULL && t->right == NULL) return 1;
    return CountLeaves(t->left) + CountLeaves(t->right);
}

int IsAVLTree(AvlTree t) {
    if (t == NULL) return 1;
    int diff = TreeHeight(t->left) - TreeHeight(t->right);
    if (diff > 1 || diff < -1) return 0;
    return IsAVLTree(t->left) && IsAVLTree(t->right);
}

void PrintTree(AvlTree t) {
    if (t != NULL) {
        PrintTree(t->left);
        printf("%d ", t->element);
        PrintTree(t->right);
    }
}`;

export const simulateAVLAnalysis = (
  initialNodes: AVLNodeState[],
  initialRecord: AVLRecord,
  op: 'tree_height' | 'count_nodes' | 'count_leaves' | 'is_avl' | 'traverse_inorder' | 'traverse_preorder' | 'traverse_postorder' | 'traverse_levelorder'
): AVLStep[] => {
  const steps: AVLStep[] = [];
  const nodes = initialNodes.map(n => ({ ...n, isActive: false, isTarget: false, isTemp: false }));
  
  const pointers: AVLPointers = { t: null, k1: null, k2: null, k3: null };
  const activePointers: string[] = [];
  
  const traversalResult: number[] = [];

  const pushFrame = (explanation: string, activeCodeLine: number | null = null) => {
    steps.push({
      nodes: JSON.parse(JSON.stringify(nodes)),
      treeRecord: { ...initialRecord },
      pointers: { ...pointers },
      activePointers: [...activePointers],
      stepNumber: steps.length,
      title: "AVL İşlemi",
      explanation,
      cCode: cCodeAVLAnalysis,
      activeCodeLine
    });
  };

  const opNames: Record<string, string> = {
    'tree_height': 'Ağaç Yüksekliği (Tree Height)',
    'count_nodes': 'Düğüm Sayısı (Count Nodes)',
    'count_leaves': 'Yaprak Sayısı (Count Leaves)',
    'is_avl': 'AVL Kontrolü (Is AVL Tree)',
    'traverse_inorder': 'In-order Traversal',
    'traverse_preorder': 'Pre-order Traversal',
    'traverse_postorder': 'Post-order Traversal',
    'traverse_levelorder': 'Level-order Traversal'
  };

  pushFrame(`${opNames[op]} işlemi başlıyor...`, 1);

  if (!op.startsWith('traverse_')) {
    const getRes = (nodeAddr: string | null): number => {
      if (!nodeAddr) {
        if (op === 'tree_height') return -1;
        if (op === 'is_avl') return 1;
        return 0;
      }
      const node = nodes.find(n => n.address === nodeAddr)!;
      if (op === 'count_leaves' && !node.leftAddress && !node.rightAddress) return 1;

      const leftRes = getRes(node.leftAddress);
      const rightRes = getRes(node.rightAddress);

      if (op === 'tree_height') return 1 + Math.max(leftRes, rightRes);
      if (op === 'count_nodes') return 1 + leftRes + rightRes;
      if (op === 'count_leaves') return leftRes + rightRes;
      if (op === 'is_avl') {
        const lh = node.leftAddress ? nodes.find(n => n.address === node.leftAddress)!.height : -1;
        const rh = node.rightAddress ? nodes.find(n => n.address === node.rightAddress)!.height : -1;
        const diff = Math.abs(lh - rh);
        if (diff > 1) return 0;
        return leftRes === 1 && rightRes === 1 ? 1 : 0;
      }
      return 0;
    };

    const result = getRes(initialRecord.rootAddress);
    let finalStr = `${result}`;
    if (op === 'is_avl') finalStr = result === 1 ? "Evet (1)" : "Hayır (0)";
    
    pushFrame(`${opNames[op]} işlemi tamamlandı. Sonuç: ${finalStr}`, null);
    return steps;
  }

  if (op === 'traverse_levelorder') {
    if (!initialRecord.rootAddress) {
      pushFrame("Ağaç boş, çıkılıyor.");
      return steps;
    }
    const queue: string[] = [initialRecord.rootAddress];
    pushFrame("Kök düğüm kuyruğa eklendi (Enqueue).");

    while (queue.length > 0) {
      const currentAddr = queue.shift()!;
      pointers.t = currentAddr;
      activePointers.push('t');
      const currentNode = nodes.find(n => n.address === currentAddr)!;
      
      currentNode.isActive = true;
      pushFrame("Kuyruktan bir düğüm alındı (Dequeue).");
      
      traversalResult.push(currentNode.val);
      currentNode.isTarget = true;
      pushFrame(`[${currentNode.val}] Düğüm ziyaret edildi (Yazdırıldı).`);

      if (currentNode.leftAddress) {
        queue.push(currentNode.leftAddress);
        pushFrame(`[${currentNode.val}]'nin sol çocuğu kuyruğa eklendi.`);
      }
      if (currentNode.rightAddress) {
        queue.push(currentNode.rightAddress);
        pushFrame(`[${currentNode.val}]'nin sağ çocuğu kuyruğa eklendi.`);
      }
      
      currentNode.isActive = false;
      currentNode.isTarget = false;
      activePointers.pop();
    }
  } else {
    // DFS Traversals
    const recurse = (nodeAddr: string | null) => {
      pointers.t = nodeAddr;
      activePointers.push('t');
      pushFrame(`t işaretçisi atandı.`);

      if (!nodeAddr) {
        pushFrame("Düğüm NULL, taban duruma ulaşıldı.");
        activePointers.pop();
        return;
      }

      const node = nodes.find(n => n.address === nodeAddr)!;
      node.isActive = true;

      if (op === 'traverse_preorder') {
        traversalResult.push(node.val);
        node.isTarget = true;
        pushFrame(`[${node.val}] Düğüm ziyaret edildi (Yazdırıldı - Pre-order).`);
        node.isTarget = false;
      }

      pushFrame(`[${node.val}] Sol alt ağaca gidiliyor.`);
      node.isActive = false;
      activePointers.pop();
      recurse(node.leftAddress);
      
      pointers.t = nodeAddr;
      activePointers.push('t');
      node.isActive = true;

      if (op === 'traverse_inorder') {
        traversalResult.push(node.val);
        node.isTarget = true;
        pushFrame(`[${node.val}] Düğüm ziyaret edildi (Yazdırıldı - In-order).`);
        node.isTarget = false;
      }
      
      pushFrame(`[${node.val}] Sağ alt ağaca gidiliyor.`);
      node.isActive = false;
      activePointers.pop();
      recurse(node.rightAddress);
      
      pointers.t = nodeAddr;
      activePointers.push('t');
      node.isActive = true;

      if (op === 'traverse_postorder') {
        traversalResult.push(node.val);
        node.isTarget = true;
        pushFrame(`[${node.val}] Düğüm ziyaret edildi (Yazdırıldı - Post-order).`);
        node.isTarget = false;
      }

      pushFrame(`[${node.val}] İşlem tamamlandı.`);
      node.isActive = false;
      activePointers.pop();
    };

    recurse(initialRecord.rootAddress);
  }

  pushFrame(`İşlem tamamlandı. Sonuç: ${traversalResult.join(', ')}`);
  return steps;
};

export const generateRandomAVL = (): { nodes: AVLNodeState[], record: AVLRecord } => {
  let currNodes: AVLNodeState[] = [];
  let currRecord: AVLRecord = { rootAddress: null, size: 0 };
  
  for(let i = 0; i < 6; i++) {
    const val = Math.floor(Math.random() * 100);
    const steps = simulateAVLInsert(currNodes, currRecord, val);
    if (steps.length > 0) {
      const lastState = steps[steps.length - 1];
      currNodes = lastState.nodes;
      currRecord = lastState.treeRecord;
    }
  }
  
  return { nodes: currNodes, record: currRecord };
};

