import { CngOperationType } from '../types/cng213LinkedList';

export interface CngAlgorithmMeta {
  id: CngOperationType;
  title: string;
  cCode: string;
  explanation: string;
}

export const cng213Algorithms: Record<CngOperationType, CngAlgorithmMeta> = {
  insert_head: {
    id: 'insert_head',
    title: 'Başa Ekleme (Insert Head)',
    cCode: `void insertHead(List L, int val) {
    struct Node *tmp = malloc(sizeof(struct Node));
    tmp->item = val;
    tmp->next = L->head->next;
    
    L->head->next = tmp;
    if(L->size == 0) L->tail = tmp;
    L->size++;
}`,
    explanation: "DUMMY node (L->head) sayesinde boş liste durumu özel bir durum oluşturmaz. tmp'nin next'i Dummy'nin next'ine bağlanır."
  },
  insert_index: {
    id: 'insert_index',
    title: 'İndexe Ekleme (Insert Index)',
    cCode: `void insertIndex(List L, int val, int index) {
    if(index < 0 || index > L->size) return;
    
    struct Node *current = L->head;
    for(int i = 0; i < index; i++) {
        current = current->next;
    }
    
    struct Node *tmp = malloc(sizeof(struct Node));
    tmp->item = val;
    tmp->next = current->next;
    current->next = tmp;
    
    if(tmp->next == NULL) L->tail = tmp;
    L->size++;
}`,
    explanation: "Eklenecek konumun BİR ÖNCESİNE (current) gidilir. Sonra tmp güvenli bir şekilde araya bağlanır."
  },
  delete_head: {
    id: 'delete_head',
    title: 'Baştan Silme (Delete Head)',
    cCode: `void deleteHead(List L) {
    if(L->size == 0) return;
    
    struct Node *removeNode = L->head->next;
    L->head->next = removeNode->next;
    
    if(removeNode == L->tail) L->tail = L->head;
    
    free(removeNode);
    L->size--;
}`,
    explanation: "Dummy node'un next'i, silinecek düğümün (removeNode) next'ine bağlanarak köprü atlanır."
  },
  delete_tail: {
    id: 'delete_tail',
    title: 'Sondan Silme (Delete Tail)',
    cCode: `void deleteTail(List L) {
    if(L->size == 0) return;
    
    struct Node *current = L->head;
    while(current->next != L->tail) {
        current = current->next;
    }
    
    struct Node *removeNode = current->next;
    current->next = NULL;
    L->tail = current;
    
    free(removeNode);
    L->size--;
}`,
    explanation: "Sondan silmek için tail pointer yeterli değildir. Tail'in BİR ÖNCESİNE gitmek için listenin başından itibaren O(N) zamanda tarama yapılır."
  },
  delete_index: {
    id: 'delete_index',
    title: 'İndex Silme (Delete Index)',
    cCode: `void deleteIndex(List L, int index) {
    if(index < 0 || index >= L->size) return;
    
    struct Node *current = L->head;
    for(int i = 0; i < index; i++) {
        current = current->next;
    }
    
    struct Node *removeNode = current->next;
    current->next = removeNode->next;
    
    if(removeNode == L->tail) L->tail = current;
    
    free(removeNode);
    L->size--;
}`,
    explanation: "Silinecek index'in bir önceki düğümüne for döngüsü ile gidilir. current->next silinecek düğümü es geçer."
  },
  insert_end: {
    id: 'insert_end',
    title: 'Sona Ekleme (Insert at End)',
    cCode: `void insertEnd(List L, int val) {
    struct Node *tmp = malloc(sizeof(struct Node));
    tmp->item = val;
    tmp->next = NULL;
    
    L->tail->next = tmp;
    L->tail = tmp;
    L->size++;
}`,
    explanation: "Listenin tail pointer'ı sayesinde O(1) zamanda sona ekleme yapılır. Önce tmp oluşturulur, sonra tail'in arkasına bağlanır."
  },
  insert_sorted: {
    id: 'insert_sorted',
    title: 'Sıralı Araya Ekleme (Sorted Insert)',
    cCode: `void sortedInsert(List L, int val) {
    struct Node *current = L->head;
    
    while(current->next != NULL && current->next->item < val) {
        current = current->next;
    }
    
    struct Node *tmp = malloc(sizeof(struct Node));
    tmp->item = val;
    tmp->next = current->next;
    current->next = tmp;
    
    if(tmp->next == NULL) L->tail = tmp;
    L->size++;
}`,
    explanation: "Current pointer'ı eklenecek konumun BİR ÖNCESİNDE durmalıdır (current->next->item < val). Bu yüzden DUMMY HEAD çok önemlidir, ilk sıraya ekleme yaparken bile özel durum gerektirmez."
  },
  delete: {
    id: 'delete',
    title: 'Değere Göre Silme (Delete by Value)',
    cCode: `void deleteList(List L, int val) {
    struct Node *current = L->head;
    
    while(current->next != NULL && current->next->item != val) {
        current = current->next;
    }
    
    if(current->next != NULL) {
        struct Node *removeNode = current->next;
        current->next = removeNode->next;
        
        if(removeNode == L->tail) L->tail = current;
        
        free(removeNode);
        L->size--;
    }
}`,
    explanation: "Silinecek düğümün BİR ÖNCESİ bulunmalıdır. Köprü atlama (current->next = removeNode->next) işleminden sonra free() ile bellek temizlenir."
  },
  swap_first_two: {
    id: 'swap_first_two',
    title: 'İlk İki Elemanı Takas Etme (Swap O(1))',
    cCode: `void swapFirstTwo(List L) {
    if(L->size < 2) return;
    
    struct Node *first = L->head->next;
    struct Node *second = first->next;
    
    first->next = second->next;
    second->next = first;
    L->head->next = second;
    
    if(L->tail == second) L->tail = first; // Tail update
}`,
    explanation: "Verileri (item) kopyalamak yerine sadece okları (next pointer) değiştirerek O(1) zamanda takas işlemi yapılır. ODTÜ vize/finallerinin klasik 'pointer manipülasyonu' sorusudur."
  },
  get_element_at_position: {
    id: 'get_element_at_position',
    title: 'Pozisyondaki Elemanı Bul (Get Element at Position)',
    cCode: `int GetElementAtPosition(List l, int pos) {
    if (pos < 1 || pos > l->size) return -1;
    
    struct Node *p = l->head->next;
    int currentPos = 1;
    
    while (p != NULL && currentPos < pos) {
        p = p->next;
        currentPos++;
    }
    
    if (p != NULL) return p->val;
    return -1;
}`,
    explanation: "head->next'ten başlayarak istenen pozisyona gelene kadar next pointer'ı takip edilir. O(N) zaman karmaşıklığına sahiptir."
  },
  get_position_of_element: {
    id: 'get_position_of_element',
    title: 'Elemanın Pozisyonunu Bul (Get Position of Element)',
    cCode: `int GetPositionOfElement(List l, int val) {
    struct Node *p = l->head->next;
    int pos = 1;
    
    while (p != NULL) {
        if (p->val == val) return pos;
        p = p->next;
        pos++;
    }
    
    return -1; // Bulunamadı
}`,
    explanation: "Arama işlemi head->next'ten başlayarak liste boyunca devam eder. Eşleşen değere ulaşıldığında pozisyon döndürülür."
  },
  head_of_list: {
    id: 'head_of_list',
    title: 'Listenin Başı (Head of List)',
    cCode: `int HeadOfList(List l) {
    if (!IsEmptyList(l))
        return l->head->next->val;
    else
        return -1;
}`,
    explanation: "Listenin ilk elemanı, Dummy Head'in next işaretçisinin (head->next) gösterdiği düğümdür. İşlem O(1)'dir."
  },
  tail_of_list: {
    id: 'tail_of_list',
    title: 'Listenin Sonu (Tail of List)',
    cCode: `int TailOfList(List l) {
    if (!IsEmptyList(l))
        return l->tail->val;
    else
        return -1;
}`,
    explanation: "Tail işaretçisi sayesinde son elemana listenin başından dolaşmadan, O(1) zamanda doğrudan erişilebilir."
  },
  list_size: {
    id: 'list_size',
    title: 'Eleman Sayısı (List Size)',
    cCode: `int ListSize(List l) {
    return l->size;
}`,
    explanation: "Düğüm ekleme ve silme işlemlerinde güncellenen 'size' değişkeni sayesinde listenin eleman sayısı O(1) zamanda öğrenilir."
  },
  is_empty: {
    id: 'is_empty',
    title: 'Liste Boş Mu? (Is Empty List)',
    cCode: `int IsEmptyList(List l) {
    return (l->size == 0);
}`,
    explanation: "Listenin boyutunun sıfır olup olmadığı kontrol edilerek listenin boş olup olmadığı belirlenir."
  }
};
