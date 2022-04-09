const fs = require('fs');
const Ascii = require('ascii-table');

/**
 *
 * @param {*} client
 */
function loadCommands(client) {
  const commands = [];

  const table = new Ascii().setHeading(' Slash Commands', 'Load Status');

  const commandFolders = fs.readdirSync('src/commands');
  for (const folder of commandFolders) {
    if (!client.config.SLASH_COMMANDS_STARTUP_COGS.includes(folder)) continue;
    const commandFiles = fs
        .readdirSync(`src/commands/${folder}`)
        .filter((file) => file.endsWith('.js'));
    for (const file of commandFiles) {
      const command = require(`../../commands/${folder}/${file}`);
      if (command.name && !command.disabled) {
        client.commands.set(command.name, command);
        commands.push(command);
        table.addRow(file.split('.')[0], '✅');
      } else {
        const msg = command.disabled ?
          `❌ => Command '${command.name}' is disabled` :
          '❌ => Missing a help.name or help.name is not a string';
        table.addRow(file, msg);
      }
    }
  }
  console.log(table.toString());
  client.on('ready', async () => {
    await client.application.commands.set(commands);
  });
}
module.exports = {loadCommands};
