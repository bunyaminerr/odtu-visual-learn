import { Cng223TopicType } from '../algorithms/cng223AlgorithmMetadata';

export interface ExamQuestion {
  id: string;
  topic: Cng223TopicType;
  question: string; // KaTeX supported
  solution: string; // KaTeX supported
  difficulty: 'Easy' | 'Medium' | 'Hard';
  pitfallWarning?: string; // Optional warning for common mistakes
}

export const cng223ExamQuestions: ExamQuestion[] = [
  {
    id: 'q1',
    topic: 'sets',
    difficulty: 'Medium',
    question: `
a) $\\{a, b, c\\}$ kümesinden $\\{1, 2, 3, 4\\}$ kümesine kaç farklı fonksiyon tanımlanabilir? \\
b) Bu fonksiyonların kaç tanesi birebir (one-to-one) fonksiyondur? \\
c) Bu fonksiyonların kaç tanesi örten (onto) fonksiyondur?
    `,
    solution: `
**a) Toplam Fonksiyon Sayısı:** \\
Tanım kümesindeki her bir eleman ($a, b, c$) için değer kümesinde 4 farklı seçenek vardır. 
Çarpım kuralına göre: $4 \\times 4 \\times 4 = 4^3 = 64$ farklı fonksiyon tanımlanabilir.

**b) Birebir (One-to-One) Fonksiyonlar:** \\
$a$ elemanı için 4 seçenek vardır. \\
$a$ bir yere eşleştikten sonra, $b$ için geri kalan 3 seçenek kalır. \\
$b$ de eşleştikten sonra, $c$ için 2 seçenek kalır. \\
Çarpım kuralına göre: $4 \\times 3 \\times 2 = 24$. (Veya Permütasyon: $P(4, 3) = 24$).

**c) Örten (Onto) Fonksiyonlar:** \\
Örten olabilmesi için değer kümesindeki tüm elemanların eşleşmesi gerekir. Ancak tanım kümesinde 3 eleman, değer kümesinde 4 eleman var. 3 ok ile 4 hedefi vuramayız. Güvercin Yuvası Prensibi gereği bu imkansızdır. \\
Cevap: **0**
    `,
    pitfallWarning: 'ODTÜ Sınav Tuzağı: Domain (Tanım) kümesinin boyutu, Codomain (Değer) kümesinden küçükse örten (onto) fonksiyon sayısı DAİMA sıfırdır! İşlem yapmaya çalışarak vakit kaybetmeyin.'
  },
  {
    id: 'q2',
    topic: 'induction-and-recursion',
    difficulty: 'Hard',
    question: `Tüm $n \\ge 1$ tamsayıları için $3^{2n-1} + 1 \\equiv 0 \\pmod 4$ olduğunu Matematiksel Tümevarım (Induction) ile ispatlayınız.`,
    solution: `
$P(n)$: $3^{2n-1} + 1 \\equiv 0 \\pmod 4$ önermesi olsun.

**1. BASIS STEP (Temel Adım):** \\
$n = 1$ için: $3^{2(1)-1} + 1 = 3^1 + 1 = 4$. \\
$4 \\equiv 0 \\pmod 4$ olduğundan $P(1)$ doğrudur.

**2. INDUCTIVE STEP (Tümevarım Adımı):** \\
$P(n)$'in doğru olduğunu varsayalım (Inductive Hypothesis). Yani: \\
$3^{2n-1} + 1 \\equiv 0 \\pmod 4 \\implies 3^{2n-1} \\equiv -1 \\pmod 4$.

Şimdi $P(n+1)$'in doğru olduğunu göstermeliyiz: \\
$3^{2(n+1)-1} + 1 = 3^{2n+1} + 1$. \\
$3^{2n+1}$ ifadesini parçalayalım: \\
$3^{2n+1} = 3^2 \\cdot 3^{2n-1} = 9 \\cdot 3^{2n-1}$.

Varsayımımızdan dolayı $3^{2n-1} \\equiv -1 \\pmod 4$ yazabiliriz. Ayrıca $9 \\equiv 1 \\pmod 4$'tür. \\
Öyleyse mod 4'te: \\
$9 \\cdot 3^{2n-1} + 1 \\equiv (1) \\cdot (-1) + 1 \\equiv -1 + 1 \\equiv 0 \\pmod 4$. \\
Böylece $P(n+1)$ de ispatlanmış olur.
    `,
    pitfallWarning: 'ODTÜ Sınav Tuzağı: Tümevarım adımlarında üslü sayıları (3^{2n+1}) mutlaka varsayımda kullandığınız (3^{2n-1}) terimi cinsinden çarpanlarına ayırın!'
  },
  {
    id: 'q3',
    topic: 'algorithms-integers-matrices',
    difficulty: 'Medium',
    question: `
a) $\\mathbb{Z}_{11}$ kümesinin birimleri (units) nelerdir? \\
b) Euler's Totient fonksiyonu $\\phi(11)$ kaçtır? \\
c) Euler Teoremi'ni kullanarak $18^{1922} \\pmod{11}$ değerini hesaplayınız.
    `,
    solution: `
**a) $\\mathbb{Z}_{11}$'in Birimleri:** \\
Bir elemanın unit (tersi olan eleman) olması için 11 ile aralarında asal (relatively prime) olması gerekir. 11 asal olduğu için 0 hariç tüm elemanlar unit'tir. \\
Cevap: $1, 2, 3, 4, 5, 6, 7, 8, 9, 10$.

**b) $\\phi(11)$ Hesabı:** \\
11 asal bir sayı olduğundan, kendisinden küçük ve aralarında asal pozitif sayıların sayısı: \\
$\\phi(p) = p - 1 \\implies \\phi(11) = 10$.

**c) Euler Teoremi ile Modüler Üs Alma:** \\
Euler Teoremi der ki: $a^{\\phi(n)} \\equiv 1 \\pmod n$. \\
$a = 18 \\equiv 7 \\pmod{11}$. \\
$7^{\\phi(11)} \\equiv 7^{10} \\equiv 1 \\pmod{11}$.

Şimdi 1922 üssünü 10'a bölelim: $1922 = 192 \\times 10 + 2$. \\
$18^{1922} \\equiv 7^{1922} \\equiv (7^{10})^{192} \\cdot 7^2 \\pmod{11}$. \\
$(1)^{192} \\cdot 49 \\equiv 49 \\pmod{11}$. \\
$49 = 4 \\times 11 + 5 \\implies 49 \\equiv 5 \\pmod{11}$. \\
Cevap: **5**
    `
  },
  {
    id: 'q4a',
    topic: 'counting',
    difficulty: 'Easy',
    question: `7 Bilgisayar Bilimcisi ve 6 Jeolog arasından, 3 Bilgisayar Bilimcisi ve 2 Jeolog içeren bir grup bir petrol platformunu ziyaret etmek için kaç farklı şekilde seçilebilir?`,
    solution: `
Sıra (Order) önemsiz olduğu için Kombinasyon (Combination) kullanmalıyız. 
1. 7 Bilgisayarcı arasından 3 kişi: $C(7, 3)$ şekilde seçilir.
2. 6 Jeolog arasından 2 kişi: $C(6, 2)$ şekilde seçilir.
Olaylar bağımsız adımlar olduğu için Çarpım Kuralı (Product Rule) uygulanır: \\
Toplam Yol: **$C(7, 3) \\times C(6, 2)$**
    `
  },
  {
    id: 'q4b',
    topic: 'discrete-probability',
    difficulty: 'Medium',
    question: `Eğer 3 Bilgisayar Bilimcisi ve 2 Jeolog içeren her grup eşit seçilme olasılığına sahipse, Alice'in (bir bilgisayar bilimcisi) ve Bob'un (bir jeolog) aynı anda seçilme olasılığı nedir?`,
    solution: `
Olasılık formülü: $P(E) = \\frac{|E|}{|S|}$

**Örneklem Uzayı (|S|):** \\
Bir önceki şıkta bulduğumuz tüm olası grupların sayısıdır: $C(7, 3) \\times C(6, 2)$.

**İstenen Olay (|E|):** \\
Alice ve Bob KESİN olarak grupta olacak. \\
Yani geri kalan 2 bilgisayarcıyı kalan 6 kişi arasından ($C(6, 2)$), geri kalan 1 jeoloğu kalan 5 kişi arasından ($C(5, 1)$) seçmeliyiz. \\
İstenen olay sayısı: $C(6, 2) \\times C(5, 1)$.

**Olasılık:** \\
$\\frac{C(6, 2) \\times C(5, 1)}{C(7, 3) \\times C(6, 2)} = \\frac{5}{C(7, 3)} = \\frac{5}{35} = \\frac{1}{7}$.
    `
  },
  {
    id: 'q5',
    topic: 'counting',
    difficulty: 'Medium',
    question: `Bir partide yaşları 1 ile 100 arasında değişen 52 kişi bulunmaktadır. Pigeonhole Principle (Güvercin Yuvası Prensibi) kullanarak, bu partide ya aynı yaşta olan ya da yaşları ardışık tam sayı olan en az iki kişi bulunduğunu ispatlayınız.`,
    solution: `
Yaş aralığını (1'den 100'e kadar) 2'şerli ve ardışık olacak şekilde 50 gruba (yuva/hole) ayıralım: \\
$\\{1, 2\\}, \\{3, 4\\}, \\dots, \\{99, 100\\}$. \\
Toplam Yuva Sayısı (Holes) = 50.

Partideki kişileri ise güvercin (pigeons) olarak düşünelim: \\
Toplam Güvercin = 52.

Eğer her kişi (güvercin), yaşının bulunduğu kümeye (yuvaya) yerleştirilirse; 52 güvercin 50 yuvaya dağıtılmış olur. \\
Pigeonhole Principle gereği: En az bir yuvada en az $\\lceil 52 / 50 \\rceil = 2$ kişi bulunmak zorundadır.

Aynı yuvaya düşen bu iki kişi; \\
- Ya kümedeki aynı sayıya sahiptir (Aynı yaştalar). \\
- Ya da kümedeki iki farklı sayıya sahiptirler (Ardışık yaştalar). \\
İspat tamamlanmıştır.
    `,
    pitfallWarning: 'ODTÜ Sınav Tuzağı: Güvercin Yuvası sorularında her zaman "Yuva (Hole)" ve "Güvercin (Pigeon)" yapılarını net bir şekilde tanımlayıp eşleştirmesini belirtmelisiniz.'
  },
  {
    id: 'q6',
    topic: 'discrete-probability',
    difficulty: 'Medium',
    question: `İki hilesiz zar atılıyor. Olası sonuçları $\\{(i, j) : 1 \\le i, j \\le 6\\}$ örneklem uzayıyla tanımlıyoruz. $X_1$, ilk zarın 6 gelmesi durumu (1 veya 0); $X_2$, ikinci zarın 6 gelmesi durumudur.
a) $X = X_1 + X_2$ neyi temsil eder?
b) $X_1$ ve $X_2$ bağımsız mıdır? Nasıl kontrol edersiniz?
c) $E(X)$ nedir?`,
    solution: `
**a)** $X$, "iki zar atıldığında toplam kaç tane 6 geldiğini" temsil eden rastgele değişkendir (Random Variable). 0, 1 veya 2 değerlerini alabilir.

**b)** Bağımsızlık Testi: $P(X_1 = 1 \\cap X_2 = 1) = P(X_1 = 1) \\times P(X_2 = 1)$ olmalıdır. \\
Birinci zarın 6 gelmesi ikinci zarı etkilemez. Her zar birbirinden bağımsız olduğu için olaylar fiziksel ve matematiksel olarak bağımsızdır.

**c) Beklenen Değer $E(X)$:** \\
Linearity of Expectation (Beklenen Değerin Doğrusallığı) kuralı gereği: \\
$E(X) = E(X_1 + X_2) = E(X_1) + E(X_2)$. \\

$X_1$ değişkeni 1/6 olasılıkla 1, 5/6 olasılıkla 0 değerini alır. \\
$E(X_1) = (1 \\times 1/6) + (0 \\times 5/6) = 1/6$. \\
Benzer şekilde $E(X_2) = 1/6$. \\
Sonuç: $E(X) = 1/6 + 1/6 = 2/6 = 1/3$.
    `
  },
  {
    id: 'q7',
    topic: 'discrete-probability',
    difficulty: 'Easy',
    question: `Basitleştirilmiş Bayes Kuralı aşağıdaki gibidir: \\
$P(A|B) = \\frac{P(B|A) P(A)}{P(B)}$ \\
Bu eşitliği Koşullu Olasılık (Conditional Probability) tanımlarını kullanarak ispatlayınız.`,
    solution: `
Koşullu Olasılık tanımına göre: \\
$P(A|B) = \\frac{P(A \\cap B)}{P(B)}$ (Denklem 1). \\
Buradan $P(A \\cap B) = P(B) \\cdot P(A|B)$ elde edilir.

Yine tanım gereği olayların yerini değiştirirsek: \\
$P(B|A) = \\frac{P(A \\cap B)}{P(A)}$. \\
Buradan $P(A \\cap B) = P(A) \\cdot P(B|A)$ elde edilir.

İki eşitliği birbirine eşitlersek: \\
$P(B) \\cdot P(A|B) = P(A) \\cdot P(B|A)$. \\
Her iki tarafı $P(B)$'ye böldüğümüzde: \\
$P(A|B) = \\frac{P(B|A) P(A)}{P(B)}$ \\
İspat tamamlanmıştır.
    `
  },
  {
    id: 'q8',
    topic: 'discrete-probability',
    difficulty: 'Hard',
    question: `(Alice in Wonderland Varyantı) Bir torbada başlangıçta 1 adet Beyaz top var. Torbaya dışarıdan ikinci bir top atılıyor. Bu yeni topun Beyaz olma olasılığı 2/3, Siyah olma olasılığı 1/3'tür. Ardından torbadan rastgele 1 top çekiliyor. \\
a) Bu problem için Örneklem Uzayını (Sample Space) tanımlayınız. \\
b) Örneklem uzayındaki her bir elemanın olasılığı nedir? \\
c) Çekilen top Beyaz ise, torbadaki diğer topun da Beyaz olma olasılığı nedir?`,
    solution: `
**a) Örneklem Uzayı (Sample Space):** \\
Torbadaki orijinal beyaz topa $W_1$, dışarıdan atılan topa Beyaz ise $W_2$, Siyah ise $B$ diyelim. Uzay "Atılan Top - Çekilen Top" şeklinde 4 durumdan oluşur: \\
1. $(W_2, W_1)$ (Beyaz atıldı, Orijinal Beyaz çekildi) \\
2. $(W_2, W_2)$ (Beyaz atıldı, Yeni Beyaz çekildi) \\
3. $(B, W_1)$ (Siyah atıldı, Orijinal Beyaz çekildi) \\
4. $(B, B)$ (Siyah atıldı, Siyah çekildi)

**b) Olasılıklar:** \\
1. Beyaz atılma olasılığı 2/3. İki toptan W1'in seçilme olasılığı 1/2 $\\implies (2/3) \\times (1/2) = 1/3$. \\
2. Beyaz atılma olasılığı 2/3. Yeni W2'nin seçilme olasılığı 1/2 $\\implies 1/3$. \\
3. Siyah atılma olasılığı 1/3. Orijinal W1'in seçilme olasılığı 1/2 $\\implies 1/6$. \\
4. Siyah atılma olasılığı 1/3. Siyah topun seçilme olasılığı 1/2 $\\implies 1/6$.

**c) Koşullu Olasılık: P(İkinci Top Beyaz | Çekilen Top Beyaz)** \\
Çekilen topun beyaz olduğu durumlar (Condition): Durum 1, Durum 2 ve Durum 3. \\
$P(\\text{Çekilen Beyaz}) = 1/3 + 1/3 + 1/6 = 5/6$.

Bu durumlar içinde torbadaki DİĞER topun da beyaz olduğu durumlar (Yani torbaya beyaz atıldığı Durum 1 ve Durum 2): \\
$P(\\text{Torba } WW \\cap \\text{Çekilen } W) = 1/3 + 1/3 = 2/3$.

Bayes ile: $\\frac{2/3}{5/6} = \\frac{2}{3} \\times \\frac{6}{5} = \\frac{4}{5}$.
    `,
    pitfallWarning: 'ODTÜ Sınav Tuzağı: Koşullu olasılıkta "Çekilen top beyaz İSE" kısmı yeni Evrensel Kümenizi belirler. Tüm ihtimalleri toplamak (5/6) paydayı oluşturmalıdır.'
  },
  {
    id: 'q9',
    topic: 'graphs',
    difficulty: 'Medium',
    question: `Yönsüz bir grafın Chromatic Number (Kromatik Sayı) değeri 2 ise, bu graf Bipartite mıdır? Nedenini açıklayınız.`,
    solution: `
**Evet, Bipartite'tır.**

Kromatik sayının 2 olması, o grafın tüm düğümlerinin hiçbir komşu düğüm aynı renkte olmayacak şekilde tam 2 renge (örneğin Mavi ve Sarı) boyanabildiği anlamına gelir.

Bipartite grafın tanımı şudur: Düğüm kümesi $V$, iki ayrık kümeye ($V_1$ ve $V_2$) ayrılabilir olmalı ve hiçbir kenar kendi kümesi içindeki bir düğümle birleşmemelidir. 

Grafımızı Mavi renkteki düğümler $V_1$ kümesi, Sarı renkteki düğümler $V_2$ kümesi olacak şekilde ayırırsak; aynı renkler arasında kenar olmadığı (kromatik özellikten dolayı) için $V_1$ kendi içinde, $V_2$ kendi içinde kenarsız kalır. Tüm kenarlar mecburen $V_1$ ile $V_2$ arasındadır. Bu da tam olarak Bipartite tanımıdır.
    `
  },
  {
    id: 'q10',
    topic: 'graphs',
    difficulty: 'Medium',
    question: `İki graf (biri dairesel, diğeri çapraz bağlı) izomorfik midir? Eğer izomorfik iseler, bunu kanıtlayan eşleştirme (bijection) fonksiyonu $f$'i tanımlayınız.`,
    solution: `
Graflar **İzomorfiktir (Isomorphic)**.

İzomorfizm testi için Invariant (Değişmez) özelliklere bakarız:
- İki grafta da 5 düğüm var.
- İki grafta da kenar sayıları eşittir.
- **Degree Sequence (Derece Dizisi):** Her iki grafta da tam olarak 2 tane derece-3 düğüm, 3 tane derece-4 düğüm vardır.

İzomorfizmi kanıtlayan Bijection Fonksiyonu ($f$): \\
Derecesi 3 olanları derecesi 3 olanlara, 4 olanları 4 olanlara eşleştirmeliyiz. \\
Sol graf: $c, e$ (derece 3); $a, b, d$ (derece 4). \\
Sağ graf: $w, x$ (derece 3); $v, y, z$ (derece 4).

Örnek bir eşleştirme (Bijection): \\
$f(c) = w$ (derece 3) \\
$f(e) = x$ (derece 3) \\
$f(a) = v$ (derece 4) \\
$f(b) = y$ (derece 4) \\
$f(d) = z$ (derece 4) \\
Bu fonksiyon komşulukları (adjacency) koruduğu için izomorfizm kanıtlanmıştır.
    `
  },
  {
    id: 'q11',
    topic: 'graphs',
    difficulty: 'Easy',
    question: `Yukarıdaki grafın Clique Number (Klik Numarası) nedir? Açıklayınız.`,
    solution: `
**Cevap: 4**

**Açıklama:** \\
Bir graftaki "Clique", içerisindeki her düğümün diğer tüm düğümlere doğrudan bağlı olduğu (Complete Subgraph - $K_n$) en büyük alt graftır. 

Grafta $a, b, c, e$ düğümleri kendi aralarında tamamen birbirlerine bağlı bir dörtgen (içi çaprazlı) oluşturmaktadır. Bu bir $K_4$ alt grafıdır. Bu nedenle Clique numarası en az 4'tür. 

Ancak 5 olamaz, çünkü grafın genelinde 5 düğümün tümü birbirine eksiksiz bağlı değildir (Complete Graph değildir). Bu yüzden en büyük Clique boyutu 4'tür.
    `
  },
  {
    id: 'q12',
    topic: 'relations',
    difficulty: 'Hard',
    question: `$\\mathbb{N} \\times \\mathbb{N}$ üzerinde $\\sim$ bağıntısı şu şekilde tanımlanmıştır: $(m, n) \\sim (k, l) \\iff m + l = n + k$. Bu bağıntının bir Denklik Bağıntısı (Equivalence Relation) olduğunu gösteriniz.`,
    solution: `
Bir bağıntının Equivalence Relation olması için Reflexive (Yansıyan), Symmetric (Simetrik) ve Transitive (Geçişken) olması gerekir.

**1. Reflexive (Yansıyan):** \\
Her $(m, n)$ için $(m, n) \\sim (m, n)$ midir? \\
$m + n = n + m$ (Toplama işleminin değişme özelliği). Eşitlik sağlandığı için Reflexive'dir.

**2. Symmetric (Simetrik):** \\
$(m, n) \\sim (k, l)$ ise $(k, l) \\sim (m, n)$ midir? \\
Varsayım: $m + l = n + k$. \\
İstenen: $k + n = l + m$. \\
Basitçe eşitliğin sağ ve sol tarafını yer değiştirdiğimizde bu sağlanır. Symmetric'tir.

**3. Transitive (Geçişken):** \\
$(m, n) \\sim (k, l)$ ve $(k, l) \\sim (r, s)$ ise $(m, n) \\sim (r, s)$ midir? \\
Denklem 1: $m + l = n + k$ \\
Denklem 2: $k + s = l + r$ \\
İki denklemi taraf tarafa toplayalım: \\
$m + l + k + s = n + k + l + r$. \\
Her iki taraftan $l$ ve $k$'yı sadeleştirirsek: \\
$m + s = n + r$ elde ederiz. Bu da $(m, n) \\sim (r, s)$ tanımıdır! Transitive'dir.

Üç şart da sağlandığı için bu bir **Equivalence Relation**'dır.
    `,
    pitfallWarning: 'ODTÜ Sınav Tuzağı: Geçişkenlik (Transitive) ispatında daima iki varsayım denklemi kurup bunları taraf tarafa toplamak veya birbirinden çıkarmak sizi doğrudan sonuca götürür.'
  },
  {
    id: 'q16',
    topic: 'logic',
    difficulty: 'Hard',
    question: `
a) Natural Deduction kurallarını kullanarak $\\vdash \\neg(P \\lor Q) \\to \\neg P$ ifadesinin İspat Ağacını (Proof Tree) çiziniz. \\
b) Truth Table (Doğruluk Tablosu) kullanarak $\\models \\neg(P \\lor Q) \\to \\neg P$ olduğunu gösteriniz.
    `,
    solution: `
**a) Proof Tree (İspat Ağacı):** \\
Mantıksal olarak, $\\neg(P \\lor Q)$ varsayımından yola çıkarak $\\neg P$ elde etmeliyiz. Bunu Reductio ad absurdum (Çelişki ile ispat) kullanarak yaparız. $P$'nin doğru olduğunu varsayıp çelişki buluruz:
1. Varsayalım ki $P$ doğru. (Assumption)
2. $\\lor$-intro kuralı ile: $P \\vdash P \\lor Q$.
3. Ana varsayımımız $\\neg(P \\lor Q)$ idi. 
4. 2 ve 3 birbiriyle çelişir (Absurd).
5. Demek ki $P$ varsayımı yanlıştır, $\\neg P$ doğrudur ($\\neg$-intro).
6. Sonuç olarak $\\neg(P \\lor Q) \\to \\neg P$ ($\\to$-intro).

**b) Truth Table (Doğruluk Tablosu):**

| $P$ | $Q$ | $P \\lor Q$ | $\\neg(P \\lor Q)$ | $\\neg P$ | $\\neg(P \\lor Q) \\to \\neg P$ |
|:-:|:-:|:-:|:-:|:-:|:-:|
| T | T | T | F | F | **T** |
| T | F | T | F | F | **T** |
| F | T | T | F | T | **T** |
| F | F | F | T | T | **T** |

Son sütunun tamamı True (T) çıktığı için ifade her zaman doğrudur (Tautology).
    `
  },
  {
    id: 'q17',
    topic: 'logic',
    difficulty: 'Medium',
    question: `Aşağıdaki ifadeleri First-Order Logic (Birinci Dereceden Mantık) formüllerine çeviriniz. Kullanılan predicate'leri (yüklemleri) belirtiniz. \\
a) "Everyone is on someone's contact list." (Herkes birinin kişi listesindedir.) \\
b) "No one is on everyone's contact list." (Hiç kimse herkesin kişi listesinde değildir.)`,
    solution: `
Öncelikle predicate tanımı yapalım: \\
$C(x, y)$: "$x$, $y$'nin kişi listesindedir" anlamına gelsin.

**a) Herkes birinin kişi listesindedir:** \\
"Tüm x'ler için öyle bir y vardır ki, x y'nin listesindedir." \\
**$\\forall x \\exists y C(x, y)$**

**b) Hiç kimse herkesin kişi listesinde değildir:** \\
"Öyle bir x yoktur ki, tüm y'ler için x, y'nin listesinde olsun." \\
**$\\neg \\exists x \\forall y C(x, y)$** veya eşdeğeri olarak **$\\forall x \\neg \\forall y C(x, y)$**.
    `
  },
  {
    id: 'q18',
    topic: 'logic',
    difficulty: 'Hard',
    question: `Aşağıdaki formüllerin domain (tanım kümesi) Doğal Sayılar (Natural Numbers) olduğunda mı, yoksa Reel Sayılar (Real Numbers) olduğunda mı True olduğunu açıklayarak bulunuz. \\
a) $\\exists x \\exists y (x < y \\land \\forall z(z \\le x \\lor y \\le z))$ \\
b) $\\exists x \\exists y (2x - y = 4 \\land 2x + y = 6)$`,
    solution: `
**a) Açıklama:** \\
Bu formül şunu söyler: "Öyle iki $x, y$ sayısı vardır ki aralarında boşluk yoktur. Yani aralarında hiçbir $z$ sayısı bulunamaz (herhangi bir $z$ ya $x$'ten küçük eşittir ya da $y$'den büyük eşittir)."

- **Doğal Sayılar:** TRUE. Eğer ardışık iki doğal sayı seçersek (Örn: $x=3, y=4$), aralarında hiçbir doğal sayı kalmaz. Şart sağlanır.
- **Reel Sayılar:** FALSE. İki reel sayı arasında sonsuz tane reel sayı vardır ($z = (x+y)/2$ daima aradadır). Şart sağlanamaz.

**b) Açıklama:** \\
İki denklemi birleştirelim: \\
$2x - y = 4$ \\
$2x + y = 6$ \\
Taraf tarafa toplarsak: $4x = 10 \\implies x = 2.5$. \\
$y$ ise $1$ olur.

- **Doğal Sayılar:** FALSE. $x=2.5$ bir doğal sayı değildir.
- **Reel Sayılar:** TRUE. $x=2.5$ bir reel sayıdır.
    `
  }
];
