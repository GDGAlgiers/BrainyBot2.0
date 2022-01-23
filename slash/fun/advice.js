const { SlashCommandBuilder } = require('@discordjs/builders');
const { get_advice } = require("../../core/utils");


module.exports = {
    name: 'advice',
    description: 'Get an advice from a wise bot :)',
    required: true,
    execute: async(client, interaction, args) => {
        await interaction.reply(get_advice());
    }
};