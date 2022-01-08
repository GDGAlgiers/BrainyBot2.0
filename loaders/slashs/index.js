const fs = require("fs");
const ascii = require("ascii-table");
function loadSlashCommands(client) {
  let slash = [];

  const table = new ascii().setHeading(" Slash Commands", "Load Status");

  const commandFolders = fs.readdirSync("./slashs");
  for (const folder of commandFolders) {
    if (!client.config.SLASH_COMMANDS_STARTUP_COGS.includes(folder)) continue;
    const commandFiles = fs
      .readdirSync(`./slashs/${folder}`)
      .filter((file) => file.endsWith(".js"));
    for (const file of commandFiles) {
      const command = require(`../slashs/${folder}/${file}`);
      if (command.name) {
        client.slash.set(command.name, command);
        slash.push(command);
        table.addRow(file, "✔️");
      } else {
        table.addRow(
          file,
          "❌ => Missing a help.name or help.name is not in string"
        );
      }
    }
    console.log(table.toString());
  }

  client.on("ready", async () => {
    await client.application.commands.set(slash);
  });
}
module.exports = { loadSlashCommands };
