const config = require("../../config.json");
const chalk = require("chalk");

/**
 * Checks if the proper values have been provided in the config.json file!
 */

async function checkValidConfig() {
  if (!config.BOT_TOKEN) {
    throw ReferenceError(
      chalk.bgRedBright.black("[CONFIG_ERR] BOT_TOKEN_WAS_NOT_FOUND")
    );
  }

  if (!config.COMMANDS_STARTUP_COGS) {
    throw ReferenceError(
      chalk.bgRedBright.black("[CONFIG_ERR] COMMANDS_STARTUP_COGS NOT FOUND")
    );
  }

  if (!config.SLASH_COMMANDS_STARTUP_COGS) {
    throw ReferenceError(
      chalk.bgRedBright.black(
        "[CONFIG_ERR] SLASH_COMMANDS_STARTUP_COGS NOT FOUND"
      )
    );
  }

  if (!config.ERROR_LOGS_CHANNEL) {
    throw ReferenceError(
      chalk.bgRedBright.black(
        "[CONFIG_ERR] ERROR_LOGS_CHANNEL_ID_WAS_NOT_FOUND"
      )
    );
  }
  if (!config.DEFAULT_PREFIX) {
    throw ReferenceError(
      chalk.bgRedBright.black("[CONFIG_ERR] DEFAULT_PREFIX_WAS_NOT_FOUND")
    );
  }
}

module.exports = {
  checkValidConfig,
};
