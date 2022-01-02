const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const path = require('path');
const fs = require("fs");
const {author, paragraph , link} = require("../../core/markdown_utils");
const {techpoint_chat_channel_id} = require("../../config.json")
const {add_off_res, session_active} = require("../../core/utils");
var date = new Date();


module.exports = {
    data: new SlashCommandBuilder()
        .setName('offres')
        .setDescription('add a resource')
        .addStringOption(option =>
            option.setName('link')
            .setDescription("the resource's link")
            .setRequired(true))
        .addStringOption(option =>
            option.setName('descreption')
            .setDescription("descreption")
            .setRequired(true)),
    async execute(interaction) {
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
                add_off_res(url,descreption,interaction.user.username)


                const succesembed = new MessageEmbed()
                    .setColor('#00FF00')
                    .setTitle('OFF RESOURCE ADDED')
                    .setDescription(descreption)
                    .setURL(url);

                const channel = interaction.client.channels.cache.get(techpoint_chat_channel_id);
                channel.send({ embeds: [succesembed] })

            }
        }catch (e){
            console.log(e)
        }
    },

};