const handleInteraction = require('./interactions');
const {showBotPresence} = require('./ready');
const {onReaction} = require('./reactions');

/**
 *
 * @param {*} client
 */
function handleEvents(client) {
  /**
   * ON Client ready
   */
  client.on('ready', ()=>showBotPresence(client) );
  /**
   * On interaction created
   */
  client.on('interactionCreate', (interaction) =>
    handleInteraction(interaction, client),
  );
  // When users react to messages
  client.on('messageReactionAdd', onReaction);
}
module.exports = {
  handleEvents,
};
