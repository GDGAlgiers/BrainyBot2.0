const { SlashCommandBuilder } =  require('@discordjs/builders');


module.exports = {
    data: new SlashCommandBuilder().setName('tweet').setDescription('You can tweet as someone else to troll others'),
    async execute(interaction) {
        await interaction.reply("");
    }
};
