const { MessageEmbed } = require('discord.js');
const { TECHPOINT_CHAT_CHANNEL_ID } = require('../../../config.json');
const { sessionActive, addRes } = require('../../core/techpoint');


module.exports = {
    name: 'res',
    description: 'Add a resource.',
    options: [{
        name: 'link',
        description: 'the resource\'s link',
        type: 'STRING',
        required: true,
    }, {
        name: 'description',
        description: 'the resource\'s description',
        type: 'STRING',
        required: true,
    }],
    execute: async(client, interaction, args) => {
        const url = interaction.options.getString('link');
        const description = interaction.options.getString('description');
        if (!sessionActive()) {
            const errorembed = new MessageEmbed()
                .setColor('#FF0000')
                .setTitle('ERROR ❌')
                .setDescription('a techpoint session must be active to take a note');
            const channel = interaction.client
                .channels.cache.get(techpoint_chat_channel_id);
            channel.send({ embeds: [errorembed] });
        } else {
            if (interaction.channel.id !== TECHPOINT_CHAT_CHANNEL_ID) {
                await interaction.reply(ephemeral('You\'re at the wrong channel!'));
                return;
            }
            addRes(url, description, interaction.user.username);

            const succesembed = new MessageEmbed()
                .setColor('#00FF00')
                .setTitle('RESOURCE ADDED')
                .setDescription(description)
                .setURL(url);

            await interaction.reply({ embeds: [succesembed] });
        }
    },

};