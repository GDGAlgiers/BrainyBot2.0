const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const path = require('path');
const fs = require("fs");
var date = new Date();

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
                .setColor('#0099ff')
                .setTitle('ERROR ❌')
                .setDescription('a techpoint session must be active to take a note');

            const channel = interaction.client.channels.cache.get('925210219338928169');


            channel.send({ embeds: [errorembed] })

        } else {

            fs.appendFileSync(__dirname + "/tmp" + "/notes" + ".md",
                '\n---\n' + note + ' added by : ' + interaction.user.username + '\n---\n', "UTF-8", { 'flags': 'a+' });

            const errorembed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('NOTE ADDED')
                .setDescription('thank you ' + interaction.user.username);

            const channel = interaction.client.channels.cache.get('925210219338928169');


            channel.send({ embeds: [errorembed] })
        }
    },

};