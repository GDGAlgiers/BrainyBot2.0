const {
  activeWordleSession,
  wordleSessionChannel,
  parseMessage,
  addNewScore,
} = require('../../core/wordle');
const {ephemeral} = require('../../utils/index');
const {MessageEmbed} = require('discord.js');

module.exports = {
  name: 'wordle',
  description: 'Submit a solution to the wordle game.',
  required: true,
  options: [{
    name: 'solution',
    description: 'the game result, as received from the wordle game',
    type: 'STRING',
    required: true,
  }],
  execute: async (client, interaction, args) => {
    // Check if there is an active session
    if (!activeWordleSession()) {
      await interaction.reply(ephemeral(`No active wordle session found.`));
      return;
    }
    // Check if the channel is the same as the session channel
    const channelId = interaction.channel.id;
    if (!wordleSessionChannel(channelId)) {
      await interaction.reply(ephemeral(`You can only play in `+
        `today's Wordle channel.`));
      return;
    }
    // Parse the answer
    const messageContent = interaction.options.getString('solution');
    // get the user who submitted the solution
    const user = interaction.user.username;
    try {
      const {
        game,
        gameNumber,
        guessNumbers,
        solutionGrid} = parseMessage(messageContent);

      // Update the score
      addNewScore({game, guessNumbers, user});

      // Send the submission to the channel
      guessNumbersMessage = guessNumbers ?
        `**Solved within:** **${guessNumbers}** guesses! \n`:
        '**Not solved :(** \n';

      const embed = new MessageEmbed()
          .setTitle( user +`'s solution for ${game} (${gameNumber})`)
          .setDescription(
              guessNumbersMessage +
              solutionGrid)
          .setColor('RANDOM');

      await interaction.reply({embeds: [embed]});
      return;
    } catch (err) {
      // send the error message
      await interaction.reply(ephemeral(err.message));
      return;
    }
  },
};
