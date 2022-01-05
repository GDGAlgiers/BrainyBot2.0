const { SlashCommandBuilder } =  require('@discordjs/builders');
const {get_advice} = require("../../core/utils");


module.exports = {
    data: new SlashCommandBuilder().setName('advice').setDescription('Get an advice from a wise bot :) '),
    async execute(interaction) {
        await interaction.reply(get_advice());
    }
};

