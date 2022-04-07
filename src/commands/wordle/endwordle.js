const {MessageEmbed} = require('discord.js');
const {
  activeWordleSession,
  endWordleSession,
  wordleSessionChannel,
} = require('../../core/wordle');
const {ephemeral} = require('../../utils/index');

module.exports = {
  name: 'endwordle',
  description: 'End an active wordle session.',
  required: true,
  execute: async (client, interaction, args) => {
    // Check if there is an active session, return if there isn't
    if (!activeWordleSession()) {
      await interaction.reply(ephemeral(`No active wordle session found.`));
      return;
    }
    // Check if the channel is the same as the session channel
    const channelId = interaction.channel.id;
    if (!wordleSessionChannel(channelId)) {
      await interaction.reply(ephemeral(`You can only end your wordle `+
      `session in today's wordle channel.`));
      return;
    }
    endWordleSession();
    // return response with supported games
    const embed = new MessageEmbed()
        .setColor('#00ff00')
        .setTitle('Wordle session ended!')
        .setDescription('Good game everyone! see you tomorrow');
    await interaction.reply({embeds: [embed]});
  },
};
