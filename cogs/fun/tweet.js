const { SlashCommandBuilder } =  require('@discordjs/builders');

//utils
const { https } = require('https');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('tweet')
    .setDescription('You can tweet as someone else to troll others')
    .addStringOption(option => option.setName('account').setDescription('Enter the tweeter user"s account') )
    .addStringOption(option => option.setName("text").setDescription("The content of your tweet") ),
    async execute(interaction) {

        const url = `https://nekobot.xyz/api/imagegen?type=tweet&username=${interaction.options.getString('account')}&text=${interaction.options.getString('text')}`;

        const request = new https.request(url, (response) => {
            let data = '';

            response.on('data', (chunck) => {
                data = data + chunck.toString();
            });

            response.on('end', () => {
                const body = JSON.parse(data);
                console.log(` log: ${body}`);
            });
        });

        request.on('error', (error) => {
            console.log('An Error', error);
        });

        request.end() ;

        console.log(`User: ${interaction.options.getString('account')} Text: ${interaction.options.getString('text')} `);
        await interaction.reply(`User: ${body} Text: ${interaction.options.getString('text')} `);
    }
};

