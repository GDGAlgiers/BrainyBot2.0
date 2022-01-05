const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');
const wait = require('util').promisify(setTimeout);



module.exports = {
    data: new SlashCommandBuilder()
        .setName('hello')
        .setDescription('Replies with Pong!'),
    async execute(interaction) {
        try {
            await interaction.reply("waiting for messages");
            const filter = m => true;
            const collector = interaction.channel.createMessageCollector({ filter, time: 15000 });

            collector.on('collect', (m) => {
                console.log(m.attachments);
            });

            collector.on('end', (collected) => {
                console.log(`Collected ${collected.size} items`);
            });
            await wait(15000);
            await interaction.editReply('finished listening for messages');
        } catch (error) {
            console.log(error);
        }
    }
}