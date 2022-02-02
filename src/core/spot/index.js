const fs = require('fs');
const path = require('path');
/**
 *
 * @return {boolean} - the value of SPOT variable in the config.json file
 */
const getSpot = () => {
    return JSON.parse(fs.readFileSync(path.resolve('config.json')))['SPOT'];
};

/**
 * @param {boolean} value - a boolean value to be assigned to SPOT variable in the config.json file
 * @return {*} 
 */
const setSpot = (value) => {
    let file_path = path.resolve('config.json');
    let config = JSON.parse(fs.readFileSync(file_path));
    config['SPOT'] = value;
    fs.writeFileSync(file_path, JSON.stringify(config, null, '\t'));
    return 0;
};
module.exports = {
    getSpot,
    setSpot,
};