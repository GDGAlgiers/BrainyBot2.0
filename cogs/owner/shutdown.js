const { SlashCommandBuilder } =  require('@discordjs/builders');
const {OWNERS} = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder().setName('shutdown').setDescription('Make the bot shutdown'),
    async execute(interaction) {
        
        if(OWNERS.includes(interaction.user.id)){
            await interaction.reply("Shutting down. Bye! :wave:");
            await interaction.client.destroy();
        }
        else{
            await interaction.reply("Sorry you have not access for that!");
        }
       
    }
};

