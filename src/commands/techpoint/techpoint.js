const {MessageEmbed} = require('discord.js');
const {TECHPOINT_CHAT_CHANNEL_ID} = require('config.json');
const {sessionActive,
  tmpExist,
  createTmp,
  createFiles} = require('../../core/techpoint');
const {ephemeral} = require('../../utils/index');

module.exports = {
  name: 'techpoint',
  description: 'launch the session.',
  options: [{
    name: 'sessionTitle',
    description: 'the title of the session',
    type: 'STRING',
    required: true,
  }],
  execute: async (client, interaction, args) => {
    if (!interaction.member
        .roles.cache.some((role) => role.name === 'moderator')) {
      await interaction.reply(ephemeral(`You don't have access !`));
      return;
    }

    const sessionTitle = interaction.options.getString('sessionTitle');

    if (sessionActive()) {
      await interaction
          .reply(ephemeral(` TechPoint session already launched !`));
    } else {
      if (!tmpExist()) {
        createTmp();
      }
      createFiles(sessionTitle);
      const errorembed = new MessageEmbed()
          .setColor('#00ff00')
          .setTitle('TECHPOINT')
          .setDescription('Hello techpointers!'+
          ' enjoy your time and don\'t forget to take notes :) !');
      const channel = interaction.guild
          .channels.cache.get(TECHPOINT_CHAT_CHANNEL_ID);
      channel.send({embeds: [errorembed]});
      await interaction.reply(ephemeral(` TechPoint`+
      ` session launched successfully !`));
    }
  },

};
