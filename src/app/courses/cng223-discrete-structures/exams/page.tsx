"use client";

import React, { useState } from 'react';
import { cng223ExamQuestions } from '@/lib/data/cng223Exams';
import { cng223AlgorithmDictionary, Cng223TopicType } from '@/lib/algorithms/cng223AlgorithmMetadata';
import 'katex/dist/katex.min.css';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default function ExamHubPage() {
  const [selectedTopic, setSelectedTopic] = useState<Cng223TopicType | 'all'>('all');
  const [openSolutions, setOpenSolutions] = useState<Record<string, boolean>>({});

  const toggleSolution = (id: string) => {
    setOpenSolutions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredQuestions = selectedTopic === 'all' 
    ? cng223ExamQuestions 
    : cng223ExamQuestions.filter(q => q.topic === selectedTopic);

  // Get unique topics that have questions
  const topicsWithQuestions = Array.from(new Set(cng223ExamQuestions.map(q => q.topic)));

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Hard': return 'bg-rose-100 text-rose-800 border-rose-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-16">
      
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Exam Hub: ODTÜ Çıkmış Sınav Soruları</h1>
        <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
          CNG 223 (CS2800) geçmiş yıllara ait final ve vize sınavı soruları. Konulara göre filtreleyebilir, önce soruyu kendiniz çözmeye çalışıp ardından detaylı ve tuzaklara karşı uyarılmış adım adım çözümleri inceleyebilirsiniz.
        </p>
      </div>

      {/* Filter Menu */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedTopic('all')}
          className={\`px-4 py-2 rounded-full text-sm font-semibold transition-colors \${selectedTopic === 'all' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}\`}
        >
          Tüm Sorular ({cng223ExamQuestions.length})
        </button>
        {topicsWithQuestions.map(topic => (
          <button
            key={topic}
            onClick={() => setSelectedTopic(topic)}
            className={\`px-4 py-2 rounded-full text-sm font-semibold transition-colors \${selectedTopic === topic ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}\`}
          >
            {cng223AlgorithmDictionary[topic].title}
          </button>
        ))}
      </div>

      {/* Question List */}
      <div className="space-y-6">
        {filteredQuestions.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            Bu konuya ait soru bulunamadı.
          </div>
        ) : (
          filteredQuestions.map((q, index) => (
            <div key={q.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              
              {/* Question Header */}
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                    Q{index + 1}
                  </span>
                  <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                    {cng223AlgorithmDictionary[q.topic].title}
                  </span>
                </div>
                <span className={\`px-3 py-1 rounded-full text-xs font-bold border \${getDifficultyColor(q.difficulty)}\`}>
                  {q.difficulty}
                </span>
              </div>

              {/* Question Body */}
              <div className="p-6">
                <div className="prose prose-slate max-w-none text-slate-800 font-medium">
                  <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                    {q.question}
                  </ReactMarkdown>
                </div>

                {/* Show/Hide Solution Button */}
                <button 
                  onClick={() => toggleSolution(q.id)}
                  className="mt-6 flex items-center gap-2 text-indigo-600 font-bold hover:text-indigo-800 transition-colors"
                >
                  <svg className={\`w-5 h-5 transition-transform duration-300 \${openSolutions[q.id] ? 'rotate-180' : ''}\`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  {openSolutions[q.id] ? 'Çözümü Gizle' : 'Çözümü Göster'}
                </button>

                {/* Solution Body (Collapsible) */}
                {openSolutions[q.id] && (
                  <div className="mt-6 pt-6 border-t border-slate-100 animate-in fade-in slide-in-from-top-2 duration-300">
                    
                    {q.pitfallWarning && (
                      <div className="mb-6 bg-rose-50 border-l-4 border-rose-500 p-4 rounded-r-lg">
                        <p className="text-rose-800 font-bold text-sm">{q.pitfallWarning}</p>
                      </div>
                    )}

                    <div className="prose prose-slate max-w-none prose-p:leading-relaxed prose-pre:bg-slate-50 prose-pre:text-slate-800">
                      <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                        {q.solution}
                      </ReactMarkdown>
                    </div>
                  </div>
                )}
              </div>
              
            </div>
          ))
        )}
      </div>

    </div>
  );
}
