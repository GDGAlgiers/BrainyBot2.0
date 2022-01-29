const {MessageEmbed} = require('discord.js');
const {TECHPOINT_CHAT_CHANNEL_ID} = require('../../config.json');
const {sessionActive, addOffRes} = require('../../core/techpoint');
const {ephemeral} = require('../../utils/index');

module.exports = {
  name: 'off_res',
  description: 'Add an off resource',
  options: [{
    name: 'link',
    description: 'the resource\'s link',
    type: 'STRING',
    required: true,
  }, {
    name: 'description',
    description: 'the resource\'s description',
    type: 'STRING',
    required: true,
  }],
  execute: async (client, interaction, args) => {
    try {
      const url = interaction.options.getString('link');
      const description = interaction.options.getString('description');

      if (!sessionActive()) {
        const errorembed = new MessageEmbed()
            .setColor('#ff0000')
            .setTitle('ERROR ❌')
            .setDescription('a techpoint session must be active ');

        const channel = interaction.client
            .channels.cache.get(techpoint_chat_channel_id);


        channel.send({embeds: [errorembed]});
      } else {
        if (interaction.channel.id !== TECHPOINT_CHAT_CHANNEL_ID) {
          await interaction.reply(ephemeral('You\'re at the wrong channel!'));
          return;
        }
        addOffRes(url, description, interaction.user.username);


        const succesembed = new MessageEmbed()
            .setColor('#00FF00')
            .setTitle('OFF RESOURCE ADDED')
            .setDescription(description)
            .setURL(url);


        await interaction.reply({embeds: [succesembed]});
      }
    } catch (e) {
      console.log(e);
    }
  },

};
