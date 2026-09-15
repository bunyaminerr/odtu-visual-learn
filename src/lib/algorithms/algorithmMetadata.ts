import { AlgorithmType, AlgorithmMetadata } from '../types/sorting';

export const algorithmDictionary: Record<AlgorithmType, AlgorithmMetadata> = {
  selection: {
    id: 'selection',
    title: 'Selection Sort',
    cCode: `void selectionSort(int arr[], int n) {
    int i, j, min_idx;
    for (i = 0; i < n - 1; i++) {
        min_idx = i;
        for (j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_idx]) {
                min_idx = j;
            }
        }
        if (min_idx != i) {
            swap(&arr[min_idx], &arr[i]);
        }
    }
}`,
    invariants: [
      "Dış döngü i, dizinin sıralanmış sol kısmının sınırını belirler (0'dan başlar).",
      "İç döngü j, kalan sırasız elemanlar arasındaki en küçük değeri arar.",
      "Her i adımının sonunda, dizinin ilk i+1 elemanı kesin olarak sıralıdır."
    ],
    complexityInsight: {
      text: "İç içe geçmiş iki döngü, girdi boyutuna bağlı olmaksızın her zaman tam bir tarama yapar. Toplam karşılaştırma sayısı:",
      formula: "\\sum_{i=1}^{n-1} i = \\frac{n(n-1)}{2} \\approx O(n^2)"
    },
    pitfalls: [
      "ODTÜ Sınav Tuzağı: min_idx güncellenirken sadece index atanır, değer kopyalanmaz. Takas sadece döngü bittikten sonra yapılır.",
      "Kararlı (Stable) bir algoritma DEĞİLDİR. Aynı değere sahip elemanların göreceli sırası değişebilir."
    ]
  },
  bubble: {
    id: 'bubble',
    title: 'Bubble Sort',
    cCode: `void bubbleSort(int arr[], int n) {
    int i, j;
    for (i = 0; i < n - 1; i++) {
        for (j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(&arr[j], &arr[j + 1]);
            }
        }
    }
}`,
    invariants: [
      "Dış döngü i, kaç tane elemanın doğru yerine (en sağa) yerleştiğini sayar.",
      "İç döngü j, yan yana duran elemanları tarar ve büyük olanı sağa doğru 'baloncuk gibi' iter.",
      "Her adımda, dizinin en sağındaki i tane eleman kesinlikle en büyüklerdir."
    ],
    complexityInsight: {
      text: "Selection Sort'ta olduğu gibi iç içe döngüler mevcuttur. Ancak optimize edilmiş versiyonunda (swap bayrağı eklenirse) Best Case O(n) olabilir.",
      formula: "O(n^2)"
    },
    pitfalls: [
      "Optimizasyon tuzağı: Sınavlarda genellikle 'swapped' isimli bir bool değişken ekleyip, hiç takas olmadığında dizinin sıralı olduğunu anlayıp döngüyü kırma sorusu sorulur.",
      "Kararlı (Stable) bir algoritmadır."
    ]
  },
  insertion: {
    id: 'insertion',
    title: 'Insertion Sort',
    cCode: `void insertionSort(int arr[], int n) {
    int i, key, j;
    for (i = 1; i < n; i++) {
        key = arr[i];
        j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}`,
    invariants: [
      "Dış döngü i, sırasız elemanlardan seçilen ilk kartı temsil eder.",
      "İç döngü (while), seçilen bu 'key' değerini, sol taraftaki sıralı kısımdaki doğru yerine yerleştirmek için aradakileri sağa kaydırır.",
      "Her döngü sonunda [0..i] aralığı her zaman sıralı kalır."
    ],
    complexityInsight: {
      text: "Dizi zaten sıralıysa iç döngüye hiç girmez, sadece n eleman tarar.",
      formula: "\\text{Best: } O(n), \\text{ Worst: } O(n^2)"
    },
    pitfalls: [
      "Short-Circuit Evaluation: while(j >= 0 && arr[j] > key) satırında j >= 0 KESİNLİKLE sola yazılmalıdır. Sağa yazılırsa arr[-1] erişimi (Segmentation Fault) hatası alınabilir.",
      "Insertion Sort, küçük boyutlu dizilerde Quick Sort'tan bile hızlı çalışabilir."
    ]
  },
  merge: {
    id: 'merge',
    title: 'Merge Sort',
    cCode: `void mergeSort(int arr[], int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}`,
    invariants: [
      "Böl ve Fethet (Divide & Conquer): Dizi sürekli olarak ikiye bölünür (l < r olduğu sürece).",
      "Tek eleman kalana kadar bölünür (Zaten sıralı kabul edilir).",
      "Geri dönüşte 'merge' fonksiyonu iki sıralı alt diziyi (subarray) birleştirerek tam sıralı büyük bir dizi üretir."
    ],
    complexityInsight: {
      text: "Ağacın yüksekliği log(n)'dir ve her seviyede birleştirme (merge) maliyeti n'dir.",
      formula: "T(n) = 2T(n/2) + O(n) \\implies O(n \\log n)"
    },
    pitfalls: [
      "Ortayı bulurken int taşmasını önlemek için 'm = (l + r) / 2' yerine 'm = l + (r - l) / 2' kullanılır.",
      "Merge işlemi sırasında O(n) ekstra belleğe (temporary array) ihtiyaç duyulur."
    ]
  },
  quick: {
    id: 'quick',
    title: 'Quick Sort',
    cCode: `void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`,
    invariants: [
      "Bir 'pivot' (genellikle son eleman) seçilir.",
      "Partition fonksiyonu; pivottan küçükleri sola, büyükleri sağa atar ve pivotu KALICI olarak doğru sırasına yerleştirir.",
      "Pivotun sol ve sağ tarafı kendi içinde bağımsız olarak sıralanır."
    ],
    complexityInsight: {
      text: "Pivot sürekli en küçük/büyük seçilirse (örneğin dizi sıralıyken son eleman pivot seçilirse) ağaç derinliği n olur.",
      formula: "\\text{Avg: } O(n \\log n), \\text{ Worst: } O(n^2)"
    },
    pitfalls: [
      "Worst Case'ten kaçınmak için ODTÜ sınavlarında genellikle 'Median-of-Three' (İlk, orta, son elemanın ortancası) veya rastgele pivot seçimi sorulur.",
      "Merge Sort'un aksine in-place çalışır (ekstra dizi ayırmaz), ancak recursive stack yüzünden O(log n) bellek kullanır."
    ]
  },
  linear: {
    id: 'linear',
    title: 'Linear Search',
    cCode: `int linearSearch(int arr[], int n, int x) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == x) {
            return i;
        }
    }
    return -1;
}`,
    invariants: [
      "Dizi üzerinde soldan sağa doğru sırayla ilerlenir.",
      "Eleman aranılan değere eşitse anında indeksi döndürülür.",
      "Dizi sırasız olsa dahi çalışır."
    ],
    complexityInsight: {
      text: "Aranan eleman ilk sırada olabilir (Best) veya dizide hiç olmayabilir, bu yüzden hepsini tarar (Worst).",
      formula: "\\text{Best: } O(1), \\text{ Worst: } O(n)"
    },
    pitfalls: [
      "Sıralı bir dizide arama yapmak için kullanılmamalıdır, çok yavaştır."
    ]
  },
  binary: {
    id: 'binary',
    title: 'Binary Search',
    cCode: `int binarySearch(int arr[], int low, int high, int x) {
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == x)
            return mid;
        if (arr[mid] < x)
            low = mid + 1;
        else
            high = mid - 1;
    }
    return -1;
}`,
    invariants: [
      "Dizi KESİNLİKLE sıralı olmak zorundadır.",
      "Arama uzayı [low, high] aralığıdır. Her adımda uzayın ortasındaki elemana (mid) bakılır.",
      "Hedef mid'den büyükse sol yarı, küçükse sağ yarı KESİN OLARAK arama uzayından çıkarılır."
    ],
    complexityInsight: {
      text: "Her adımda arama yapılacak dizi boyutu tam yarıya düşer. (n, n/2, n/4 ... 1)",
      formula: "\\text{Worst: } O(\\log_2 n)"
    },
    pitfalls: [
      "while(low <= high) koşulundaki eşittir (<=) çok önemlidir. Sadece (<) konulursa tek eleman kaldığında arama başarısız olur.",
      "mid hesaplamasındaki taşma hatasını (overflow) engellemek kritik detaydır."
    ]
  }
};
