const {getAdvice} = require('../../core/advices');
const {MessageEmbed} = require('discord.js');

module.exports = {
  name: 'advice',
  description: 'Get an advice from a wise bot :)',
  required: true,
  execute: async (client, interaction, args) => {
    // get profile pic of brainy
    const avatar = client.user.displayAvatarURL();
    const tag = client.user.tag;
    // fill the embed
    const adviceEmbed = new MessageEmbed()
        .setTitle('Advice')
        .setThumbnail(avatar)
        .setDescription(`**${getAdvice()}**`)
        .setFooter(tag)
        .setColor('RANDOM')
        .setTimestamp();
    // reply with a random advice
    await interaction.reply({embeds: [adviceEmbed]});
  },
};
