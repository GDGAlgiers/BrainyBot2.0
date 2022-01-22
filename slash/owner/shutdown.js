const { MessageEmbed } = require('discord.js');

const { OWNERS } = require('../../config.json');

module.exports = {
    name: "shutdown",
    description: "Shutting down. Bye! :wave:",
    options: null,
    execute: async(client, interaction, args) => {

        if (OWNERS.includes(interaction.user.id)) {
            await interaction.reply("Shutting down. Bye! :wave:");
            await interaction.client.destroy();
        } else {
            await interaction.reply("Sorry you have not access for that!");
        }

    }
};