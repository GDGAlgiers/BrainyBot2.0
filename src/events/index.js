const handleInteraction = require('./interactions');
const {showBotPresence} = require('./ready');

/**
 *
 * @param {*} client
 */
function handleEvents(client) {
  /**
   * ON Client ready
   */
  client.on('ready', showBotPresence );
  /**
   * On interaction created
   */
  client.on('interactionCreate', (interaction) =>
    handleInteraction(interaction, client),
  );
}
module.exports = {
  handleEvents,
};
