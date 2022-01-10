const chalk = require("chalk");
const os = require("os-utils");
const handleInteraction = require("./interactions");

function handleEvents(client) {
  /**
   * ON Client ready
   */
  client.on("ready", () => {
    const guildin = client.guilds.cache.size;
    const guildmember = client.users.cache.size;

    client.user.setPresence({ status: "online" });
    let textList = ["With GDG Algiers", "With WTM Algiers", "With You"];
    client.user.setPresence({ status: "online" });
    setInterval(() => {
      var text = textList[Math.floor(Math.random() * textList.length)];
      client.user.setActivity(text, { type: "PLAYING" });
    }, 3000);

    let allMembers = new Set();
    client.guilds.cache.forEach((guild) => {
      guild.members.cache.forEach((member) => {
        allMembers.add(member.user.id);
      });
    });

    let allChannels = new Set();
    client.guilds.cache.forEach((guild) => {
      guild.channels.cache.forEach((channel) => {
        allChannels.add(channel.id);
      });
    });

    console.log(
      chalk.bgMagentaBright.black(` ${client.guilds.cache.size} servers `),
      chalk.bgMagentaBright.black(` ${client.channels.cache.size} channels `),
      chalk.bgMagentaBright.black(` ${allMembers.size} members `)
    );
    console.log(
      chalk.bgMagentaBright.black(
        " in: " + guildin + " Servers " + "Serving: " + guildmember + " member"
      )
    );
    console.log(
      chalk.bgCyanBright.black(`Current Cpu core : ${os.cpuCount()}`)
    );
  });
  /**
   * On interaction created
   */
  client.on("interactionCreate", (interaction) =>
    handleInteraction(interaction, client)
  );
}
module.exports = {
  handleEvents,
};
