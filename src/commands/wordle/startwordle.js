const {MessageEmbed} = require('discord.js');
const {activeWordleSession,
  createWordleSession,
  getAvailableGames} = require('../../core/wordle');
const {ephemeral} = require('../../utils/index');

module.exports = {
  name: 'startwordle',
  description: 'launch a new wordle session.',
  required: true,
  execute: async (client, interaction, args) => {
    // Check if there is no active session, return if there is
    if (activeWordleSession()) {
      await interaction.reply(ephemeral(`A wordle session is already active, `+
       `make sure to end it first !`));
      return;
    }
    // Get the id of the channel where the command was sent
    const channelId = interaction.channel.id;
    createWordleSession(channelId);
    // return response with supported games
    supportedGames = '';
    for (const game of getAvailableGames()) {
      supportedGames += `- **${game.name}** (${game.link})\n`;
    }
    const embed = new MessageEmbed()
        .setColor('#00ff00')
        .setTitle(
            'New Day, New Wordle!')
        .setDescription('Let the games begin!\n'+
          'The supported games:\n'+
          supportedGames+
          '\n'+
          'Use the **/wordle** command to submit your solutions.\n');
    await interaction.reply({embeds: [embed]});
  },
};
