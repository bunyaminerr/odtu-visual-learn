import { PointCharge, Vector3D } from '../types/cng106ElectricFields';

// Fiziksel Sabitler (SI Birimleri)
export const k_e = 8.9875517923e9; // Coulomb Sabiti (N·m²/C²)
export const epsilon_0 = 8.8541878128e-12; // Boşluğun elektriksel geçirgenliği (F/m)

// Simülasyonda 1/r^2 tekilliğinden (singularity) kaçınmak için epsilon payı
const EPSILON_BUFFER = 1e-4;

/**
 * Belirli bir noktadaki tek bir noktasal yükün elektrik alan vektörünü hesaplar.
 */
export function calcPointChargeEField(charge: PointCharge, point: Vector3D): Vector3D {
  const dx = point[0] - charge.position[0];
  const dy = point[1] - charge.position[1];
  const dz = point[2] - charge.position[2];
  
  // r^2 ve tekillikten kaçınmak için EPSILON_BUFFER ekliyoruz
  const r2 = dx * dx + dy * dy + dz * dz + EPSILON_BUFFER;
  
  const r = Math.sqrt(r2);
  const magnitude = (k_e * charge.charge) / r2;
  
  // Vektörün x, y, z bileşenlerine ayrılması
  return [
    magnitude * (dx / r),
    magnitude * (dy / r),
    magnitude * (dz / r)
  ];
}

/**
 * Süperpozisyon Prensibi: Uzaydaki tüm yüklerin elektrik alan vektörlerinin toplamı.
 */
export function calcTotalEField(charges: PointCharge[], point: Vector3D): Vector3D {
  return charges.reduce((acc, charge) => {
    const e = calcPointChargeEField(charge, point);
    return [acc[0] + e[0], acc[1] + e[1], acc[2] + e[2]];
  }, [0, 0, 0]);
}

/**
 * Analitik Çözüm: Z-ekseninde yüklü bir halkanın elektrik alan büyüklüğü (E_z).
 */
export function calcRingEFieldZ(Q: number, R: number, z: number): number {
  const r2 = R * R + z * z + EPSILON_BUFFER;
  const r = Math.sqrt(r2);
  return (k_e * Q * z) / Math.pow(r, 3);
}

/**
 * Analitik Çözüm: Merkezinden y uzaklıkta bir çubuğun elektrik alan büyüklüğü.
 */
export function calcRodEFieldY(Q: number, L: number, y: number): number {
  const y2 = y * y + EPSILON_BUFFER;
  const y_sqrt = Math.sqrt(y2);
  return (k_e * Q) / (y_sqrt * Math.sqrt(y2 + (L / 2) * (L / 2)));
}
