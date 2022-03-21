const {MessageEmbed} = require('discord.js');

/**
 * Custom error on authorization
 */
class AuthorizationError {
  /**
     * Constructor of the error
     * @param {*} interaction
     */
  constructor(interaction) {
    const errorEmbed = new MessageEmbed()
        .setColor('RED')
        .setDescription('You are missing permissions. '+
        'Therefore, **you can\'t perform this action**');
    interaction.reply({embeds: [errorEmbed], ephemeral: true});
  }
}
/**
 * Custom error when argument passed error
 */
class ArgumentError {
  /**
     *
     * @param {*} interaction
     */
  constructor(interaction) {
    const errorEmbed = new MessageEmbed()
        .setColor('RED')
        .setDescription('You are missing arguments. Please try again!');
    interaction.reply({embeds: [errorEmbed]});
  }
}
module.exports = {AuthorizationError, ArgumentError};
