const { randomInt } = require('crypto');
const { advices } = require('./BrainyAdvice.json');
const path = require('path');
const fs = require('fs');

//function returning an advice from BrainyAdvice.csv

module.exports = function get_advice() {
    //number of advices:
    const advices_len = advices.length;
    const number = randomInt(advices_len);
    const advice = advices[number];
    return advice;
}

module.exports.getSpot = () => {
    return JSON.parse(fs.readFileSync(path.resolve("config.json")))['SPOT'];
};

module.exports.setSpot = (value) => {
    file_path = path.resolve("config.json");
    config = JSON.parse(fs.readFileSync(file_path));
    config['SPOT'] = value;
    fs.writeFileSync(file_path, JSON.stringify(config, null, '\t'));
    return;
};

module.exports.getCOMANAGERS_IDS = () => {
    return JSON.parse(fs.readFileSync(path.resolve("config.json")))['COMANAGERS_IDS'];
};