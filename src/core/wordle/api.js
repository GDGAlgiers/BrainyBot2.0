// Database access operations
const path = require('path');
const JSONdb = require('simple-json-db');

/**
 * @return {JSONdb}
 */
function initDB() {
  const file = path.resolve(__dirname, 'db.json');
  return new JSONdb(file);
}

/**
 * @return {Array}
 */
function getGames() {
  const db = initDB();
  return db.get('games') ?? [];
}

/**
 * @param {Object} game
 */
function addGame(game) {
  const db = initDB();
  const games = db.get('games');
  games.push(game);
  db.set('games', games);
}

/**
 * @return {Object}
 */
function getSession() {
  const db = initDB();
  return db.get('session');
}

/**
 * @return {Array}
 */
function getSessionScores() {
  const session = getSession();
  return session.scores ?? [];
}

/**
 * @return {String}
 */
function getSessionChannelId() {
  const session = getSession();
  return session.channel_id;
}

/**
 * @param {Object} score
 */
function addScore(score) {
  const db = initDB();
  const session = db.get('session');
  session.scores.push(score);
  db.set('session', session);
}

/**
 *
 */
function resetSession() {
  const emptySession = {'channel_id': null, 'scores': []};
  const db = initDB();
  db.set('session', emptySession);
}

/**
 * @param {String} channelId
 */
function setSessionChannelId(channelId) {
  const db = initDB();
  const session = db.get('session');
  session.channel_id = channelId;
  db.set('session', session);
}

module.exports = {
  getGames,
  addGame,
  getSessionScores,
  getSessionChannelId,
  setSessionChannelId,
  addScore,
  resetSession,
};
