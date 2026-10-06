import { solveGaussJordan } from './src/lib/algorithms/matrixSolver';

const questions = [
  [
    ["3", "4", "5"],
    ["1", "-1", "2"],
    ["2", "3", "4"]
  ],
  [
    ["1", "-2", "3", "1"],
    ["2", "-4", "6", "3"],
    ["-1", "2", "-3", "-2"]
  ],
  [
    ["1", "2", "-1", "2", "2"],
    ["2", "4", "-2", "4", "4"],
    ["-1", "-2", "1", "-2", "-2"]
  ],
  [
    ["1", "1", "1", "6"],
    ["2", "-1", "1", "3"],
    ["1", "2", "-1", "2"]
  ],
  [
    ["2", "4", "-2", "0"],
    ["1", "2", "-1", "0"],
    ["3", "6", "-3", "0"]
  ],
  [
    ["12", "24", "-12", "36"],
    ["4", "10", "2", "20"],
    ["2", "3", "-4", "1"]
  ],
  [
    ["1", "2", "3", "1"],
    ["2", "5", "3", "0"],
    ["1", "3", "5", "0"]
  ],
  [
    ["0", "1", "1", "2"],
    ["1", "2", "3", "5"],
    ["3", "5", "7", "11"]
  ]
];

questions.forEach((q, idx) => {
  console.log(`\n--- Q${idx + 1} ---`);
  const res = solveGaussJordan(q, 'RREF');
  const mat = res.steps[res.steps.length - 1].matrix;
  mat.forEach((row: any) => console.log(row.join('\t')));
  console.log('Consistent:', res.isConsistent, '| Rank:', res.rank);
});
