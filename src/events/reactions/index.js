const {isAdvice} = require('../../core/advices');
const {onReactionAdvice} = require('./advice_reactions');

/**
 * Handle message reactions.
 * @param {MessageReaction} reaction
 * @param {User} user
 */
async function onReaction(reaction, user) {
  content = reaction.message.embeds[0].description;
  // Remove formatting (e.g. '**Advice Here**')
  content = content.substr(2, content.length - 4);
  if (isAdvice(content)) {
    onReactionAdvice(reaction, user);
  }
}

module.exports = {
  onReaction,
};
