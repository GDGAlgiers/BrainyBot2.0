/* eslint-disable new-cap */
const chalk = require('chalk');


/**
 * Checks if the proper values have been provided in the config.json file!
 * @param {*} client
 */
async function checkValidConfig(client) {
  if (!client.config.ERROR_LOGS_CHANNEL) {
    throw ReferenceError(
        chalk.bgRedBright.black(
            '[CONFIG_ERR] ERROR_LOGS_CHANNEL_ID_WAS_NOT_FOUND',
        ),
    );
  }
  if (!client.config.DISCORD_TOKEN) {
    throw ReferenceError(
        chalk.bgRedBright.black('[CONFIG_ERR] BOT_TOKEN_WAS_NOT_FOUND'),
    );
  }


  if (!client.config.SLASH_COMMANDS_STARTUP_COGS) {
    throw ReferenceError(
        chalk.bgRedBright.black(
            '[CONFIG_ERR] SLASH_COMMANDS_STARTUP_COGS NOT FOUND',
        ),
    );
  }
}
module.exports = {
  checkValidConfig,
};
