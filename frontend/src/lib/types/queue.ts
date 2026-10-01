export const MIN_QUEUE_SIZE = 5;

// Array-based Circular Queue (Static or Dynamic Array)
export interface CngCircularQueue {
  capacity: number;
  front: number; // Front is 1 when empty
  rear: number;  // Rear is 0 when empty
  size: number;
  array: (number | string | null)[];
}

// Linked List-based Queue (Dynamic, with Dummy Head)
export interface CngQueueNode {
  id: string; // for React keys
  value: number | string | 'DUMMY';
  address: string;
  nextAddress: string | null;
  isTemp?: boolean; // For malloc highlight
  isTarget?: boolean; // For free highlight
}

export interface CngLinkedQueue {
  frontAddress: string | null; // Always points to Dummy Head
  rearAddress: string | null;  // Points to the last enqueued node
  size: number;
}

export type CngQueueImplementation = 'circular_array' | 'linked_list' | 'palindrome' | 'robot_shop';

export type QueueOpType = 'enqueue' | 'dequeue';

// Frame structure for step-by-step animation
export interface CngQueueFrame {
  stepIndex: number;
  circularQueue?: CngCircularQueue; // For tab 1
  linkedNodes?: CngQueueNode[]; // For tab 2
  linkedRecord?: CngLinkedQueue;
  pointers?: {
    tmp: string | null;
    removeNode: string | null;
  };
  explanation: string;
  activeLineIndex: number;
  cCode?: string; 
}

// Robot Shop Simulation Types
export interface Customer {
  id: number;
  arrivalTime: number;
  serviceTime: number;
  startServiceTime?: number;
}

export interface RobotState {
  status: 'FREE' | 'BUSY';
  servingCustomer?: Customer;
  busyUntilTime?: number;
}

export interface RobotShopState {
  currentTime: number;
  queue: Customer[];
  robot: RobotState;
  servedCustomers: Customer[];
  totalWaitingTime: number;
  isFinished: boolean;
}
