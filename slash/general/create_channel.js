const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('create_channel')
        .setDescription('creates a text channel')
        .addStringOption(option =>
            option.setName('channel_name')
            .setDescription('the name of the text channel that will be created')
            .setRequired(true)),
    async execute(interaction) {
        if (!interaction.member.roles.cache.some(role => role.name === 'admin')) {
            await interaction.reply(`You don't have access !`);
            return;
        }


        const channel_name = interaction.options.getString('channel_name');

        interaction.guild.channels.create(channel_name, {
            type: 'text'
        }).then(channel => {
            channel.setParent("806282165406138380");
        });


        await interaction.reply(`${channel_name} text channel is created successfully !`);
    },
};