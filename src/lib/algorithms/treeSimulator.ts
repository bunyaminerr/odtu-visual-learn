import { TreeNodeState, TreeRecord, TreeStep, TreePointers } from '../types/tree';

const generateAddress = () => '0x' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase();
const cloneNodes = (nodes: TreeNodeState[]): TreeNodeState[] => nodes.map(n => ({ ...n }));
const cloneRecord = (r: TreeRecord): TreeRecord => ({ ...r });

export const createInitialTree = (): { nodes: TreeNodeState[], record: TreeRecord } => {
  return { nodes: [], record: { rootAddress: null, size: 0 } };
};

// --- C CODES ---
const cCodeRecursiveInsert = `Tree RecursiveInsert(int x, Tree t) { 
  if (t == NULL) {  
    t = malloc(sizeof(struct TreeNode));  
    t->val = x;  
    t->left = t->right = NULL;  
  } 
  else if (x < t->val) 
    t->left = RecursiveInsert(x, t->left); 
  else if (x > t->val) 
    t->right = RecursiveInsert(x, t->right);  
  
  return t; 
}`;

const cCodeIterativeInsert = `Tree IterativeInsert(int x, Tree t) {
  Tree newNode = malloc(sizeof(struct TreeNode));
  newNode->val = x;
  newNode->left = newNode->right = NULL;
  
  if (t == NULL) return newNode;
  
  Tree current = t;
  Tree parent = NULL;
  
  while (current != NULL) {
    parent = current;
    if (x < current->val) current = current->left;
    else if (x > current->val) current = current->right;
    else { free(newNode); return t; }
  }
  
  if (x < parent->val) parent->left = newNode;
  else parent->right = newNode;
  
  return t;
}`;

const cCodeIterativeDelete = `Tree DeleteIterative(int x, Tree t) {
  Tree current = t;
  Tree parent = NULL;
  
  while (current != NULL && current->val != x) {
    parent = current;
    if (x < current->val) current = current->left;
    else current = current->right;
  }
  
  if (current == NULL) return t;
  
  if (current->left != NULL && current->right != NULL) {
    Tree tmp = current->right;
    Tree tmp_parent = current;
    while (tmp->left != NULL) {
      tmp_parent = tmp;
      tmp = tmp->left;
    }
    current->val = tmp->val;
    current = tmp;
    parent = tmp_parent;
  }
  
  Tree child = (current->left != NULL) ? current->left : current->right;
  
  if (parent == NULL) t = child;
  else if (parent->left == current) parent->left = child;
  else parent->right = child;
  
  free(current);
  return t;
}`;

const cCodeIterativeFindMin = `Tree IterativeFindMinimum(Tree t) {
  if (t == NULL) return NULL;
  while (t->left != NULL) t = t->left;
  return t;
}`;

const cCodeIterativeFindMax = `Tree IterativeFindMaximum(Tree t) {
  if (t == NULL) return NULL;
  while (t->right != NULL) t = t->right;
  return t;
}`;

const cCodeRecursiveFindMin = `Tree RecursiveFindMinimum(Tree t) {
  if (t == NULL) return NULL;
  if (t->left == NULL) return t;
  return RecursiveFindMinimum(t->left);
}`;

const cCodeRecursiveFindMax = `Tree RecursiveFindMaximum(Tree t) {
  if (t == NULL) return NULL;
  if (t->right == NULL) return t;
  return RecursiveFindMaximum(t->right);
}`;

// --- SIMULATORS ---

export const simulateRecursiveInsert = (
  currentNodes: TreeNodeState[],
  currentRecord: TreeRecord,
  val: number
): TreeStep[] => {
  const frames: TreeStep[] = [];
  let step = 0;
  
  const nodes = cloneNodes(currentNodes);
  const record = cloneRecord(currentRecord);
  const pointers: TreePointers = { current: record.rootAddress, parent: null, tmp: null };

  const pushFrame = (title: string, exp: string, line: number) => {
    frames.push({
      stepNumber: step++, title, explanation: exp, activeCodeLine: line,
      cCode: cCodeRecursiveInsert, nodes: cloneNodes(nodes), treeRecord: cloneRecord(record),
      pointers: { ...pointers }, activePointers: []
    });
  };

  // Helper function to recursively traverse and generate frames
  const recurse = (nodeAddr: string | null, parentAddr: string | null, isLeft: boolean): string => {
    pointers.current = nodeAddr;
    pointers.parent = parentAddr;
    
    if (nodeAddr === null) {
      pushFrame("NULL Kontrolü", "Düğüm NULL, yeni bellek ayrılacak.", 2);
      
      const newAddr = generateAddress();
      const newNode: TreeNodeState = {
        id: `tnode-${Date.now()}-${Math.random()}`,
        address: newAddr, val: val,
        leftAddress: null, rightAddress: null,
        isTemp: true
      };
      nodes.push(newNode);
      
      pointers.current = newAddr;
      pushFrame("Düğüm Oluşturuldu", `Yeni düğüm (${val}) oluşturuldu ve değer atandı.`, 3);
      
      newNode.isTemp = false;
      pushFrame("Dönüş (Return)", "Yeni adres bir üst çağrıya döndürülüyor.", 10);
      return newAddr;
    }

    const node = nodes.find(n => n.address === nodeAddr);
    if (!node) return nodeAddr;

    node.isActive = true;
    pushFrame("Düğüm Karşılaştırma", `Eklenecek değer (${val}), mevcut düğümle (${node.val}) karşılaştırılıyor.`, 6);
    
    if (val < node.val) {
      pushFrame("Sola Dallanma", `${val} < ${node.val} olduğu için sola gidilecek.`, 7);
      node.isActive = false;
      
      const retAddr = recurse(node.leftAddress, nodeAddr, true);
      
      // Update after return
      pointers.current = nodeAddr;
      pointers.parent = parentAddr;
      const returningNode = nodes.find(n => n.address === nodeAddr);
      if (returningNode) {
        returningNode.isActive = true;
        returningNode.leftAddress = retAddr;
        pushFrame("Bağlantı (Sol)", `Alt çağrıdan dönen adres (${retAddr}) sol çocuk olarak bağlandı.`, 8);
        returningNode.isActive = false;
      }
    } else if (val > node.val) {
      pushFrame("Sağa Dallanma", `${val} > ${node.val} olduğu için sağa gidilecek.`, 9);
      node.isActive = false;
      
      const retAddr = recurse(node.rightAddress, nodeAddr, false);
      
      // Update after return
      pointers.current = nodeAddr;
      pointers.parent = parentAddr;
      const returningNode = nodes.find(n => n.address === nodeAddr);
      if (returningNode) {
        returningNode.isActive = true;
        returningNode.rightAddress = retAddr;
        pushFrame("Bağlantı (Sağ)", `Alt çağrıdan dönen adres (${retAddr}) sağ çocuk olarak bağlandı.`, 10);
        returningNode.isActive = false;
      }
    } else {
      pushFrame("Eşitlik", "Değer ağaçta zaten var, ekleme yapılmayacak.", 11);
      node.isActive = false;
    }
    
    return nodeAddr;
  };

  pushFrame("Başlangıç", `Ekleme işlemi (Rekürsif) ${val} değeri için başlatıldı.`, 1);
  const newRoot = recurse(record.rootAddress, null, false);
  
  if (record.rootAddress !== newRoot) {
    record.rootAddress = newRoot;
    record.size++;
  } else if (nodes.length > currentNodes.length) {
    record.size++;
  }
  
  pointers.current = null;
  pushFrame("Bitiş", "Rekürsif ekleme işlemi tamamlandı.", 11);

  return frames;
};

export const simulateIterativeInsert = (
  currentNodes: TreeNodeState[],
  currentRecord: TreeRecord,
  val: number
): TreeStep[] => {
  const frames: TreeStep[] = [];
  let step = 0;
  
  const nodes = cloneNodes(currentNodes);
  const record = cloneRecord(currentRecord);
  const pointers: TreePointers = { current: null, parent: null, tmp: null };

  const pushFrame = (title: string, exp: string, line: number) => {
    frames.push({
      stepNumber: step++, title, explanation: exp, activeCodeLine: line,
      cCode: cCodeIterativeInsert, nodes: cloneNodes(nodes), treeRecord: cloneRecord(record),
      pointers: { ...pointers }, activePointers: []
    });
  };

  pushFrame("Başlangıç", `Ekleme işlemi (İteratif) ${val} değeri için başlatıldı.`, 1);

  // 1. Yeni düğümü oluştur
  const newAddr = generateAddress();
  const newNode: TreeNodeState = {
    id: `tnode-${Date.now()}-${Math.random()}`,
    address: newAddr, val: val,
    leftAddress: null, rightAddress: null,
    isTemp: true
  };
  nodes.push(newNode);
  
  pointers.tmp = newAddr;
  pushFrame("Düğüm Oluşturuldu", `Yeni düğüm (${val}) bellekten ayrıldı (newNode).`, 2);

  // 2. Kök kontrolü
  if (record.rootAddress === null) {
    pushFrame("NULL Kontrolü", "Ağaç boş, yeni düğüm doğrudan kök (root) oluyor.", 6);
    record.rootAddress = newAddr;
    record.size++;
    newNode.isTemp = false;
    pointers.tmp = null;
    pushFrame("Bitiş", "İteratif ekleme işlemi tamamlandı.", 21);
    return frames;
  }
  pushFrame("NULL Kontrolü", "Ağaç boş değil, uygun yer aranacak.", 6);

  // 3. İterasyon hazırlığı
  pointers.current = record.rootAddress;
  pointers.parent = null;
  pushFrame("İşaretçileri Hazırla", "current köke atandı, parent ise NULL olarak başlatıldı.", 8);

  // 4. İterasyon
  let currentAddr: string | null = record.rootAddress;
  let parentAddr: string | null = null;
  
  while (currentAddr !== null) {
    pushFrame("Döngü Başlangıcı", "current boş değil, döngü devam ediyor.", 11);
    
    parentAddr = currentAddr;
    pointers.parent = parentAddr;
    pushFrame("Parent Güncellemesi", "parent işaretçisi current'ın adresini aldı.", 12);

    const currentNode = nodes.find(n => n.address === currentAddr);
    if (!currentNode) break;
    
    currentNode.isActive = true;
    pushFrame("Karşılaştırma", `Eklenecek değer (${val}), current (${currentNode.val}) ile karşılaştırılıyor.`, 13);
    
    if (val < currentNode.val) {
      currentAddr = currentNode.leftAddress;
      pointers.current = currentAddr;
      pushFrame("Sola Kay", `${val} < ${currentNode.val} olduğundan current sola (current->left) kaydırıldı.`, 13);
    } else if (val > currentNode.val) {
      currentAddr = currentNode.rightAddress;
      pointers.current = currentAddr;
      pushFrame("Sağa Kay", `${val} > ${currentNode.val} olduğundan current sağa (current->right) kaydırıldı.`, 14);
    } else {
      pushFrame("Eşitlik", "Değer zaten ağaçta mevcut! Yeni oluşturulan düğüm silinecek (free) ve çıkılacak.", 15);
      currentNode.isActive = false;
      pointers.tmp = null;
      nodes.pop(); // Remove the temp node
      pushFrame("Bitiş", "Değer var olduğu için ekleme yapılmadı.", 15);
      return frames;
    }
    
    currentNode.isActive = false;
  }
  
  // 5. Ekleme işlemi
  pushFrame("Döngü Sonu", "current NULL oldu, uygun parent bulundu. Yeni düğüm bağlanacak.", 18);
  const parentNode = nodes.find(n => n.address === parentAddr);
  if (parentNode) {
    if (val < parentNode.val) {
      parentNode.leftAddress = newAddr;
      pushFrame("Bağlantı (Sol)", `${val} < ${parentNode.val} olduğu için sol çocuk olarak eklendi.`, 18);
    } else {
      parentNode.rightAddress = newAddr;
      pushFrame("Bağlantı (Sağ)", `${val} > ${parentNode.val} olduğu için sağ çocuk olarak eklendi.`, 19);
    }
  }
  
  newNode.isTemp = false;
  record.size++;
  pointers.current = null;
  pointers.parent = null;
  pointers.tmp = null;
  
  pushFrame("Bitiş", "İteratif ekleme başarıyla tamamlandı.", 21);

  return frames;
};

export const simulateIterativeDelete = (
  currentNodes: TreeNodeState[],
  currentRecord: TreeRecord,
  val: number
): TreeStep[] => {
  const frames: TreeStep[] = [];
  let step = 0;
  
  const nodes = cloneNodes(currentNodes);
  const record = cloneRecord(currentRecord);
  const pointers: TreePointers = { current: null, parent: null, tmp: null };
  let tmpParentAddr: string | null = null; // Internal tracker for tmp_parent

  const pushFrame = (title: string, exp: string, line: number) => {
    // Inject tmp_parent into activePointers if it exists, otherwise just default
    const activePointers = tmpParentAddr ? ['tmp_parent'] : [];
    
    frames.push({
      stepNumber: step++, title, explanation: exp, activeCodeLine: line,
      cCode: cCodeIterativeDelete, nodes: cloneNodes(nodes), treeRecord: cloneRecord(record),
      pointers: { ...pointers }, activePointers
    });
  };

  pushFrame("Başlangıç", "Silme işlemi (İteratif) " + val + " değeri için başlatıldı.", 1);

  // 1. ARAMA AŞAMASI
  pointers.current = record.rootAddress;
  pointers.parent = null;
  pushFrame("İşaretçileri Hazırla", "current köke atandı, parent ise NULL.", 3);

  let currentAddr: string | null = pointers.current;
  let parentAddr: string | null = pointers.parent;
  let currentNode = nodes.find(n => n.address === currentAddr);

  while (currentAddr !== null && currentNode && currentNode.val !== val) {
    pushFrame("Arama Döngüsü", "current değeri " + val + " olmadığı için aramaya devam ediliyor.", 6);
    
    parentAddr = currentAddr;
    pointers.parent = parentAddr;
    pushFrame("Parent Güncellendi", "parent işaretçisi current'ın adresini aldı.", 7);

    currentNode.isActive = true;
    if (val < currentNode.val) {
      currentAddr = currentNode.leftAddress;
      pointers.current = currentAddr;
      pushFrame("Sola Kay", val + " < " + currentNode.val + " olduğundan sola gidiliyor.", 8);
    } else {
      currentAddr = currentNode.rightAddress;
      pointers.current = currentAddr;
      pushFrame("Sağa Kay", val + " > " + currentNode.val + " olduğundan sağa gidiliyor.", 9);
    }
    currentNode.isActive = false;
    currentNode = nodes.find(n => n.address === currentAddr);
  }

  if (currentAddr === null || !currentNode) {
    pushFrame("Bulunamadı", "Ağaçta " + val + " değeri bulunamadı. İşlem sonlandırılıyor.", 12);
    return frames;
  }

  currentNode.isTarget = true;
  pushFrame("Bulundu", "Silinecek değer (" + val + ") bulundu!", 12);

  // 2. İKİ ÇOCUK DURUMU
  if (currentNode.leftAddress !== null && currentNode.rightAddress !== null) {
    pushFrame("Durum 3: İki Çocuk", "Silinecek düğümün iki çocuğu var. Sağ alt ağacın minimumu (Inorder Successor) bulunacak.", 15);
    
    pointers.tmp = currentNode.rightAddress;
    tmpParentAddr = currentAddr;
    pushFrame("Geçici İşaretçiler", "tmp sağ çocuğa, tmp_parent ise silinecek düğüme atandı.", 17);

    let tmpNode = nodes.find(n => n.address === pointers.tmp);
    
    while (tmpNode && tmpNode.leftAddress !== null) {
      pushFrame("Minimum Arama", "tmp'nin sol çocuğu var, daha küçük bir değer bulmak için sola inilecek.", 18);
      tmpParentAddr = pointers.tmp;
      pointers.tmp = tmpNode.leftAddress;
      pushFrame("tmp Güncellendi", "tmp ve tmp_parent sola kaydırıldı.", 20);
      tmpNode = nodes.find(n => n.address === pointers.tmp);
    }

    pushFrame("Minimum Bulundu", "Sağ alt ağaçtaki en küçük değer (" + (tmpNode?.val || "") + ") bulundu.", 21);
    
    if (tmpNode) {
      currentNode.val = tmpNode.val;
      pushFrame("Değer Kopyalandı", "Bulunan minimum değer (" + tmpNode.val + "), silinecek düğümün (current) değerinin üzerine yazıldı.", 22);
    }

    // current = tmp; parent = tmp_parent;
    currentAddr = pointers.tmp;
    pointers.current = currentAddr;
    currentNode.isTarget = false; // Eski current artık hedef değil
    
    parentAddr = tmpParentAddr;
    pointers.parent = parentAddr;
    currentNode = nodes.find(n => n.address === currentAddr);
    if (currentNode) currentNode.isTarget = true; // Yeni current (asıl silinecek) hedef oldu
    if (!currentNode) return frames;
    
    tmpParentAddr = null; // cleanup
    pushFrame("Hedef Değişti", "Artık asıl silinecek düğüm kopyalanan minimum düğümdür (current = tmp).", 24);
  } else {
    pushFrame("Durum 1/2: Tek veya Sıfır Çocuk", "Silinecek düğümün bir çocuğu var veya hiç çocuğu yok.", 27);
  }

  // 3. BAĞLANTILARI GÜNCELLEME VE SİLME (0 VEYA 1 ÇOCUK)
  let childAddr = (currentNode.leftAddress !== null) ? currentNode.leftAddress : currentNode.rightAddress;
  pointers.tmp = childAddr; // Reuse tmp pointer to show child visually if needed
  pushFrame("Çocuk Belirleme", "Silinecek düğümün altındaki ağaç (varsa) 'child' olarak belirlendi.", 27);
  pointers.tmp = null;

  if (parentAddr === null) {
    record.rootAddress = childAddr;
    pushFrame("Kök Siliniyor", "Silinecek düğüm kök (root) olduğu için ağacın yeni kökü child olarak ayarlandı.", 29);
  } else {
    const parentNode = nodes.find(n => n.address === parentAddr);
    if (parentNode) {
      if (parentNode.leftAddress === currentAddr) {
        parentNode.leftAddress = childAddr;
        pushFrame("Bağlantı (Sol)", "Parent'ın sol çocuğu güncellendi.", 30);
      } else {
        parentNode.rightAddress = childAddr;
        pushFrame("Bağlantı (Sağ)", "Parent'ın sağ çocuğu güncellendi.", 31);
      }
    }
  }

  // SİLME İŞLEMİ
  const indexToRemove = nodes.findIndex(n => n.address === currentAddr);
  if (indexToRemove !== -1) {
    nodes.splice(indexToRemove, 1);
  }
  record.size--;
  pointers.current = null;
  pushFrame("Bellek Temizleme (free)", "Düğüm bellekten (free) silindi ve ağaç kendini toparladı.", 33);
  
  pointers.parent = null;
  pushFrame("Bitiş", "İteratif silme işlemi başarıyla tamamlandı.", 34);

  return frames;
};

// DİĞER FONKSİYONLAR İÇİN STUBLAR - ŞİMDİLİK KAPSAMLI EKLEME VE ARAMA İLE BAŞLAYALIM
const cCodeFind = `Tree Find(Tree t, int x) {
  if (t == NULL) return NULL;
  if (x < t->val) return Find(t->left, x);
  else if (x > t->val) return Find(t->right, x);
  else return t; // Bulundu
}`;

export const simulateFindRecursive = (
  currentNodes: TreeNodeState[],
  currentRecord: TreeRecord,
  val: number
): TreeStep[] => {
  const frames: TreeStep[] = [];
  let step = 0;
  const nodes = cloneNodes(currentNodes);
  const record = cloneRecord(currentRecord);
  const pointers: TreePointers = { current: record.rootAddress, parent: null, tmp: null };

  const pushFrame = (title: string, exp: string, line: number) => {
    frames.push({
      stepNumber: step++, title, explanation: exp, activeCodeLine: line,
      cCode: cCodeFind, nodes: cloneNodes(nodes), treeRecord: cloneRecord(record),
      pointers: { ...pointers }, activePointers: []
    });
  };

  const recurse = (nodeAddr: string | null): string | null => {
    pointers.current = nodeAddr;
    if (nodeAddr === null) {
      pushFrame("NULL Kontrolü", "Düğüm NULL. Aranan değer ağaçta yok.", 2);
      return null;
    }
    
    const node = nodes.find(n => n.address === nodeAddr);
    if (!node) return null;
    node.isActive = true;

    pushFrame("Karşılaştırma", `${val} değeri, mevcut düğüm (${node.val}) ile karşılaştırılıyor.`, 3);

    if (val < node.val) {
      pushFrame("Sola Git", `${val} < ${node.val}, sola devam edilecek.`, 3);
      node.isActive = false;
      return recurse(node.leftAddress);
    } else if (val > node.val) {
      pushFrame("Sağa Git", `${val} > ${node.val}, sağa devam edilecek.`, 4);
      node.isActive = false;
      return recurse(node.rightAddress);
    } else {
      node.isTarget = true;
      pushFrame("Bulundu!", `Değer bulundu!`, 5);
      node.isActive = false;
      return nodeAddr;
    }
  };

  pushFrame("Başlangıç", `Arama işlemi (Rekürsif) ${val} için başlatıldı.`, 1);
  recurse(record.rootAddress);
  
  // Clean up
  nodes.forEach(n => { n.isActive = false; n.isTarget = false; });
  pointers.current = null;
  pushFrame("Bitiş", "Arama işlemi tamamlandı.", 6);

  return frames;
};

export const simulateFindMinMax = (
  currentNodes: TreeNodeState[],
  currentRecord: TreeRecord,
  mode: 'find_min_iterative' | 'find_max_iterative' | 'find_min_recursive' | 'find_max_recursive'
): TreeStep[] => {
  const frames: TreeStep[] = [];
  let step = 0;
  const nodes = cloneNodes(currentNodes);
  const record = cloneRecord(currentRecord);
  const pointers: TreePointers = { current: null, parent: null, tmp: null };

  const isMin = mode.includes('min');
  const isIterative = mode.includes('iterative');
  const targetDir = isMin ? 'left' : 'right';
  const targetText = isMin ? 'En Küçük (Min)' : 'En Büyük (Max)';
  
  let cCode = "";
  if (mode === 'find_min_iterative') cCode = cCodeIterativeFindMin;
  if (mode === 'find_max_iterative') cCode = cCodeIterativeFindMax;
  if (mode === 'find_min_recursive') cCode = cCodeRecursiveFindMin;
  if (mode === 'find_max_recursive') cCode = cCodeRecursiveFindMax;

  const pushFrame = (title: string, exp: string, line: number) => {
    frames.push({
      stepNumber: step++, title, explanation: exp, activeCodeLine: line,
      cCode, nodes: cloneNodes(nodes), treeRecord: cloneRecord(record),
      pointers: { ...pointers }, activePointers: []
    });
  };

  pushFrame("Başlangıç", `${targetText} değeri bulma işlemi (${isIterative ? 'İteratif' : 'Rekürsif'}) başlatıldı.`, 1);

  if (record.rootAddress === null) {
    pushFrame("Boş Ağaç", "Ağaç boş (NULL) olduğu için işlem sonlandırılıyor.", 2);
    return frames;
  }

  if (isIterative) {
    pointers.current = record.rootAddress;
    pushFrame("Kök Kontrolü", "Kökten başlanarak aşağı doğru inilecek.", 2);
    
    let currentAddr = pointers.current;
    let currentNode = nodes.find(n => n.address === currentAddr);

    while (currentAddr !== null && currentNode) {
      currentNode.isActive = true;
      const nextAddr = isMin ? currentNode.leftAddress : currentNode.rightAddress;
      
      pushFrame("Döngü Kontrolü", `current->${targetDir} != NULL mu kontrol ediliyor.`, 3);

      if (nextAddr !== null) {
        currentAddr = nextAddr;
        pointers.current = currentAddr;
        pushFrame("İlerle", `Daha ${targetText} bir değer olabileceği için ${targetDir === 'left' ? 'sola' : 'sağa'} iniliyor.`, 3);
        currentNode.isActive = false;
        currentNode = nodes.find(n => n.address === currentAddr);
      } else {
        pushFrame("Bulundu", `Daha fazla gidilebilecek ${targetDir === 'left' ? 'sol' : 'sağ'} düğüm yok.`, 3);
        currentNode.isTarget = true;
        currentNode.isActive = false;
        pushFrame("Bitiş", `Bulunan ${targetText} değer: ${currentNode.val}`, 4);
        break;
      }
    }
  } else {
    // Recursive
    const recurse = (nodeAddr: string | null) => {
      pointers.current = nodeAddr;
      if (nodeAddr === null) {
        pushFrame("Boş Kontrolü", "Düğüm NULL.", 2);
        return;
      }
      
      const node = nodes.find(n => n.address === nodeAddr);
      if (!node) return;
      
      node.isActive = true;
      pushFrame("Düğüm Ziyareti", "Düğüm boş değil, çocuk kontrolü yapılıyor.", 2);
      
      const nextAddr = isMin ? node.leftAddress : node.rightAddress;
      if (nextAddr === null) {
        pushFrame("Temel Durum (Base Case)", `current->${targetDir} == NULL, yani aranan ${targetText} değer burası.`, 3);
        node.isTarget = true;
        node.isActive = false;
        pushFrame("Bitiş", `Bulunan ${targetText} değer: ${node.val} (Geriye döndürülüyor)`, 3);
        return;
      } else {
        pushFrame("Rekürsif Çağrı", `Daha ${targetText} bir değer var, ${targetDir === 'left' ? 'sola' : 'sağa'} rekürsif çağrı yapılıyor.`, 4);
        node.isActive = false;
        recurse(nextAddr);
      }
    };
    
    recurse(record.rootAddress);
  }
  
  pointers.current = null;
  return frames;
};

const cCodePreorder = `void PrintPreorder(Tree t) {
  if (t == NULL) return;
  printf("%d ", t->val);
  PrintPreorder(t->left);
  PrintPreorder(t->right);
}`;

const cCodeInorder = `void PrintInorder(Tree t) {
  if (t == NULL) return;
  PrintInorder(t->left);
  printf("%d ", t->val);
  PrintInorder(t->right);
}`;

const cCodePostorder = `void PrintPostorder(Tree t) {
  if (t == NULL) return;
  PrintPostorder(t->left);
  PrintPostorder(t->right);
  printf("%d ", t->val);
}`;

const cCodeLevelorder = `void PrintLevelOrder(Tree t) {
  if (t == NULL) return;
  Queue q = CreateQueue();
  Enqueue(q, t);
  while (!IsEmpty(q)) {
    Tree current = Dequeue(q);
    printf("%d ", current->val);
    if (current->left != NULL) Enqueue(q, current->left);
    if (current->right != NULL) Enqueue(q, current->right);
  }
}`;

export const simulateDFS = (
  currentNodes: TreeNodeState[],
  currentRecord: TreeRecord,
  mode: 'traverse_preorder' | 'traverse_inorder' | 'traverse_postorder'
): TreeStep[] => {
  const frames: TreeStep[] = [];
  let step = 0;
  const nodes = cloneNodes(currentNodes);
  const record = cloneRecord(currentRecord);
  const pointers: TreePointers = { current: null, parent: null, tmp: null };
  const traversalResult: number[] = [];

  let cCode = "";
  if (mode === 'traverse_preorder') cCode = cCodePreorder;
  if (mode === 'traverse_inorder') cCode = cCodeInorder;
  if (mode === 'traverse_postorder') cCode = cCodePostorder;

  const pushFrame = (title: string, exp: string, line: number) => {
    frames.push({
      stepNumber: step++, title, explanation: exp, activeCodeLine: line,
      cCode, nodes: cloneNodes(nodes), treeRecord: cloneRecord(record),
      pointers: { ...pointers }, activePointers: [], traversalResult: [...traversalResult]
    });
  };

  const name = mode === 'traverse_preorder' ? 'Pre-order' : mode === 'traverse_inorder' ? 'In-order' : 'Post-order';
  pushFrame("Başlangıç", `${name} dolaşım (DFS) başlatıldı.`, 1);

  const recurse = (nodeAddr: string | null) => {
    pointers.current = nodeAddr;
    if (nodeAddr === null) {
      pushFrame("NULL Kontrolü", "Düğüm boş (NULL). Geri dönülüyor (return).", 2);
      return;
    }
    
    const node = nodes.find(n => n.address === nodeAddr);
    if (!node) return;
    node.isActive = true;

    if (mode === 'traverse_preorder') {
      traversalResult.push(node.val);
      pushFrame("Ziyaret (Print)", `Pre-order: Önce düğümün kendisi (${node.val}) yazdırılır.`, 3);
      
      pushFrame("Sol Alt Ağaç", `Sol alt ağaç (left) için rekürsif çağrı.`, 4);
      node.isActive = false;
      recurse(node.leftAddress);
      
      pointers.current = nodeAddr;
      node.isActive = true;
      pushFrame("Sağ Alt Ağaç", `Sağ alt ağaç (right) için rekürsif çağrı.`, 5);
      node.isActive = false;
      recurse(node.rightAddress);
    } 
    else if (mode === 'traverse_inorder') {
      pushFrame("Sol Alt Ağaç", `In-order: Önce sol alt ağaç (left) için rekürsif çağrı.`, 3);
      node.isActive = false;
      recurse(node.leftAddress);
      
      pointers.current = nodeAddr;
      node.isActive = true;
      traversalResult.push(node.val);
      pushFrame("Ziyaret (Print)", `Sol bittikten sonra düğümün kendisi (${node.val}) yazdırılır.`, 4);
      
      pushFrame("Sağ Alt Ağaç", `Sağ alt ağaç (right) için rekürsif çağrı.`, 5);
      node.isActive = false;
      recurse(node.rightAddress);
    }
    else if (mode === 'traverse_postorder') {
      pushFrame("Sol Alt Ağaç", `Post-order: Önce sol alt ağaç (left) için rekürsif çağrı.`, 3);
      node.isActive = false;
      recurse(node.leftAddress);
      
      pointers.current = nodeAddr;
      node.isActive = true;
      pushFrame("Sağ Alt Ağaç", `Sol bittikten sonra sağ alt ağaç (right) için rekürsif çağrı.`, 4);
      node.isActive = false;
      recurse(node.rightAddress);
      
      pointers.current = nodeAddr;
      node.isActive = true;
      traversalResult.push(node.val);
      pushFrame("Ziyaret (Print)", `Sol ve sağ bittikten sonra düğümün kendisi (${node.val}) yazdırılır.`, 5);
    }

    pointers.current = nodeAddr;
    node.isActive = false;
    pushFrame("Düğüm Tamamlandı", `${node.val} için fonksiyon çerçevesi (frame) kapandı.`, 6);
  };

  recurse(record.rootAddress);
  
  pointers.current = null;
  pushFrame("Bitiş", `${name} dolaşım işlemi tamamlandı.`, 6);
  return frames;
};

export const simulateLevelOrder = (
  currentNodes: TreeNodeState[],
  currentRecord: TreeRecord
): TreeStep[] => {
  const frames: TreeStep[] = [];
  let step = 0;
  const nodes = cloneNodes(currentNodes);
  const record = cloneRecord(currentRecord);
  const pointers: TreePointers = { current: null, parent: null, tmp: null };
  const traversalResult: number[] = [];

  const pushFrame = (title: string, exp: string, line: number) => {
    frames.push({
      stepNumber: step++, title, explanation: exp, activeCodeLine: line,
      cCode: cCodeLevelorder, nodes: cloneNodes(nodes), treeRecord: cloneRecord(record),
      pointers: { ...pointers }, activePointers: [], traversalResult: [...traversalResult]
    });
  };

  pushFrame("Başlangıç", "Level-order dolaşım (BFS) başlatıldı.", 1);

  if (record.rootAddress === null) {
    pushFrame("NULL Kontrolü", "Ağaç boş, çıkılıyor.", 2);
    return frames;
  }

  const queue: string[] = [];
  queue.push(record.rootAddress);
  pushFrame("Kuyruk (Queue) Başlatıldı", "Kök düğüm kuyruğa eklendi (Enqueue).", 4);

  while (queue.length > 0) {
    pushFrame("Döngü", "Kuyruk boş olana kadar (!IsEmpty(q)) döngü devam eder.", 5);
    
    const currentAddr = queue.shift()!;
    pointers.current = currentAddr;
    const currentNode = nodes.find(n => n.address === currentAddr);
    
    if (currentNode) {
      currentNode.isActive = true;
      pushFrame("Dequeue (Kuyruktan Çıkarma)", "Kuyruğun başındaki eleman alındı ve current işaretçisine atandı.", 6);
      
      traversalResult.push(currentNode.val);
      pushFrame("Ziyaret (Print)", `Düğüm (${currentNode.val}) yazdırıldı.`, 7);

      if (currentNode.leftAddress) {
        queue.push(currentNode.leftAddress);
        pushFrame("Sola Bak", "Düğümün sol çocuğu var, kuyruğun sonuna eklendi (Enqueue).", 8);
      } else {
        pushFrame("Sola Bak", "Düğümün sol çocuğu yok, bir şey yapılmadı.", 8);
      }

      if (currentNode.rightAddress) {
        queue.push(currentNode.rightAddress);
        pushFrame("Sağa Bak", "Düğümün sağ çocuğu var, kuyruğun sonuna eklendi (Enqueue).", 9);
      } else {
        pushFrame("Sağa Bak", "Düğümün sağ çocuğu yok, bir şey yapılmadı.", 9);
      }
      
      currentNode.isActive = false;
    }
  }

  pointers.current = null;
  pushFrame("Bitiş", "Kuyruk boşaldı, Level-order dolaşım tamamlandı.", 11);
  return frames;
};
