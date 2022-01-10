const { SlashCommandBuilder } = require('@discordjs/builders');
const { channel } = require('diagnostics_channel');
const { MessageEmbed } = require('discord.js');

const ephemeral = (msg) => {
    return {
        content: msg,
        ephemeral: true
    }
}

const wait = require('util').promisify(setTimeout);

module.exports = {
    name: "announce",
    description: "Announce a message in a specific channel",
    options: [{
        name: 'channel_name',
        description: 'Name of the channel where to announce',
        type: 'MENTIONABLE',
        required: true
    }],
    execute: async(client, interaction, args) => {
        try {
            await interaction.deferReply(ephemeral("wait for the bot"));

            const channel_name = interaction.options.getString('channel_name');
            const announcement_channel = interaction.guild.channels.cache.get(channel_name.substring(2, channel_name.length - 1));

            if (interaction.channel.name !== "général") {
                await interaction.reply(ephemeral("You're at the wrong channel!"));
            }

            await interaction.editReply(ephemeral("Send the message and the image in this channel now"));

            let recieved = false;
            const filter = m => m.author.id === interaction.member.id;
            const collector = interaction.channel.createMessageCollector({ filter, time: 15000 });

            collector.on('collect', (m) => {
                if (m) {
                    recieved = true;

                    if (m.attachments.size > 0) m.attachments.every((msgAttach) => {

                        const embedded_msg = new MessageEmbed().setTitle("Announcement").setDescription(m.content).setImage(msgAttach.url);

                        announcement_channel.send({
                            embeds: [embedded_msg]
                        });

                        interaction.editReply(ephemeral(`Your message has been successfully announced at ${channel_name}`));
                    });
                    else {
                        announcement_channel.send(m.content)
                    }
                    collector.stop();
                }
            });

            await wait(15000);
            if (!recieved) {
                interaction.editReply(ephemeral("I didn't recieve your announcement :/"))
            }

        } catch (error) {
            console.log(error);
        }
    }


};