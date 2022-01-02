const { SlashCommandBuilder } =  require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

const {OWNERS} = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder().setName('embed')
    .setDescription('The bot will say anything you want, but within embeds.')
    .addStringOption(option => option.setName('args').setDescription('Say anything').setRequired(true) ),
    async execute(interaction) {
        const args = interaction.options.getString('args');
        if(OWNERS.includes(interaction.user.id)){
            const EmbededMessage = new MessageEmbed()
        .setColor('0x00FF00')
        .setTitle(args);
        //replying with the Embeded message
        await interaction.reply({embeds: [EmbededMessage]});
        }
        else{
            await interaction.reply("Sorry you have not access for that!");
        }
       
    }
};

