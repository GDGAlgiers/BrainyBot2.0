const fs = require("fs");
const { Client, Collection, Intents } = require("discord.js");
const { DISCORD_TOKEN, STARTUP_COGS } = require("./config.json");
const logger = require("./utils/logger");
const embed = require("./utils/embed");
const utils = require("./utils");
const { checkValidConfig } = require("./utils/validator");
import { loadCommands } from "./loaders/commands";
import { loadSlashCommands } from "./loaders/slashs";

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
checkValidConfig();
loadCommands(client);
loadSlashCommands(client);




// Error Handling

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception: " + err);

  const exceptionembed = new MessageEmbed()
    .setTitle("Uncaught Exception")
    .setDescription(`${err}`)
    .setColor("RED");
  client.channels.cache
    .get(ERROR_LOGS_CHANNEL)
    .send({ embeds: [exceptionembed] });
});

process.on("unhandledRejection", (reason, promise) => {
  console.log(
    "[FATAL] Possibly Unhandled Rejection at: Promise ",
    promise,
    " reason: ",
    reason.message
  );

  const rejectionembed = new MessageEmbed()
    .setTitle("Unhandled Promise Rejection")
    .addField("Promise", `${promise}`)
    .addField("Reason", `${reason.message}`)
    .setColor("RED");
  client.channels.cache
    .get(ERROR_LOGS_CHANNEL)
    .send({ embeds: [rejectionembed] });
});

// Login to Discord with your client's token
client.login(BOT_TOKEN).then(() => {
  console.log(
    chalk.bgBlueBright.black(
      ` Successfully logged in as: ${client.user.username}#${client.user.discriminator} `
    )
  );
});
