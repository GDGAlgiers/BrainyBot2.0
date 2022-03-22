const path = require('path');
const JSONdb = require('simple-json-db');

/**
 * @return {JsonDB}
 */
function initDB() {
  const file = path.resolve(__dirname, 'db.json');
  return new JSONdb(file);
}

/**
 * @return {Array}
 */
function getJokes() {
  const db = initDB();
  return db.get('jokes') ?? [];
}

/**
 * @param {String} joke
 * @return {String}
 */
function addJoke(joke) {
  const db = initDB();
  const jokes = db.get('jokes') ?? [];
  jokes.push(joke);
  db.set('jokes', joke);
  return joke;
}

module.exports = {
  getJokes,
  addJoke,
};
