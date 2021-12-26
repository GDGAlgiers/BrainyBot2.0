const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hello')
        .setDescription('Replies with Pong!'),
    async execute(interaction) {
        await interaction.reply('Hello world !');
    },
};