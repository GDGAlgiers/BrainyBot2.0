const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const path = require('path');
const fs = require("fs");
const {paragraph, author} = require("../../core/markdown_utils");
var date = new Date();
const {techpoint_chat_channel_id} = require("../../config.json")
function session_active() {
    console.log(__dirname)
    return fs.existsSync(__dirname + "/tmp" + "/" + date.toDateString() + ".md")
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('note')
        .setDescription('add a note')
        .addStringOption(option =>
            option.setName('note')
            .setDescription('the note')
            .setRequired(true)),
    async execute(interaction) {
        const note = interaction.options.getString('note');

        if (!session_active()) {

            const errorembed = new MessageEmbed()
                .setColor('#ff0000')
                .setTitle('ERROR ❌')
                .setDescription('a techpoint session must be active to take a note');

            const channel = interaction.client.channels.cache.get(techpoint_chat_channel_id);


            channel.send({ embeds: [errorembed] })

        } else {


            fs.appendFileSync(__dirname + "/tmp" + "/notes" + ".md",
                '\n---\n' +paragraph(note)  +  author(interaction.user.username) + '\n---\n', "UTF-8", { 'flags': 'a+' });

            const succesembed = new MessageEmbed()
                .setColor('#00ff00')
                .setTitle('NOTE ADDED')
                .setDescription(note);

            const channel = interaction.client.channels.cache.get(techpoint_chat_channel_id);


            channel.send({ embeds: [succesembed] })

        }
    },

};