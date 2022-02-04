const {MessageEmbed} = require('discord.js');
const {ephemeral} = require('../../utils');


module.exports = {
  name: 'announce',
  description: 'Announce a message in a specific channel',
  options: [{
    name: 'channel_name',
    description: 'Name of the channel where to announce',
    type: 'CHANNEL',
    channelTypes: ['GUILD_TEXT', 'GUILD_NEWS'],
    required: true,
  }],
  execute: async (client, interaction, args) => {
    try {
      await interaction.deferReply(ephemeral('Wait for the bot'));

      const channelName = interaction.options.getChannel('channel_name');

      if (!interaction.member.roles
          .cache.some((role) => role.name === 'Lead' ||
          role.name === 'Co-Manager')) {
        await interaction.editReply(ephemeral('You don\'t have' +
                    ' the role to execute this command!'));
        return;
      }

      const interact = await interaction.editReply({content:
         'Send the text and the image (in one message) in this channel now!',
      fetchReply: true, ephemeral: true});
      const filter = (m) => m.author.id === interaction.member.id;
      const collector = interaction.channel
          .createMessageCollector({filter, max: 1, time: 90 * 1000});
      collector.on('collect', async (m) => {
        if (m) {
          // generate random color for the embed (s)
          color = '#' + ((1 << 24) * Math.random() | 0).toString(16);
          // create the embeds, each embed includes one attachement
          if (m.attachments.size > 0) {
            embeds = [];
            await m.attachments.forEach((msgAttach) => {
              const embeddedMsg = new MessageEmbed()
                  .setColor(color)
                  .setImage(msgAttach.url);
              embeds.push(embeddedMsg);
            });
            if (embeds.length === 1) {
              // send the embeds
              channelName.send({
                embeds: [embeds[0].setDescription(m.content).setAuthor('GDG Algiers', 'https://www.gdgalgiers.com/static/phonelogo-db9c725b1463afd46d9b886076124bb2.png').setFooter(interact.author.username, interact.author.displayAvatarURL({format: 'png'}))],
              });
            } else { // send the embeds
              channelName.send({
                embeds: [embeds[0].setDescription(m.content).setAuthor('GDG Algiers', 'https://www.gdgalgiers.com/static/phonelogo-db9c725b1463afd46d9b886076124bb2.png'), ...(embeds.slice(1, -1)), embeds[embeds.length - 1].setFooter(interact.author.username, interact.author.displayAvatarURL({format: 'png'}))],
              });
            }
          } else {
            await channelName.send(m.content);
          }
          // confirm that the message has been announced
          await interaction.followUp(ephemeral(`Your message`+
          ` has been successfully announced at ${channelName}`));
        }
      });
      collector.on('end', async (collected) => {
        if (collected.size === 0) {
          await interaction.followUp(ephemeral('I didn\'t'+
          ' receive your announcement :/'));
        }
        return;
      });
    } catch (error) {
      console.log(error);
    }
  },
};
