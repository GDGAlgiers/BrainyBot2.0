const {MessageEmbed} = require('discord.js');
const {ephemeral} = require('../../core/utils');


const wait = require('util').promisify(setTimeout);

module.exports = {
  name: 'announce',
  description: 'Announce a message in a specific channel',
  options: [{
    name: 'channelName',
    description: 'Name of the channel where to announce',
    type: 'MENTIONABLE',
    required: true,
  }],
  execute: async (client, interaction, args) => {
    try {
      await interaction.deferReply(ephemeral('wait for the bot'));

      const channelName = interaction.options.getString('channelName');
      const announcementChannel =
      interaction.guild.channels.cache
          .get(channelName.substring(2, channelName.length - 1));

      if (!interaction.member.roles.
          cache.some((role) => role.name === 'moderator')) {
        await interaction.editReply(ephemeral('You don\'t have'+
        ' the role to execute this command!'));
        return;
      }
      if (interaction.channel.name !== 'bot_management') {
        await interaction.editReply(ephemeral('You\'re at the wrong channel!'));
      }

      await interaction.editReply(ephemeral('Send the message'+
      ' and the image in this channel now'));

      let recieved = false;
      const filter = (m) => m.author.id === interaction.member.id;
      const collector = interaction.channel
          .createMessageCollector({filter, time: 15000});

      collector.on('collect', (m) => {
        if (m) {
          recieved = true;

          if (m.attachments.size > 0) {
            m.attachments.every((msgAttach) => {
              const embeddedMsg = new MessageEmbed()
                  .setTitle('Announcement')
                  .setDescription(m.content).setImage(msgAttach.url);

              announcementChannel.send({
                embeds: [embeddedMsg],
              });

              interaction.editReply(ephemeral(`Your message`+
              ` has been successfully announced at ${channelName}`));
            });
          } else {
            announcementChannel.send(m.content);
          }
          collector.stop();
        }
      });

      await wait(15000);
      if (!recieved) {
        interaction.editReply(ephemeral('I didn\'t '+
        'recieve your announcement :/'));
      }
    } catch (error) {
      console.log(error);
    }
  },


};
