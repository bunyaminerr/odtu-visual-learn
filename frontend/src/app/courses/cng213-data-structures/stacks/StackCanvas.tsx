import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CngStackFrame, CngStackImplementation, EMPTY_TOS } from '../../../../lib/types/stack';

interface StackCanvasProps {
  frame: CngStackFrame;
  implementation: CngStackImplementation;
}

export const StackCanvas: React.FC<StackCanvasProps> = ({ frame, implementation }) => {
  const isArray = implementation === 'array';

  return (
    <div className="w-full h-full bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
          Bellek & Yığın Simülatörü (Trays Model)
        </h3>
        <div className="flex gap-4">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span className="w-2.5 h-2.5 bg-emerald-100 border border-emerald-300 rounded-full"></span>
            Tahsis (Malloc)
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span className="w-2.5 h-2.5 bg-red-100 border border-red-300 rounded-full"></span>
            Silme (Free)
          </div>
        </div>
      </div>

      <div className="flex-1 relative p-6 flex flex-col items-center justify-center bg-slate-50/50">
        
        {isArray && frame.arrayStack && (
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-4 border-2 border-slate-300 rounded-lg p-4 bg-white relative">
              {/* Array Cells */}
              <div className="flex flex-col-reverse gap-1 items-center">
                {frame.arrayStack.array.map((val, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <span className="text-xs text-slate-400 font-mono w-4 text-right">{idx}</span>
                    <motion.div
                      layout
                      className={`w-32 h-12 flex items-center justify-center rounded border-2 font-bold text-lg shadow-sm
                        ${val !== null ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-300'}
                      `}
                    >
                      {val !== null ? val : ''}
                    </motion.div>
                    
                    {/* Top Of Stack Pointer */}
                    <div className="w-32 relative h-12 flex items-center">
                      {idx === frame.arrayStack?.topOfStack && (
                        <motion.div 
                          layoutId="tos-pointer"
                          className="flex items-center text-[#235347] font-bold"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                        >
                          <svg className="w-6 h-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                          </svg>
                          TOS
                        </motion.div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Array Meta */}
            <div className="flex gap-8 text-sm font-mono bg-white px-6 py-3 rounded-lg border border-slate-200 shadow-sm">
              <div className="flex flex-col items-center">
                <span className="text-slate-500 text-xs">Capacity</span>
                <span className="font-bold text-slate-800">{frame.arrayStack.capacity}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-slate-500 text-xs">TopOfStack</span>
                <span className="font-bold text-[#235347]">{frame.arrayStack.topOfStack}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-slate-500 text-xs">Status</span>
                <span className={`font-bold ${frame.arrayStack.topOfStack === EMPTY_TOS ? 'text-red-600' : 'text-emerald-600'}`}>
                  {frame.arrayStack.topOfStack === EMPTY_TOS ? 'EMPTY' : (frame.arrayStack.topOfStack === frame.arrayStack.capacity - 1 ? 'FULL' : 'ACTIVE')}
                </span>
              </div>
            </div>
          </div>
        )}

        {!isArray && frame.linkedNodes && frame.linkedRecord && (
          <div className="flex flex-col items-center justify-start h-full min-w-[300px] mt-10">
            {/* LIFO Top Pointer */}
            <div className="flex items-center gap-2 mb-6">
              <span className="font-bold font-mono text-[#235347] bg-emerald-100 px-3 py-1 rounded-md border border-emerald-200">
                S-&gt;Next (Top)
              </span>
              <svg className="w-6 h-6 text-[#235347] rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>

            <div className="flex flex-col items-center">
              <AnimatePresence mode="popLayout">
                {(() => {
                  const ordered = [];
                  let curr = frame.linkedRecord.topAddress;
                  while (curr) {
                    const node = frame.linkedNodes.find(n => n.address === curr);
                    if (!node) break;
                    ordered.push(node);
                    curr = node.nextAddress;
                  }
                  
                  if (ordered.length === 0) {
                    return (
                      <motion.div 
                        key="empty-null"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-red-50 text-red-700 font-mono font-bold px-8 py-3 rounded-lg border border-red-200"
                      >
                        NULL
                      </motion.div>
                    );
                  }

                  return ordered.map((node, i) => (
                    <React.Fragment key={node.id}>
                      <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.8, y: -50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, x: 100 }}
                        className={`w-40 flex flex-col rounded-lg shadow-sm border-2 overflow-hidden bg-white
                          ${node.isTemp ? 'border-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.4)]' : 
                            node.isTarget ? 'border-red-400 shadow-[0_0_15px_rgba(248,113,113,0.4)]' : 'border-slate-300'
                          }
                        `}
                      >
                        <div className="bg-slate-100 border-b-2 border-slate-300 py-1 px-2 text-center text-[10px] text-slate-500 font-mono break-all">
                          {node.address}
                        </div>
                        <div className="py-4 text-center font-bold text-xl text-slate-800">
                          {node.value}
                        </div>
                        <div className="bg-slate-100 border-t-2 border-slate-300 py-1 px-2 text-center text-[10px] text-slate-500 font-mono break-all">
                          next: {node.nextAddress || 'NULL'}
                        </div>
                      </motion.div>
                      
                      <motion.div layout className="my-2 text-slate-300 flex items-center justify-center h-8">
                        {node.nextAddress ? (
                           <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                           </svg>
                        ) : (
                           <div className="bg-red-50 text-red-600 font-mono text-xs font-bold px-3 py-1 rounded border border-red-200">
                             NULL
                           </div>
                        )}
                      </motion.div>
                    </React.Fragment>
                  ));
                })()}
              </AnimatePresence>
            </div>
            
            {/* Floating Pointers visualization */}
            {frame.pointers?.tmp && (
              <motion.div 
                layoutId="tmp-pointer"
                className="absolute right-10 top-20 bg-emerald-50 border border-emerald-200 p-3 rounded-lg shadow-md flex items-center gap-2"
              >
                <span className="font-mono text-emerald-800 font-bold">TmpCell</span>
                <span className="text-xs text-emerald-600 bg-white px-2 py-1 rounded">allocating...</span>
              </motion.div>
            )}
            
          </div>
        )}
      </div>

    </div>
  );
};
