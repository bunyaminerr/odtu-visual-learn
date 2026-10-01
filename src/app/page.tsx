import Link from "next/link";
import { BookOpen, Hash, Component, Network } from "lucide-react";

const COURSES = [
    {
        id: "math260",
        title: "MATH 260 - Linear Algebra",
        description: "Adım adım Gauss-Jordan satır indirgeme simülatörü.",
        href: "/courses/math260-linear-algebra/matrix-elimination",
        icon: <Hash className="w-6 h-6 text-[#235347]" />
    },
    {
        id: "cng213",
        title: "CNG 213 - Data Structures",
        description: "C bellek modeli ile Singly Linked List görselleştiricisi.",
        href: "/courses/cng213-data-structures/linked-lists",
        icon: <Network className="w-6 h-6 text-[#235347]" />
    },
    {
        id: "cng232",
        title: "CNG 232 - Logic Design",
        description: "Dijital Sistemler, İkili Sayılar, Karnaugh Haritası (K-Map) ve Boole indirgeme.",
        href: "/courses/cng232-logic-design/digital-systems",
        icon: <Component className="w-6 h-6 text-[#235347]" />
    },
    {
        id: "cng223",
        title: "CNG 223 - Discrete Structures",
        description: "Hasse Diyagramları ve Master Theorem (Yineleme Ağaçları).",
        href: "/courses/cng223-discrete-structures/sets-and-relations",
        icon: <BookOpen className="w-6 h-6 text-[#235347]" />
    }
];

export default function Home() {
    return (
        <div className="min-h-screen bg-[#F9FAF9] text-[#051F20] font-sans selection:bg-[#235347] selection:text-[#F2F7F4] flex flex-col">
            
            <header className="border-b border-slate-200 bg-white sticky top-0 z-10 shadow-sm">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <h1 className="text-xl font-bold text-[#051F20] flex items-center gap-2">
                        <span className="bg-[#235347] text-white w-8 h-8 rounded-lg flex items-center justify-center font-serif">O</span>
                        ODTÜ Visual Learn
                    </h1>
                    <nav className="text-sm font-medium text-[#235347] flex gap-6">
                        <Link href="/" className="hover:text-[#051F20] transition-colors">Dashboard</Link>
                        <Link href="/" className="hover:text-[#051F20] transition-colors">Hakkında</Link>
                    </nav>
                </div>
            </header>

            <main className="flex-1 max-w-6xl mx-auto px-6 py-12 w-full">
                <div className="mb-12 text-center sm:text-left">
                    <h2 className="text-4xl sm:text-5xl font-bold text-[#051F20] tracking-tight mb-4">
                        Hoş Geldiniz
                    </h2>
                    <p className="text-lg text-[#235347] max-w-2xl font-medium">
                        ODTÜ müfredatına özel hazırlanmış, adım adım çalıştırılabilir deterministik algoritma ve veri yapısı görselleştiricileri.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {COURSES.map(course => (
                        <div key={course.id} className="group bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:border-slate-300 flex flex-col gap-4 h-full">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-[#F2F7F4] flex items-center justify-center group-hover:bg-[#DAF1DE]/40 transition-colors">
                                        {course.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-[#051F20] group-hover:text-[#235347] transition-colors">
                                        {course.title}
                                    </h3>
                                </div>
                                <p className="text-[#051F20] opacity-80 leading-relaxed">
                                    {course.description}
                                </p>
                                <div className="mt-auto pt-4 flex flex-col sm:flex-row gap-3">
                                    <Link href={course.href} className="flex-1 inline-flex justify-center items-center gap-2 rounded-xl bg-[#235347] hover:bg-[#1a3d34] px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:shadow-md transition-all group">
                                        <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                        Görselleştirici
                                    </Link>
                                </div>
                            </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
