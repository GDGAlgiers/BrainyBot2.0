const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { DISCORD_TOKEN, STARTUP_COGS } = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });


client.once('ready', c => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on('interactionCreate', interaction => {
    console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
});


client.commands = new Collection();

client.commands = new Collection();

for (const cog of STARTUP_COGS) {
    const commandFiles = fs.readdirSync(`./cogs/${cog}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles){
        const command = require(`./cogs/${cog}/${file}`);
        // Set a new item in the Collection
        // With the key as the command name and the value as the exported module
        client.commands.set(command.data.name, command);
    }
}

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});


// Login to Discord with your client's token
client.login(DISCORD_TOKEN);