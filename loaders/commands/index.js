import fs from "fs";
import ascii from "ascii-table";
export function loadCommands(client) {
  const table = new ascii().setHeading("Commands", "Load Status");

  const commandFolders = fs.readdirSync("./commands");
  for (const folder of commandFolders) {
    if (!client.config.COMMANDS_STARTUP_COGS.includes(folder)) continue;
    const commandFiles = fs
      .readdirSync(`./commands/${folder}`)
      .filter((file) => file.endsWith(".js"));
    for (const file of commandFiles) {
      const command = require(`../commands/${folder}/${file}`);
      if (command.name) {
        client.commands.set(command.name, command);
        table.addRow(file, "✔️");
      } else {
        table.addRow(
          file,
          "❌ => Missing a help.name or help.name is not in string"
        );
        continue;
      }
      if (command.aliases && Array.isArray(command))
        command.aliases.forEach((alias) =>
          client.aliases.set(alias, command.name)
        );
    }
    console.log(table.toString());
  }
}
