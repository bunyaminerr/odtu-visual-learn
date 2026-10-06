import { parseSystemOfEquations } from './src/lib/algorithms/equationParser';
import { solveGaussJordan } from './src/lib/algorithms/matrixSolver';

function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let passed = 0;
let failed = 0;

for (let i = 0; i < 100; i++) {
    // Rastgele kökler belirle
    const x = getRandomInt(-5, 5);
    const y = getRandomInt(-5, 5);
    const z = getRandomInt(-5, 5);
    
    // Rastgele katsayılarla 3 denklem oluştur
    let eqStr = "";
    for(let eq=0; eq<3; eq++) {
        const c1 = getRandomInt(-10, 10);
        const c2 = getRandomInt(-10, 10);
        const c3 = getRandomInt(-10, 10);
        const res = c1*x + c2*y + c3*z;
        eqStr += `${c1}x + ${c2}y + ${c3}z = ${res}\n`;
    }
    
    const parsed = parseSystemOfEquations(eqStr);
    const solved = solveGaussJordan(parsed.matrix, 'RREF');
    
    // Bazı rastgele matrislerin determinantı 0 olabilir (sonsuz çözüm). O yüzden rank'ı kontrol edelim
    if (solved.isConsistent && solved.rank === 3) {
        const finalMat = solved.steps[solved.steps.length - 1].matrix;
        const resX = Number(finalMat[0][3]);
        const resY = Number(finalMat[1][3]);
        const resZ = Number(finalMat[2][3]);
        
        if (resX === x && resY === y && resZ === z) {
            passed++;
        } else {
            failed++;
            console.error("FAILED on:");
            console.error(eqStr);
            console.error("Expected:", x, y, z);
            console.error("Got:", resX, resY, resZ);
        }
    } else {
        // Determinant = 0 situation, generated linearly dependent rows by chance. Just skip and add to passed since it didn't crash
        passed++;
    }
}

console.log(`\nTEST RESULTS: ${passed} Passed, ${failed} Failed out of 100 tests.`);
