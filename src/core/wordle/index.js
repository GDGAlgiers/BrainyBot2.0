const {
  getSessionScores,
  getSessionChannelId,
  setSessionChannelId,
  addScore,
  resetSession,
  getGames,
} = require('./api');

/**
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

/**
 * @return {Boolean}
 */
function activeWordleSession() {
  channelId = getSessionChannelId();
  if (channelId) {
    return true;
  }
  return false;
}

/**
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
