const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const path = require('path');
const fs = require("fs");
const {author, paragraph , link} = require("../../core/markdown_utils");
var date = new Date();

function session_active() {
    console.log(__dirname)
    return fs.existsSync(__dirname + "/tmp" + "/" + date.toDateString() + ".md")
}

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

                const channel = interaction.client.channels.cache.get('925210219338928169');


                channel.send({ embeds: [errorembed] })
                interaction.user.ended()
            } else {

                fs.appendFileSync(__dirname + "/tmp" + "/off_resources" + ".md",
                    '\n---\n' +link(url,url)  + ' ' + paragraph(descreption) + ' added by ' + author(interaction.user.username) + '\n---\n',
                    "UTF-8", { 'flags': 'a+' });


                const succesembed = new MessageEmbed()
                    .setColor('#00FF00')
                    .setTitle('RESOURCE ADDED')
                    .setDescription(descreption)
                    .setURL(url);

                const channel = interaction.client.channels.cache.get('925210219338928169');
                channel.send({ embeds: [succesembed] })

            }
        }catch (e){
            console.log(e)
        }
    },

};