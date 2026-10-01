export type RecursionStatus = 'pending' | 'running' | 'completed';

export interface RecursionNode {
  id: string;
  name: string;
  args: number[];
  status: RecursionStatus;
  returnValue?: number;
  children: RecursionNode[];
  depth: number;
}

export type RecursionEventType = 'CALL' | 'RETURN';

export interface RecursionEvent {
  step: number;
  type: RecursionEventType;
  nodeId: string;
  name: string;
  args: number[];
  returnValue?: number;
  message: string;
}

export interface RecursionSimulationResult {
  root: RecursionNode;
  events: RecursionEvent[];
  finalResult: number;
}
