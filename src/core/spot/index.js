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
 * @param {boolean} value - a boolean value to be assigned to SPOT variable
 * @return {*}
 */
const setSpot = (value) => {
  const filePath = path.resolve('config.json');
  const config = JSON.parse(fs.readFileSync(filePath));
  config['SPOT'] = value;
  fs.writeFileSync(filePath, JSON.stringify(config, null, '\t'));
  return 0;
};
module.exports = {
  getSpot,
  setSpot,
};
