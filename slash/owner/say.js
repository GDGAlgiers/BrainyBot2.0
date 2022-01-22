const { MessageEmbed } = require('discord.js');

const { OWNERS } = require('../../config.json');

module.exports = {
    name: "say",
    description: "The bot will say anything you want.",
    options: [{
        name: 'args',
        description: 'say anything',
        type: 'MENTIONABLE',
        required: true
    }],
    execute: async(client, interaction, args) => {
        const args = interaction.options.getString('args');
        if (OWNERS.includes(interaction.user.id)) {
            await interaction.reply(args);
        } else {
            await interaction.reply("Sorry you have not access for that!");
        }

    }
};