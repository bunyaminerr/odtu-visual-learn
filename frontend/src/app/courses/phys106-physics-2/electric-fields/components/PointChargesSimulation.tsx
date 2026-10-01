'use client';

import React, { useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, Line } from '@react-three/drei';
import { PointCharge, Vector3D } from '@/lib/types/cng106ElectricFields';
import { calculatePointChargesEField, VectorOps, CONSTANTS } from '@/lib/algorithms/cng106ElectricFields';
import { Plus, Minus, Trash2 } from 'lucide-react';

const GRID_SIZE = 4;
const GRID_STEP = 2;

// An arrow component to represent the E-field vector
function EFieldArrow({ position, eField }: { position: Vector3D, eField: Vector3D }) {
  const mag = VectorOps.mag(eField);
  if (mag < 1e-9) return null; // Too small to show

  const maxLen = 1.0;
  // Non-linear scaling for better visualization (logarithmic or clamped)
  const scaledMag = Math.min(Math.log10(mag + 1) * 0.1, maxLen); 
  if (scaledMag < 0.05) return null;

  const dir = VectorOps.normalize(eField);
  const endPoint = VectorOps.add(position, VectorOps.scale(dir, scaledMag));

  // Red/Rose color for E-field as per rules
  return (
    <group>
      <Line
        points={[
          [position.x, position.y, position.z],
          [endPoint.x, endPoint.y, endPoint.z],
        ]}
        color="#ef4444" 
        lineWidth={2}
      />
      {/* Arrowhead (simple sphere at the end for now) */}
      <Sphere args={[0.05, 8, 8]} position={[endPoint.x, endPoint.y, endPoint.z]}>
        <meshBasicMaterial color="#ef4444" />
      </Sphere>
    </group>
  );
}

export default function PointChargesSimulation() {
  const [charges, setCharges] = useState<PointCharge[]>([
    { id: '1', position: { x: -2, y: 0, z: 0 }, charge: 1e-6 }, // +1 uC
    { id: '2', position: { x: 2, y: 0, z: 0 }, charge: -1e-6 }, // -1 uC
  ]);

  const addCharge = (sign: 1 | -1) => {
    const newCharge: PointCharge = {
      id: Math.random().toString(36).substring(7),
      position: { 
        x: (Math.random() - 0.5) * 4, 
        y: (Math.random() - 0.5) * 4, 
        z: (Math.random() - 0.5) * 4 
      },
      charge: sign * 1e-6
    };
    setCharges([...charges, newCharge]);
  };

  const removeCharge = (id: string) => {
    setCharges(charges.filter(c => c.id !== id));
  };

  // Generate grid points for E-field vectors
  const gridPoints = useMemo(() => {
    const pts: Vector3D[] = [];
    for (let x = -GRID_SIZE; x <= GRID_SIZE; x += GRID_STEP) {
      for (let y = -GRID_SIZE; y <= GRID_SIZE; y += GRID_STEP) {
        for (let z = -GRID_SIZE; z <= GRID_SIZE; z += GRID_STEP) {
          pts.push({ x, y, z });
        }
      }
    }
    return pts;
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 bg-white shadow-sm border border-slate-200 rounded-lg">
      <div className="flex-1 min-h-[400px] bg-[#F2F7F4] rounded-lg relative overflow-hidden border border-slate-200">
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <OrbitControls makeDefault />
          
          {/* Render Charges */}
          {charges.map(c => (
            <Sphere key={c.id} args={[0.3, 16, 16]} position={[c.position.x, c.position.y, c.position.z]}>
              <meshStandardMaterial color={c.charge > 0 ? "#ef4444" : "#3b82f6"} />
            </Sphere>
          ))}

          {/* Render E-field vectors */}
          {gridPoints.map((pt, idx) => {
            const eField = calculatePointChargesEField(pt, charges);
            return <EFieldArrow key={idx} position={pt} eField={eField} />;
          })}
        </Canvas>
      </div>

      <div className="w-full md:w-64 flex flex-col gap-4">
        <h3 className="font-semibold text-slate-800">Kontroller</h3>
        
        <div className="flex gap-2">
          <button 
            onClick={() => addCharge(1)}
            className="flex-1 bg-[#ef4444] text-white py-2 rounded-md hover:opacity-90 flex items-center justify-center gap-1 transition-opacity"
          >
            <Plus size={16} /> <span className="font-medium">+ Yük</span>
          </button>
          <button 
            onClick={() => addCharge(-1)}
            className="flex-1 bg-[#3b82f6] text-white py-2 rounded-md hover:opacity-90 flex items-center justify-center gap-1 transition-opacity"
          >
            <Minus size={16} /> <span className="font-medium">- Yük</span>
          </button>
        </div>

        <div className="flex flex-col gap-2 mt-4 max-h-[300px] overflow-y-auto pr-2">
          <h4 className="text-sm font-medium text-slate-500">Mevcut Yükler</h4>
          {charges.map(c => (
            <div key={c.id} className="flex justify-between items-center bg-slate-50 p-2 rounded border border-slate-100">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${c.charge > 0 ? 'bg-[#ef4444]' : 'bg-[#3b82f6]'}`} />
                <span className="text-xs text-slate-600 font-mono">
                  {c.charge > 0 ? '+' : '-'}1 μC ({c.position.x.toFixed(1)}, {c.position.y.toFixed(1)}, {c.position.z.toFixed(1)})
                </span>
              </div>
              <button onClick={() => removeCharge(c.id)} className="text-slate-400 hover:text-red-500 transition-colors">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
