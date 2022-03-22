const {MessageEmbed} = require('discord.js');
const {getJokes} = require('../../utils/database');

module.exports = {
  name: 'dadjoke',
  description: 'Get a dad joke from a funny bot :)',
  required: true,
  execute: async (client, interaction, args) => {
    try {
      const tag = client.user.tag;
      const avatar = client.user.displayAvatarURL();
      const joke = randomJoke();

      const jokeEmbed = new MessageEmbed()
          .setTitle('Dad Joke')
          .setDescription(`**${joke}**`)
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


/**
 * @return {Object}
 */
function randomJoke() {
  const jokes = getJokes();
  if (!jokes.length) {
    throw new Error('No jokes found');
  }
  return jokes[Math.floor(Math.random() * jokes.length)];
}
