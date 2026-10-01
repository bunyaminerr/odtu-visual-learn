export interface Vector3D {
  x: number;
  y: number;
  z: number;
}

export interface PointCharge {
  id: string;
  position: Vector3D;
  charge: number; // in Coulombs (C)
}

export type ContinuousChargeType = 'ring' | 'line';

export interface ContinuousCharge {
  id: string;
  type: ContinuousChargeType;
  position: Vector3D; // Center of the ring or line
  totalCharge: number; // in Coulombs (C)
  // For 'ring' it is radius, for 'line' it is length
  dimension: number; // in meters (m)
  axis: 'x' | 'y' | 'z'; // The axis along which the ring normal or line lies
}

export interface ElectricFieldState {
  pointCharges: PointCharge[];
  continuousCharges: ContinuousCharge[];
}
