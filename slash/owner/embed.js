const { MessageEmbed } = require('discord.js');

const { OWNERS } = require('../../config.json');

module.exports = {
    name: "embed",
    description: "The bot will say anything you want, but within embeds.",
    options: [{
        name: 'args',
        description: 'say anything',
        type: 'MENTIONABLE',
        required: true
    }],
    execute: async(client, interaction, args) => {
        const args = interaction.options.getString('args');
        if (OWNERS.includes(interaction.user.id)) {
            const EmbededMessage = new MessageEmbed()
                .setColor('0x00FF00')
                .setTitle(args);
            //replying with the Embeded message
            await interaction.reply({ embeds: [EmbededMessage] });
        } else {
            await interaction.reply("Sorry you have not access for that!");
        }

    }
};