const { SlashCommandBuilder } = require('@discordjs/builders');

const wait = require('util').promisify(setTimeout);
module.exports = {
    data: new SlashCommandBuilder()
    .setName('announce')
    .setDescription('Announce a message in a specific channel')
    .addStringOption(option =>
        option.setName('channel_name')
        .setDescription('Name of the channel where to announce')
        .setRequired(true)),
    async execute(interaction) {
        try {
            //The command should be executed at the #bot_announcements channel
            if(interaction.channel.name !== "général"){
                await interaction.reply("You're at the wrong channel!");
            }
            console.log(interaction.channel.name);
            interaction.channel.send("Send the message and the image here");
            await wait(15000);
            const filter = m =>true;
            const collector = interaction.channel.createMessageCollector({ filter, time: 15000 });
            let counter = 0;
            collector.on('collect', (m) => {
                console.log(`Collected ${m.content}`);
                interaction.channel.send("sent element");
                counter ++;
                if(counter>2){
                    collector.stop();
                }
            });

            /*collector.on('end',(m) => {
                console.log(`Collected ${m.size} items`);
            });*/
            if(m.size === 1){
                //sending the message only
                announcement_channel.send(m.last());
            }
            if(collected.size === 2){
                //sending message and image
                image = m.last;
                message = m.last;
                //won't work in here but i'll fix it
                announcement_channel.send(image);
                announcement_channel.send(message);
            }
            await wait(15000);
            //interaction.followUp(`${m.first().author} got the correct answer!`);
            const channel_name = interaction.options.getString('channel_name'); 
            announcement_channel = `${channel_name}`;
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