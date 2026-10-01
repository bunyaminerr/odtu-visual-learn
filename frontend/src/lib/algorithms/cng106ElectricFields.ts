import { Vector3D, PointCharge, ContinuousCharge } from '../types/cng106ElectricFields';

// Physics constants from rules-phys106.md
export const CONSTANTS = {
  k_e: 8.9875517923e9,
  epsilon_0: 8.8541878128e-12,
  e: 1.602176634e-19,
};

// Epsilon to prevent division by zero or infinite fields
const EPSILON = 1e-6;

export const VectorOps = {
  add: (v1: Vector3D, v2: Vector3D): Vector3D => ({
    x: v1.x + v2.x,
    y: v1.y + v2.y,
    z: v1.z + v2.z,
  }),
  sub: (v1: Vector3D, v2: Vector3D): Vector3D => ({
    x: v1.x - v2.x,
    y: v1.y - v2.y,
    z: v1.z - v2.z,
  }),
  scale: (v: Vector3D, scalar: number): Vector3D => ({
    x: v.x * scalar,
    y: v.y * scalar,
    z: v.z * scalar,
  }),
  mag: (v: Vector3D): number => Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z),
  normalize: (v: Vector3D): Vector3D => {
    const m = VectorOps.mag(v);
    if (m < EPSILON) return { x: 0, y: 0, z: 0 };
    return VectorOps.scale(v, 1 / m);
  },
};

/**
 * Calculates the electric field vector at a specific point due to an array of point charges.
 * E = k_e * sum(q_i / r_i^2 * r_hat_i)
 */
export function calculatePointChargesEField(
  testPoint: Vector3D,
  charges: PointCharge[]
): Vector3D {
  let eField: Vector3D = { x: 0, y: 0, z: 0 };

  for (const charge of charges) {
    const rVector = VectorOps.sub(testPoint, charge.position);
    const rMag = VectorOps.mag(rVector);
    
    // Prevent division by zero
    if (rMag < EPSILON) continue;

    const rHat = VectorOps.normalize(rVector);
    const eMag = (CONSTANTS.k_e * charge.charge) / (rMag * rMag);
    const eComponent = VectorOps.scale(rHat, eMag);
    
    eField = VectorOps.add(eField, eComponent);
  }

  return eField;
}

/**
 * Calculates the electric field of a continuous charge on the specified axis.
 * Note: For simplicity in 3D visualization, we assume the continuous charge is centered 
 * and symmetric, calculating field for a test point on its primary axis.
 */
export function calculateContinuousChargeEField(
  testPoint: Vector3D,
  charge: ContinuousCharge
): Vector3D {
  // We'll calculate the field assuming the ring/line is centered at origin and aligned with Z axis for analytical simplicity,
  // then translate/rotate if needed. For now, we will handle Z axis alignment.
  
  // Relative position of test point from the center of the continuous charge
  const rRel = VectorOps.sub(testPoint, charge.position);
  
  // Distance along the axis of symmetry (assuming Z axis for now)
  const z = rRel.z; 
  // Radial distance from axis
  const rRadial = Math.sqrt(rRel.x * rRel.x + rRel.y * rRel.y);
  
  let eFieldRel: Vector3D = { x: 0, y: 0, z: 0 };

  if (charge.type === 'ring') {
    // Electric field of a ring of charge along its central axis (z-axis)
    // E_z = (k_e * Q * z) / (z^2 + R^2)^(3/2)
    const R = charge.dimension;
    
    // On axis approximation
    if (rRadial < EPSILON) {
      const denominator = Math.pow(z * z + R * R, 1.5);
      const ez = (CONSTANTS.k_e * charge.totalCharge * z) / denominator;
      eFieldRel = { x: 0, y: 0, z: ez };
    } else {
      // Off-axis is complex (requires elliptic integrals), we approximate by decomposing into point charges for visual 
      // Or just return 0 for simplicity if user is only moving along Z.
      // We will do a discrete summation over the ring if it's off axis.
      const N = 36; // 36 point charges
      const dQ = charge.totalCharge / N;
      const dTheta = (2 * Math.PI) / N;
      
      let eTotal: Vector3D = { x: 0, y: 0, z: 0 };
      for (let i = 0; i < N; i++) {
        const theta = i * dTheta;
        const pRing: Vector3D = {
          x: R * Math.cos(theta),
          y: R * Math.sin(theta),
          z: 0
        };
        const rVector = VectorOps.sub(rRel, pRing);
        const rMag = Math.max(VectorOps.mag(rVector), EPSILON);
        const rHat = VectorOps.normalize(rVector);
        const eMag = (CONSTANTS.k_e * dQ) / (rMag * rMag);
        eTotal = VectorOps.add(eTotal, VectorOps.scale(rHat, eMag));
      }
      eFieldRel = eTotal;
    }
  } else if (charge.type === 'line') {
    // Electric field of a finite line charge of length L along Z axis
    // If the test point is on the z-axis (outside the line), it's straightforward.
    // E_z = k_e * Q / (z * (z^2 - (L/2)^2)) -- wait, exact formula depends on position.
    
    // Let's use discrete summation for the finite line charge to be robust everywhere in space.
    const L = charge.dimension;
    const N = 50;
    const dQ = charge.totalCharge / N;
    const dz = L / N;
    
    let eTotal: Vector3D = { x: 0, y: 0, z: 0 };
    for (let i = 0; i < N; i++) {
      // position from -L/2 to L/2
      const zPos = -L / 2 + (i + 0.5) * dz;
      const pLine: Vector3D = { x: 0, y: 0, z: zPos };
      
      const rVector = VectorOps.sub(rRel, pLine);
      const rMag = Math.max(VectorOps.mag(rVector), EPSILON);
      const rHat = VectorOps.normalize(rVector);
      const eMag = (CONSTANTS.k_e * dQ) / (rMag * rMag);
      eTotal = VectorOps.add(eTotal, VectorOps.scale(rHat, eMag));
    }
    eFieldRel = eTotal;
  }

  // If the charge axis is not Z, we'd need to rotate eFieldRel.
  // For this module, we assume continuous charges are aligned with Z-axis or we'll handle the axis property.
  if (charge.axis === 'x') {
    return { x: eFieldRel.z, y: eFieldRel.y, z: eFieldRel.x };
  } else if (charge.axis === 'y') {
    return { x: eFieldRel.x, y: eFieldRel.z, z: eFieldRel.y };
  }

  return eFieldRel;
}
