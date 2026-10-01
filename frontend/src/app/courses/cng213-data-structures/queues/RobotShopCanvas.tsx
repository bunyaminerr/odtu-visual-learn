import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RobotShopState, Customer } from '../../../../lib/types/queue';
import { runRobotSimulationStep } from '../../../../lib/algorithms/queueSimulator';

export const RobotShopCanvas = () => {
  const [state, setState] = useState<RobotShopState>({
    currentTime: 0,
    queue: [
      { id: 1, arrivalTime: 1, serviceTime: 3 },
      { id: 2, arrivalTime: 2, serviceTime: 5 },
      { id: 3, arrivalTime: 4, serviceTime: 2 },
      { id: 4, arrivalTime: 6, serviceTime: 4 },
    ],
    robot: { status: 'FREE' },
    servedCustomers: [],
    totalWaitingTime: 0,
    isFinished: false
  });

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && !state.isFinished) {
      interval = setInterval(() => {
        setState(prev => runRobotSimulationStep(prev));
      }, 1500); // 1.5s per simulation tick
    }
    return () => clearInterval(interval);
  }, [isPlaying, state.isFinished]);

  const resetSim = () => {
    setIsPlaying(false);
    setState({
      currentTime: 0,
      queue: [
        { id: 1, arrivalTime: 1, serviceTime: 3 },
        { id: 2, arrivalTime: 2, serviceTime: 5 },
        { id: 3, arrivalTime: 4, serviceTime: 2 },
        { id: 4, arrivalTime: 6, serviceTime: 4 },
      ],
      robot: { status: 'FREE' },
      servedCustomers: [],
      totalWaitingTime: 0,
      isFinished: false
    });
  };

  const avgWait = state.servedCustomers.length > 0 
    ? (state.totalWaitingTime / state.servedCustomers.length).toFixed(2)
    : "0.00";

  return (
    <div className="w-full h-full flex flex-col p-6">
      
      {/* Header & Controls */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            disabled={state.isFinished}
            className={`px-6 py-2 font-bold rounded-lg text-sm transition-colors ${
              isPlaying ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' : 'bg-[#235347] text-white hover:bg-[#1a3e35]'
            } disabled:opacity-50`}
          >
            {isPlaying ? 'Durdur' : 'Başlat (Play)'}
          </button>
          <button onClick={resetSim} className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-lg text-sm hover:bg-slate-200">
            Sıfırla
          </button>
        </div>
        
        <div className="flex items-center gap-8">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-black text-slate-700 font-mono">{state.currentTime}</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Zaman (T)</span>
          </div>
          <div className="w-px h-8 bg-slate-200"></div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-black text-emerald-600 font-mono">{avgWait}</span>
            <span className="text-[10px] font-bold text-emerald-600/70 uppercase">Ort. Bekleme Süresi</span>
          </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-3 gap-6">
        
        {/* Left: Queue (Customers Waiting) */}
        <div className="col-span-1 bg-white border border-slate-200 rounded-xl shadow-sm p-6 flex flex-col items-center overflow-hidden relative">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-6">Müşteri Kuyruğu</h3>
          
          <div className="flex-1 w-full border-r-4 border-l-4 border-blue-200 bg-slate-50 rounded-lg p-4 flex flex-col justify-end gap-3">
            <AnimatePresence>
              {state.queue.map((customer) => {
                const isActive = state.currentTime >= customer.arrivalTime;
                if (!isActive) return null; // Customer hasn't arrived yet
                
                return (
                  <motion.div
                    key={customer.id}
                    initial={{ opacity: 0, y: -20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 100, scale: 0.5 }}
                    layout
                    className="w-full bg-blue-50 border-2 border-blue-300 rounded-xl p-3 flex justify-between items-center shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-black text-blue-800 border-2 border-blue-200">
                        #{customer.id}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-500">Müşteri</span>
                        <span className="text-sm font-mono text-blue-700">Bekliyor...</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[10px] font-bold text-slate-400 bg-white px-2 rounded border border-slate-200">Arv: {customer.arrivalTime}</span>
                      <span className="text-[10px] font-bold text-slate-400 bg-white px-2 rounded border border-slate-200">Srv: {customer.serviceTime}</span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Center: Robot Station */}
        <div className="col-span-1 bg-white border border-slate-200 rounded-xl shadow-sm p-6 flex flex-col items-center justify-center relative">
          <h3 className="absolute top-6 text-sm font-bold text-slate-500 uppercase tracking-wide">Robot (Kasiyer)</h3>
          
          <div className={`w-48 h-48 rounded-2xl border-4 flex flex-col items-center justify-center transition-all shadow-lg
            ${state.robot.status === 'BUSY' ? 'bg-amber-50 border-amber-400 shadow-[0_0_30px_rgba(251,191,36,0.3)]' : 'bg-emerald-50 border-emerald-400 shadow-[0_0_30px_rgba(52,211,153,0.3)]'}
          `}>
            
            <div className="text-6xl mb-4">
              {state.robot.status === 'BUSY' ? '⚙️' : '🤖'}
            </div>
            
            <div className={`px-4 py-1 rounded-full text-sm font-black tracking-widest
              ${state.robot.status === 'BUSY' ? 'bg-amber-200 text-amber-800' : 'bg-emerald-200 text-emerald-800'}
            `}>
              {state.robot.status}
            </div>

            {state.robot.servingCustomer && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 flex flex-col items-center"
              >
                <div className="text-xs font-bold text-amber-700">Serving #{state.robot.servingCustomer.id}</div>
                <div className="w-32 h-2 bg-amber-200 rounded-full mt-2 overflow-hidden relative">
                  <motion.div 
                    className="absolute top-0 left-0 h-full bg-amber-500"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: (state.robot.servingCustomer.serviceTime * 1.5), ease: "linear" }}
                  />
                </div>
              </motion.div>
            )}

          </div>

          {state.isFinished && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute bottom-10 bg-emerald-100 border-2 border-emerald-500 text-emerald-800 font-bold px-6 py-3 rounded-xl shadow-xl flex items-center gap-3"
            >
              <span>🎉 Simülasyon Bitti!</span>
            </motion.div>
          )}

        </div>

        {/* Right: Served Log */}
        <div className="col-span-1 bg-white border border-slate-200 rounded-xl shadow-sm p-6 flex flex-col overflow-hidden relative">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-6">Hizmet Verilenler</h3>
          
          <div className="flex-1 overflow-auto flex flex-col gap-3 pr-2">
            <AnimatePresence>
              {state.servedCustomers.map((customer) => (
                <motion.div
                  key={customer.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 flex flex-col gap-2"
                >
                  <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                    <span className="font-black text-slate-700">Müşteri #{customer.id}</span>
                    <span className="text-xs font-bold bg-emerald-100 text-emerald-700 px-2 rounded">BİTTİ</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono font-bold text-slate-500">
                    <div>Gelme (Arv): <span className="text-slate-800">{customer.arrivalTime}</span></div>
                    <div>Servis (Srv): <span className="text-slate-800">{customer.serviceTime}</span></div>
                    <div>Başlama: <span className="text-slate-800">{customer.startServiceTime}</span></div>
                    <div>Bekleme (Wait): <span className="text-red-500">{customer.startServiceTime! - customer.arrivalTime} sn</span></div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
};
