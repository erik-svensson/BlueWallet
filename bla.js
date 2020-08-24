const { random, range, sortBy, findIndex, cloneDeep, orderBy } = require('lodash');

const utxoTest = [
  { value: 0.31, id: 4 },
  { value: 2.3, id: 1 },
  { value: 0.00002, id: 2 },
  { value: 0.342, id: 3 },
  { value: 0.042, id: 5 },
  { value: 0.4322, id: 6 },
  { value: 0.02432, id: 7 },
  { value: 0.0024324, id: 8 },
];

const amTest = 0.054385;

const removeNotNeededUtxos = ({ utxos, negativeAmount }) => {
  const start = utxos.length - 1;
  let nA = negativeAmount;
  let newUtxos = cloneDeep(utxos);

  for (let i = start; i >= 0; i--) {
    const utxo = utxos[i];
    if (utxo.value <= -nA) {
      nA += utxo.value;
      newUtxos = [...newUtxos.slice(0, i), ...newUtxos.slice(i + 1)];
    }
  }
  return { utxos: newUtxos, negativeAmount: nA };
};

const getUtxoWithMinimumRest = (utxos, amount) => {
  const REPS = 100;
  const sortedUtxos = sortBy(utxos, 'value');

  const initSolution = { utxos: [], negativeAmount: null };

  let firstSolution = cloneDeep(initSolution);

  let am = amount;
  for (let i = 0; i < sortedUtxos.length; i++) {
    const ux = sortedUtxos[i];
    am -= ux.value;

    firstSolution.utxos.push(ux);

    if (am <= 0) {
      break;
    }
  }

  if (am > 0) {
    return null;
  }

  firstSolution.negativeAmount = am;

  if (firstSolution.negativeAmount === 0) {
    return firstSolution;
  }
  firstSolution = removeNotNeededUtxos(firstSolution);

  const upperTreshold = utxos.length - 1;
  const solutions = range(REPS).map(() => cloneDeep(initSolution));

  for (let i = 0; i < REPS; i++) {
    let a = amount;

    while (a > 0) {
      const randomIndex = random(0, upperTreshold);
      const u = utxos[randomIndex];
      if (findIndex(solutions[i].utxos, u) !== -1) {
        continue;
      }
      a -= u.value;
      solutions[i].utxos.push(u);
      if (a > 0) {
        solutions[i] = removeNotNeededUtxos(solutions[i]);
      }
    }
    solutions[i].negativeAmount = a;
    if (a === 0) {
      return solutions[i].utxos;
    }
  }

  const [bestSolution] = orderBy([...solutions, firstSolution], ['negativeAmount'], ['desc']);

  return bestSolution.utxos;
};

// const res = findIndex(
//   [
//     { value: 0.0024324, id: 8 },
//     { value: 0.042, id: 5 },
//     { value: 0.00002, id: 2 },
//     { value: 0.0024324, id: 8 },
//     { value: 2.3, id: 1 },
//   ],
//   { value: 2.3, id: 1 },
// );
const res = getUtxoWithMinimumRest(utxoTest, amTest);
console.log('res', res);
// const test = (utxs, am) => {
//   const solutions = [];
//   for (let i = 0; i < utxs.length; i++) {
//     solutions[i] = [];
//     solutions[i][0] = 0;
//   }
//   for (let j = 0; j <= am; j++) {
//     solutions[0][j] = 0;
//   }

//   for (let i = 0; i < utxs.length; i++) {
//     for (let j = 0; j <= am; j++) {
//       if (i == 0) {
//         solutions[i][0] = 0;
//       }

//       const newElVal = solutions[i - 1][j - utxs[i].value] + utxs[i].value;
//       if (solutions[i - 1][j] < newElVal) {
//         solutions[i][j] = newElVal;
//       } else {
//         solutions[i][j] = solutions[i - 1][j];
//       }

//       // solutions[i][j] = Math.max(solutions[i - 1][j], solutions[i - 1][j - utxs[i].value] + utxs[i].value);
//     }
//   }
//   console.log('solutions', solutions);
// };

// const test = (utxs, K) => {
//   const N = utxs.length;
//   const wynik = [];
//   wynik[0] = [];
//   for (let a = 0; a <= K; a++) {
//     wynik[0][a] = 0;
//   }

//   for (let j = 1; j < N; j++) {
//     wynik[j] = [];
//     wynik[j][0] = 0;
//   }
//   console.log('wynik', wynik);

//   for (let p = 1; p <= N; p++) {
//     for (let a = 0; a <= K; a++) {
//       wynik[p][a] = wynik[p - 1][a];
//       if (a >= 1 && wynik[p][a - 1] > wynik[(p, a)]) {
//         wynik[p][a] = wynik[p][a - 1];
//       }

//       if (a >= utxo[p].value && wynik[p - 1][a - utxo[p].value] + 1 > wynik[p][a]) {
//         wynik[p][a] = wynik[p - 1][a - utxo[p].value] + 1;
//       }
//     }
//   }

//   // for (let i = 1; i < utxs.length; i++) {
//   //   for (let j = 0; j < am; j++) {
//   //     console.log('j', j);
//   //     if (utxs[i].value > j) {
//   //       wynik[i][j] = wynik[i - 1][j];
//   //     } else {
//   //       console.log('utxs[i].value', utxs[i].value);

//   //       wynik[i][j] = Math.max(wynik[i - 1][j], wynik[i - 1][j - utxs[i].value] + 1);
//   //     }
//   //   }
//   // }
//   //   for a := 0 to K do
//   //     wynik[0, a] := 0;
//   // for p := 1 to N do
//   //     for a := 0 to K do begin
//   // 	wynik[p, a] := wynik[p-1, a];
//   // 	if (a>=1) and (wynik[p, a-1]>wynik[p, a]) then
//   // 	    wynik[p, a] := wynik[p, a-1];
//   // 	if (a>=w[p]) and (wynik[p-1, a-w[p]]+c[p]>wynik[p, a]) then
//   // 	    wynik[p, a] := wynik[p-1, a-w[p]]+c[p];

//   console.log('solutions', wynik);
// };

// const test = (utxs, am) => {
//   const solutions = [];
//   for (let i = 0; i < utxs.length; i++) {
//     solutions[i] = [];
//     solutions[i][0] = 0;
//   }
//   for (let j = 0; j <= am; j++) {
//     solutions[0][j] = 0;
//   }

//   for (let i = 1; i < utxs.length; i++) {
//     for (let j = 0; j <= am; j++) {
//       console.log('j', j);
//       if (utxs[i].value > j) {
//         solutions[i][j] = solutions[i - 1][j];
//       } else {
//         console.log('utxs[i].value', utxs[i].value);
//         const newElVal = solutions[i - 1][j - utxs[i].value] + utxs[i].value;
//         if (solutions[i - 1][j] < newElVal) {
//           solutions[i][j] = newElVal;
//         } else {
//           solutions[i][j] = solutions[i - 1][j];
//         }

//         // solutions[i][j] = Math.max(solutions[i - 1][j], solutions[i - 1][j - utxs[i].value] + utxs[i].value);
//       }
//     }
//   }
//   console.log('solutions', solutions);
// };

// const test = (utxs, am) => {
//   const solutions = [];
//   for (let i = 0; i < am; i++) {
//     solutions[i] = 0;
//   }

//   for (let i = 0; i < am; i++) {
//     for (let j = 0; j < utxs.length; j++) {
//       console.log('utxs[j]', utxs[j]);
//       console.log('i', i);
//       if (utxs[j].value <= i) {
//         solutions[i] = Math.max(solutions[i], utxs[j].value);
//         console.log('MAX', solutions[i]);
//       }
//     }
//   }
//   console.log('solutions', solutions);
// };
// test(utxo, am);
