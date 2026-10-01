'use client';

import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, Line, Torus } from '@react-three/drei';
import { ContinuousCharge, Vector3D } from '@/lib/types/cng106ElectricFields';
import { calculateContinuousChargeEField, VectorOps, CONSTANTS } from '@/lib/algorithms/cng106ElectricFields';

export default function ContinuousChargeSimulation() {
  const [chargeType, setChargeType] = useState<'ring' | 'line'>('ring');
  const [totalCharge, setTotalCharge] = useState<number>(1e-6); // 1 uC
  const [dimension, setDimension] = useState<number>(2); // radius or length
  const [testZ, setTestZ] = useState<number>(3);

  const continuousCharge: ContinuousCharge = {
    id: 'c1',
    type: chargeType,
    position: { x: 0, y: 0, z: 0 },
    totalCharge: totalCharge,
    dimension: dimension,
    axis: 'z',
  };

  const testPoint: Vector3D = { x: 0, y: 0, z: testZ };
  const eField = calculateContinuousChargeEField(testPoint, continuousCharge);
  const eMag = VectorOps.mag(eField);
  
  // Normalize and scale E-field arrow for visual purposes
  const dir = VectorOps.normalize(eField);
  // Logarithmic scaling to avoid giant arrows
  const arrowScale = Math.min(Math.log10(eMag + 1) * 0.2, 2.0);
  const arrowEnd = VectorOps.add(testPoint, VectorOps.scale(dir, arrowScale));

  const chargeColor = totalCharge > 0 ? "#ef4444" : "#3b82f6";
  const eFieldColor = "#ef4444"; // rule dictates red for E field

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 bg-white shadow-sm border border-slate-200 rounded-lg mt-6">
      <div className="flex-1 min-h-[400px] bg-[#F2F7F4] rounded-lg relative overflow-hidden border border-slate-200">
        <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <OrbitControls makeDefault />
          
          {/* Render Continuous Charge */}
          {chargeType === 'ring' ? (
            <Torus args={[dimension, 0.1, 16, 64]} rotation={[Math.PI / 2, 0, 0]}>
              <meshStandardMaterial color={chargeColor} />
            </Torus>
          ) : (
            <Line 
              points={[
                [0, 0, -dimension / 2],
                [0, 0, dimension / 2]
              ]} 
              color={chargeColor} 
              lineWidth={8} 
            />
          )}

          {/* Z Axis reference */}
          <Line points={[[0, 0, -10], [0, 0, 10]]} color="#94a3b8" lineWidth={1} dashed />

          {/* Test Point */}
          <Sphere args={[0.1, 16, 16]} position={[testPoint.x, testPoint.y, testPoint.z]}>
            <meshBasicMaterial color="#10b981" />
          </Sphere>

          {/* E-field Arrow at Test Point */}
          {eMag > 1e-9 && (
            <group>
              <Line
                points={[
                  [testPoint.x, testPoint.y, testPoint.z],
                  [arrowEnd.x, arrowEnd.y, arrowEnd.z]
                ]}
                color={eFieldColor}
                lineWidth={3}
              />
              <Sphere args={[0.08, 8, 8]} position={[arrowEnd.x, arrowEnd.y, arrowEnd.z]}>
                <meshBasicMaterial color={eFieldColor} />
              </Sphere>
            </group>
          )}

        </Canvas>
        <div className="absolute top-2 left-2 bg-white/80 p-2 rounded text-xs font-mono border border-slate-200">
          |E| = {eMag.toExponential(2)} N/C
        </div>
      </div>

      <div className="w-full md:w-64 flex flex-col gap-5">
        <h3 className="font-semibold text-slate-800">Kontroller</h3>
        
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-slate-700">Yük Dağılımı Tipi</label>
          <div className="flex gap-2">
            <button 
              onClick={() => setChargeType('ring')}
              className={`flex-1 py-1.5 rounded text-sm font-medium transition-colors border ${chargeType === 'ring' ? 'bg-[#235347] text-white border-[#235347]' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'}`}
            >
              Halka (Ring)
            </button>
            <button 
              onClick={() => setChargeType('line')}
              className={`flex-1 py-1.5 rounded text-sm font-medium transition-colors border ${chargeType === 'line' ? 'bg-[#235347] text-white border-[#235347]' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'}`}
            >
              Çubuk (Line)
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-slate-700 flex justify-between">
            <span>Toplam Yük (Q)</span>
            <span className="text-slate-500 font-mono">{(totalCharge * 1e6).toFixed(1)} μC</span>
          </label>
          <input 
            type="range" min="-10" max="10" step="0.5" 
            value={totalCharge * 1e6} 
            onChange={(e) => setTotalCharge(parseFloat(e.target.value) * 1e-6)}
            className="w-full accent-[#235347]"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-slate-700 flex justify-between">
            <span>{chargeType === 'ring' ? 'Yarıçap (R)' : 'Uzunluk (L)'}</span>
            <span className="text-slate-500 font-mono">{dimension.toFixed(1)} m</span>
          </label>
          <input 
            type="range" min="0.5" max="5" step="0.1" 
            value={dimension} 
            onChange={(e) => setDimension(parseFloat(e.target.value))}
            className="w-full accent-[#235347]"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-slate-700 flex justify-between">
            <span>Test Noktası (Z ekseni)</span>
            <span className="text-slate-500 font-mono">{testZ.toFixed(1)} m</span>
          </label>
          <input 
            type="range" min="-8" max="8" step="0.1" 
            value={testZ} 
            onChange={(e) => setTestZ(parseFloat(e.target.value))}
            className="w-full accent-[#10b981]"
          />
        </div>
      </div>
    </div>
  );
}
