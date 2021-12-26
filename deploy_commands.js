const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { client_id, guild_id, DISCORD_TOKEN, STARTUP_COGS } = require('./config.json');

const commands = [];
for (const cog of STARTUP_COGS) {
    const commandFiles = fs.readdirSync(`./cogs/${cog}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles){
        const command = require(`./cogs/${cog}/${file}`);
        commands.push(command.data.toJSON());
    }
}


const rest = new REST({ version: '9' }).setToken(DISCORD_TOKEN);

rest.put(Routes.applicationGuildCommands(client_id, guild_id), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);