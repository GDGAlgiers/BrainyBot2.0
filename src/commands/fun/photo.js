const fetch = (...args) =>
  import('node-fetch').then(({default: fetch}) => fetch(...args));
const {MessageEmbed} = require('discord.js');

module.exports = {
  name: 'photo',
  description: 'Get a photo from pixels.com',
  options: [
    {
      name: 'query',
      description: 'The search query. Ocean, Tigers, Pears, etc.',
      type: 'STRING',
      required: false,
    },
  ],
  required: true,
  disabled: false,
  execute: async (client, interaction, args) => {
    // getting the image URL:
    const query = interaction.options.getString('query') ?? 'nature';
    const url = `https://api.pexels.com/v1/search?query=${query}&per_page=20`;

    try {
      const res = await fetch(url, {
        headers: {
          Authorization: process.env.PIXELS_API_KEY,
        },
      });
      const {photos = []} = await res.json();
      const photo = randomPhoto(photos);
      const ImageEmbed = new MessageEmbed()
          .setColor(photo?.avg_color)
          .setTitle(photo?.alt)
          .setImage(photo?.src?.large)
          .setTimestamp();
      await interaction.reply({embeds: [ImageEmbed]});
    } catch (error) {
      const adviceEmbed = new MessageEmbed()
          .setTitle('No pictures for you (┛ಠ_ಠ)┛彡┻━┻')
          .setColor('#ff2c40')
          .setTimestamp();
      await interaction.reply({embeds: [adviceEmbed]});
    }
  },
};

/**
 * @param {Array} photos
 * @return {Object}
 */
function randomPhoto(photos) {
  if (!photos.length) {
    throw new Error('No pictures found');
  }
  return photos[Math.floor(Math.random() * photos.length)];
}
