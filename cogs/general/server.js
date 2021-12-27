const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Get the invite link of the discord server of the bot for some support.'),
    async execute(interaction) {
        await interaction.reply('I sent you a private message!');
        await interaction.member.send("Join my discord server by clicking here: https://www.gdgalgiers.com/discord");
    },
};