const {MessageActionRow, MessageButton, MessageEmbed} = require('discord.js');
const {AuthorizationError, ArgumentError} = require('../../core/errors');
const progressbar = require('string-progressbar');
const {nbVotes} = require('../../core/poll');
const uuid = require('uuid');

module.exports = {
  name: 'poll',
  description: 'Create a poll where members can vote.',
  options: [{
    name: 'question',
    description: 'Enter the poll question',
    type: 'STRING',
    required: true,
  },
  {
    name: 'options',
    description: 'Poll options',
    type: 'STRING',
    required: true,
  },
  ],
  execute: async (client, interact) => {
    const reactions = ['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣',
      '7️⃣', '8️⃣', '9️⃣',
      '🔟', '🅰', '🅱', '🅲', '🅳', '🅴', '🅵', '🅶', '🅷', '🅸', '🅹',
      '🅺', '🅻', '🅼', '🅽', '🅾', '🅿︎', '🆀', '🆁', '🆂', '🆃', '🆄',
      '🆅', '🆆', '🆇', '🆈', '🆉']; // emojis to be used in the buttons
    const question = interact.options.getString('question');
    const options = interact.options.getString('options').split(',');
    const total = 100;
    // if there misses poll question or poll options, throw error
    if (!question || !options) {
      new ArgumentError(interact);
      return;
    }

    const PollEmbed = new MessageEmbed() // set the embed attributes
        .setColor('RANDOM')
        .setTitle('📊 ' + question)
        .setFooter('You can choose multiple options\nClick'+
        ' on 🛑 to end the poll | Created by ' + interact.user.username);
    const component = []; // will contain the buttons
    let i = 0;
    if (reactions.length < options.length) {
      await interact.reply({content: '🛑 You\'ve exceeded'+
      ' the authorized number of options, please try again!',
      ephemeral: true}); return;
    } // there are more options than emojis
    const id = uuid.v4(); // The poll id
    options.forEach((option, index) => { // add buttons
      const bar = progressbar.filledBar(total, 0, 20, ' ', '█');
      // create the embed field
      PollEmbed.addField(reactions[index] + ' ' +
       `**${option}**`, '`' + bar[0] + '`' + ' | ' +
        `${bar[1]}% (0 votes)`, false);

      if ((index % 5) === 0) {
        component.push(new MessageActionRow());
        if (index !== 0) {
          i++;
        }
      }
      component[i].addComponents(
          new MessageButton()
              .setCustomId(`${index} ${id}`)
              .setLabel(reactions[index])
              .setStyle('SECONDARY'),
      );
    });
    if (component[i].components.length === 5) {
      component.push(new MessageActionRow());
      i++;
    }
    component[i].addComponents( // add button with which we can end the poll
        new MessageButton()
            .setCustomId(`end_poll ${id}`)
            .setEmoji('🛑')
            .setStyle('DANGER'),
    );
    // send the poll
    await interact.reply({embeds: [PollEmbed],
      components: component, fetchReply: true});

    const filter = (button) => {
      return !button.user.bot && button.customId.split(' ')[1] === id;
    };
    const collector = interact.channel.createMessageComponentCollector({
      filter,
    }); // listen to clicks
    // contains a key: value pairs where key corresponds
    // to the user's id and value is a list of his votes
    let totalVotes = {};
    collector.on('collect', async (interaction) => {
      let undo = false;
      const optionNumber = interaction.customId.split(' ')[0];
      if (optionNumber === 'end_poll') {
        // check if the user corresponds to the one who created the poll
        if (interaction.user.id === interaction.message.interaction.user.id) {
          totalVotes = {}; // delete votes related to this poll
          await interaction.update({
            embeds: [interaction.message.embeds[0]],
            components: [],
          }); // hide the buttons
          await interaction.followUp({
            embeds: [interaction.message.embeds[0]
                .setFooter('This poll has ended, find above the'+
                ' final results | Created by ' +
                 interaction.user.username)],
            components: [],
          });
          collector.stop(); // ends listener
        } else {
          // the user is not the one who created the poll
          new AuthorizationError(interaction);
        }

        return;
      }
      // if this user already voted on a poll
      if (totalVotes[interaction.user.id]) {
        // if he has already chosen this option, it will undo his vote
        if (totalVotes[interaction.user.id].includes(interaction.customId)) {
          undo = true;
          totalVotes[interaction.user.id].splice(totalVotes[interaction.user.id]
              .indexOf(interaction.customId), 1); // delete the vote
        } else {
          // add the user's vote to the value list corresponding to his id
          totalVotes[interaction.member.id].push(interaction.customId);
        }
      } else {
        // add a new user to the votes object
        totalVotes[interaction.member.id] = [interaction.customId];
      }

      const votes = nbVotes(totalVotes); // get the total number of votes
      // update each of the fields
      interaction.message.embeds[0].fields.forEach((field, index) => {
        // get the number of previous votes to that option
        let votesOld = parseInt(new RegExp('[0-9]+\\s').exec(field.value)[0]);
        // update the number of votes to that option
        if (index.toString() === optionNumber) {
          votesOld = undo ? votesOld - 1 : votesOld + 1;
          interaction.message.embeds[0].fields[index].value =
           field.value.replace((undo ? votesOld + 1 : votesOld - 1).toString() +
            ' ', votesOld.toString() + ' ');
        }

        const pourcentage =
        (votes === 0 ? 0 : (votesOld / votes) * 100).toFixed(2);
        bar = progressbar.filledBar(total, pourcentage, 20, ' ', '█');
        const percentRegex = '([+-]?(?=\\.\\d|\\d)(?:\\d+)?(?:\\.?\\d*))'+
                                '(?:[eE]([+-]?\\d+))?';
        const percentOld = new RegExp(percentRegex).exec(field.value)[0];
        interaction.message.embeds[0].fields[index].value =
            field.value.replace(percentOld + '%', pourcentage.toString() + '%').
                replace(field.value.slice(0, 22), '`' + bar[0] + '`');
      });
      await interaction.update({
        embeds: [interaction.message.embeds[0]],
        components: interaction.message.components,
      }); // update the poll votes
    });
  },
};
