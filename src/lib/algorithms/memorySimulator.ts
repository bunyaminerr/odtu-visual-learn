import { MemoryTimelineStep, MemoryCell, PointerArrow } from '../types/memory';

// TAB 1: Pointers & Basics (p1.c & p2.c)
const C_CODE_TAB1 = `// p1.c & p2.c: Pointers and Pass By Reference
void funcRef(int *a, int *b) {
    *a += 2;
    *b += 2;
}

int main() {
    int x = 8, y = 5;
    int *pnum = &x;
    
    *pnum = 10;
    
    funcRef(&x, &y);
    return 0;
}`;

export const getPointerBasicsSteps = (): MemoryTimelineStep[] => {
  return [
    {
      stepNumber: 0,
      title: 'Değişken Tanımlama',
      explanation: 'Stack belleğinde x ve y adında integer (4 byte) alanlar ayrılır ve değerleri 8 ve 5 olarak atanır.',
      cCodeSnippet: C_CODE_TAB1,
      activeLineIndex: 7,
      stackCells: [
        { id: 'stack-x', address: '0x7FF00', segment: 'STACK', varName: 'x', type: 'int', value: 8, sizeBytes: 4, isHighlighted: true },
        { id: 'stack-y', address: '0x7FF04', segment: 'STACK', varName: 'y', type: 'int', value: 5, sizeBytes: 4, isHighlighted: true }
      ],
      heapCells: [],
      pointers: []
    },
    {
      stepNumber: 1,
      title: 'Pointer Tanımlama',
      explanation: 'pnum adında bir pointer tanımlanır. İçine x değişkeninin adresi (0x7FF00) atanır. (Referans Operatörü: &x)',
      cCodeSnippet: C_CODE_TAB1,
      activeLineIndex: 8,
      stackCells: [
        { id: 'stack-x', address: '0x7FF00', segment: 'STACK', varName: 'x', type: 'int', value: 8, sizeBytes: 4, isHighlighted: false },
        { id: 'stack-y', address: '0x7FF04', segment: 'STACK', varName: 'y', type: 'int', value: 5, sizeBytes: 4, isHighlighted: false },
        { id: 'stack-pnum', address: '0x7FF08', segment: 'STACK', varName: 'pnum', type: 'int*', value: '0x7FF00', sizeBytes: 8, isHighlighted: true }
      ],
      heapCells: [],
      pointers: [
        { id: 'ptr-pnum', fromId: 'stack-pnum', toAddress: '0x7FF00', toId: 'stack-x', label: 'pnum', isDangling: false, isNull: false }
      ]
    },
    {
      stepNumber: 2,
      title: 'Dereference (Yönlendirme)',
      explanation: "Dereference operatörü (*) kullanılarak pnum'un gösterdiği adresteki değere (x'in belleğine) ulaşılır ve değeri 10 yapılır.",
      cCodeSnippet: C_CODE_TAB1,
      activeLineIndex: 10,
      stackCells: [
        { id: 'stack-x', address: '0x7FF00', segment: 'STACK', varName: 'x', type: 'int', value: 10, sizeBytes: 4, isHighlighted: true },
        { id: 'stack-y', address: '0x7FF04', segment: 'STACK', varName: 'y', type: 'int', value: 5, sizeBytes: 4, isHighlighted: false },
        { id: 'stack-pnum', address: '0x7FF08', segment: 'STACK', varName: 'pnum', type: 'int*', value: '0x7FF00', sizeBytes: 8, isHighlighted: false }
      ],
      heapCells: [],
      pointers: [
        { id: 'ptr-pnum', fromId: 'stack-pnum', toAddress: '0x7FF00', toId: 'stack-x', label: 'pnum', isDangling: false, isNull: false }
      ]
    },
    {
      stepNumber: 3,
      title: 'Fonksiyon Çağrısı (Pass by Reference)',
      explanation: 'funcRef fonksiyonu çağrılır. x ve y nin adresleri parametre olarak gönderilir. Call Stack büyür.',
      cCodeSnippet: C_CODE_TAB1,
      activeLineIndex: 12,
      stackCells: [
        { id: 'stack-x', address: '0x7FF00', segment: 'STACK', varName: 'x', type: 'int', value: 10, sizeBytes: 4, isHighlighted: false },
        { id: 'stack-y', address: '0x7FF04', segment: 'STACK', varName: 'y', type: 'int', value: 5, sizeBytes: 4, isHighlighted: false },
        { id: 'stack-pnum', address: '0x7FF08', segment: 'STACK', varName: 'pnum', type: 'int*', value: '0x7FF00', sizeBytes: 8, isHighlighted: false },
        { id: 'stack-arg-a', address: '0x7FEF0', segment: 'STACK', varName: 'a (arg)', type: 'int*', value: '0x7FF00', sizeBytes: 8, isHighlighted: true },
        { id: 'stack-arg-b', address: '0x7FEF8', segment: 'STACK', varName: 'b (arg)', type: 'int*', value: '0x7FF04', sizeBytes: 8, isHighlighted: true }
      ],
      heapCells: [],
      pointers: [
        { id: 'ptr-pnum', fromId: 'stack-pnum', toAddress: '0x7FF00', toId: 'stack-x', label: 'pnum', isDangling: false, isNull: false },
        { id: 'ptr-arga', fromId: 'stack-arg-a', toAddress: '0x7FF00', toId: 'stack-x', label: 'a', isDangling: false, isNull: false },
        { id: 'ptr-argb', fromId: 'stack-arg-b', toAddress: '0x7FF04', toId: 'stack-y', label: 'b', isDangling: false, isNull: false }
      ]
    },
    {
      stepNumber: 4,
      title: 'Fonksiyon İçi İşlem',
      explanation: '*a ve *b üzerinden orijinal x ve y değişkenlerinin değerleri 2 arttırılır. Değerler 12 ve 7 olur.',
      cCodeSnippet: C_CODE_TAB1,
      activeLineIndex: 3,
      stackCells: [
        { id: 'stack-x', address: '0x7FF00', segment: 'STACK', varName: 'x', type: 'int', value: 12, sizeBytes: 4, isHighlighted: true },
        { id: 'stack-y', address: '0x7FF04', segment: 'STACK', varName: 'y', type: 'int', value: 7, sizeBytes: 4, isHighlighted: true },
        { id: 'stack-pnum', address: '0x7FF08', segment: 'STACK', varName: 'pnum', type: 'int*', value: '0x7FF00', sizeBytes: 8, isHighlighted: false },
        { id: 'stack-arg-a', address: '0x7FEF0', segment: 'STACK', varName: 'a (arg)', type: 'int*', value: '0x7FF00', sizeBytes: 8, isHighlighted: false },
        { id: 'stack-arg-b', address: '0x7FEF8', segment: 'STACK', varName: 'b (arg)', type: 'int*', value: '0x7FF04', sizeBytes: 8, isHighlighted: false }
      ],
      heapCells: [],
      pointers: [
        { id: 'ptr-pnum', fromId: 'stack-pnum', toAddress: '0x7FF00', toId: 'stack-x', label: 'pnum', isDangling: false, isNull: false },
        { id: 'ptr-arga', fromId: 'stack-arg-a', toAddress: '0x7FF00', toId: 'stack-x', label: 'a', isDangling: false, isNull: false },
        { id: 'ptr-argb', fromId: 'stack-arg-b', toAddress: '0x7FF04', toId: 'stack-y', label: 'b', isDangling: false, isNull: false }
      ]
    }
  ];
};

// TAB 2: Arrays & Pointer Arithmetic (p3.c, p4.c)
const C_CODE_TAB2 = `// p3.c & p4.c: Arrays and Pointer Arithmetic
void func(int b[]) {
    b[1] = 99; // Same as *(b+1) = 99
}

int main() {
    int a[3] = {10, 20, 30};
    int *ptr = a;
    
    *(ptr + 2) = 50; // a[2] becomes 50
    
    func(a);
    return 0;
}`;

export const getPointerArraySteps = (): MemoryTimelineStep[] => {
  return [
    {
      stepNumber: 0,
      title: 'Dizi Tanımlama',
      explanation: 'Stack belleğinde 3 elemanlı bir int dizisi ardışık olarak ayrılır.',
      cCodeSnippet: C_CODE_TAB2,
      activeLineIndex: 6,
      stackCells: [
        { id: 'stack-a0', address: '0x7FF00', segment: 'STACK', varName: 'a[0]', type: 'int', value: 10, sizeBytes: 4, isHighlighted: true },
        { id: 'stack-a1', address: '0x7FF04', segment: 'STACK', varName: 'a[1]', type: 'int', value: 20, sizeBytes: 4, isHighlighted: true },
        { id: 'stack-a2', address: '0x7FF08', segment: 'STACK', varName: 'a[2]', type: 'int', value: 30, sizeBytes: 4, isHighlighted: true }
      ],
      heapCells: [],
      pointers: []
    },
    {
      stepNumber: 1,
      title: 'Array Decay (Dizi Adının Pointer Olması)',
      explanation: 'Dizinin adı (a), bellek adresini gösteren sabit bir pointer gibi davranır. ptr işaretçisi dizinin ilk elemanını gösterir.',
      cCodeSnippet: C_CODE_TAB2,
      activeLineIndex: 7,
      stackCells: [
        { id: 'stack-a0', address: '0x7FF00', segment: 'STACK', varName: 'a[0]', type: 'int', value: 10, sizeBytes: 4, isHighlighted: false },
        { id: 'stack-a1', address: '0x7FF04', segment: 'STACK', varName: 'a[1]', type: 'int', value: 20, sizeBytes: 4, isHighlighted: false },
        { id: 'stack-a2', address: '0x7FF08', segment: 'STACK', varName: 'a[2]', type: 'int', value: 30, sizeBytes: 4, isHighlighted: false },
        { id: 'stack-ptr', address: '0x7FF10', segment: 'STACK', varName: 'ptr', type: 'int*', value: '0x7FF00', sizeBytes: 8, isHighlighted: true }
      ],
      heapCells: [],
      pointers: [
        { id: 'ptr-ptr', fromId: 'stack-ptr', toAddress: '0x7FF00', toId: 'stack-a0', label: 'ptr', isDangling: false, isNull: false }
      ]
    },
    {
      stepNumber: 2,
      title: 'Pointer Aritmetiği',
      explanation: '*(ptr + 2) dendiğinde, ptr adresi 2 x sizeof(int) artırılır. Bu adresteki değer 50 yapılır.',
      cCodeSnippet: C_CODE_TAB2,
      activeLineIndex: 9,
      stackCells: [
        { id: 'stack-a0', address: '0x7FF00', segment: 'STACK', varName: 'a[0]', type: 'int', value: 10, sizeBytes: 4, isHighlighted: false },
        { id: 'stack-a1', address: '0x7FF04', segment: 'STACK', varName: 'a[1]', type: 'int', value: 20, sizeBytes: 4, isHighlighted: false },
        { id: 'stack-a2', address: '0x7FF08', segment: 'STACK', varName: 'a[2]', type: 'int', value: 50, sizeBytes: 4, isHighlighted: true },
        { id: 'stack-ptr', address: '0x7FF10', segment: 'STACK', varName: 'ptr', type: 'int*', value: '0x7FF00', sizeBytes: 8, isHighlighted: false }
      ],
      heapCells: [],
      pointers: [
        { id: 'ptr-ptr', fromId: 'stack-ptr', toAddress: '0x7FF00', toId: 'stack-a0', label: 'ptr', isDangling: false, isNull: false }
      ]
    }
  ];
};

// TAB 3: Dynamic Memory (p5.c, p6.c)
const C_CODE_TAB3 = `// p5.c: Dynamic Memory Allocation
#include <stdlib.h>

int main() {
    int *a;
    int n = 2;
    
    // Allocate memory
    a = (int *)malloc(n * sizeof(int));
    a[0] = 10;
    a[1] = 20;
    
    // Reallocate memory (n=3)
    a = (int *)realloc(a, 3 * sizeof(int));
    a[2] = 30;
    
    // Free the memory
    free(a);
    return 0;
}`;

export const getDynamicMemorySteps = (): MemoryTimelineStep[] => {
  return [
    {
      stepNumber: 0,
      title: 'Başlangıç',
      explanation: 'Pointer a tanımlandı ama bellekte belirli bir yeri göstermiyor.',
      cCodeSnippet: C_CODE_TAB3,
      activeLineIndex: 4,
      stackCells: [
        { id: 'stack-a', address: '0x7FF00', segment: 'STACK', varName: 'a', type: 'int*', value: '???', sizeBytes: 8, isHighlighted: true }
      ],
      heapCells: [],
      pointers: []
    },
    {
      stepNumber: 1,
      title: 'Malloc: Bellek Tahsisi',
      explanation: "Heap bölgesinde 2 adet integer (8 byte) ayrıldı. Bu alanın başlangıç adresi (0xA0000) pointer a'ya atandı.",
      cCodeSnippet: C_CODE_TAB3,
      activeLineIndex: 8,
      stackCells: [
        { id: 'stack-a', address: '0x7FF00', segment: 'STACK', varName: 'a', type: 'int*', value: '0xA0000', sizeBytes: 8, isHighlighted: false }
      ],
      heapCells: [
        { id: 'heap-a0', address: '0xA0000', segment: 'HEAP', type: 'int', value: 'Çöp (Garbage)', sizeBytes: 4, isHighlighted: true },
        { id: 'heap-a1', address: '0xA0004', segment: 'HEAP', type: 'int', value: 'Çöp (Garbage)', sizeBytes: 4, isHighlighted: true }
      ],
      pointers: [
        { id: 'ptr-a', fromId: 'stack-a', toAddress: '0xA0000', toId: 'heap-a0', label: 'a', isDangling: false, isNull: false }
      ]
    },
    {
      stepNumber: 2,
      title: 'Diziye Değer Atama',
      explanation: "Heap'teki ilgili alanlara 10 ve 20 değerleri atandı.",
      cCodeSnippet: C_CODE_TAB3,
      activeLineIndex: 10,
      stackCells: [
        { id: 'stack-a', address: '0x7FF00', segment: 'STACK', varName: 'a', type: 'int*', value: '0xA0000', sizeBytes: 8, isHighlighted: false }
      ],
      heapCells: [
        { id: 'heap-a0', address: '0xA0000', segment: 'HEAP', varName: 'a[0]', type: 'int', value: 10, sizeBytes: 4, isHighlighted: true },
        { id: 'heap-a1', address: '0xA0004', segment: 'HEAP', varName: 'a[1]', type: 'int', value: 20, sizeBytes: 4, isHighlighted: true }
      ],
      pointers: [
        { id: 'ptr-a', fromId: 'stack-a', toAddress: '0xA0000', toId: 'heap-a0', label: 'a', isDangling: false, isNull: false }
      ]
    },
    {
      stepNumber: 3,
      title: 'Realloc: Bellek Yeniden Boyutlandırma',
      explanation: "Dizinin boyutu 3 elemana çıkarılıyor. Yeni ayrılan blokların başlangıç adresi (0xA0000) pointer a'ya yeniden atanır.",
      cCodeSnippet: C_CODE_TAB3,
      activeLineIndex: 13,
      stackCells: [
        { id: 'stack-a', address: '0x7FF00', segment: 'STACK', varName: 'a', type: 'int*', value: '0xA0000', sizeBytes: 8, isHighlighted: false }
      ],
      heapCells: [
        { id: 'heap-a0', address: '0xA0000', segment: 'HEAP', varName: 'a[0]', type: 'int', value: 10, sizeBytes: 4, isHighlighted: false },
        { id: 'heap-a1', address: '0xA0004', segment: 'HEAP', varName: 'a[1]', type: 'int', value: 20, sizeBytes: 4, isHighlighted: false },
        { id: 'heap-a2', address: '0xA0008', segment: 'HEAP', varName: 'a[2]', type: 'int', value: 'Çöp', sizeBytes: 4, isHighlighted: true }
      ],
      pointers: [
        { id: 'ptr-a', fromId: 'stack-a', toAddress: '0xA0000', toId: 'heap-a0', label: 'a', isDangling: false, isNull: false }
      ]
    },
    {
      stepNumber: 4,
      title: 'Free: Belleği Temizleme',
      explanation: "free(a) çağrısı Heap'teki alanı işletim sistemine geri iade eder. Pointer a bir 'Dangling Pointer' haline gelir!",
      cCodeSnippet: C_CODE_TAB3,
      activeLineIndex: 17,
      stackCells: [
        { id: 'stack-a', address: '0x7FF00', segment: 'STACK', varName: 'a', type: 'int*', value: '0xA0000', sizeBytes: 8, isHighlighted: true }
      ],
      heapCells: [
        { id: 'heap-a0', address: '0xA0000', segment: 'HEAP', varName: 'FREED', type: 'int', value: 'X', sizeBytes: 4, isHighlighted: false, isFree: true },
        { id: 'heap-a1', address: '0xA0004', segment: 'HEAP', varName: 'FREED', type: 'int', value: 'X', sizeBytes: 4, isHighlighted: false, isFree: true },
        { id: 'heap-a2', address: '0xA0008', segment: 'HEAP', varName: 'FREED', type: 'int', value: 'X', sizeBytes: 4, isHighlighted: false, isFree: true }
      ],
      pointers: [
        { id: 'ptr-a', fromId: 'stack-a', toAddress: '0xA0000', toId: 'heap-a0', label: 'Dangling!', isDangling: true, isNull: false }
      ]
    }
  ];
};

// TAB 4: Array of Structures (p11.c)
const C_CODE_TAB4 = `// p11.c: Dynamic Array of Structures
#include <stdlib.h>
struct student {
    char name[20];
    int id;
};

int main() {
    int numOfStudents = 1;
    struct student *MyStudents;
    
    // Allocate
    MyStudents = (struct student *)malloc(numOfStudents * sizeof(struct student));
    MyStudents[0].id = 12345;
    
    // Reallocate
    numOfStudents++;
    MyStudents = (struct student *)realloc(MyStudents, numOfStudents * sizeof(struct student));
    MyStudents[1].id = 67890;
    
    free(MyStudents);
    return 0;
}`;

export const getStructArraySteps = (): MemoryTimelineStep[] => {
  return [
    {
      stepNumber: 0,
      title: 'Malloc ile Struct Dizisi',
      explanation: "Heap'te 1 adet 'struct student' (24 byte = 20 byte char + 4 byte int) tahsis edilir.",
      cCodeSnippet: C_CODE_TAB4,
      activeLineIndex: 12,
      stackCells: [
        { id: 'stack-s', address: '0x7FF00', segment: 'STACK', varName: 'MyStudents', type: 'struct student*', value: '0xB0000', sizeBytes: 8, isHighlighted: true }
      ],
      heapCells: [
        { id: 'heap-s0', address: '0xB0000', segment: 'HEAP', varName: 'MyStudents[0]', type: 'struct student', value: '24 bytes', sizeBytes: 24, isHighlighted: true }
      ],
      pointers: [
        { id: 'ptr-s', fromId: 'stack-s', toAddress: '0xB0000', toId: 'heap-s0', label: 'MyStudents', isDangling: false, isNull: false }
      ]
    },
    {
      stepNumber: 1,
      title: 'Struct Üyesine Erişim',
      explanation: 'MyStudents[0].id alanına veri yazılır.',
      cCodeSnippet: C_CODE_TAB4,
      activeLineIndex: 13,
      stackCells: [
        { id: 'stack-s', address: '0x7FF00', segment: 'STACK', varName: 'MyStudents', type: 'struct student*', value: '0xB0000', sizeBytes: 8, isHighlighted: false }
      ],
      heapCells: [
        { id: 'heap-s0', address: '0xB0000', segment: 'HEAP', varName: 'MyStudents[0].id', type: 'int', value: '12345', sizeBytes: 24, isHighlighted: true }
      ],
      pointers: [
        { id: 'ptr-s', fromId: 'stack-s', toAddress: '0xB0000', toId: 'heap-s0', label: 'MyStudents', isDangling: false, isNull: false }
      ]
    },
    {
      stepNumber: 2,
      title: 'Realloc İle Diziyi Büyütme',
      explanation: "Struct dizisinin boyutu 2'ye (48 byte) çıkarılır.",
      cCodeSnippet: C_CODE_TAB4,
      activeLineIndex: 17,
      stackCells: [
        { id: 'stack-s', address: '0x7FF00', segment: 'STACK', varName: 'MyStudents', type: 'struct student*', value: '0xB0000', sizeBytes: 8, isHighlighted: false }
      ],
      heapCells: [
        { id: 'heap-s0', address: '0xB0000', segment: 'HEAP', varName: 'MyStudents[0]', type: 'struct student', value: '12345', sizeBytes: 24, isHighlighted: false },
        { id: 'heap-s1', address: '0xB0018', segment: 'HEAP', varName: 'MyStudents[1]', type: 'struct student', value: 'Çöp (Garbage)', sizeBytes: 24, isHighlighted: true }
      ],
      pointers: [
        { id: 'ptr-s', fromId: 'stack-s', toAddress: '0xB0000', toId: 'heap-s0', label: 'MyStudents', isDangling: false, isNull: false }
      ]
    }
  ];
};
