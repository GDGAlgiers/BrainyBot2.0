const { MessageEmbed } = require('discord.js');
const { TECHPOINT_CHAT_CHANNEL_ID } = require("../../config.json")
const { session_active, tmp_exist, create_tmp, create_files, ephemeral } = require("../../core/utils");


module.exports = {
    name: "techpoint",
    description: "launch the session.",
    options: [{
        name: 'session_title',
        description: 'the title of the session',
        type: 'STRING',
        required: true
    }],
    execute: async(client, interaction, args) => {
        if (!interaction.member.roles.cache.some(role => role.name === 'moderator')) {
            await interaction.reply(ephemeral(`You don't have access !`));
            return;
        }

        const session_title = interaction.options.getString('session_title');

        if (session_active()) {
            await interaction.reply(ephemeral(` TechPoint session already launched !`));
        } else {
            if (!tmp_exist()) {
                create_tmp()
            }
            create_files(session_title)
            const errorembed = new MessageEmbed()
                .setColor('#00ff00')
                .setTitle('TECHPOINT')
                .setDescription('Hello techpointers! enjoy your time and don\'t forget to take notes :) !');
            const channel = interaction.guild.channels.cache.get(TECHPOINT_CHAT_CHANNEL_ID);
            channel.send({ embeds: [errorembed] })
            await interaction.reply(ephemeral(` TechPoint session launched successfully !`));
        }
    }

};