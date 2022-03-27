const {randomInt} = require('crypto');
const {advices} = require('./BrainyAdvice.json');

const getAdvice = () => {
  // number of advices:
  const advicesLen = advices.length;
  const number = randomInt(advicesLen);
  const advice = advices[number];
  return advice;
};

/**
 * Check if message is part of the advice list.
 * @param {string} message
 * @return {boolean}
 */
function isAdvice(message) {
  // The search can be optimized if the advice list grows
  return advices.includes(message);
}

module.exports = {
  getAdvice,
  isAdvice,
};

