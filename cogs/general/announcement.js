const { SlashCommandBuilder } = require('@discordjs/builders');
const { channel } = require('diagnostics_channel');
const { Client, ClientUser } = require('discord.js');

const wait = require('util').promisify(setTimeout);
module.exports = {
    data: new SlashCommandBuilder()
    .setName('announce')
    .setDescription('Announce a message in a specific channel')
    .addStringOption(option =>
        option.setName('channel_name')
        .setDescription('Name of the channel where to announce')
        .setRequired(true)),
    async execute(interaction,client) {
        try {
            await interaction.deferReply("wait for the bot");
            const channel_name = interaction.options.getString('channel_name'); 
            //trying to cast thechannel name from string to channel
            const announcement_channel = client.channels.cache.get(channel => channel.name === channel_name);
            console.log(announcement_channel.name);
            //const announcement_channel = client.cache.find(channel => channel.name === channel_name)
            //The command should be executed at the #bot_announcements channel
            if(interaction.channel.name !== "général"){
                await interaction.reply("You're at the wrong channel!");
            }
            console.log(interaction.channel.name);
            interaction.channel.send("Send the message and the image here");
            const filter = m => !m.author.bot; //ignore bot messages
            const collector = interaction.channel.createMessageCollector({ filter, time: 15000 });
            let counter = 0;
            collector.on('collect', (m) => {
                console.log(`Collected ${m.content}`);
                if(counter === 0){
                    announcement_channel.send(m.content);
                }
                interaction.channel.send("sent element");
                counter ++;
                if(counter>2){
                    collector.stop();
                }
            });
            
            /*collector.on('end',(m) => {
                console.log(`Collected ${m.size} items`);
            });*/
            await wait(15000);
            //interaction.followUp(`${m.first().author} got the correct answer!`);
            await interaction.editReply(`Your message has been successfully announced at ${channel_name}`);
        } catch (error) {
            console.log(error);
        }
    }
    /*async execute(interaction) {
        //change this line for moderator or whatever the role required
        if (!interaction.member.roles.cache.some(role => role.name === 'admin')) { 
            await interaction.reply(`You don't have access !`);
            return;
        }
        else{
            //converting the msg to string
            const message = interaction.options.getString('message');         
            const image_url = interaction.options.getString('image_url');
            //url = encodeURI(image_url);
            await interaction.reply(`${message} \n${image_url}`);
        }
        
        } */   
    
};
