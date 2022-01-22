const { MessageEmbed } = require('discord.js');
const { techpoint_chat_channel_id } = require("../../config.json")
const { session_active, add_note } = require("../../core/utils");


module.exports = {
    name: "res",
    description: "Add a resource.",
    options: [{
        name: 'link',
        description: 'the resource\'s link',
        required: true
    }, {
        name: 'description',
        description: 'the resource\'s description',
        required: true
    }],
    execute: async(client, interaction, args) => {
        const url = interaction.options.getString('link');
        const descreption = interaction.options.getString('descreption');
        if (!session_active()) {
            const errorembed = new MessageEmbed()
                .setColor('#FF0000')
                .setTitle('ERROR ❌')
                .setDescription('a techpoint session must be active to take a note');
            const channel = interaction.client.channels.cache.get(techpoint_chat_channel_id);
            channel.send({ embeds: [errorembed] })
        } else {
            add_res(url, descreption, interaction.user.username)


            const succesembed = new MessageEmbed()
                .setColor('#00FF00')
                .setTitle('RESOURCE ADDED')
                .setDescription(descreption)
                .setURL(url);

            const channel = interaction.client.channels.cache.get(techpoint_chat_channel_id);
            channel.send({ embeds: [succesembed] })
        }
    }

};