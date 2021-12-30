
//utilities
const { randomInt } = require('crypto');
const { advices } = require('./BrainyAdvice.json');


//function returning an advice from BrainyAdvice.csv

function get_advice() {
    //number of advices:
    const advices_len = advices.length;
    const number = randomInt(advices_len);
    const advice = advices[number];
    return advice;
}

module.exports =  {get_advice}