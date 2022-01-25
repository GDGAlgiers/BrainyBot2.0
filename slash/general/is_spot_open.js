const { MessageEmbed } = require('discord.js');
const utils = require("../../core/utils");

module.exports = {
    name: 'is_spot_open',
    description: 'Check if the GDG Algiers spot is open or not',
    execute: async(client, interaction) => {
        const replyEmbed = new MessageEmbed()
            .setAuthor('GDG Algiers Spot', 'https://www.gdgalgiers.com/static/phonelogo-db9c725b1463afd46d9b886076124bb2.png', 'https://goo.gl/maps/Xgcq2nossHZG4Guy9');

        const spot = utils.get_spot(); // get the value of SPOT 

        if (spot) {
            await interaction.reply({
                embeds: [replyEmbed.setDescription("The spot is currently **open**!").setColor("GREEN")],
                ephemeral: true
            }); //reply to the user with spot state
        } else {
            await interaction.reply({
                embeds: [replyEmbed.setDescription('The spot is currently **closed**!').setColor("RED")],
                ephemeral: true
            });
        }
    }
};