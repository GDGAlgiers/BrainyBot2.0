const { MessageEmbed, Interaction } = require("discord.js");



/**
 * Returns a custom embed
 * @param {Interaction} interaction
 */
function baseEmbed(interaction) {
  if (!interaction) {
    throw Error("'interaction' must be passed down as param! (baseEmbed)");
  }

  const avatar = interaction.user?.displayAvatarURL({ dynamic: true });
  const tag = interaction.user?.tag;

  return new MessageEmbed()
    .setFooter(tag, avatar)
    .setColor(interaction.guild.me.displayColor || "#00FFFF")
    .setTimestamp();
}

/**
 * Returns a custom embed
 * @param {Interaction} interaction
 */
function rootEmbed(interaction) {
  if (!interaction) {
    throw Error("'interaction' must be passed down as param! (baseEmbed)");
  }

  return new MessageEmbed()
    .setColor(interaction.guild.me.displayColor || "#00FFFF");
}


/**
 * Returns a custom embed
 * @param {Interaction} interaction
 * @param {string} text
 */
function infoMessage(interaction, text) {
  if (!interaction) {
    throw Error("'interaction' must be passed down as param! (InfoMessage)");
  }

  if (!text) {
    throw Error("'text' must be passed down as param! (InfoMessage)");
  }

  const embedI = new MessageEmbed()
    .setDescription(text)
    .setColor(interaction.guild.me.displayColor || "#00FFFF");

  return interaction.editReply({ embeds: [embedI], allowedMentions: { repliedUser: false } }).catch(console.error);
}

/**
 * Returns a custom embed
 * @param {Interaction} interaction
 * @param {string} text
 */
function warnMessage(interaction, text) {
  if (!interaction) {
    throw Error("'interaction' must be passed down as param! (WarnMessage)");
  }

  if (!text) {
    throw Error("'text' must be passed down as param! (WarnMessage)");
  }

  const embedW = new MessageEmbed()
    .setDescription(text)
    .setColor("ORANGE");

  return interaction.editReply({ ephemeral: true, embeds: [embedW], allowedMentions: { repliedUser: false } }).catch(console.error);
}

/**
 * Returns a custom embed
 * @param {Interaction} interaction
 * @param {string} text
 */
function errorMessage(interaction, text) {
  if (!interaction) {
    throw Error("'interaction' must be passed down as param! (ErrorMessage)");
  }

  if (!text) {
    throw Error("'text' must be passed down as param! (ErrorMessage)");
  }

  const embedE = new MessageEmbed()
    .setDescription(text)
    .setColor("RED");

  return interaction.editReply({ ephemeral: true, embeds: [embedE], allowedMentions: { repliedUser: false } }).catch(console.error);
}

module.exports = {
  baseEmbed,
  rootEmbed,
  infoMessage,
  warnMessage,
  errorMessage,
  queueMessage
};