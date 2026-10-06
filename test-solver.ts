import { solveGaussJordan } from './src/lib/algorithms/matrixSolver';

const testCases = [
    {
        name: "Test 21: Hilbert Matrix (Ill-conditioned, notorious for precision loss) 4x5",
        matrix: [
            ["1", "1/2", "1/3", "1/4", "1"],
            ["1/2", "1/3", "1/4", "1/5", "2"],
            ["1/3", "1/4", "1/5", "1/6", "3"],
            ["1/4", "1/5", "1/6", "1/7", "4"]
        ]
    },
    {
        name: "Test 22: Massive Primes and Complex Dependencies (5x6)",
        matrix: [
            ["17", "23", "5", "71", "-13", "101"],
            ["2", "-11", "89", "3", "7", "-5"],
            ["19", "12", "94", "74", "-6", "96"], // Row 1 + Row 2
            ["15", "34", "-84", "68", "-20", "106"], // Row 1 - Row 2
            ["34", "46", "10", "142", "-26", "202"] // 2 * Row 1
        ]
    },
    {
        name: "Test 23: The Nightmare Matrix (6x7 with massive fractions)",
        matrix: [
            ["1/11", "2/13", "-4/17", "5/19", "-1/3", "7/5", "1"],
            ["-5/7", "3/2", "1/5", "-7/3", "4/9", "1/8", "0"],
            ["1", "2", "3", "4", "5", "6", "7"],
            ["-1", "-2", "-3", "-4", "-5", "-6", "-7"],
            ["0", "1", "0", "1", "0", "1", "0"],
            ["1", "3", "3", "5", "5", "7", "7"] // Row 3 + Row 5
        ]
    }
];

async function run() {
    for (const t of testCases) {
        console.log("=======================================");
        console.log("Running: " + t.name);
        try {
            console.log("--- REF ---");
            const refRes = solveGaussJordan(t.matrix, "REF");
            const lastRef = refRes.steps[refRes.steps.length - 1].matrix;
            lastRef.forEach((row: string[]) => console.log(row.join("\t")));
            console.log("Consistent:", refRes.isConsistent, "| Rank:", refRes.rank);

            console.log("\n--- RREF ---");
            const rrefRes = solveGaussJordan(t.matrix, "RREF");
            const lastRref = rrefRes.steps[rrefRes.steps.length - 1].matrix;
            lastRref.forEach((row: string[]) => console.log(row.join("\t")));
            console.log("Consistent:", rrefRes.isConsistent, "| Rank:", rrefRes.rank);

        } catch (e: any) {
            console.error("ERROR in " + t.name + ":", e.message);
        }
    }
}

run();
