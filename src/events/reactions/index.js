const {isAdvice} = require('../../core/advices');
const {onReactionAdvice} = require('./advice_reactions');

/**
 * Handle message reactions.
 * @param {MessageReaction} reaction
 * @param {User} user
 */
async function onReaction(reaction, user) {
  try {
    // Advices are put in message.embeds[0].description so we first need to make
    // sure it has this structure before checking for the content being an
    // advice or not
    if (reaction.message.embeds.length != 0 &&
        'description' in reaction.message.embeds[0] &&
        reaction.message.embeds[0].description !== null) {
      content = reaction.message.embeds[0].description;
      // Remove formatting (e.g. '**Advice Here**')
      content = content.substr(2, content.length - 4);
      if (isAdvice(content)) {
        onReactionAdvice(reaction, user);
      }
    }
  } catch (error) {
    console.log('Reaction handler caught an exception:');
    console.log('======= Reaction handler stack trace (start) =======');
    console.log(error.stack);
    console.log('======= Reaction handler stack trace (end) =======');
  }
}

module.exports = {
  onReaction,
};
