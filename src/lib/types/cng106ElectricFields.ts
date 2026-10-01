export type Vector3D = [number, number, number];

export interface PointCharge {
  id: string;
  position: Vector3D;
  charge: number; // Yük miktarı (Coulomb)
}

export type ContinuousChargeType = 'ring' | 'rod';

export interface ContinuousCharge {
  type: ContinuousChargeType;
  totalCharge: number; // Q (Toplam Yük)
  radius?: number;     // Halka (Ring) için yarıçap
  length?: number;     // Çubuk (Rod) için uzunluk
  position: Vector3D;  // Merkez konumu
}

export interface SimulationState {
  pointCharges: PointCharge[];
  continuousCharge: ContinuousCharge | null;
  epsilonBuffer: number;
}
