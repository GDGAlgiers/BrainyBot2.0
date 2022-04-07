const {
  getSessionScores,
  getSessionChannelId,
  setSessionChannelId,
  addScore,
  resetSession,
  getGames,
} = require('./api');

/**
 * Adds a new score Object to the database. Checks if the user already
 * submitted a score for the same game in the current session. Score object
 * contains the following properties:
 * - game: String, The name of the game
 * - guessNumbers: String, The number of guesses
 * - user: String, The username of the user who submitted the score
 * @param {Object} score
 */
function addNewScore(score) {
  // Check if the user already has a score for this game
  const scores = getSessionScores();
  const userScores = scores.filter((s) => s.user === score.user &&
      s.game === score.game);
  if (userScores.length > 0) {
    throw new Error('You already submitted a solution for this game.');
  }
  addScore(score);
}

/**
 * Parse the submission message and returns an object with the:
 * - game: String, The name of the game
 * - guessNumbers: String, The number of guesses
 * - gameNumber: String, The serial number of the game
 * - solutionDrig: Array, The grid describing the submitted solution
 * @param {String} messageContent
 * @return {Object}
 * @throws {Error}
 */
function parseMessage(messageContent) {
  const games = getGames();
  // Get the corresponding game
  game = games.filter((game) => messageContent.startsWith(game.prefix))[0];
  if (!game) throw new Error('Invalid submission. Paste it as it is :)');

  // remove the prefix from the message
  const solution = messageContent.replace(game.prefix, '')
      .split(' ')
      .filter((elem) => elem !== '');

  try {
    // Remove the medal emoji in AR - Alwird
    if (game.name == 'AR - Alwird') solution.splice(2, 1);

    // Get the serial number of the game
    const gameNumber = solution[0].replace('#', '');

    // Get the number of guesses
    let guessNumbers = solution[1].split('/')[0];

    // Handle the case of losing the game
    guessNumbers = (guessNumbers == '💀' || guessNumbers == 'X') ?
        null : guessNumbers;

    // Get the grid of the solution
    let solutionGrid = solution.slice(2, 2 + parseInt(guessNumbers));

    // Add spaces between rectangles so that they look better
    const newGrid = [];
    solutionGrid.forEach((line) => {
      newLine = '';
      for (const c of line ) {
        newLine += c + ' ';
      };
      newGrid.push(newLine);
    });
    solutionGrid = newGrid.join('\n');
    return {game: game.name, gameNumber, guessNumbers, solutionGrid};
  } catch {
    throw new Error('Invalid submission. Paste it as it is :)');
  }
}

/**
 * Creates and returns an object based on the scores Array of the
 * current session.
 * The object contains a key for each game and the value is an object
 * with guessNumbers as keys and an array of usernames as values.
 * Example:
 * {
 *  'game1': {
 *   '3': ['user1', 'user2'],
 *  '4': ['user3', 'user4']
 * }
 * }
 * @return {Object}
 */
function getResults() {
  const scores = getSessionScores();
  const gamesResults = {};
  scores.forEach((score) => {
    if (score.guessNumbers) {
      if (!gamesResults[score.game]) {
        gamesResults[score.game] = {};
      }
      if (!gamesResults[score.game][score.guessNumbers]) {
        gamesResults[score.game][score.guessNumbers] = [];
      }
      gamesResults[score.game][score.guessNumbers].push(score.user);
    }
  });
  return gamesResults;
}

/**
 * Creates and returns the scoreboard for the current session.
 * @return {String}
 */
function createScoreboard() {
  const results = getResults();
  const games = getGames();

  let scoreboard = '';
  const emojis = ['🥇', '🥈', '🥉'];

  Object.keys(results).forEach((game) => {
    scoreboard += `**${game}**\n`;
    i = 0;
    Object.keys(results[game]).sort().forEach((guessNumbers) => {
      emoji = i < emojis.length ? emojis[i] : '';
      i += 1;
      maxTries = games.filter((g) => g.name === game)[0].max_tries;
      scoreboard += `- ${emoji} **(${guessNumbers}/${maxTries})**:  `+
      `**${results[game][guessNumbers].join(', ')}**\n`;
    });
    scoreboard += '\n\n';
  });

  return scoreboard;
}

/** Returns true if there is an active wordle session
 * @return {Boolean}
 */
function activeWordleSession() {
  channelId = getSessionChannelId();
  if (channelId) {
    return true;
  }
  return false;
}

/** returns true if channelId is the channel_id of the current wordle session
 * @param {String} channelId
 * @return {Boolean}
 */
function wordleSessionChannel(channelId) {
  return getSessionChannelId() === channelId;
}

module.exports = {
  createWordleSession: setSessionChannelId,
  endWordleSession: resetSession,
  getAvailableGames: getGames,
  parseMessage,
  addNewScore,
  createScoreboard,
  wordleSessionChannel,
  activeWordleSession,
};
