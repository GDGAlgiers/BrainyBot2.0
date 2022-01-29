const {getAdvice} = require('../../core/advices');


module.exports = {
  name: 'advice',
  description: 'Get an advice from a wise bot :)',
  required: true,
  execute: async (client, interaction, args) => {
    await interaction.reply(getAdvice());
  },
};
