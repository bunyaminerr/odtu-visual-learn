'use client';
import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { PointCharge } from '@/lib/types/cng106ElectricFields';
import { calcTotalEField } from '@/lib/algorithms/electricFieldCalc';

interface Props {
  charges: PointCharge[];
}

export default function PointChargesScene({ charges }: Props) {
  // Elektrik alan vektörlerini göstermek için uzayda 3 boyutlu bir grid oluşturuyoruz.
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const gridSize = 4;
    const spacing = 1.5;
    for(let x = -gridSize; x <= gridSize; x += spacing) {
      for(let y = -gridSize; y <= gridSize; y += spacing) {
        for(let z = -gridSize; z <= gridSize; z += spacing) {
          if (x === 0 && y === 0 && z === 0) continue;
          pts.push(new THREE.Vector3(x, y, z));
        }
      }
    }
    return pts;
  }, []);

  return (
    <div className="w-full h-[500px] bg-[#F2F7F4] rounded-xl overflow-hidden border border-slate-200 shadow-sm relative">
      <Canvas camera={{ position: [6, 6, 6], fov: 45 }}>
        <color attach="background" args={['#F2F7F4']} />
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} />
        <OrbitControls makeDefault enableDamping dampingFactor={0.05} />
        
        <gridHelper args={[10, 10, '#cbd5e1', '#e2e8f0']} />

        {/* Yükleri Çiz (Kırmızı: Artı, Mavi: Eksi) */}
        {charges.map((c) => (
          <Sphere key={c.id} args={[0.3, 32, 32]} position={c.position}>
            <meshStandardMaterial 
              color={c.charge > 0 ? '#ef4444' : '#3b82f6'} 
              emissive={c.charge > 0 ? '#ef4444' : '#3b82f6'}
              emissiveIntensity={0.2}
            />
          </Sphere>
        ))}

        {/* Vektörel Elektrik Alanını Çiz */}
        {points.map((p, idx) => {
          const eFieldArr = calcTotalEField(charges, [p.x, p.y, p.z]);
          const eVector = new THREE.Vector3(...eFieldArr);
          const length = eVector.length();
          
          if (length < 1e-7) return null; // Çok küçükse çizme
          
          // Görüntünün ekrana sığması için vektör uzunluğunu logaritmik ölçekliyoruz
          const arrowLen = Math.min(Math.log10(length + 1) * 0.4, 1.2);
          const dir = eVector.normalize();
          
          // Kurallar gereği Elektrik Alan Vektörü Rengi: #ef4444
          return (
            <arrowHelper 
              key={idx}
              args={[
                dir, p, arrowLen, 0xef4444, 
                Math.min(0.2, arrowLen * 0.3), Math.min(0.2, arrowLen * 0.3)
              ]} 
            />
          );
        })}
      </Canvas>
      <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur px-3 py-2 rounded shadow text-sm font-medium text-slate-700">
        Etkileşimli 3D Alan (Sol Tık: Döndür, Sağ Tık: Kaydır)
      </div>
    </div>
  );
}
