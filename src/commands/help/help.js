const fs = require('fs');
const {MessageEmbed} = require('discord.js');

module.exports = {
  name: 'help',
  description: 'Display a list of available commands for this user',
  options: null,
  execute: async (client, interaction, args) => {
    const embedMess = new MessageEmbed()
        .setTitle('Available Commandes :')
        .setColor(3447003);

    const cogs = ['fun', 'general', 'techpoint', 'help', 'wordle'];
    for (const cog of cogs) {
      const commandFiles = fs
          .readdirSync(`./src/commands/${cog}`)
          .filter((file) => file.endsWith('.js'));
      for (const file of commandFiles) {
        const command = require(`../${cog}/${file}`);
        embedMess.addFields({
          name: command.name,
          value: command.description,
        });
      }
    }

    if (
      interaction.member.roles.cache.some(
          (role) =>
            role.name === 'Lead' ||
          role.name === 'moderator' ||
          role.name === 'Co-Manager' ||
          role.name === 'owner',
      )
    ) {
      // Grab mods commands & push it to embedMess
      let commandFiles = fs
          .readdirSync(`./src/commands/mods`)
          .filter((file) => file.endsWith('.js'));
      for (const file of commandFiles) {
        const command = require(`../mods/${file}`);
        embedMess.addFields({
          name: command.name,
          value: command.description,
        });
      }

      // Grab owner commands & push it to embedMess
      commandFiles = fs
          .readdirSync(`./src/commands/owner`)
          .filter((file) => file.endsWith('.js'));
      for (const file of commandFiles) {
        const command = require(`../owner/${file}`);
        embedMess.addFields({
          name: command.name,
          value: command.description,
        });
      }
    }

    await interaction.reply({
      embeds: [embedMess],
    });
  },
};
