const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { AutorisationError, ArgumentError } = require("../../core/errors");
const progressbar = require('string-progressbar');
const { nb_votes } = require("../../core/utils");

module.exports = {
    name: 'poll',
    description: 'Create a poll where members can vote.',
    options: [{
            name: "question",
            description: 'Enter the poll question',
            type: 'STRING',
            required: true,
        },
        {
            name: "options",
            description: 'Poll options',
            type: 'STRING',
            required: true,
        }
    ],
    execute: async(client, interaction, args) => {
        const reactions = ['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟', "🅰", "🅱", "🅲", "🅳", "🅴", "🅵", "🅶", "🅷", "🅸", "🅹", "🅺", "🅻", "🅼", "🅽", "🅾", "🅿︎", "🆀", "🆁", "🆂", "🆃", "🆄", "🆅", "🆆", "🆇", "🆈", "🆉"]
        const question = interaction.options.getString('question');
        const options = interaction.options.getString('options').split(",");
        const total = 100;
        if (!question || !options) {
            new ArgumentError(interaction);
            return;
        }
        const PollEmbed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle('📊 ' + question)
            .setFooter('You can choose multiple options\nClick on 🛑 to end the poll | Created by ' + interaction.user.username);
        const component = [];
        let i = 0;
        if (reactions.length < options.length) { await interaction.reply({ content: "🛑 You've exceeded the authorized number of options, please try again!", ephemeral: true }); return; }
        options.forEach((option, index) => {
            let bar = progressbar.filledBar(total, 0, 20, ' ', '█');
            PollEmbed.addField(reactions[index] + " " + `**${option}**`, "`" + bar[0] + "`" + " | " + `${bar[1]}% (0 votes)`, false);
            if ((index % 5) === 0) {
                component.push(new MessageActionRow());
                if (index !== 0) { i++; }
            }
            component[i].addComponents(
                new MessageButton()
                .setCustomId(index.toString())
                .setLabel(reactions[index])
                .setStyle('SECONDARY')
            );
        });
        if (component[i].components.length === 5) {
            component.push(new MessageActionRow());
            i++;
        }
        component[i].addComponents(
            new MessageButton()
            .setCustomId("end_poll")
            .setEmoji("🛑")
            .setStyle('DANGER')
        );
        await interaction.reply({ embeds: [PollEmbed], components: component, fetchReply: true });
        const filter = button => { return !button.user.bot };
        const collector = interaction.channel.createMessageComponentCollector({
            filter
        });
        let total_votes = {};
        collector.on('collect', async(i) => {
            if (i.customId === "end_poll") {
                if (i.user.id === i.message.interaction.user.id) {
                    await i.update({
                        embeds: [i.message.embeds[0]],
                        components: []
                    });
                } else {
                    new AutorisationError(i);
                }
                return;
            }

            if (total_votes[i.user.id]) {
                if (total_votes[i.user.id].has(i.customId)) {
                    await i.update({
                        embeds: [i.message.embeds[0]],
                        components: i.message.components
                    });
                    return;
                } else {
                    total_votes[i.member.id].add(i.customId);

                }
            } else {
                total_votes[i.member.id] = new Set([i.customId]);
            }
            let votes = nb_votes(total_votes);
            i.message.embeds[0].fields.forEach((field, index) => {
                let votes_old = parseInt(new RegExp("[0-9]+\\s").exec(field.value)[0]);
                if (index.toString() === i.customId) {
                    i.message.embeds[0].fields[index].value = field.value.replace(votes_old.toString() + " ", (votes_old + 1).toString() + " ");
                    votes_old++;
                }
                let pourcentage = ((votes_old / votes) * 100).toFixed(2);
                let bar = progressbar.filledBar(total, pourcentage, 20, ' ', '█');
                let percent_old = new RegExp("([+-]?(?=\\.\\d|\\d)(?:\\d+)?(?:\\.?\\d*))(?:[eE]([+-]?\\d+))?").exec(field.value)[0];
                i.message.embeds[0].fields[index].value = field.value.replace(percent_old + "%", pourcentage.toString() + "%").replace(field.value.slice(0, 22), "`" + bar[0] + "`");
            });
            await i.update({
                embeds: [i.message.embeds[0]],
                components: i.message.components
            });
        });
    }
};