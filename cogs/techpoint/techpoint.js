const path = require('path');
const fs = require("fs");


FILES = {
    "tmp/notes.md": "Notes",
    "tmp/resources.md": "Resources",
    "tmp/off_notes.md": "Off topic notes",
    "tmp/off_resources.md": "Off topic resources"
}

const { SlashCommandBuilder } = require('@discordjs/builders');
const { title } = require('process');
var date = new Date();

function session_active() {
    console.log(__dirname)
    return fs.existsSync(__dirname + "/tmp" + "/" + date.toDateString() + ".md")
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('techpoint')
        .setDescription('lanch the session')
        .addStringOption(option =>
            option.setName('session_title')
            .setDescription('the title of the session')
            .setRequired(true)),
    async execute(interaction) {

        // if (!interaction.member.roles.cache.some(role => role.name === 'moderator')) {
        //     await interaction.reply(`You don't have access !`);
        //     return;
        // }

        const session_title = interaction.options.getString('session_title');

        if (session_active()) {
            await interaction.reply(`${session_title} launched !`);
        } else {
            if (!fs.existsSync(__dirname + "/tmp")) {
                fs.mkdir(__dirname + "/tmp", function(err, path) { console.log(err) })
            }
            var content = '---\nTitle: ' + session_title + '\n---\n' +
                "Techpoint : " + session_title + '\n' +
                date.toDateString() + '\n'

            fs.appendFile(__dirname + "/tmp" + "/" + date.toDateString() + ".md", content, function(err) { console.log(err) }, )


            // un fichier pour chaque sallon 
            fs.appendFile(__dirname + "/tmp" + "/notes" + ".md", "NOTES", function(err) { console.log(err) }, )
            fs.appendFile(__dirname + "/tmp" + "/resources" + ".md", "RESOURCES", function(err) { console.log(err) }, )
            fs.appendFile(__dirname + "/tmp" + "/off_notes" + ".md", "OFF NOTES", function(err) { console.log(err) }, )
            fs.appendFile(__dirname + "/tmp" + "/off_resources" + ".md", "OFF RESOURCES", function(err) { console.log(err) }, )



            interaction.reply("Hello techpointers! enjoy your time and don't forget to take notes :) !")
        }
    },
};