import { random, range, sortBy } from 'lodash';

import { Utxo } from 'app/consts';

import { getElementsByIndexs } from '../utils/array';

interface Solution {
  indexes: number[];
  negativeAmount: number;
}

export const getUtxoWithMinimumRest = (utxos: Utxo[], amount: number) => {
  const TRIALS = 100;
  const upperTreshold = utxos.length - 1;
  const solutions: Solution[] = range(TRIALS).map(() => ({ indexes: [], negativeAmount: 0 }));

  for (let i = 0; i < TRIALS; i++) {
    let a = amount;

    while (a > 0) {
      const randomIndex = random(0, upperTreshold);
      if (solutions[i].indexes.includes(randomIndex)) {
        continue;
      }
      a -= utxos[randomIndex].value;
      solutions[i].indexes.push(randomIndex);
    }
    solutions[i].negativeAmount = a;
    if (a === 0) {
      return getElementsByIndexs(utxos, solutions[i].indexes);
    }
  }
  const [bestSolution] = sortBy(solutions, 'negativeAmount');

  return getElementsByIndexs(utxos, bestSolution.indexes);
};
