const { MessageEmbed } = require('discord.js');
const utils = require("../../core/utils");

module.exports = {
    name: 'isspotopen',
    description: 'check if the GDG Algiers spot is open or not',
    execute: async(interaction) => {
        const replyEmbed = new MessageEmbed()
            .setAuthor('GDG Algiers Spot', 'https://www.gdgalgiers.com/static/phonelogo-db9c725b1463afd46d9b886076124bb2.png', 'https://goo.gl/maps/Xgcq2nossHZG4Guy9');

        const spot = utils.getSpot();
        if (spot) {
            await interaction.reply({
                embeds: [replyEmbed.setDescription("The spot is currently **open**!").setColor("GREEN")],
                ephemeral: true
            });
        } else {
            await interaction.reply({
                embeds: [replyEmbed.setDescription('The spot is currently **closed**!').setColor("RED")],
                ephemeral: true
            });
        }
    }
};