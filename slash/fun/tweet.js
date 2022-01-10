const { SlashCommandBuilder } = require('@discordjs/builders');

//utils
const fetch = (...args) =>
    import ('node-fetch').then(({ default: fetch }) => fetch(...args));
const { MessageEmbed } = require('discord.js');
const { get_advice } = require("../../core/utils");

module.exports = {
    name: 'tweet',
    description: 'You can tweet as someone else to troll others',
    options: [{
            name: "account",
            description: 'Enter the tweeter user"s account',
            type: 'MENTIONABLE',
            required: true,
        },
        {
            name: "text",
            description: 'The content of your tweet',
            type: 'MENTIONABLE',
            required: true
        }
    ],
    execute: async(interaction) => {
        const account = interaction.options.getString('account');

        const text = interaction.options.getString('text');

        if (!account) {
            await interaction.reply("Your Tweet must have an Account name");
            await interaction.followUp(`Example: /tweet account:Brainy text:${get_advice()}`);

            //throwing exeption of command syntax error
            return;
        }

        if (!text) {
            await interaction.reply("Your Tweet must have an text content");
            await interaction.followUp(`Example: /tweet account:Brainy text:${get_advice()}`);

            //throwing exeption of command syntax error
            return;
        }

        //getting the image URL:
        const url = `https://nekobot.xyz/api/imagegen?type=tweet&username=${account}&text=${text}`;
        const res = await fetch(url);
        const data = await res.json();
        const imageUrl = data["message"];

        //Embeding the image in An Embeded message
        const EmbededTweet = new MessageEmbed()
            .setColor('0x00FF00')
            .setTitle(`You made ${account} tweet this:`)
            .setImage(imageUrl)
            .setTimestamp();

        //replying with the Embeded message
        await interaction.reply({ embeds: [EmbededTweet] });
    }
};