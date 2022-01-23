const { MessageEmbed } = require('discord.js');

class AutorisationError {
    constructor(interaction) {
        const errorEmbed = new MessageEmbed()
            .setColor('RED')
            .setDescription("You are missing permissions. Therefore, **you can't perform this action**");
        interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }
}
class ArgumentError {
    constructor(interaction) {
        const errorEmbed = new MessageEmbed()
            .setColor('RED')
            .setDescription("You are missing arguments. Please try again!");
        interaction.reply({ embeds: [errorEmbed] });
    }
}
module.exports = { AutorisationError, ArgumentError };