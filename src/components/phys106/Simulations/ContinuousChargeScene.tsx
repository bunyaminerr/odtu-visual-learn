'use client';
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Torus, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { calcRingEFieldZ } from '@/lib/algorithms/electricFieldCalc';

interface Props {
  chargeQ: number;
  radius: number; 
  distanceZ: number; 
}

export default function ContinuousChargeScene({ chargeQ, radius, distanceZ }: Props) {
  const eFieldMag = calcRingEFieldZ(chargeQ, radius, distanceZ);
  
  const point = new THREE.Vector3(0, 0, distanceZ);
  // Elektrik alan yönü yükün işaretine ve mesafeye göre değişir
  const dir = new THREE.Vector3(0, 0, Math.sign(eFieldMag * distanceZ) || 1);
  
  // Vektör boyutunu görselleştirmek için ölçekliyoruz
  const arrowLen = Math.min(Math.abs(eFieldMag) * 1e-2, 4);

  return (
    <div className="w-full h-[500px] bg-[#F2F7F4] rounded-xl overflow-hidden border border-slate-200 shadow-sm relative">
      <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
        <color attach="background" args={['#F2F7F4']} />
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} />
        <OrbitControls makeDefault enableDamping />

        <gridHelper args={[10, 10, '#cbd5e1', '#e2e8f0']} rotation={[Math.PI/2, 0, 0]} />

        {/* Yüklü Halka Çizimi */}
        <Torus args={[radius, 0.1, 32, 100]} rotation={[0, 0, 0]}>
          <meshStandardMaterial 
            color={chargeQ > 0 ? '#ef4444' : '#3b82f6'} 
            emissive={chargeQ > 0 ? '#ef4444' : '#3b82f6'}
            emissiveIntensity={0.2}
          />
        </Torus>

        {/* Test Noktası (Turuncu: #f59e0b) */}
        <Sphere args={[0.15, 32, 32]} position={point}>
           <meshStandardMaterial color="#f59e0b" />
        </Sphere>
        
        {/* Elektrik Alan Vektörü (#ef4444) */}
        {Math.abs(eFieldMag) > 0.001 && (
          <arrowHelper 
            args={[
              dir, point, arrowLen, 0xef4444, 
              Math.min(0.4, arrowLen * 0.3), Math.min(0.2, arrowLen * 0.2)
            ]} 
          />
        )}
      </Canvas>
      <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur px-3 py-2 rounded shadow text-sm font-medium text-slate-700">
        Halka Ekseni Alanı (Z)
      </div>
    </div>
  );
}
