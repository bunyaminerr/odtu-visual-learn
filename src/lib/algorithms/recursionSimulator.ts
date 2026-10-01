import { RecursionNode, RecursionEvent, RecursionSimulationResult } from '../types/cng223Recursion';

export type AlgorithmType = 'fibonacci' | 'factorial';

export function simulateRecursion(algorithm: AlgorithmType, input: number): RecursionSimulationResult {
  const events: RecursionEvent[] = [];
  let stepCounter = 1;
  let idCounter = 1;

  function runFibonacci(n: number, depth: number): { value: number, node: RecursionNode } {
    const nodeId = `fib_${idCounter++}`;
    const node: RecursionNode = {
      id: nodeId,
      name: 'Fib',
      args: [n],
      status: 'pending', // Will be mutated by UI player, but tree holds final structure
      children: [],
      depth
    };

    events.push({
      step: stepCounter++,
      type: 'CALL',
      nodeId,
      name: 'Fib',
      args: [n],
      message: `Fib(${n}) çağrıldı.`
    });

    let result: number;
    if (n === 0) {
      result = 0;
      events.push({ step: stepCounter++, type: 'RETURN', nodeId, name: 'Fib', args: [n], returnValue: result, message: `Fib(0) temel durumuna (Base Case) ulaşıldı. Döndürülen: 0` });
    } else if (n === 1) {
      result = 1;
      events.push({ step: stepCounter++, type: 'RETURN', nodeId, name: 'Fib', args: [n], returnValue: result, message: `Fib(1) temel durumuna (Base Case) ulaşıldı. Döndürülen: 1` });
    } else {
      const left = runFibonacci(n - 1, depth + 1);
      node.children.push(left.node);
      
      const right = runFibonacci(n - 2, depth + 1);
      node.children.push(right.node);
      
      result = left.value + right.value;
      events.push({ 
        step: stepCounter++, 
        type: 'RETURN', 
        nodeId, 
        name: 'Fib', 
        args: [n], 
        returnValue: result, 
        message: `Fib(${n}) hesaplandı: ${left.value} + ${right.value} = ${result}. Geri dönülüyor (Backtrack).` 
      });
    }

    node.returnValue = result;
    node.status = 'completed';
    return { value: result, node };
  }

  function runFactorial(n: number, depth: number): { value: number, node: RecursionNode } {
    const nodeId = `fact_${idCounter++}`;
    const node: RecursionNode = {
      id: nodeId,
      name: 'Fact',
      args: [n],
      status: 'pending',
      children: [],
      depth
    };

    events.push({
      step: stepCounter++,
      type: 'CALL',
      nodeId,
      name: 'Fact',
      args: [n],
      message: `Fact(${n}) çağrıldı.`
    });

    let result: number;
    if (n === 0 || n === 1) {
      result = 1;
      events.push({ step: stepCounter++, type: 'RETURN', nodeId, name: 'Fact', args: [n], returnValue: result, message: `Fact(${n}) temel durumuna (Base Case) ulaşıldı. Döndürülen: 1` });
    } else {
      const sub = runFactorial(n - 1, depth + 1);
      node.children.push(sub.node);
      
      result = n * sub.value;
      events.push({ 
        step: stepCounter++, 
        type: 'RETURN', 
        nodeId, 
        name: 'Fact', 
        args: [n], 
        returnValue: result, 
        message: `Fact(${n}) hesaplandı: ${n} * ${sub.value} = ${result}. Geri dönülüyor (Backtrack).` 
      });
    }

    node.returnValue = result;
    node.status = 'completed';
    return { value: result, node };
  }

  let finalRes;
  if (algorithm === 'fibonacci') {
    finalRes = runFibonacci(input, 0);
  } else {
    finalRes = runFactorial(input, 0);
  }

  return {
    root: finalRes.node,
    events,
    finalResult: finalRes.value
  };
}
