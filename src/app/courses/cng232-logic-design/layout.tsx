"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TOPICS = [
  { id: 'digital-systems', label: '1. Digital Systems & Binary Numbers', path: '/courses/cng232-logic-design/digital-systems' },
  { id: 'boolean-algebra', label: '2. Boolean Algebra & Logic Gates', path: '/courses/cng232-logic-design/boolean-algebra' },
  { id: 'boolean-and-kmap', label: '3. Boolean Algebra & K-Maps', path: '/courses/cng232-logic-design/boolean-and-kmap' },
  { id: 'combinational-circuits', label: '4. Combinational Circuits', path: '/courses/cng232-logic-design/combinational-circuits' },
  { id: 'sequential-circuits', label: '5. Sequential Circuits', path: '/courses/cng232-logic-design/sequential-circuits' },
  { id: 'registers-counters', label: '6. Registers & Counters', path: '/courses/cng232-logic-design/registers-counters' },
  { id: 'fsms-datapaths', label: '8. FSMs & Datapaths', path: '/courses/cng232-logic-design/fsms-datapaths' },
  { id: 'asynchronous-circuits', label: '9. Asynchronous Circuits', path: '/courses/cng232-logic-design/asynchronous-circuits' },
  { id: 'exam-questions', label: '📝 Sınav Soruları (Exams)', path: '/courses/cng232-logic-design/exam-questions' },
];

export default function CNG232Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#F9FAF9] font-sans flex flex-col">
      {/* Sticky Header with Navigation Pills */}
      <div className="sticky top-0 z-50 bg-[#F9FAF9]/80 backdrop-blur-md border-b border-slate-200 shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Link href="/" className="p-1.5 -ml-1.5 text-slate-400 hover:text-[#235347] transition-colors rounded-lg hover:bg-slate-100 flex items-center justify-center group" title="Ana Menüye Dön">
                <svg className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              </Link>
              <h1 className="text-xl font-extrabold text-[#051F20]">CNG 232: Logic Design</h1>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {TOPICS.map((topic) => {
                const isActive = pathname.startsWith(topic.path);
                return (
                  <Link
                    key={topic.id}
                    href={topic.path}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-[#235347] text-white shadow-sm ring-2 ring-[#235347]/20'
                        : 'bg-white text-[#051F20] border border-slate-200 hover:bg-[#DAF1DE]'
                    }`}
                  >
                    {topic.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 w-full relative">
        <div className="relative z-10 w-full h-full mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
