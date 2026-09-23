export type Cng223TopicType = 'logic' | 'recurrence' | 'sets' | 'relations' | 'graphs' | 'trees' | 'algorithms-integers-matrices' | 'induction-and-recursion' | 'counting' | 'advanced-counting' | 'discrete-probability';

export interface Cng223AlgorithmMetadata {
  id: Cng223TopicType;
  title: string;
  description: string;
  invariants: string[];
  complexityInsight: {
    text: string;
    formula: string;
  };
  pitfalls: string[];
}

export const cng223AlgorithmDictionary: Record<Cng223TopicType, Cng223AlgorithmMetadata> = {
  'advanced-counting': {
    id: 'advanced-counting',
    title: 'Advanced Counting Techniques',
    description: 'Lineer Homojen Özyinelemeli Bağıntıların Kapalı Formül (Closed Form) çözümleri, Divide-and-Conquer algoritmaları ve Inclusion-Exclusion (PIE) tekniği.',
    invariants: [
      'Lineer Homojen denklemlerde genel çözüm r^n formatındadır. (r: karakteristik denklemin kökü).',
      'PIE kuralında her kesişim seviyesinde işaretler sırayla + ve - olarak değişir.'
    ],
    complexityInsight: {
      text: 'Divide-and-Conquer algoritmalarının asimptotik çalışma süresi T(n) = aT(n/b) + O(n^d) formülüyle ifade edilir ve Master Teoremi ile O(n^log_b(a)) gibi kesin sınırlara oturtulur.',
      formula: 'T(n)'
    },
    pitfalls: [
      'ODTÜ Sınav Tuzağı: İkinci dereceden homojen denklemde kökler çakışık (r1 = r2) çıktığında, ikinci terime "n" çarpanını eklemeyi unutursanız tüm çözümünüz yanlış sayılır! Doğrusu: a_n = A(r)^n + B n(r)^n',
      'Inclusion-Exclusion hesaplamalarında eksi ve artıları yanlış sırayla toplamak en yaygın hatadır.'
    ]
  },
  'counting': {
    id: 'counting',
    title: 'Counting',
    description: 'Temel Sayma Kuralları (Product, Sum, Division), Güvercin Yuvası Prensibi (Pigeonhole), Permütasyon ve Kombinasyon.',
    invariants: [
      'Eğer bir işlem bağımsız adımlara bölünüyorsa Çarpım (Product) Kuralı uygulanır.',
      'Sıra önemliyse Permütasyon, sıra önemsiz ve sadece küme seçimi yapılıyorsa Kombinasyon kullanılır.'
    ],
    complexityInsight: {
      text: 'Permütasyon uzayı faktöriyel O(n!) hızda büyürken, kombinasyonlar binom katsayıları oranında büyür. Brute-force arama yöntemleri n! durumunda bilgisayarı kilitler.',
      formula: 'O(n!)'
    },
    pitfalls: [
      'ODTÜ Sınav Tuzağı: Pigeonhole prensibinde tavan (ceiling) fonksiyonu kullanırken ondalık kısımları dikkate almamak veya k/N ile N/k\'yi birbirine karıştırmak.',
      'Sıranın önemli olup olmadığını (Order Matters) yanlış yorumlamak sorunun tüm sonucunu bozar.'
    ]
  },
  'induction-and-recursion': {
    id: 'induction-and-recursion',
    title: 'Induction and Recursion',
    description: 'Matematiksel Tümevarım (Domino Taşı Etkisi), Güçlü Tümevarım, Özyinelemeli (Recursive) Tanımlar ve Fonksiyonların Call Stack analizi.',
    invariants: [
      'Tümevarım İlk Adımı: P(1) her zaman ispatlanmalıdır (Domino taşını devirme).',
      'Özyineleme: Her recursive fonksiyon mutlaka bir Base Case (Temel Durum) içermeli ve ona doğru yakınsamalıdır.'
    ],
    complexityInsight: {
      text: 'Basit Fibonacci(n) algoritması hiçbir optimizasyon (Memoization) yapılmadan O(2^n) üstel zamanda çalışır ve aynı değerleri tekrar tekrar hesaplar.',
      formula: 'O(2^n)'
    },
    pitfalls: [
      'ODTÜ Sınav Tuzağı: Tümevarım ispatında Base Case adımını (P(1)) yazmayı unutmak, tüm ispatın çöpe gitmesine neden olur. Çünkü ilk taşı devirmezseniz P(k) -> P(k+1) hiçbir işe yaramaz.',
      'Recursive algoritmalarda Base Case eksikliği Infinite Loop (Sonsuz Döngü) ve Stack Overflow hatasına yol açar.'
    ]
  },
  'algorithms-integers-matrices': {
    id: 'algorithms-integers-matrices',
    title: 'Algorithms, Integers, Matrices',
    description: 'Bölünebilirlik, Asal sayılar, EBOB (GCD), Öklid Algoritmaları ve Modüler Aritmetik hesaplamaları.',
    invariants: [
      'Genişletilmiş Öklid Algoritması: As + Bt = GCD(A, B)',
      'A ve B aralarında asal ise (GCD=1), A nın mod B de tersi vardır ve s ye eşittir.'
    ],
    complexityInsight: {
      text: 'Öklid Algoritması logaritmik zamanda çalışır (Fibonacci sayıları en kötü durumdur).',
      formula: 'O(\\log(\\min(a, b)))'
    },
    pitfalls: [
      'ODTÜ Sınav Tuzağı: Negatif bir sayının modülü alınırken, sonuca pozitif olana kadar Mod değerinin eklenmesinin unutulması (örn: -5 mod 7 = 2).',
      'Modüler ters hesaplanırken gcd != 1 olduğu halde (aralarında asal değilken) ters bulmaya çalışmak.'
    ]
  },
  logic: {
    id: 'logic',
    title: 'Logic and Proofs',
    description: 'Önermeler mantığı, mantıksal operatörler, doğruluk tabloları ve matematiksel ispat yöntemleri.',
    invariants: [
      'Bir önerme aynı anda hem Doğru hem de Yanlış olamaz.',
      'De Morgan Kuralları: ¬(p ∧ q) ≡ ¬p ∨ ¬q ve ¬(p ∨ q) ≡ ¬p ∧ ¬q.'
    ],
    complexityInsight: {
      text: 'Doğruluk tablosu oluşturmak, n değişkene sahip bir formül için üstel zaman alır.',
      formula: 'O(2^n)'
    },
    pitfalls: [
      'ODTÜ Sınav Tuzağı: İma (Implication / p -> q) durumunda p Yanlış olduğunda sonucun her zaman Doğru (Vacuously True) çıkmasının unutulması.',
      'İspatlarda "p doğruysa q doğrudur" varsayılırken "q doğruysa p doğrudur" hatasına (Converse Error) düşmek.'
    ]
  },
  recurrence: {
    id: 'recurrence',
    title: 'Recurrence Relations & Master Theorem',
    description: 'Algoritmaların çalışma zamanını veya matematiksel dizileri ifade eden yinelemeli fonksiyonlar.',
    invariants: [
      'T(n) = a*T(n/b) + f(n) yapısındaki denklemler Master Teoremi ile çözülür.',
      'Homojen ve lineer olmayan reküranslar için karakteristik denklem kullanılır.'
    ],
    complexityInsight: {
      text: 'Böl ve Fethet algoritmalarının zaman karmaşıklığını bulmada temel yöntemdir.',
      formula: 'T(n) = \\Theta(n^{\\log_b a}) \\text{ veya } \\Theta(f(n))'
    },
    pitfalls: [
      'Master Teoreminin uygulanamadığı durumlar (f(n) fonksiyonunun n^{\\log_b a} ile kıyaslanamaz olduğu logaritmik aralıklar).',
      'ODTÜ Sınav Tuzağı: Master Theorem şartlarının sağlanmadığı yerlerde substitution (yerine koyma) metodu istemeleri.'
    ]
  },
  sets: {
    id: 'sets',
    title: 'Set Theory (Kümeler Kuramı)',
    description: 'Ayrık matematiğin temeli olan kümeler ve üzerindeki işlemler.',
    invariants: [
      'Bir eleman bir kümede yalnızca BİR kez bulunabilir (Multi-set değilse).',
      'Sıra (Order) önemli değildir: {1, 2} == {2, 1}.'
    ],
    complexityInsight: {
      text: 'Kesişim, birleşim veya fark bulma işlemleri eleman sayısı (N) bazında incelenir.',
      formula: 'O(N \\log N) \\text{ (Sıralayarak kesişim bulma)}'
    },
    pitfalls: [
      'Power Set (Kuvvet Kümesi) boyutu her zaman 2^N dir, N büyükse exponential patlama yaşanır.',
      'Venn şemalarında 4 veya daha fazla küme gösteriminin dairelerle yapılamayacağı (elips vb. gerektiği).'
    ]
  },
  relations: {
    id: 'relations',
    title: 'Relations (Bağıntılar)',
    description: 'Kümeler arasındaki ilişkilerin kartezyen çarpım alt kümeleri olarak gösterimi.',
    invariants: [
      'Reflexive (Yansıyan), Symmetric (Simetrik), Transitive (Geçişken).',
      'Equivalence Relation (Denklik Bağıntısı) ve Partial Order (Kısmi Sıralama).'
    ],
    complexityInsight: {
      text: 'Bağıntılar N x N boyutunda bool matrislerle (Adjacency Matrix) ifade edilebilir.',
      formula: '\\text{Transitive Closure: } O(V^3) \\text{ (Warshall Algoritması)}'
    },
    pitfalls: [
      'ODTÜ Sınav Tuzağı: Antisimetrik kavramı ile Asimetrik kavramının karıştırılması.',
      'Kısmi sıralamalar (Poset) için Hasse diyagramı çizimlerinde transitive okların KESİNLİKLE silinmesi gerektiği.'
    ]
  },
  'graphs': {
    id: 'graphs',
    title: 'Graphs',
    description: 'Graf Terminolojisi, Handshaking Teoremi, Adjacency Matrisleri, Isomorphism ve Özel Graflar (K_n, C_n, W_n, Q_n).',
    invariants: [
      'Handshaking Theorem: Σ deg(v) = 2m (Undirected)',
      'Theorem 2: An undirected graph has an even number of vertices of odd degree.',
      'Complete Graph (K_n) Edges: n(n-1)/2'
    ],
    complexityInsight: {
      text: 'Graph Isomorphism test etmek genelde zordur (NP-Intermediate). Adjacency Matrix ile komşuluk tespiti O(1) iken, Adjacency List ile O(deg(v)) sürer.',
      formula: 'O(1) / O(deg(v))'
    },
    pitfalls: [
      'ODTÜ Sınav Tuzağı: İki grafın aynı sayıda düğüm ve kenara sahip olması onların İzomorf (Isomorphic) olduğu anlamına GELMEZ! Degree Sequence (Derece Dizisi) ve Invariant Properties birebir eşleşmelidir.',
      'Handshaking Teoremi hesaplamalarında; matris üzerinde bir düğümün kendi kendine loop oluşturması (M[i][i] = 1), o düğümün derecesine 2 katkı sağlar, 1 değil!'
    ]
  },
  'trees': {
    id: 'trees',
    title: 'Trees',
    description: 'Ağaç Terminolojisi, m-Ary Formülleri, DFS/BFS ile Spanning Trees ve Ağaç Gezinme (Traversal: Preorder, Inorder, Postorder) Algoritmaları.',
    invariants: [
      'Theorem 2: A tree with n vertices has n - 1 edges.',
      'Theorem 3: A full m-ary tree with i internal vertices has n = mi + 1 vertices.',
      'Theorem 4: l = (m - 1)i + 1 (Leaves = (m-1) * Internal + 1)'
    ],
    complexityInsight: {
      text: 'Ağaç Gezinme (Tree Traversal) algoritmaları O(n) zaman karmaşıklığı ile çalışır çünkü her düğüm tam olarak bir kez ziyaret edilir.',
      formula: 'O(n)'
    },
    pitfalls: [
      'ODTÜ Sınav Tuzağı: Her m-ary ağaç "Full m-ary" değildir! Full olması için HER internal node\'un TAM OLARAK m tane çocuğu olması gerekir.',
      'Inorder (LNR) algoritması genellikle sadece Binary Tree (İkili Ağaç) mimarisinde anlamlıdır. Daha fazla çocuğa sahip ağaçlarda Preorder ve Postorder tercih edilir.'
    ]
  },
  'discrete-probability': {
    id: 'discrete-probability',
    title: 'Discrete Probability',
    description: 'Finite Probability, Conditional Probability, Bayes\' Theorem, Expected Value (Beklenen Değer) ve Variance hesaplamaları.',
    invariants: [
      'Laplace Definition: P(E) = |E| / |S|',
      'Bayes Theorem: P(F|E) = P(E|F)P(F) / [P(E|F)P(F) + P(E|F\')P(F\')]',
      'Linearity of Expectation: E(aX + b) = aE(X) + b'
    ],
    complexityInsight: {
      text: 'Bayes Theorem hesaplamaları O(1) uzay karmaşıklığı ile sabit zamanda yapılır. Ancak Olasılık Dağılım Fonksiyonu (PMF) analizleri değişken sayısına göre O(n) sürer.',
      formula: 'O(n)'
    },
    pitfalls: [
      'ODTÜ Sınav Tuzağı: Variance hesaplarken V(X) = E(X^2) - [E(X)]^2 formülünü kullanın. En çok yapılan hata E(X)\'in karesini almayı unutmaktır!',
      'Conditional Probability P(E|F) hesaplarken paydada mutlaka verilen (given) olayın, yani P(F)\'nin olasılığının olması gerekir.'
    ]
  }
};
