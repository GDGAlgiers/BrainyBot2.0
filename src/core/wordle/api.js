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
 * Returns an array of all games in the database.
 * @return {Array}
 */
function getGames() {
  const db = initDB();
  return db.get('games') ?? [];
}

/**
 * Adds a new game to the database. The game object must contain the following
 * properties:
 * - name: String, The name of the game
 * - prefix: String, The prefix of the game message
 * - link: String, The link to the game
 * - max_tries: Number, The maximum number of tries
 * @param {Object} game
 */
function addGame(game) {
  const db = initDB();
  const games = db.get('games');
  games.push(game);
  db.set('games', games);
}

/**
 * Currently, only one unique session object is stored in the database.
 * The Object contains the following information about the active session:
 *  - channel_id: the channel id of the channel the session is active in
 *        set to null if no session is active
 *  - scores: an array of players scores
 *        set to an empty array if no session is active
 * Future versions will allow persisting sessions in the database.
* @return {Object}
 */
function getSession() {
  const db = initDB();
  return db.get('session');
}

/**
 * Returns an array of scores for the current session.
 * @return {Array}
 */
function getSessionScores() {
  const session = getSession();
  return session.scores ?? [];
}

/**
 * Returns the channel id of the active session.
 * @return {String}
 */
function getSessionChannelId() {
  const session = getSession();
  return session.channel_id;
}

/**
 * Adds a new score to the current session.
 * @param {Object} score
 */
function addScore(score) {
  const db = initDB();
  const session = db.get('session');
  session.scores.push(score);
  db.set('session', session);
}

/**
 * Resets the session object to its default state.
 * This is called when an active session is ended.
 */
function resetSession() {
  const emptySession = {'channel_id': null, 'scores': []};
  const db = initDB();
  db.set('session', emptySession);
}

/**
 * Sets the channel id of the active session.
 * The previous channel id must be set to null to avoid overwrinting it.
 * @param {String} channelId
 */
function setSessionChannelId(channelId) {
  const db = initDB();
  const session = db.get('session');
  if (!session.channel_id) {
    session.channel_id = channelId;
    db.set('session', session);
  }
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
