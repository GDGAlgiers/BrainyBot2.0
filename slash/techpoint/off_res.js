const { MessageEmbed } = require('discord.js');
const { techpoint_chat_channel_id } = require("../../config.json")
const { session_active, add_note } = require("../../core/utils");


module.exports = {
    name: "offres",
    description: "Add an off resource",
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
        try {
            const url = interaction.options.getString('link');
            const descreption = interaction.options.getString('descreption');

            if (!session_active()) {

                const errorembed = new MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('ERROR ❌')
                    .setDescription('a techpoint session must be active ');

                const channel = interaction.client.channels.cache.get(techpoint_chat_channel_id);


                channel.send({ embeds: [errorembed] })
            } else {
                add_off_res(url, descreption, interaction.user.username)


                const succesembed = new MessageEmbed()
                    .setColor('#00FF00')
                    .setTitle('OFF RESOURCE ADDED')
                    .setDescription(descreption)
                    .setURL(url);

                const channel = interaction.client.channels.cache.get(techpoint_chat_channel_id);
                channel.send({ embeds: [succesembed] })

            }
        } catch (e) {
            console.log(e)
        }
    }

};