import { Question } from "@/lib/types/questions";

export const sampleQuestions: Question[] = [
    
    // CNG 213 Questions
    {
        id: "cng213-q1",
        courseCode: "CNG213",
        topic: "Linked Lists",
        difficulty: "Easy",
        examType: "Quiz",
        questionText: "Boş bir bağlı listeye sırasıyla 10, 20 ve 30 değerlerini sona (tail) ekleyin. Bellek tahsisini inceleyin.",
        initialState: [10, 20, 30], // Array representing nodes to insert
        visualizerType: "linkedlist",
        visualizerUrl: "/courses/cng213-data-structures/linked-lists",
        hints: [
            { step: 1, text: "Her eklemede yeni bir bellek alanı tahsis edildiğinden (malloc) emin olun." }
        ]
    },
    
    // CNG 232 Questions
    {
        id: "cng232-q1",
        courseCode: "CNG232",
        topic: "Karnaugh Maps",
        difficulty: "Medium",
        examType: "Midterm 1",
        questionText: "Verilen minterm listesi için Karnaugh Haritasını doldurun ve minimal Sum of Products (SOP) ifadesini bulunuz. Don't care koşullarını en iyi şekilde gruplamak için kullanın.",
        latexMath: "f(A,B,C,D) = \\sum m(0, 2, 5, 7, 8, 10, 13, 15) + d(1, 4)",
        initialState: { minterms: [0, 2, 5, 7, 8, 10, 13, 15], dontcares: [1, 4] },
        visualizerType: "kmap",
        visualizerUrl: "/courses/cng232-logic-design/boolean-and-kmap",
        hints: [
            { step: 1, text: "Köşelerdeki mintermleri gruplayarak (m0, m2, m8, m10) büyük bir grup oluşturabilirsiniz." },
            { step: 2, text: "d(1) ve d(4) kullanıldığında daha büyük bloklar oluşuyor mu kontrol edin." }
        ]
    },

    // CNG 223 Questions
    {
        id: "cng223-q1",
        courseCode: "CNG223",
        topic: "Master Theorem",
        difficulty: "Medium",
        examType: "Midterm 2",
        questionText: "Karatsuba algoritmasının karmaşıklığını Master Teoremi kullanarak hesaplayın ve yineleme ağacını çizin.",
        latexMath: "T(n) = 3T(n/2) + \\Theta(n)",
        initialState: { a: 3, b: 2, d: 1 },
        visualizerType: "recurrence",
        visualizerUrl: "/courses/cng223-discrete-structures/recurrence-relations",
        hints: [
            { step: 1, text: "a=3, b=2 ve f(n)=n parametrelerini formülde yerine koyun." },
            { step: 2, text: "log_2(3) > 1 olduğundan, Master Theorem'in Case 1'i geçerlidir." }
        ]
    },
    {
        id: "cng223-q2",
        courseCode: "CNG223",
        topic: "Hasse Diagrams",
        difficulty: "Easy",
        examType: "Quiz",
        questionText: "D_36 (36'nın pozitif bölenleri) kümesi üzerinde 'böler' bağıntısı için Hasse diyagramı oluşturun.",
        initialState: 36,
        visualizerType: "hasse",
        visualizerUrl: "/courses/cng223-discrete-structures/sets-and-relations",
        hints: [
            { step: 1, text: "36'nın bölenlerini bulun: 1, 2, 3, 4, 6, 9, 12, 18, 36." },
            { step: 2, text: "Transitif kenarları çıkararak diyagramı çizin (Örneğin 1 -> 4 kenarı, 1 -> 2 -> 4 yolu olduğu için çizilmez)." }
        ]
    }
];
