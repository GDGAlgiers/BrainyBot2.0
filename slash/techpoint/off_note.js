const { MessageEmbed } = require('discord.js');
const { TECHPOINT_CHAT_CHANNEL_ID } = require("../../config.json")
const { session_active, add_off_note, ephemeral } = require("../../core/utils");


module.exports = {
    name: "off_note",
    description: "Add a off note",
    options: [{
        name: 'note',
        description: 'the content of the note',
        type: 'STRING',
        required: true
    }],
    execute: async(client, interaction, args) => {
        const note = interaction.options.getString('note');

        if (!session_active()) {

            const errorembed = new MessageEmbed()
                .setColor('#FF0000')
                .setTitle('ERROR ❌')
                .setDescription('a techpoint session must be active to take a note');

            const channel = interaction.client.channels.cache.get(techpoint_chat_channel_id);


            channel.send({ embeds: [errorembed] })

        } else {
            if (interaction.channel.id !== TECHPOINT_CHAT_CHANNEL_ID) {
                await interaction.reply(ephemeral("You're at the wrong channel!"));
                return;
            }
            add_off_note(note, interaction.user.username)

            const succesembed = new MessageEmbed()
                .setColor('#00ff00')
                .setTitle('OFF NOTE ADDED')
                .setDescription(note);


            await interaction.reply({ embeds: [succesembed] })
        }
    }

};