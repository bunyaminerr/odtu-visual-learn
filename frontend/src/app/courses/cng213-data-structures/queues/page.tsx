"use client";

import React, { useState } from 'react';
import { TimeComplexityTable, ComplexityRow } from '../../../../components/visualizers/shared/TimeComplexityTable';
import { CngQueueImplementation } from '../../../../lib/types/queue';
import { CircularQueueCanvas } from './CircularQueueCanvas';
import { LinkedQueueCanvas } from './LinkedQueueCanvas';
import { PalindromeTestCanvas } from './PalindromeTestCanvas';
import { RobotShopCanvas } from './RobotShopCanvas';

export default function QueueADTPage() {
  const [activeTab, setActiveTab] = useState<CngQueueImplementation>('circular_array');

  return (
    <div className="flex flex-col h-full min-h-[85vh]">
      
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-extrabold text-[#051F20] tracking-tight mb-2">
          Queue (Kuyruk) ADT
        </h2>
        <p className="text-slate-600 max-w-4xl">
          CNG 213 (Data Structures) <strong>Worksheet 7a ve 7b</strong>'ye göre 
          Dairesel Dizi (Circular Array) ve Bağlı Liste (Linked List) tabanlı FIFO (First In First Out) bellek modelleri.
          Ayrıca Palindrom Testi ve Robot Servis Simülasyonu (Discrete-Event).
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 bg-white p-2 rounded-xl border border-slate-200 shadow-sm w-max">
        <button
          onClick={() => setActiveTab('circular_array')}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
            activeTab === 'circular_array' ? 'bg-[#235347] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          1. Circular Array
        </button>
        <button
          onClick={() => setActiveTab('linked_list')}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
            activeTab === 'linked_list' ? 'bg-[#235347] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          2. Linked List & Dummy
        </button>
        <button
          onClick={() => setActiveTab('palindrome')}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
            activeTab === 'palindrome' ? 'bg-[#235347] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          3. Palindrome (Stack+Queue)
        </button>
        <button
          onClick={() => setActiveTab('robot_shop')}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
            activeTab === 'robot_shop' ? 'bg-[#235347] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          4. Robot Shop Simülasyonu
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 w-full bg-[#F2F7F4] rounded-2xl border border-slate-200 shadow-inner overflow-hidden relative">
        {activeTab === 'circular_array' && <CircularQueueCanvas />}
        {activeTab === 'linked_list' && <LinkedQueueCanvas />}
        {activeTab === 'palindrome' && <PalindromeTestCanvas />}
        {activeTab === 'robot_shop' && <RobotShopCanvas />}
      </div>

      {/* Time Complexity Section */}
      <TimeComplexityTable rows={[
        { category: 'Döngüsel Dizi (Circular Array)', operation: 'Enqueue (Kuyruğa Ekle)', worst: 'O(1)', reason: 'Rear indeksi güncellenerek yazılır; mod aritmeği ile halka yapısı korunur.' },
        { category: 'Döngüsel Dizi (Circular Array)', operation: 'Dequeue (Kuyruktan Çıkar)', worst: 'O(1)', reason: 'Front indeksi güncellenir; kaydırma gerekmez (halkayı kullanır).' },
        { category: 'Döngüsel Dizi (Circular Array)', operation: 'Front / Rear Bak', worst: 'O(1)', reason: 'İndeks üzeri doğrudan dizi erişimi.' },
        { category: 'Döngüsel Dizi (Circular Array)', operation: 'Is Empty / Is Full', worst: 'O(1)', reason: 'Boyut veya indeks karşılaştırması sabittir.' },
        { category: 'Bağlı Liste Queue', operation: 'Enqueue (Kuyruğa Ekle)', worst: 'O(1)', reason: 'Tail pointer sayesinde sona doğrudan ekleme yapılır.' },
        { category: 'Bağlı Liste Queue', operation: 'Dequeue (Kuyruktan Çıkar)', worst: 'O(1)', reason: 'Head pointer güncellenerek baştaki eleman çıkarılır.' },
        { category: 'Bağlı Liste Queue', operation: 'Is Empty', worst: 'O(1)', reason: 'Head == NULL kontrolü sabittir.' },
        { category: 'Genel', operation: 'Alan Karmaşıklığı (Space)', worst: 'O(N)', reason: 'N eleman için N birimlik bellek.' },
      ] as ComplexityRow[]} />
    </div>
  );
}
