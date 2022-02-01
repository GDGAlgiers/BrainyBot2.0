const moment = require('moment');
const chalk = require('chalk');

/**
 *
 */
class Logger {
  /**
   * Get formatted time and date
   */
  get now() {
    return moment().format('DD-MM-YYYY, HH:mm:ss a');
  }

  /**
   *
   * @param {*} type
   * @param {*} error
   * @return {*}
   */
  error(type, error) {
    return console.error(
        `${chalk.red('[ERROR]')}[${type.toUpperCase()}][${this.now}]: ${error}`,
    );
  }

  /**
   *
   * @param {*} type
   * @param {*} warning
   * @return {*}
   */
  warn(type, warning) {
    return console.warn(
        `${chalk.yellow('[WARNING]')}[${type.toUpperCase()}][${
          this.now
        }]: ${warning}`,
    );
  }

  /**
   *
   * @param {*} type
   * @param {*} text
   * @return {*}
   */
  log(type, text) {
    return console.log(
        `${chalk.blue('[LOG]')}[${type.toUpperCase()}][${this.now}]: ${text}`,
    );
  }

  /**
   *
   * @param {*} type
   * @param {*} content
   * @return {*}
   */
  info(type, content) {
    return console.log(
        `${chalk.blueBright('[INFO]')}[${type.toUpperCase()}][${
          this.now
        }]: ${content}`,
    );
  }
}

const logger = new Logger();
module.exports = logger;
