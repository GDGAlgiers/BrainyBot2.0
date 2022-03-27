const {randomInt} = require('mathjs');

// Which possible messages to send when receiving a certain group of emojis
const messageOnReactions = [
  {
    reactions: ['✅', '👍'],
    messages: ['You seem to approve my words', 'Your approval means a lot'],
  },
  {
    reactions: ['😂', '😆', '🤣'],
    messages: [
      'Am I a joke to you',
      'Maybe you should give us an advice next time',
    ],
  },
  {
    reactions: ['😭', '😆', '🤣'],
    messages: ['Why are you crying'],
  },
  {
    reactions: ['❤️', '♥️', '💗'],
    messages: ['I\'m glad you loved it'],
  },
  {
    reactions: ['😡'],
    messages: ['Sorry if i made you mad'],
  },
  {
    reactions: ['😩'],
    messages: ['Are you worried?'],
  },
];

/**
 * Handle reactions to advices.
 * @param {MessageReaction} reaction
 * @param {User} user
 */
async function onReactionAdvice(reaction, user) {
  for (const elem of messageOnReactions) {
    if (elem.reactions.includes(reaction.emoji.name)) {
      const randIndex = randomInt(elem.messages.length);
      const message = elem.messages[randIndex];
      reaction.message.channel.send(user.toString() + message);
      break;
    }
  }
}

module.exports = {
  onReactionAdvice,
};
