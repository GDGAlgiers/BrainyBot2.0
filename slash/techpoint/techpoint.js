const { MessageEmbed } = require('discord.js');
const { techpoint_chat_channel_id } = require("../../config.json")
const { session_active, add_note } = require("../../core/utils");


module.exports = {
    name: "techpoint",
    description: "Add a note",
    options: [{
        name: 'session_title',
        description: 'launch the session',
        required: true
    }],
    execute: async(client, interaction, args) => {
        if (!interaction.member.roles.cache.some(role => role.name === 'moderator')) {
            await interaction.reply(`You don't have access !`);
            return;
        }

        const session_title = interaction.options.getString('session_title');

        if (session_active()) {
            await interaction.reply(` techpoint session already launched !`);
        } else {
            if (!tmp_existe()) {
                create_tmp()
            }
            create_files(session_title)
            const errorembed = new MessageEmbed()
                .setColor('#00ff00')
                .setTitle('TECHPOINT')
                .setDescription('Hello techpointers! enjoy your time and don\'t forget to take notes :) !');
            const channel = interaction.client.channels.cache.get(techpoint_chat_channel_id);
            channel.send({ embeds: [errorembed] })

        }
    }

};