const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mul')
        .setDescription('multiply a and b')
        .addStringOption(option =>
            option.setName('a')
            .setDescription('first operand')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('b')
            .setDescription('second operand')
            .setRequired(true)),
    async execute(interaction) {
        const a = interaction.options.getString('a');
        const b = interaction.options.getString('b');
        await interaction.reply(`${a}  * ${b} = ${a*b}`);
    },
};