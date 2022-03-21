const {MessageEmbed} = require('discord.js');


/**
 *
 * @param {*} interaction
 * @return {*}
 */
function rootEmbed(interaction) {
  if (!interaction) {
    throw Error('\'interaction\' must be passed down as param! (baseEmbed)');
  }

  return new MessageEmbed().setColor(
      interaction.guild.me.displayColor || '#00FFFF',
  );
}

/**
 *
 * @param {*} interaction
 * @param {*} text
 * @return {*}
 */
function infoMessage(interaction, text) {
  if (!interaction) {
    throw Error('\'interaction\' must be passed down as param! (InfoMessage)');
  }

  if (!text) {
    throw Error('\'text\' must be passed down as param! (InfoMessage)');
  }

  const embedI = new MessageEmbed()
      .setDescription(text)
      .setColor(interaction.guild.me.displayColor || '#00FFFF');

  return interaction
      .editReply({embeds: [embedI], allowedMentions: {repliedUser: false}})
      .catch(console.error);
}

/**
 *
 * @param {*} interaction
 * @param {*} text
 * @return {*}
 */
function warnMessage(interaction, text) {
  if (!interaction) {
    throw Error('\'interaction\' must be passed down as param! (WarnMessage)');
  }

  if (!text) {
    throw Error('\'text\' must be passed down as param! (WarnMessage)');
  }

  const embedW = new MessageEmbed().setDescription(text).setColor('ORANGE');

  return interaction
      .editReply({
        ephemeral: true,
        embeds: [embedW],
        allowedMentions: {repliedUser: false},
      })
      .catch(console.error);
}

/**
 *
 * @param {*} interaction
 * @param {*} text
 * @return {*}
 */
function errorMessage(interaction, text) {
  if (!interaction) {
    throw Error('\'interaction\' must be passed down as param! (ErrorMessage)');
  }

  if (!text) {
    throw Error('\'text\' must be passed down as param! (ErrorMessage)');
  }

  const embedE = new MessageEmbed().setDescription(text).setColor('RED');

  return interaction
      .editReply({
        ephemeral: true,
        embeds: [embedE],
        allowedMentions: {repliedUser: false},
      })
      .catch(console.error);
}
module.exports = {
  rootEmbed,
  infoMessage,
  warnMessage,
  errorMessage,
};
