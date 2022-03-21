const {randomInt} = require('crypto');
const {advices} = require('./BrainyAdvice.json');

const getAdvice = () => {
  // number of advices:
  const advicesLen = advices.length;
  const number = randomInt(advicesLen);
  const advice = advices[number];
  return advice;
};
module.exports = {
  getAdvice,
};

