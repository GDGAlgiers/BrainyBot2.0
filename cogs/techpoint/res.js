

const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const path = require('path');
const fs = require("fs");
const {techpoint_chat_channel_id} = require("../../config.json")
const {link, paragraph, author} = require("../../core/markdown_utils");
const {session_active, add_res} = require("../../core/utils");



module.exports = {
    data: new SlashCommandBuilder()
        .setName('res')
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
           add_res(url , descreption , interaction.user.username)


            const succesembed = new MessageEmbed()
                .setColor('#00FF00')
                .setTitle('RESOURCE ADDED')
                .setDescription(descreption)
                .setURL(url);

            const channel = interaction.client.channels.cache.get(techpoint_chat_channel_id);
            channel.send({ embeds: [succesembed] })
        }
    },

};