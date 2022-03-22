const fetch = (...args) =>
  import('node-fetch').then(({default: fetch}) => fetch(...args));
const {MessageEmbed} = require('discord.js');

module.exports = {
  name: 'dadjoke',
  description: 'Get a dad joke from a funny bot :)',
  required: true,
  execute: async (client, interaction, args) => {
    // jokes api url
    const url = `https://icanhazdadjoke.com`;
    const avatar = client.user.displayAvatarURL();
    const tag = client.user.tag;
    try {
      const res = await fetch(url, {
        headers: {Accept: 'application/json'},
      });
      const data = await res.json();
      const jokeEmbed = new MessageEmbed()
          .setTitle('Dad Joke')
          .setDescription(`**${data.joke}**`)
          .setColor('RANDOM')
          .setTimestamp()
          .setFooter({text: tag, iconURL: avatar});
      await interaction.reply({embeds: [jokeEmbed]});
    } catch (error) {
      const noJokesEmbed = new MessageEmbed()
          .setTitle('No jokes for you (┛ಠ_ಠ)┛彡┻━┻')
          .setColor('#ff2c40')
          .setTimestamp();
      await interaction.reply({embeds: [noJokesEmbed]});
    }
  },
};
