/* eslint-disable comma-dangle */
/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'verse',
  description: 'Get a random verse from quran',
  required: true,
  disabled: false,
  execute: async (client, interaction, args) => {
    const verse = Math.floor(Math.random() * 623);
    console.log(verse);
    const url = `https://www.easyquran.com/segments-jpg/seg/${verse}.jpg`;

    try {
      const res = await fetch(url);
      console.log(res.url);
      const photoURL = await res.url;
      const ImageEmbed = new MessageEmbed().setImage(photoURL).setTimestamp();
      await interaction.reply({ embeds: [ImageEmbed] });
    } catch (error) {
      const adviceEmbed = new MessageEmbed()
        .setTitle('No pictures for you (┛ಠ_ಠ)┛彡┻━┻')
        .setColor('#ff2c40')
        .setTimestamp();
      await interaction.reply({ embeds: [adviceEmbed] });
    }
  }
};
