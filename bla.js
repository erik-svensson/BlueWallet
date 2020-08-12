const { compose, map, range, transform } = require('lodash/fp');

const res = compose(
  transform((result, value) => {
    result[`word${value}`] = '';
  }, {}),
  range(11),
)(-1);

console.log('res', res);

// {
//   word1: '',
//     word2: '',
// }
