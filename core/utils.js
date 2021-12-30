
//utilities
const { randomInt } = require('crypto');
const fs = require('fs');


//function returning an advice from BrainyAdvice.csv

function get_advice() {
    let advice = "";
    //reading csv file
    fs.readFile('../core/BrainyAdvice.csv', (err, data) => {
        if (err) {
            console.log(err);
            return
        } else {
            //getting an advice from data
            const advices = data.toString().split(", ",);
            //number of advices:
            const advices_len = advices.length;
            const number = randomInt(advices_len);
            advice = advices[number];
        }
    }
    )
    return advice;
}

module.exports =  {get_advice}