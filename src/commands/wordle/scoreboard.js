const {MessageEmbed} = require('discord.js');
const {
  activeWordleSession,
  wordleSessionChannel,
  getScoreboard,
} = require('../../core/wordle');
const {ephemeral} = require('../../utils/index');

module.exports = {
  name: 'scoreboard',
  description: 'View wordle scorboard.',
  required: true,
  execute: async (client, interaction, args) => {
    // Check if it's the right channel
    if (!activeWordleSession()) {
      await interaction.reply(ephemeral(`No active wordle session found.`));
      return;
    }
    // Check if the channel is the same as the session channel
    const channelId = interaction.channel.id;
    if (!wordleSessionChannel(channelId)) {
      await interaction.reply(ephemeral(`You can only play in`+
          `today's Wordle channel.`));
      return;
    }
    // return response with supported games
    const embed = new MessageEmbed()
        .setColor('#00ff00')
        .setTitle('Wordle Scorboard 🏆')
        .setDescription( getScoreboard());
    await interaction.reply({embeds: [embed]});
  },
};
