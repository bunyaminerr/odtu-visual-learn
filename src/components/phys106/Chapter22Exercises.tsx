'use client';
import React, { useState } from 'react';
import { BlockMath, InlineMath } from 'react-katex';
import { Target, Brain, CheckCircle2, Calculator, HelpCircle, AlertTriangle } from 'lucide-react';

interface Exercise {
    id: number | string;
    type: 'mcq' | 'problem';
    text: React.ReactNode;
    figure?: React.ReactNode;
    options?: string[];
    correctIndex?: number;
    solution: React.ReactNode[];
    finalAnswer: React.ReactNode;
}

const exercisesData: Exercise[] = [
    {
        id: 1,
        type: 'mcq',
        text: "A piece of plastic has a net charge of +2.00 μC. How many more protons than electrons does this piece of plastic have?",
        options: ["3.20 × 10¹³", "3.20 × 10¹⁹", "1.25 × 10¹⁹", "1.25 × 10¹³", "8.00 × 10¹²"],
        correctIndex: 3,
        solution: [
            <p><strong>Temel Prensip (Kuantizasyon):</strong> Doğadaki hiçbir yük rastgele bir değere sahip olamaz. Bütün yükler, en küçük temel yük olan <InlineMath math="e" />'nin tam katlarıdır.</p>,
            <p>Çubuğun yükü pozitif (<InlineMath math="+2.00 \mu C" />) olduğu için elektron kaybetmiştir. Yani protonlar fazladır.</p>,
            <div className="overflow-x-auto py-2"><BlockMath math="q = N \cdot e \implies N = \frac{+2.00 \times 10^{-6} C}{1.6 \times 10^{-19} C}" /></div>,
            <p>Bölme işlemini yaparsak: <InlineMath math="N = 1.25 \times 10^{13}" /> adet proton fazlası buluruz.</p>
        ],
        finalAnswer: "D) 1.25 × 10¹³"
    },
    {
        id: 2,
        type: 'mcq',
        text: "Three point charges are placed on the x-axis. The first charge of +2.0 μC is located at the origin, the second charge of -2.0 μC is located at x = 50 cm, and the third charge of +4.0 μC is located at x = 100 cm. Find the electrostatic force that acts on the charge located at the origin.",
        options: ["-0.036 i N", "zero", "0.072 i N", "0.036 i N", "-0.072 i N"],
        correctIndex: 2,
        figure: (
            <svg viewBox="0 0 400 100" className="w-full max-w-md mx-auto bg-slate-50 rounded-lg p-2 border border-slate-200">
                <line x1="20" y1="50" x2="380" y2="50" stroke="black" strokeWidth="2" markerEnd="url(#arrow)" />
                <circle cx="50" cy="50" r="10" fill="#235347" />
                <text x="50" y="30" textAnchor="middle" fontSize="12" fill="#235347">+2μC (0cm)</text>
                
                <circle cx="200" cy="50" r="10" fill="#e11d48" />
                <text x="200" y="30" textAnchor="middle" fontSize="12" fill="#e11d48">-2μC (50cm)</text>
                
                <circle cx="350" cy="50" r="10" fill="#235347" />
                <text x="350" y="30" textAnchor="middle" fontSize="12" fill="#235347">+4μC (100cm)</text>
                
                <defs>
                    <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                        <path d="M0,0 L0,6 L9,3 z" fill="#000" />
                    </marker>
                </defs>
            </svg>
        ),
        solution: [
            <p><strong>Fiziksel Canlandırma:</strong> Kendinizi orijindeki <InlineMath math="q_1 = +2 \mu C" /> olarak düşünün. Diğer iki yükün size uyguladığı kuvvetleri toplayacağız.</p>,
            <p><strong>Çekme (-2μC):</strong> Zıt kutuplar birbirini çeker. Sağdaki negatif yük sizi (+x) yönünde çeker.</p>,
            <div className="overflow-x-auto py-2"><BlockMath math="F_{21} = k \frac{|q_1 q_2|}{r^2} = 9\times 10^9 \frac{(2\times 10^{-6})(2\times 10^{-6})}{(0.5)^2} = +0.144 N \quad (\hat{i})" /></div>,
            <p><strong>İtme (+4μC):</strong> Aynı kutuplar iter. En sağdaki pozitif yük sizi sola (-x) doğru iter.</p>,
            <div className="overflow-x-auto py-2"><BlockMath math="F_{31} = k \frac{|q_1 q_3|}{r^2} = 9\times 10^9 \frac{(2\times 10^{-6})(4\times 10^{-6})}{(1.0)^2} = -0.072 N \quad (\hat{i})" /></div>,
            <p><strong>Net Kuvvet:</strong> <InlineMath math="\vec{F}_{net} = (+0.144) + (-0.072) = +0.072 N \quad (\hat{i})" />. Çekme kuvveti kazandı.</p>
        ],
        finalAnswer: "C) 0.072 i N"
    },
    {
        id: 3,
        type: 'mcq',
        text: <p>Consider three point charges arranged as shown. Find the electrostatic force acting on Q = 6.00 nC.</p>,
        options: ["-2.16×10⁻³ j N", "2.16×10⁻³ j N", "-1.08×10⁻³ i N", "1.08×10⁻³ j N", "1.08×10⁻³ i N"],
        correctIndex: 4,
        figure: (
            <svg viewBox="0 0 200 150" className="w-full max-w-xs mx-auto bg-slate-50 rounded-lg p-2 border border-slate-200">
                <circle cx="100" cy="30" r="10" fill="#235347" />
                <text x="100" y="15" textAnchor="middle" fontSize="12" fill="#235347">Q=6nC</text>
                
                <circle cx="40" cy="120" r="10" fill="#235347" />
                <text x="20" y="125" textAnchor="middle" fontSize="12" fill="#235347">+2nC</text>
                
                <circle cx="160" cy="120" r="10" fill="#e11d48" />
                <text x="180" y="125" textAnchor="middle" fontSize="12" fill="#e11d48">-2nC</text>
                
                <line x1="40" y1="120" x2="160" y2="120" stroke="#94a3b8" strokeDasharray="4" />
                <line x1="40" y1="120" x2="100" y2="30" stroke="#94a3b8" strokeDasharray="4" />
                <line x1="160" y1="120" x2="100" y2="30" stroke="#94a3b8" strokeDasharray="4" />
                <text x="100" y="140" textAnchor="middle" fontSize="10" fill="#64748b">1 cm</text>
            </svg>
        ),
        solution: [
            <p><strong>Vektör Analizi:</strong> Üstteki Q yükü (+6 nC), soldaki +2 nC tarafından sağ-yukarı (çapraz) itilir. Sağdaki -2 nC tarafından sağ-aşağı çekilir.</p>,
            <p>Mesafe (1 cm) ve yük büyüklükleri (2 nC) iki taraf için de aynıdır. Her bir kuvvet: <InlineMath math="F = 9\times 10^9 \frac{(6\times 10^{-9})(2\times 10^{-9})}{(0.01)^2} = 1.08 \times 10^{-3} N" /></p>,
            <p><strong>Simetri Hilesi:</strong> İtme yukarı, çekme aşağı olduğundan Y ekseni (düşey) bileşenleri birbirini tam olarak <strong>yok eder</strong>. Sadece sağa doğru (x-ekseni) kosinüs bileşenleri toplanır.</p>,
            <div className="overflow-x-auto py-2"><BlockMath math="\vec{F}_{net,x} = F \cos(60^\circ) + F \cos(60^\circ) = 2 F (0.5) = F = 1.08 \times 10^{-3} \hat{i} N" /></div>
        ],
        finalAnswer: "E) 1.08 × 10⁻³ i N"
    },
    {
        id: 4,
        type: 'mcq',
        text: <p>Particle 1 with charge <InlineMath math="q_1" /> is at <InlineMath math="x = a" /> and particle 2 with charge <InlineMath math="q_2" /> is at <InlineMath math="x = -2a" />. For the net force on a third particle at the origin to be zero, <InlineMath math="q_1" /> and <InlineMath math="q_2" /> must be related by:</p>,
        options: ["q2 = -2q1", "q2 = -4q1", "q2 = 2q1", "q2 = q1 / 4", "q2 = 4q1"],
        correctIndex: 4,
        solution: [
            <p><strong>Denge Prensibi (Halat Çekme):</strong> Orijindeki bir yüke etki eden net kuvvetin 0 olabilmesi için, iki tarafın çekim/itme kuvvetinin eşit olması gerekir.</p>,
            <div className="overflow-x-auto py-2"><BlockMath math="k \frac{|q_1 q_3|}{a^2} = k \frac{|q_2 q_3|}{(2a)^2}" /></div>,
            <p><InlineMath math="k" /> ve <InlineMath math="q_3" />'leri çöpe atalım. Alt taraftaki karesini açalım:</p>,
            <div className="overflow-x-auto py-2"><BlockMath math="\frac{|q_1|}{a^2} = \frac{|q_2|}{4a^2} \implies q_2 = 4q_1" /></div>,
            <p>Uzaktaki yük (<InlineMath math="q_2" />), yakındakinden 4 kat daha güçlü olmalı ki mesafe farkını kapatabilsin.</p>
        ],
        finalAnswer: "E) q2 = 4q1"
    },
    {
        id: 5,
        type: 'mcq',
        text: <p>Two point charges <InlineMath math="Q_1" /> and <InlineMath math="Q_2" /> are on a grid. E-field is zero at point P. Which statements are correct?</p>,
        options: ["II and V", "III and IV", "III and V", "II and IV", "I and IV"],
        correctIndex: 3,
        figure: (
            <svg viewBox="0 0 400 60" className="w-full max-w-md mx-auto bg-slate-50 rounded-lg p-2 border border-slate-200">
                <line x1="20" y1="30" x2="380" y2="30" stroke="black" strokeWidth="2" />
                {/* Ticks */}
                {Array.from({ length: 13 }).map((_, i) => (
                    <line key={i} x1={40 + i * 25} y1="25" x2={40 + i * 25} y2="35" stroke="black" strokeWidth="1.5" />
                ))}
                <circle cx="115" cy="30" r="8" fill="#235347" />
                <text x="115" y="15" textAnchor="middle" fontSize="12">Q1</text>
                
                <text x="215" y="48" textAnchor="middle" fontSize="12" fontWeight="bold">P</text>
                
                <circle cx="290" cy="30" r="8" fill="#235347" />
                <text x="290" y="15" textAnchor="middle" fontSize="12">Q2</text>
            </svg>
        ),
        solution: [
            <p><strong>İşaret Analizi:</strong> P noktası <InlineMath math="Q_1" /> ve <InlineMath math="Q_2" /> <strong>arasındadır</strong>. Elektrik alanın sıfırlanabilmesi için her iki yükün de P noktasına aynı yönde (zıt) itme veya çekme yapması şarttır. Yani yükler <strong>aynı işaretli</strong> olmalıdır! (Madde IV Doğru).</p>,
            <p><strong>Büyüklük Analizi:</strong> P noktası <InlineMath math="Q_1" />'e 4 birim, <InlineMath math="Q_2" />'ye 3 birim uzaklıktadır. (Görseldeki aralıkları saydığımızda).</p>,
            <div className="overflow-x-auto py-2"><BlockMath math="k \frac{|Q_1|}{4^2} = k \frac{|Q_2|}{3^2} \implies \frac{|Q_1|}{16} = \frac{|Q_2|}{9}" /></div>,
            <p>Buradan <InlineMath math="|Q_1| > |Q_2|" /> olduğu net olarak görülür. (Madde II Doğru).</p>
        ],
        finalAnswer: "D) II and IV"
    },
    {
        id: 6,
        type: 'mcq',
        text: <p>Two unequal point charges, q and Q, are located along a straight line. The charges have opposite signs and |Q| {'>'} |q|. On which of the linear segments labeled X, Y, and Z can there be a point at which the net electric field is zero?</p>,
        options: ["only Z", "only X", "all three segments", "only Y", "only X and Z"],
        correctIndex: 1,
        figure: (
            <svg viewBox="0 0 400 80" className="w-full max-w-md mx-auto bg-slate-50 rounded-lg p-2 border border-slate-200">
                <line x1="20" y1="40" x2="380" y2="40" stroke="black" strokeWidth="2" />
                
                <text x="60" y="65" textAnchor="middle" fontSize="12" fontStyle="italic">X</text>
                
                <circle cx="140" cy="40" r="10" fill="white" stroke="black" strokeWidth="2" />
                <text x="140" y="44" textAnchor="middle" fontSize="12">q</text>
                
                <text x="210" y="65" textAnchor="middle" fontSize="12" fontStyle="italic">Y</text>
                
                <circle cx="280" cy="40" r="12" fill="white" stroke="black" strokeWidth="2" />
                <text x="280" y="44" textAnchor="middle" fontSize="12">Q</text>
                
                <text x="340" y="65" textAnchor="middle" fontSize="12" fontStyle="italic">Z</text>
            </svg>
        ),
        solution: [
            <p><strong>Nötr Nokta Kuralı (Null Point):</strong> Zıt işaretli iki yükün elektrik alanının sıfır olduğu nokta (Null point) <strong>ASLA</strong> ikisinin arasında (Y bölgesi) olamaz. Çünkü arada iken biri iter, diğeri çeker; vektörler aynı yöne bakar ve güçlenir.</p>,
            <p>Sıfır noktası her zaman yüklerin <strong>dışında</strong> ve <strong>mutlak değerce KÜÇÜK olan yüke daha yakın</strong> tarafta oluşur. Çünkü küçük yükün zayıflığını, ona yakın olarak telafi etmeliyiz.</p>,
            <p>Soru |Q| {'>'} |q| olduğunu vermiş. q daha küçüktür, o halde sıfır noktası q'nun tarafında, yani dışarıda <strong>X</strong> bölgesinde olmalıdır.</p>
        ],
        finalAnswer: "B) only X"
    },
    {
        id: 7,
        type: 'mcq',
        text: <p>As shown, three point charges are located at the vertices of an equilateral triangle of side <InlineMath math="d" />. Find the net electric field at point P.</p>,
        options: ["4kq/3d² i", "4kq/d² (1/3 i + 2 j)", "kq/d² (1/3 i + 2 j)", "4kq/d² (1/3 i - 2 j)", "kq/d² (1/3 i - 2 j)"],
        correctIndex: 3,
        figure: (
            <svg viewBox="0 0 200 150" className="w-full max-w-xs mx-auto bg-slate-50 rounded-lg p-2 border border-slate-200">
                <circle cx="40" cy="75" r="8" fill="#235347" />
                <text x="20" y="80" textAnchor="middle" fontSize="12">+q</text>
                
                <circle cx="140" cy="20" r="8" fill="#235347" />
                <text x="160" y="25" textAnchor="middle" fontSize="12">+q</text>
                
                <circle cx="140" cy="130" r="8" fill="#e11d48" />
                <text x="160" y="135" textAnchor="middle" fontSize="12">-q</text>
                
                <polygon points="40,75 140,20 140,130" fill="none" stroke="#94a3b8" strokeDasharray="4" />
                <circle cx="140" cy="75" r="4" fill="black" />
                <text x="150" y="80" textAnchor="middle" fontSize="12" fontWeight="bold">P</text>
            </svg>
        ),
        solution: [
            <p><strong>Y Ekseni Bileşenleri (Sağ Taraf):</strong> P noktası, sağ kenarın tam ortasındadır (üstteki +q ve alttaki -q'ya uzaklığı <InlineMath math="d/2" />).</p>,
            <p>Üstteki +q, P'de aşağı (-j) doğru iter: <InlineMath math="E_{top} = k \frac{q}{(d/2)^2} = \frac{4kq}{d^2} (-\hat{j})" /></p>,
            <p>Alttaki -q, P'de aşağı (-j) doğru çeker: <InlineMath math="E_{bot} = k \frac{q}{(d/2)^2} = \frac{4kq}{d^2} (-\hat{j})" /></p>,
            <p>Toplam Y bileşeni: <InlineMath math="-\frac{8kq}{d^2} \hat{j}" />.</p>,
            <p><strong>X Ekseni Bileşenleri (Sol Taraf):</strong> Soldaki +q'nun P'ye uzaklığı, eşkenar üçgenin yüksekliğidir: <InlineMath math="h = d \frac{\sqrt{3}}{2}" />.</p>,
            <p>Soldaki +q, P'yi sağa (+i) doğru iter: <InlineMath math="E_{left} = k \frac{q}{(d \sqrt{3}/2)^2} = \frac{4kq}{3d^2} (+\hat{i})" /></p>,
            <p>İkisini birleştirip <InlineMath math="\frac{4kq}{d^2}" /> parantezine alırsak: <InlineMath math="\frac{4kq}{d^2} \left( \frac{1}{3}\hat{i} - 2\hat{j} \right)" /> buluruz.</p>
        ],
        finalAnswer: "D) 4kq/d² (1/3 i - 2 j)"
    },
    {
        id: 8,
        type: 'mcq',
        text: "A very small ball has a mass of 8 g and a charge of -4 μC. Find the magnitude and direction of the electric field that will balance the weight of the ball so that the ball is suspended motionless in air.",
        options: ["8 × 10³ N/C, vertically upward", "2 × 10⁴ N/C, vertically upward", "4 × 10⁵ N/C, vertically upward", "2 × 10⁴ N/C, vertically downward", "8 × 10³ N/C, vertically downward"],
        correctIndex: 3,
        solution: [
            <p><strong>Ağırlık Dengesizliği:</strong> Cismin havada asılı kalması için yerçekimine (<InlineMath math="mg" />, aşağı doğru) eşit ve zıt yönde (yukarı doğru) bir elektriksel kuvvet (<InlineMath math="F_e" />) uygulanmalıdır.</p>,
            <p><InlineMath math="F_e = mg \implies |q|E = mg" /></p>,
            <p>Büyüklük hesabı (<InlineMath math="m = 0.008 kg" />):</p>,
            <div className="overflow-x-auto py-2"><BlockMath math="E = \frac{0.008 \times 9.8}{4 \times 10^{-6}} = \frac{0.0784}{4 \times 10^{-6}} = 19600 \text{ N/C} \approx 2 \times 10^4 \text{ N/C}" /></div>,
            <p><strong>Yön (En Kritik Kısım):</strong> Kuvvet <strong>yukarı</strong> doğru olmalı demiştik. Ancak cismimiz NEGATİF yüklü (-4 μC). Negatif yükler, elektrik alanın <strong>tersi</strong> yönünde kuvvet hissederler. Kuvvetin yukarı olması için Elektrik Alanın (E) <strong>aşağı doğru (downward)</strong> olması ZORUNLUDUR.</p>
        ],
        finalAnswer: "D) 2 × 10⁴ N/C, vertically downward"
    },
    {
        id: 9,
        type: 'mcq',
        text: <p>Three point charges <InlineMath math="q_1 = q_2 = +2 \mu C" /> and <InlineMath math="q_3 = -2 \mu C" /> are located in the xy-plane. Find the net electric field at the origin.</p>,
        options: ["(-4i - 2j) kN/C", "(12i + 6j) kN/C", "(12i - 6j) kN/C", "(4i + 2j) kN/C", "(4i - 2j) kN/C"],
        correctIndex: 4,
        figure: (
            <svg viewBox="0 0 200 200" className="w-full max-w-xs mx-auto bg-slate-50 rounded-lg p-2 border border-slate-200">
                {/* Axes */}
                <line x1="20" y1="100" x2="180" y2="100" stroke="black" strokeWidth="1" />
                <line x1="100" y1="180" x2="100" y2="20" stroke="black" strokeWidth="1" />
                
                {/* Charges */}
                <circle cx="40" cy="100" r="8" fill="#235347" />
                <text x="40" y="85" textAnchor="middle" fontSize="10">q1 (-3,0)</text>
                
                <circle cx="100" cy="40" r="8" fill="#235347" />
                <text x="120" y="45" textAnchor="start" fontSize="10">q2 (0,3)</text>
                
                <circle cx="160" cy="100" r="8" fill="#e11d48" />
                <text x="160" y="85" textAnchor="middle" fontSize="10">q3 (3,0)</text>
            </svg>
        ),
        solution: [
            <p><strong>Orijindeki Vektörleri Çizelim:</strong></p>,
            <p>1. Sol taraftaki <InlineMath math="q_1" /> (+), orijini sağa doğru (+i) iter.</p>,
            <div className="overflow-x-auto py-2"><BlockMath math="E_1 = 9\times 10^9 \frac{2\times 10^{-6}}{3^2} = 2000 \text{ N/C} \quad (+\hat{i})" /></div>,
            <p>2. Sağ taraftaki <InlineMath math="q_3" /> (-), orijini kendine doğru (+i) çeker.</p>,
            <div className="overflow-x-auto py-2"><BlockMath math="E_3 = 9\times 10^9 \frac{2\times 10^{-6}}{3^2} = 2000 \text{ N/C} \quad (+\hat{i})" /></div>,
            <p>X ekseni toplamı: <InlineMath math="2000 + 2000 = 4000 \text{ N/C} = 4 \text{ kN/C}" /></p>,
            <p>3. Üstteki <InlineMath math="q_2" /> (+), orijini aşağı doğru (-j) iter.</p>,
            <div className="overflow-x-auto py-2"><BlockMath math="E_2 = 9\times 10^9 \frac{2\times 10^{-6}}{3^2} = 2000 \text{ N/C} \quad (-\hat{j}) = -2 \text{ kN/C}" /></div>,
            <p>Net vektör: <InlineMath math="(4\hat{i} - 2\hat{j}) \text{ kN/C}" /></p>
        ],
        finalAnswer: "E) (4i - 2j) kN/C"
    },
    {
        id: 10,
        type: 'mcq',
        text: "Suppose that there exists a uniform electric field of 4 N/C directed along the positive x-axis. When a point charge is placed at and fixed to the origin, the resulting electric field on the x-axis at x = 2 m becomes zero. What is then the magnitude of the resulting electric field on the x-axis at x = 4 m?",
        options: ["1 N/C", "3 N/C", "4 N/C", "More information is needed", "2 N/C"],
        correctIndex: 1,
        solution: [
            <p><strong>Gizemi Çözme:</strong> Başlangıçta sağa doğru +4 N/C'lik bir Düzgün Alan (Uniform Field) var. Orijine bir <InlineMath math="q" /> yükü koyduğumuzda, <InlineMath math="x=2" /> noktasında net alan SIFIR oluyor.</p>,
            <p>Bunun anlamı, <InlineMath math="q" /> yükünün <InlineMath math="x=2" /> noktasında yarattığı alan tam olarak <strong>-4 N/C</strong> olmalıdır ki (sola doğru) düzgün alanı iptal etsin. (Demek ki yük negatiftir).</p>,
            <p><strong>Uzaklığın Etkisi:</strong> <InlineMath math="x=4" /> noktasına gidersek, orijindeki yüke olan uzaklığımız 2 katına çıkar (<InlineMath math="r \rightarrow 2r" />). Ters kare yasası gereği (<InlineMath math="E \propto 1/r^2" />), yükün yarattığı alan 4'te birine düşer!</p>,
            <div className="overflow-x-auto py-2"><BlockMath math="E_q (x=4) = \frac{-4 \text{ N/C}}{2^2} = -1 \text{ N/C}" /></div>,
            <p>Şimdi <InlineMath math="x=4" /> noktasındaki <strong>Toplam (Net) Alanı</strong> bulalım. Düzgün alan hala +4 N/C olarak duruyor (adı üstünde düzgün, her yerde aynı):</p>,
            <div className="overflow-x-auto py-2"><BlockMath math="E_{net} = E_{uniform} + E_q = 4 + (-1) = 3 \text{ N/C}" /></div>
        ],
        finalAnswer: "B) 3 N/C"
    },
    {
        id: 11,
        type: 'mcq',
        text: <p>A charged ball of mass 2g is suspended on a light string in the presence of a uniform electric field of <InlineMath math="\vec{E} = (3 \times 10^5 \hat{i} + 6 \times 10^5 \hat{j}) N/C" />. The ball is in equilibrium at <InlineMath math="\theta = 37^\circ" />. Determine the charge on the ball.</p>,
        options: ["5 × 10⁻⁸ C", "2 × 10⁻⁸ C", "5 × 10⁻⁶ C", "3 × 10⁻⁸ C", "4 × 10⁻⁶ C"],
        correctIndex: 1,
        figure: (
            <svg viewBox="0 0 200 200" className="w-full max-w-xs mx-auto bg-slate-50 rounded-lg p-2 border border-slate-200">
                <line x1="100" y1="20" x2="100" y2="150" stroke="#94a3b8" strokeDasharray="4" />
                <line x1="80" y1="20" x2="120" y2="20" stroke="black" strokeWidth="4" />
                
                <line x1="100" y1="20" x2="140" y2="120" stroke="black" strokeWidth="2" />
                <circle cx="140" cy="120" r="10" fill="#64748b" />
                <text x="140" y="145" textAnchor="middle" fontSize="12">q, m</text>
                
                {/* Angle arc */}
                <path d="M 100 60 A 40 40 0 0 1 115 58" fill="none" stroke="black" />
                <text x="108" y="75" fontSize="10">37°</text>
                
                {/* E field arrows */}
                <line x1="30" y1="150" x2="60" y2="100" stroke="#235347" strokeWidth="2" markerEnd="url(#arrow)" />
                <line x1="50" y1="150" x2="80" y2="100" stroke="#235347" strokeWidth="2" markerEnd="url(#arrow)" />
                <text x="40" y="100" fontSize="12" fill="#235347" fontWeight="bold">E</text>
            </svg>
        ),
        solution: [
            <p><strong>Mekanik ve Elektrik Birleşiyor:</strong> Bu tam bir Fizik 105 (Mekanik) - Fizik 106 (Elektromanyetizma) karma sorusudur! Top dengede olduğuna göre, üzerindeki tüm kuvvetlerin X ve Y eksenlerindeki toplamı SIFIR olmalıdır.</p>,
            <p>Kuvvetlerimizi yazalım:<br/>
               1. <strong>Yerçekimi:</strong> <InlineMath math="mg" /> her zaman aşağı (-y).<br/>
               2. <strong>İp Gerilmesi (T):</strong> Düşeyle 37 derece açı yapıyor. Yukarı doğru <InlineMath math="T\cos37^\circ" />, sola doğru <InlineMath math="T\sin37^\circ" /> bileşenleri var.<br/>
               3. <strong>Elektriksel Kuvvet:</strong> <InlineMath math="\vec{F} = q\vec{E}" /> olduğundan sağa doğru <InlineMath math="q E_x" /> ve yukarı doğru <InlineMath math="q E_y" />.
            </p>,
            <p><strong>Denklemleri Kuralım:</strong></p>,
            <div className="overflow-x-auto py-2"><BlockMath math="\text{X-Ekseni:} \quad q (3 \times 10^5) - T \sin(37^\circ) = 0 \implies T \sin(37^\circ) = q \cdot 3\times 10^5" /></div>,
            <div className="overflow-x-auto py-2"><BlockMath math="\text{Y-Ekseni:} \quad T \cos(37^\circ) + q (6 \times 10^5) - mg = 0 \implies T \cos(37^\circ) = mg - q \cdot 6\times 10^5" /></div>,
            <p>Bilinmeyen ip gerilmesinden (T) kurtulmak için en eski hileyi kullanıyoruz: Denklemleri taraf tarafa bölüp <InlineMath math="\tan 37^\circ" /> elde etmek!</p>,
            <div className="overflow-x-auto py-2"><BlockMath math="\tan(37^\circ) \approx \frac{3}{4} = \frac{q \cdot 3 \times 10^5}{0.002 \cdot 9.8 - q \cdot 6 \times 10^5}" /></div>,
            <p>Buradan içler dışlar çarpımı yaparak matematiği bitiriyoruz:</p>,
            <div className="overflow-x-auto py-2"><BlockMath math="3(0.0196 - 6 \times 10^5 q) = 4(3 \times 10^5 q)" /></div>,
            <div className="overflow-x-auto py-2"><BlockMath math="0.0588 - 18 \times 10^5 q = 12 \times 10^5 q \implies 0.0588 = 30 \times 10^5 q \implies q = 1.96 \times 10^{-8} C \approx 2 \times 10^{-8} C" /></div>
        ],
        finalAnswer: "B) 2 × 10⁻⁸ C"
    },
    {
        id: 12,
        type: 'mcq',
        text: "The figure below shows the electric field lines in a given region of space. The magnitude of the field...",
        options: ["decreases as x increases", "decreases as y increases", "is constant", "increases as x increases", "increases as y increases"],
        correctIndex: 3,
        figure: (
            <svg viewBox="0 0 200 150" className="w-full max-w-xs mx-auto bg-slate-50 rounded-lg p-2 border border-slate-200">
                {/* Field lines getting closer together towards the right */}
                <line x1="20" y1="20" x2="20" y2="130" stroke="black" strokeWidth="2" markerEnd="url(#arrow)" />
                <line x1="60" y1="20" x2="60" y2="130" stroke="black" strokeWidth="2" markerEnd="url(#arrow)" />
                <line x1="90" y1="20" x2="90" y2="130" stroke="black" strokeWidth="2" markerEnd="url(#arrow)" />
                <line x1="110" y1="20" x2="110" y2="130" stroke="black" strokeWidth="2" markerEnd="url(#arrow)" />
                <line x1="125" y1="20" x2="125" y2="130" stroke="black" strokeWidth="2" markerEnd="url(#arrow)" />
                
                {/* Axis */}
                <line x1="150" y1="80" x2="190" y2="80" stroke="black" strokeWidth="1" markerEnd="url(#arrow)" />
                <line x1="150" y1="80" x2="150" y2="40" stroke="black" strokeWidth="1" markerEnd="url(#arrow)" />
                <text x="195" y="85" fontSize="10">x</text>
                <text x="145" y="35" fontSize="10">y</text>
            </svg>
        ),
        solution: [
            <p><strong>Alan Çizgileri Kuralı:</strong> Elektrik alan çizgilerinin yoğunluğu (birbirine olan yakınlığı), elektrik alanın büyüklüğünü (şiddetini) temsil eder.</p>,
            <p>Çizgiler birbirine ne kadar yakınsa, elektrik alan o kadar GÜÇLÜDÜR.</p>,
            <p>Görsele dikkat ederseniz, x ekseninde sağa doğru gidildikçe (x artarken) çizgiler arasındaki boşluk daralıyor, yani çizgiler sıklaşıyor.</p>,
            <p>Demek ki x arttıkça elektrik alanın büyüklüğü <strong>artmaktadır (increases as x increases).</strong></p>
        ],
        finalAnswer: "D) increases as x increases"
    },
    {
        id: 13,
        type: 'mcq',
        text: "The figure shows three electric charges labeled Q1, Q2, and Q3, and some electric field lines. What are the signs of these three charges?",
        options: ["All positive", "Q1+, Q2+, Q3-", "Q1-, Q2+, Q3-", "All negative", "Q1+, Q2-, Q3+"],
        correctIndex: 4,
        figure: (
            <svg viewBox="0 0 300 150" className="w-full max-w-sm mx-auto bg-slate-50 rounded-lg p-2 border border-slate-200">
                <circle cx="50" cy="75" r="15" fill="white" stroke="black" strokeWidth="2" />
                <text x="50" y="80" textAnchor="middle" fontSize="14" fontWeight="bold">Q1</text>
                
                <circle cx="150" cy="75" r="15" fill="white" stroke="black" strokeWidth="2" />
                <text x="150" y="80" textAnchor="middle" fontSize="14" fontWeight="bold">Q2</text>
                
                <circle cx="250" cy="75" r="15" fill="white" stroke="black" strokeWidth="2" />
                <text x="250" y="80" textAnchor="middle" fontSize="14" fontWeight="bold">Q3</text>

                {/* Curved paths representing lines */}
                <path d="M 65 75 Q 100 50 135 75" fill="none" stroke="black" strokeWidth="1.5" markerEnd="url(#arrow)" />
                <path d="M 65 75 Q 100 100 135 75" fill="none" stroke="black" strokeWidth="1.5" markerEnd="url(#arrow)" />
                
                <path d="M 235 75 Q 200 50 165 75" fill="none" stroke="black" strokeWidth="1.5" markerEnd="url(#arrow)" />
                <path d="M 235 75 Q 200 100 165 75" fill="none" stroke="black" strokeWidth="1.5" markerEnd="url(#arrow)" />
                
                <path d="M 40 60 Q 20 20 10 10" fill="none" stroke="black" strokeWidth="1.5" markerEnd="url(#arrow)" />
                <path d="M 260 60 Q 280 20 290 10" fill="none" stroke="black" strokeWidth="1.5" markerEnd="url(#arrow)" />
            </svg>
        ),
        solution: [
            <p><strong>Evrensel Kural:</strong> Elektrik alan çizgileri <strong>DAİMA</strong> Pozitif (+) yükten dışarı çıkar ve Negatif (-) yüke girer.</p>,
            <p>Grafikteki okların yönüne bakıyoruz:</p>,
            <ul className="list-disc pl-5 space-y-2">
                <li><strong>Q1:</strong> Çizgiler Q1'den dışarı çıkıyor. Yani Q1 pozitiftir (+).</li>
                <li><strong>Q3:</strong> Çizgiler Q3'ten dışarı çıkıyor. Yani Q3 pozitiftir (+).</li>
                <li><strong>Q2:</strong> Hem sağdan hem de soldan gelen bütün çizgiler Q2'nin içine giriyor. Yani Q2 negatiftir (-).</li>
            </ul>
        ],
        finalAnswer: "E) Q1 is positive, Q2 is negative, and Q3 is positive"
    },
    {
        id: 14,
        type: 'mcq',
        text: "The figure shows the electric field lines for a system of two point charges QA and QB. Which of the following could represent the magnitudes and signs of QA and QB? Take q to be a positive quantity.",
        options: ["QA = -3q, QB = +7q", "QA = +3q, QB = -7q", "QA = +7q, QB = -3q", "QA = -7q, QB = +3q", "QA = +q, QB = -q"],
        correctIndex: 2,
        figure: (
            <svg viewBox="0 0 300 150" className="w-full max-w-sm mx-auto bg-slate-50 rounded-lg p-2 border border-slate-200">
                <circle cx="100" cy="75" r="15" fill="#e2e8f0" stroke="black" strokeWidth="1" />
                <text x="100" y="80" textAnchor="middle" fontSize="12">QA</text>
                
                <circle cx="200" cy="75" r="15" fill="#e2e8f0" stroke="black" strokeWidth="1" />
                <text x="200" y="80" textAnchor="middle" fontSize="12">QB</text>

                {/* Dense lines out of QA, fewer into QB */}
                {[...Array(14)].map((_, i) => (
                    <line key={i} x1="100" y1="75" x2={100 + 40 * Math.cos(i * Math.PI / 7)} y2={75 + 40 * Math.sin(i * Math.PI / 7)} stroke="black" strokeWidth="1" markerEnd="url(#arrow)" />
                ))}
                
                {[...Array(6)].map((_, i) => (
                    <line key={`b${i}`} x1={200 + 30 * Math.cos(i * Math.PI / 3)} y1={75 + 30 * Math.sin(i * Math.PI / 3)} x2="200" y2="75" stroke="black" strokeWidth="1" markerEnd="url(#arrow)" />
                ))}
            </svg>
        ),
        solution: [
            <p><strong>İşaret Kontrolü:</strong> Çizgiler QA'dan dışarı çıkıyor (Demek ki QA Pozitif), QB'nin içine giriyor (Demek ki QB Negatif). Şıklarda QA(+), QB(-) olanları arayacağız.</p>,
            <p><strong>Büyüklük Kontrolü (Gauss Yasasının Sezgisel Hali):</strong> Bir yükten çıkan veya giren çizgi sayısı, o yükün büyüklüğü ile <strong>doğru orantılıdır</strong>.</p>,
            <p>Görsele baktığımızda QA'dan fışkıran çizgi sayısının, QB'ye giren çizgi sayısından ÇOK DAHA FAZLA olduğunu görüyoruz. Oransal olarak saydığınızda (veya görsel yoğunluğa baktığınızda) QA'nın etrafı çok yoğundur, yani <InlineMath math="|Q_A| > |Q_B|" /> olmalıdır.</p>,
            <p>C şıkkında <InlineMath math="Q_A = +7q" /> ve <InlineMath math="Q_B = -3q" />. İşaretler doğru, 7 &gt; 3 büyüklük orantısı da görseli mükemmel şekilde doğruluyor.</p>
        ],
        finalAnswer: "C) QA = +7q, QB = -3q"
    },
    {
        id: 15,
        type: 'mcq',
        text: <p>A particle of mass <InlineMath math="4\times 10^{-15} kg" /> and charge <InlineMath math="-5\times 10^{-8} C" /> is projected into a field <InlineMath math="\vec{E} = 8\times 10^3 \hat{j} N/C" />. Initial velocity is <InlineMath math="(4\times 10^5 \hat{i} + 2\times 10^5 \hat{j}) m/s" />. What is its speed after <InlineMath math="5\times 10^{-6} s" />?</p>,
        options: ["10 × 10⁵ m/s", "3 × 10⁵ m/s", "8 × 10⁵ m/s", "4 × 10⁵ m/s", "5 × 10⁵ m/s"],
        correctIndex: 4,
        solution: [
            <p><strong>Yine Kinematik!</strong> Bir elektrik alanında elektron / parçacık ilerliyorsa, aklınıza gelmesi gereken ilk şey <InlineMath math="\vec{F} = m\vec{a}" /> formülüdür. Önce ivmeyi (<InlineMath math="\vec{a}" />) bulmalıyız.</p>,
            <p>Elektrik alan sadece y-ekseninde (<InlineMath math="+\hat{j}" />) verilmiş. Ancak parçacığımız negatif yüklü! Bu yüzden kuvvet elektrik alanın TERSİNE, yani aşağı doğru (<InlineMath math="-\hat{j}" />) etki edecektir.</p>,
            <div className="overflow-x-auto py-2"><BlockMath math="\vec{a} = \frac{q\vec{E}}{m} = \frac{(-5\times 10^{-8} C)(8\times 10^3 \hat{j} N/C)}{4\times 10^{-15} kg} = -10^{11} \hat{j} \text{ m/s}^2" /></div>,
            <p><strong>Sabit İvmeli Hareket (Kinematik):</strong> Parçacığın son hızını liseden de bildiğimiz <InlineMath math="\vec{v}_f = \vec{v}_i + \vec{a}t" /> denklemi ile hesaplıyoruz:</p>,
            <div className="overflow-x-auto py-2"><BlockMath math="\vec{v}_f = (4\times 10^5 \hat{i} + 2\times 10^5 \hat{j}) + (-10^{11} \hat{j})(5\times 10^{-6} s)" /></div>,
            <div className="overflow-x-auto py-2"><BlockMath math="\vec{v}_f = 4\times 10^5 \hat{i} + 2\times 10^5 \hat{j} - 5\times 10^5 \hat{j} = (4\times 10^5 \hat{i} - 3\times 10^5 \hat{j}) \text{ m/s}" /></div>,
            <p>Soru bizden hız vektörünü değil, <strong>süratini (speed)</strong> yani vektörün büyüklüğünü istiyor. Efsanevi 3-4-5 üçgenini fark ettiniz mi?</p>,
            <div className="overflow-x-auto py-2"><BlockMath math="|\vec{v}_f| = \sqrt{(4\times 10^5)^2 + (-3\times 10^5)^2} = 5\times 10^5 \text{ m/s}" /></div>
        ],
        finalAnswer: "E) 5 × 10⁵ m/s"
    },
    {
        id: 'P23.6',
        type: 'problem',
        text: <p>Two small metallic spheres, each of mass m = 0.200 g, are suspended as pendulums by light strings of length L. They are given the same electric charge of 7.2 nC, and they come to equilibrium when each string is at an angle of 5° with the vertical. How long are the strings?</p>,
        figure: (
            <svg viewBox="0 0 200 150" className="w-full max-w-xs mx-auto bg-slate-50 rounded-lg p-2 border border-slate-200">
                <line x1="100" y1="20" x2="100" y2="130" stroke="#94a3b8" strokeDasharray="4" />
                <line x1="50" y1="20" x2="150" y2="20" stroke="black" strokeWidth="4" />
                
                {/* Left string */}
                <line x1="100" y1="20" x2="60" y2="110" stroke="black" strokeWidth="2" />
                <circle cx="60" cy="110" r="8" fill="#64748b" />
                
                {/* Right string */}
                <line x1="100" y1="20" x2="140" y2="110" stroke="black" strokeWidth="2" />
                <circle cx="140" cy="110" r="8" fill="#64748b" />
                
                <path d="M 100 50 A 30 30 0 0 1 112 47" fill="none" stroke="black" />
                <text x="110" y="65" fontSize="10">θ</text>
                <text x="125" y="60" fontSize="12" fontStyle="italic">L</text>
            </svg>
        ),
        solution: [
            <p><strong>Klasik Sarkaç Dengesi:</strong> Sarkan bir cisme 3 kuvvet etki eder: İp gerilmesi (T), Ağırlık (mg) ve diğer cismin uyguladığı İtme kuvveti (Fe).</p>,
            <p>Düşey Denge: <InlineMath math="T \cos(5^\circ) = mg" /></p>,
            <p>Yatay Denge: <InlineMath math="T \sin(5^\circ) = F_e" /></p>,
            <p>Bu ikisini böldüğümüzde ip gerilmesinden kurtuluruz: <InlineMath math="\tan(5^\circ) = \frac{F_e}{mg}" />. Bu şablonu adınız gibi bilmelisiniz!</p>,
            <p>Elektriksel itme kuvvetini açalım: Yükler arasındaki toplam mesafe <InlineMath math="r = 2 L \sin(5^\circ)" />'dir. (Her bir üçgenin alt tabanı <InlineMath math="L\sin5" />).</p>,
            <div className="overflow-x-auto py-2"><BlockMath math="F_e = k \frac{q^2}{(2L\sin 5^\circ)^2} = k \frac{q^2}{4L^2 \sin^2(5^\circ)}" /></div>,
            <p>Şimdi bunu <InlineMath math="F_e = mg \tan(5^\circ)" /> denklemine eşitleyelim ve <InlineMath math="L" />'yi yalnız bırakalım:</p>,
            <div className="overflow-x-auto py-2"><BlockMath math="k \frac{q^2}{4L^2 \sin^2(5^\circ)} = mg \tan(5^\circ) \implies L^2 = \frac{kq^2}{4mg \sin^2(5^\circ)\tan(5^\circ)}" /></div>,
            <p>Değerleri (m = 0.0002 kg, q = 7.2e-9 C) yerlerine yazıp karekök aldığınızda sonuç kusursuz çıkar.</p>
        ],
        finalAnswer: "0.299 m"
    },
    {
        id: 'P23.17',
        type: 'problem',
        text: <p>Four charged particles are at the corners of a square of side <InlineMath math="a" />. Top-left: 2q, Top-right: q, Bottom-left: 3q, Bottom-right: 4q. Determine the electric field at the location of charge q (top-right).</p>,
        figure: (
            <svg viewBox="0 0 200 200" className="w-full max-w-xs mx-auto bg-slate-50 rounded-lg p-4 border border-slate-200">
                <rect x="50" y="50" width="100" height="100" fill="none" stroke="black" strokeWidth="2" />
                <text x="100" y="45" textAnchor="middle" fontSize="12" fontStyle="italic">a</text>
                
                <circle cx="50" cy="50" r="10" fill="#f87171" />
                <text x="35" y="55" textAnchor="end" fontSize="12" fontWeight="bold">2q</text>
                
                <circle cx="150" cy="50" r="10" fill="#f87171" />
                <text x="165" y="55" textAnchor="start" fontSize="12" fontWeight="bold">q</text>
                
                <circle cx="50" cy="150" r="10" fill="#f87171" />
                <text x="35" y="155" textAnchor="end" fontSize="12" fontWeight="bold">3q</text>
                
                <circle cx="150" cy="150" r="10" fill="#f87171" />
                <text x="165" y="155" textAnchor="start" fontSize="12" fontWeight="bold">4q</text>
            </svg>
        ),
        solution: [
            <p><strong>Kare Geometrisi Kabusu:</strong> Kare köşelerindeki yükler, köşegen olanlar açılı olduğu için en çok işlem hatası yapılan sorulardandır. Stratejimiz: Hedef noktaya (q'nun bulunduğu sağ üst köşe) etki eden tüm E-alanlarını çizip, X ve Y eksenlerinde bileşenlerine ayırmak!</p>,
            <p><strong>Adım 1: Eksenlerde Olanlar (Düz olanlar)</strong><br/>
            - Sol-üstteki <InlineMath math="2q" />'nun alanı sağa doğrudur (Çünkü iter). Mesafe <InlineMath math="a" /> kadardır: <InlineMath math="E_x = k \frac{2q}{a^2}" /> <br/>
            - Sağ-alttaki <InlineMath math="4q" />'nun alanı yukarı doğrudur (Çünkü iter). Mesafe <InlineMath math="a" /> kadardır: <InlineMath math="E_y = k \frac{4q}{a^2}" />
            </p>,
            <p><strong>Adım 2: Çapraz Olan (Baş belası)</strong><br/>
            - Sol-alttaki <InlineMath math="3q" /> köşegendedir. Mesafesi <InlineMath math="a\sqrt{2}" />'dir. İtme yönü tam köşegen boyuncadır (Yatayla <InlineMath math="45^\circ" /> yapar). Büyüklüğü:
            </p>,
            <div className="overflow-x-auto py-2"><BlockMath math="E_{diagonal} = k \frac{3q}{(a\sqrt{2})^2} = k \frac{3q}{2a^2}" /></div>,
            <p>Bu köşegen vektörünü X ve Y'ye dağıtmalıyız. Her iki eksene de <InlineMath math="\cos 45^\circ = \frac{\sqrt{2}}{2}" /> çarpanıyla düşer.</p>,
            <p><strong>Adım 3: Bileşenleri Topla</strong></p>,
            <div className="overflow-x-auto py-2"><BlockMath math="E_x = k\frac{2q}{a^2} + k\frac{3q}{2a^2} \frac{\sqrt{2}}{2} = \frac{kq}{a^2} \left(2 + \frac{3\sqrt{2}}{4}\right) \approx 3.06 \frac{kq}{a^2}" /></div>,
            <div className="overflow-x-auto py-2"><BlockMath math="E_y = k\frac{4q}{a^2} + k\frac{3q}{2a^2} \frac{\sqrt{2}}{2} = \frac{kq}{a^2} \left(4 + \frac{3\sqrt{2}}{4}\right) \approx 5.06 \frac{kq}{a^2}" /></div>,
            <p>Son olarak pisagor teoremi ile hipotenüsü (net büyüklüğü) ve arctan ile açıyı buluyoruz:</p>,
            <div className="overflow-x-auto py-2"><BlockMath math="E_{net} = \sqrt{(3.06)^2 + (5.06)^2} \frac{kq}{a^2} \approx 5.91 \frac{kq}{a^2}" /></div>,
            <div className="overflow-x-auto py-2"><BlockMath math="\theta = \arctan\left(\frac{5.06}{3.06}\right) = 58.8^\circ" /></div>
        ],
        finalAnswer: <BlockMath math="\vec{E} = 5.91 \frac{kq}{a^2} \angle 58.8^\circ" />
    },
    {
        id: 'Extra',
        type: 'problem',
        text: <p>A proton is projected in the positive x direction into a region of a uniform electric field <InlineMath math="\vec{E} = -6.00 \times 10^5 \hat{i} N/C" /> at t=0. The proton travels 7.00 cm as it comes to rest. Determine (a) the acceleration, (b) initial speed, (c) time.</p>,
        solution: [
            <p><strong>Kinematik Analiz:</strong> Proton pozitif yüklüdür. Elektrik alan ise NEGATİF X yönünde (<InlineMath math="-\hat{i}" />). Demek ki protona etki eden kuvvet geriye doğrudur. Proton sağa fırlatıldığına göre, fren yapacak ve bir süre sonra duracaktır.</p>,
            <p><strong>(a) İvme:</strong> Newton'un 2. yasasından (<InlineMath math="F=ma" />) ivmeyi bulalım. Protonun kütlesi <InlineMath math="m = 1.67 \times 10^{-27} kg" /> ve yükü <InlineMath math="q = 1.6 \times 10^{-19} C" />'dur.</p>,
            <div className="overflow-x-auto py-2"><BlockMath math="a = \frac{qE}{m} = \frac{(1.6\times 10^{-19})(-6.00\times 10^5)}{1.67\times 10^{-27}} = -5.75 \times 10^{13} m/s^2" /></div>,
            <p><strong>(b) İlk Hız:</strong> Zamansız hız denklemini kullanalım (<InlineMath math="v^2 = v_0^2 + 2a\Delta x" />). Proton durduğu için son hız <InlineMath math="v=0" />'dır ve durana kadar 7 cm (0.07 m) yol almıştır.</p>,
            <div className="overflow-x-auto py-2"><BlockMath math="0 = v_0^2 + 2(-5.75\times 10^{13})(0.07) \implies v_0^2 = 8.05 \times 10^{12}" /></div>,
            <div className="overflow-x-auto py-2"><BlockMath math="v_0 = \sqrt{8.05 \times 10^{12}} = 2.84 \times 10^6 m/s" /></div>,
            <p><strong>(c) Geçen Zaman:</strong> Hızın zamana bağlı denklemi (<InlineMath math="v = v_0 + at" />) çok işimize yarayacak.</p>,
            <div className="overflow-x-auto py-2"><BlockMath math="0 = 2.84\times 10^6 - 5.75\times 10^{13} t \implies t = \frac{2.84\times 10^6}{5.75\times 10^{13}} = 4.94 \times 10^{-8} s" /></div>
        ],
        finalAnswer: "(a) -5.75e13 m/s², (b) 2.84e6 m/s, (c) 4.94e-8 s"
    }
];

export default function Chapter22Exercises() {
    return (
        <section className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200 mt-10">
            <div className="inline-flex items-center justify-center p-3 bg-emerald-50 rounded-2xl mb-6">
                <Brain className="w-8 h-8 text-[#235347]" />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">
                Soru Çözümleri (Tüm Chapter 22 Arşivi)
            </h2>
            <p className="text-slate-600 mb-10 text-lg leading-relaxed max-w-3xl">
                Yüklediğiniz PDF'ten eksiksiz bir şekilde derlenen, vektörel şemaları <strong>(SVG grafikleri)</strong> ile birlikte yeniden çizilen ve <strong>ODTÜ Fizik 106</strong> formatına uygun anlatımlı 15 devasa problemin çözümleri.
            </p>

            <div className="space-y-8">
                {exercisesData.map((exercise, idx) => (
                    <ExerciseCard key={exercise.id} exercise={exercise} index={idx + 1} />
                ))}
            </div>
        </section>
    );
}

function ExerciseCard({ exercise, index }: { exercise: Exercise, index: number }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            {/* Question Header */}
            <div className="bg-slate-50 p-6 sm:p-8 border-b border-slate-200">
                <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-2xl bg-[#235347] flex items-center justify-center text-white font-black flex-shrink-0 shadow-inner">
                        {exercise.type === 'mcq' ? `Q${exercise.id}` : `P`}
                    </div>
                    <div className="flex-1 text-slate-800 text-[1.1rem] leading-loose font-medium pt-1">
                        {exercise.text}
                        {/* SVG Figure Render */}
                        {exercise.figure && (
                            <div className="my-6">
                                {exercise.figure}
                            </div>
                        )}
                    </div>
                </div>

                {/* Options if MCQ */}
                {exercise.type === 'mcq' && exercise.options && (
                    <div className="mt-8 ml-0 sm:ml-16 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {exercise.options.map((opt, i) => (
                            <div key={i} className={`p-4 rounded-xl border-2 transition-colors ${isOpen && i === exercise.correctIndex ? 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold shadow-sm' : 'bg-white border-slate-200 text-slate-600'}`}>
                                <span className="inline-block w-6 font-bold opacity-50">{String.fromCharCode(65 + i)})</span> {opt}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Solution Area */}
            {isOpen ? (
                <div className="p-6 sm:p-8 bg-white animate-in slide-in-from-top-4 duration-300">
                    <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
                        <div className="p-2 bg-emerald-100 rounded-lg">
                            <CheckCircle2 className="w-6 h-6 text-emerald-700" />
                        </div>
                        <h4 className="font-extrabold text-xl text-slate-900">
                            Adım Adım Analitik Çözüm
                        </h4>
                    </div>
                    
                    <div className="space-y-6 text-slate-700 ml-0 sm:ml-4">
                        {exercise.solution.map((step, i) => (
                            <div key={i} className="flex gap-4 items-start bg-slate-50 p-5 rounded-2xl border border-slate-100">
                                <div className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-500 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5 shadow-sm">
                                    {i + 1}
                                </div>
                                <div className="leading-loose text-[1.05rem] w-full">
                                    {step}
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="mt-8 ml-0 sm:ml-16 p-6 bg-emerald-50 border-2 border-emerald-100 rounded-2xl flex items-center gap-5 shadow-sm">
                        <Target className="w-8 h-8 text-emerald-600 flex-shrink-0" />
                        <div>
                            <p className="text-sm font-bold text-emerald-700 uppercase tracking-widest mb-2">Doğru Cevap</p>
                            <p className="text-2xl font-black text-emerald-900">{exercise.finalAnswer}</p>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end">
                        <button 
                            onClick={() => setIsOpen(false)}
                            className="text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors px-4 py-2 rounded-lg hover:bg-slate-100"
                        >
                            Çözümü Kapat
                        </button>
                    </div>
                </div>
            ) : (
                <div className="bg-white p-5 flex justify-center border-t border-slate-100">
                    <button 
                        onClick={() => setIsOpen(true)}
                        className="flex items-center gap-2 bg-slate-900 text-white hover:bg-[#235347] px-8 py-3.5 rounded-xl font-bold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                        <HelpCircle className="w-5 h-5" />
                        Çözümü ve Analizi Gör
                    </button>
                </div>
            )}
        </div>
    );
}
