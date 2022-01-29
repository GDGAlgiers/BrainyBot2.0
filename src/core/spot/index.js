const fs = require('fs');
const path = require('path');
/**
 *
 * @return {*}
 */
const getSpot = () => {
  return JSON.parse(fs.readFileSync(path.resolve('config.json')))['SPOT'];
};

/**
 *
 * @param {*} value
 */
const setSpot = (value) => {
  filePath = path.resolve('config.json');
  config = JSON.parse(fs.readFileSync(file_path));
  config['SPOT'] = value;
  fs.writeFileSync(file_path, JSON.stringify(config, null, '\t'));
};
module.exports = {
  getSpot,
  setSpot,
};
