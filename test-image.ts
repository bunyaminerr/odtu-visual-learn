import { parseSystemOfEquations } from './src/lib/algorithms/equationParser';
import { solveGaussJordan } from './src/lib/algorithms/matrixSolver';

const input = "3x+2y+z=2\n4x+2y+2z=8\nx-y+z=4";
console.log('Testing:', input);

const parsed = parseSystemOfEquations(input);
const solved = solveGaussJordan(parsed.matrix, 'REF');
const finalMat = solved.steps[solved.steps.length - 1].matrix;

console.log("REF Matrix:");
finalMat.forEach((row: any) => console.log(row.join('\t')));
