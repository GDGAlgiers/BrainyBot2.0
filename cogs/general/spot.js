const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const AutorisationError = require("../../core/errors");
const utils = require("../../core/utils");
module.exports = {
    data: new SlashCommandBuilder()
        .setName('setspot')
        .setDescription('open the spot if its closed or close it if opened'),
    async execute(interaction) {
        comanagers = utils.getCOMANAGERS_IDS();
        if (!comanagers.includes(parseInt(interaction.user.id))) {
            new AutorisationError(interaction);
            return;
        }
        const replyEmbed = new MessageEmbed()
            .setAuthor('GDG Algiers Spot', 'https://www.gdgalgiers.com/static/phonelogo-db9c725b1463afd46d9b886076124bb2.png', 'https://goo.gl/maps/Xgcq2nossHZG4Guy9');
        const boutton = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId('to_open')
                .setLabel('Set the spot to open')
                .setStyle('SUCCESS'),
            )
            .addComponents(
                new MessageButton()
                .setCustomId('to_closed')
                .setLabel('Set the spot to closed')
                .setStyle('DANGER'),
            );

        if (utils.getSpot()) {
            boutton.components[0].setDisabled(true);
            await interaction.reply({
                embeds: [replyEmbed.setDescription("The spot is currently **open**!").setColor("GREEN")],
                ephemeral: true,
                components: [boutton]
            });
        } else {
            boutton.components[1].setDisabled(true)
            await interaction.reply({
                embeds: [replyEmbed.setDescription('The spot is currently **closed**!').setColor("RED")],
                ephemeral: true,
                components: [boutton]
            });
        }
        const filter = (button) => (button.user.id === interaction.user.id);
        const collector = interaction.channel.createMessageComponentCollector({
            filter,
            max: 1,
            time: 60 * 1000
        })
        collector.on('collect', async(button) => {
            await button.update({
                embeds: [replyEmbed.setDescription("The spot status is now updated!").setColor("GREEN")],
                components: [],
                ephemeral: true
            });
        });
        collector.on("end", async(collection) => {
            if (collection.first() === undefined) {
                await interaction.editReply({
                    embeds: [replyEmbed.setDescription("**Time's up**. Please try again!").setColor("RED")],
                    components: [],
                    ephemeral: true
                });
                return;
            }
            if (collection.first().customId === "to_open") {
                utils.setSpot(true);
            } else
            if (collection.first().customId === "to_closed") {
                utils.setSpot(false);
            }
        });
    },
};