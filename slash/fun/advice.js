const { SlashCommandBuilder } = require('@discordjs/builders');
const { get_advice } = require("../../core/utils");


module.exports = {
    name: 'advice',
    description: 'Get an advice from a wise bot :)',
    type: 'MENTIONABLE',
    required: true,
    execute: async(interaction) => {
        await interaction.reply(get_advice());
    }
};