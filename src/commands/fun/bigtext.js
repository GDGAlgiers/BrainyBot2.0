const bigTextArr = [
  '🇦',
  '🇧',
  '🇨',
  '🇩',
  '🇪',
  '🇫',
  '🇬',
  '🇭',
  '🇮',
  '🇯',
  '🇰',
  '🇱',
  '🇲',
  '🇳',
  '🇴',
  '🇵',
  '🇶',
  '🇷',
  '🇸',
  '🇹',
  '🇺',
  '🇻',
  '🇼',
  '🇽',
  '🇾',
  '🇿',
];
const numArr = [
  '0️⃣',
  '1️⃣',
  '2️⃣',
  '3️⃣',
  '4️⃣',
  '5️⃣',
  '6️⃣',
  '7️⃣',
  '8️⃣',
  '9️⃣',
];

module.exports = {
  name: 'bigtxt',
  description: 'Write Big Text',
  options: [
    {
      name: 'text',
      description: 'The word to highlight!',
      type: 'STRING',
      required: true,
    },
  ],
  required: true,
  disabled: false,
  execute: async (client, interaction, args) => {
    const bigTextReactions = interaction.options
        .getString('text')
        .toLowerCase()
        .split('')
        .map((letter) => {
          if (letter.charCodeAt(0) < 97) {
            return (numArr[letter.charCodeAt(0) - 48]);
          }
          return bigTextArr[letter.charCodeAt(0) - 97];
        })
        .join(' ');

    // hello

    await interaction.reply(`${bigTextReactions}`);
  },
};


