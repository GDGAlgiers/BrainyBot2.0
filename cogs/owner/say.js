const { SlashCommandBuilder } =  require('@discordjs/builders');
const {OWNERS} = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder().setName('say')
    .setDescription('The bot will say anything you want.')
    .addStringOption(option => option.setName('args').setDescription('Say anything').setRequired(true) ),
    async execute(interaction) {
        const args = interaction.options.getString('args');
        if(OWNERS.includes(interaction.user.id)){
            await interaction.reply(args);
        }
        else{
            await interaction.reply("Sorry you have not access for that!");
        }
       
    }
};

