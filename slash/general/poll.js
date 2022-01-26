const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { AutorisationError, ArgumentError } = require("../../core/errors");
const progressbar = require('string-progressbar');
const { nb_votesById, delete_votesById } = require("../../core/utils");
const uuid = require("uuid");

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
    execute: async(client, interaction) => {
        const reactions = ['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟', "🅰", "🅱", "🅲", "🅳", "🅴", "🅵", "🅶", "🅷", "🅸", "🅹", "🅺", "🅻", "🅼", "🅽", "🅾", "🅿︎", "🆀", "🆁", "🆂", "🆃", "🆄", "🆅", "🆆", "🆇", "🆈", "🆉"]; // emojis to be used in the buttons
        const question = interaction.options.getString('question');
        const options = interaction.options.getString('options').split(",");
        const total = 100;

        if (!question || !options) { //if there misses poll question or poll options, throw error
            new ArgumentError(interaction);
            return;
        }

        const PollEmbed = new MessageEmbed() //set the embed attributes
            .setColor('RANDOM')
            .setTitle('📊 ' + question)
            .setFooter('You can choose multiple options\nClick on 🛑 to end the poll | Created by ' + interaction.user.username);
        const component = []; //will contain the buttons 
        let i = 0;
        if (reactions.length < options.length) { await interaction.reply({ content: "🛑 You've exceeded the authorized number of options, please try again!", ephemeral: true }); return; } //there are more options than emojis
        let id = uuid.v4(); // The poll id
        options.forEach((option, index) => { // add buttons
            let bar = progressbar.filledBar(total, 0, 20, ' ', '█');
            PollEmbed.addField(reactions[index] + " " + `**${option}**`, "`" + bar[0] + "`" + " | " + `${bar[1]}% (0 votes)`, false);
            if ((index % 5) === 0) {
                component.push(new MessageActionRow());
                if (index !== 0) { i++; }
            }
            component[i].addComponents(
                new MessageButton()
                .setCustomId(`${index} ${id}`)
                .setLabel(reactions[index])
                .setStyle('SECONDARY')
            );
        });
        if (component[i].components.length === 5) {
            component.push(new MessageActionRow());
            i++;
        }
        component[i].addComponents( //add button with which we can end the poll
            new MessageButton()
            .setCustomId(`end_poll ${id}`)
            .setEmoji("🛑")
            .setStyle('DANGER')
        );
        await interaction.reply({ embeds: [PollEmbed], components: component, fetchReply: true }); //send the poll

        const filter = button => { return !button.user.bot };
        const collector = interaction.channel.createMessageComponentCollector({
            filter
        }); //listen to clicks
        let total_votes = {}; //contains a key: value pairs where key corresponds to the user's id and value is a list of his votes
        collector.on('collect', async(interaction) => {
            let undo = false;
            let option_number = interaction.customId.split(' ')[0];
            if (option_number === "end_poll") {
                if (interaction.user.id === interaction.message.interaction.user.id) { //check if the user corresponds to the one who created the poll
                    delete_votesById(total_votes, option_number); //delete votes related to that poll
                    await interaction.update({
                        embeds: [interaction.message.embeds[0]],
                        components: []
                    }); //hide the buttons
                    await interaction.followUp({
                        embeds: [interaction.message.embeds[0].setFooter('This poll has ended, find above the final results | Created by ' + interaction.user.username)],
                        components: []
                    });
                    collector.stop(); //ends listener
                } else {
                    new AutorisationError(interaction); // the user is not the one who created the poll
                }

                return;
            }

            if (total_votes[interaction.user.id]) { //if this user already voted on a poll
                if (total_votes[interaction.user.id].includes(interaction.customId)) { //if he has already chosen this option, it will undo his vote
                    undo = true;
                    total_votes[interaction.user.id].splice(total_votes[interaction.user.id].indexOf(interaction.customId), 1); //delete the vote 
                } else {
                    total_votes[interaction.member.id].push(interaction.customId); //add the user's vote to the value list corresponding to his id in total_votes object
                }
            } else {
                total_votes[interaction.member.id] = [interaction.customId]; //add a new user to the votes object
            }

            let votes = nb_votesById(total_votes, interaction.customId.split(' ')[1]); //get the total number of votes to that poll
            interaction.message.embeds[0].fields.forEach((field, index) => { //update each of the fields 
                let votes_old = parseInt(new RegExp("[0-9]+\\s").exec(field.value)[0]); //get the number of previous votes to that option
                if (index.toString() === option_number) { //update the number of votes to that option 
                    votes_old = undo ? votes_old - 1 : votes_old + 1;
                    interaction.message.embeds[0].fields[index].value = field.value.replace((undo ? votes_old + 1 : votes_old - 1).toString() + " ", votes_old.toString() + " ");
                }

                let pourcentage = (votes === 0 ? 0 : (votes_old / votes) * 100).toFixed(2);
                let bar = progressbar.filledBar(total, pourcentage, 20, ' ', '█');
                let percent_old = new RegExp("([+-]?(?=\\.\\d|\\d)(?:\\d+)?(?:\\.?\\d*))(?:[eE]([+-]?\\d+))?").exec(field.value)[0];
                interaction.message.embeds[0].fields[index].value = field.value.replace(percent_old + "%", pourcentage.toString() + "%").replace(field.value.slice(0, 22), "`" + bar[0] + "`");
            });
            await interaction.update({
                embeds: [interaction.message.embeds[0]],
                components: interaction.message.components
            }); //update the poll votes
        });
    }
};