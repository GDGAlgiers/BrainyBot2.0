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

  // Parse the response
  game = game.name;
  try {
    const gameNumber = solution[0].replace('#', '');
    let guessNumbers = solution[1].split('/')[0];
    let endOfGrid;
    if (game === 'AR - Alwird') {
      solution.splice(2, 1);
      endOfGrid = solution.length - 2;
    } else if (game == 'FR - Le Mot') {
      endOfGrid = solution.length - 1;
    } else {
      endOfGrid = solution.length;
    }
    guessNumbers = (guessNumbers == '💀' || guessNumbers == 'X') ?
        null : guessNumbers;
    let solutionGrid = solution.slice(2, endOfGrid);

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

    return {game, gameNumber, guessNumbers, solutionGrid};
  } catch {
    throw new Error('Invalid submission. Paste it as it is :)');
  }
}

/**
 * @return {Object}
 */
function getResults() {
  const scores = getSessionScores();
  const games = {};
  scores.forEach((score) => {
    if (score.guessNumbers) {
      if (!games[score.game]) {
        games[score.game] = {};
      }
      if (!games[score.game][score.guessNumbers]) {
        games[score.game][score.guessNumbers] = [];
      }
      games[score.game][score.guessNumbers].push(score.user);
    }
  });
  return games;
}

/**
 * @return {String}
 */
function getScoreboard() {
  const results = getResults();
  const games = getGames();
  let scoreboard = '';
  const emojis = ['🥇', '🥈', '🥉'];

  Object.keys(results).forEach((game) => {
    scoreboard += `**${game}**\n`;
    i = 0;
    Object.keys(results[game]).forEach((guessNumbers) => {
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
 * @return {Array}
 */
function getAvailableGames() {
  return getGames().map((game) => ({name: game.name, link: game.link}));
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

/**
 * @param {String} channelId
 */
function createWordleSession(channelId) {
  setSessionChannelId(channelId);
}

/**
 * End the wordle session, by resetting the session object in the database
 */
function endWordleSession() {
  resetSession();
}


module.exports = {
  activeWordleSession,
  createWordleSession,
  wordleSessionChannel,
  endWordleSession,
  parseMessage,
  addNewScore,
  getScoreboard,
  getAvailableGames,
};
