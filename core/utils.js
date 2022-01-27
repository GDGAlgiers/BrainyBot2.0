//utilities
const { randomInt } = require('crypto');
const { advices } = require('./BrainyAdvice.json');
const path = require('path');
const fs = require('fs');
const markdown = require("./markdown_utils.js");
const { link, paragraph, author } = require("./markdown_utils");
const tmppath = './tmp'
    //function returning an advice from BrainyAdvice.csv

const get_advice = () => {
    //number of advices:
    const advices_len = advices.length;
    const number = randomInt(advices_len);
    const advice = advices[number];
    return advice;
};
/**
 *
 *
 * @return {boolean} - the value of SPOT variable in the config.json file
 */
const get_spot = () => {
    return JSON.parse(fs.readFileSync(path.resolve("config.json")))['SPOT'];
};
/**
 * 
 *
 * @param {boolean} value - a boolean value to be assigned to SPOT variable in the config.json file
 * @return {*} 
 */
const set_spot = (value) => {
    let file_path = path.resolve("config.json");
    let config = JSON.parse(fs.readFileSync(file_path));
    config['SPOT'] = value;
    fs.writeFileSync(file_path, JSON.stringify(config, null, '\t'));
    return 0;
};
/**
 * Get the total number of votes related to a specific poll
 *
 * @param {object} votes - contains votes of different users
 * @param {string} id - The poll's id
 * @return {number}  -total number of votes corresponding to the id poll 
 */
const nb_votesById = (votes, id) => {
    let nb = 0;
    for (let key in votes) {
        votes[key].forEach(vote => {
            if (vote.split(" ")[1] == id) nb++;
        });
    }
    return nb;
};
/**
 * Delete votes related to a specific poll
 *
 * @param {object} votes - contains votes of different users
 * @param {string} id - The poll's id
 * @return {object} - The votes object after deleting the ended poll 
 */
const delete_votesById = (votes, id) => {
    for (let key in votes) {
        votes[key] = votes[key].filter(vote => vote.split(" ")[1] !== id);
    }
    return votes;
};

var date = new Date();

function session_active() {
    return fs.existsSync(tmppath + "/" + date.toDateString() + ".md")
}

function create_tmp() {
    fs.mkdir(tmppath, function(err, path) { console.log(err) })
}

function create_files(session_title) {
    var content = +markdown.h1('---\nTitle: ' + session_title) + '\n---\n' +
        "Techpoint : " + session_title + '\n' +
        markdown.bold(date.toDateString()) + '\n'
    fs.appendFile(tmppath + "/" + date.toDateString() + ".md", content, function(err) { console.log(err) }, )
    fs.appendFile(tmppath + "/notes" + ".md", markdown.h2("NOTES"), function(err) { console.log(err) }, )
    fs.appendFile(tmppath + "/resources" + ".md", markdown.h2("RESOURCES"), function(err) { console.log(err) }, )
    fs.appendFile(tmppath + "/off_notes" + ".md", markdown.h2("OFF NOTES"), function(err) { console.log(err) }, )
    fs.appendFile(tmppath + "/off_resources" + ".md", markdown.h2("OFF RESOURCES"), function(err) { console.log(err) }, )
}

function tmp_exist() {
    return fs.existsSync(tmppath)
}

function add_res(url, descreption, name) {
    fs.appendFileSync(tmppath + "/resources" + ".md",
        '\n---\n' + link(url, url) + ' ' + paragraph(descreption) + author(name) + '\n---\n',
        "UTF-8", { 'flags': 'a+' });
}

function add_off_res(url, descreption, name) {
    fs.appendFileSync(tmppath + "/off_resources" + ".md",
        '\n---\n' + link(url, url) + ' ' + paragraph(descreption) + author(name) + '\n---\n',
        "UTF-8", { 'flags': 'a+' });
}

function add_note(note, name) {
    fs.appendFileSync(tmppath + "/notes" + ".md",
        '\n---\n' + paragraph(note) + author(name) + '\n---\n', "UTF-8", { 'flags': 'a+' });
}

function add_off_note(note, name) {
    fs.appendFileSync(tmppath + "/off_notes" + ".md",
        '\n---\n' + paragraph(note) + author(name) + '\n---\n', "UTF-8", { 'flags': 'a+' });
}

const ephemeral = (msg) => {
    return {
        content: msg,
        ephemeral: true
    }
}


module.exports = {
    ephemeral,
    get_advice,
    get_spot,
    set_spot,
    nb_votesById,
    session_active,
    create_files,
    create_tmp,
    tmp_exist,
    add_res,
    add_off_res,
    add_note,
    add_off_note,
    delete_votesById
}