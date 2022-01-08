const { Client, Collection, Intents, MessageEmbed } = require("discord.js");
const logger = require("./utils/logger");
const embed = require("./utils/embed");
const utils = require("./utils");
const config = require("./config.json");
const chalk = require("chalk");
const { checkValidConfig } = require("./utils/validator");
const { loadCommands } = require("./loaders/commands");
const { loadSlashCommands } = require("./loaders/slashs");
const handleEvents = require("./core/handler");

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_PRESENCES,
  ],
});

/**
 * Initializing discord client
 */
client.commands = new Collection();
client.slashCommands = new Collection();
client.logger = logger;
client.embed = embed;
client.utils = utils;

// load config
client.config = {};
for (var conf in config) {
  if (conf in process.env) {
    client.config[conf] = process.env[conf];
  } else {
    client.config[conf] = config[conf];
  }
}

// check the configurations
checkValidConfig(client);
// load the commands
loadCommands(client);
loadSlashCommands(client);
// event handlers
handleEvents(client);
// Error Handling

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception: " + err);
  if (client.config.ERROR_LOGS_CHANNEL) {
    const exceptionembed = new MessageEmbed()
      .setTitle("Uncaught Exception")
      .setDescription(`${err}`)
      .setColor("RED");
    client.channels.cache
      .get(client.config.ERROR_LOGS_CHANNEL)
      .send({ embeds: [exceptionembed] });
  }
});

process.on("unhandledRejection", (reason, promise) => {
  console.log(
    "[FATAL] Possibly Unhandled Rejection at: Promise ",
    promise,
    " reason: ",
    reason.message
  );
  if (client.config.ERROR_LOGS_CHANNEL) {
    const rejectionembed = new MessageEmbed()
      .setTitle("Unhandled Promise Rejection")
      .addField("Promise", `${promise}`)
      .addField("Reason", `${reason.message}`)
      .setColor("RED");
    client.channels.cache
      .get(client.config.ERROR_LOGS_CHANNEL)
      .send({ embeds: [rejectionembed] });
  }
});

// Login to Discord with your client's token
client.login(client.config.DISCORD_TOKEN).then(() => {
  console.log(
    chalk.bgBlueBright.black(
      ` Successfully logged in as: ${client.user.username}#${client.user.discriminator} `
    )
  );
});
