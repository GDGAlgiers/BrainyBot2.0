const fs = require("fs")
const markdown = require("./markdown_utils.js");
const {link, paragraph, author} = require("./markdown_utils");
const tmppath = './tmp'
var date = new Date();
function session_active() {
    return fs.existsSync(tmppath + "/" + date.toDateString() + ".md")
}

function create_tmp(){
    fs.mkdir(tmppath, function(err, path) { console.log(err) })
}

function create_files(session_title){
    var content =  + markdown.h1('---\nTitle: '+session_title) + '\n---\n' +
        "Techpoint : " + session_title + '\n' +
        markdown.bold(date.toDateString()) + '\n'
    fs.appendFile(tmppath +  "/" + date.toDateString() + ".md", content, function(err) { console.log(err) }, )
    fs.appendFile(tmppath+ "/notes" + ".md", markdown.h2("NOTES"), function(err) { console.log(err) }, )
    fs.appendFile(tmppath + "/resources" + ".md", markdown.h2("RESOURCES"), function(err) { console.log(err) }, )
    fs.appendFile(tmppath  + "/off_notes" + ".md", markdown.h2("OFF NOTES"), function(err) { console.log(err) }, )
    fs.appendFile(tmppath + "/off_resources" + ".md", markdown.h2("OFF RESOURCES"), function(err) { console.log(err) }, )
}

function tmp_existe(){
    return fs.existsSync(tmppath)
}


function add_res(url,descreption , name){
    fs.appendFileSync(tmppath+ "/resources" + ".md",
        '\n---\n' +link(url,url)  + ' ' + paragraph(descreption) +  author(name) + '\n---\n',
        "UTF-8", { 'flags': 'a+' });
}
function add_off_res(url,descreption , name){
    fs.appendFileSync(tmppath+ "/off_resources" + ".md",
        '\n---\n' +link(url,url)  + ' ' + paragraph(descreption) +  author(name) + '\n---\n',
        "UTF-8", { 'flags': 'a+' });
}
function add_note(note , name){
    fs.appendFileSync(tmppath + "/notes" + ".md",
        '\n---\n' +paragraph(note)  +  author(name) + '\n---\n', "UTF-8", { 'flags': 'a+' });
}
function add_off_note(note , name){
    fs.appendFileSync(tmppath + "/off_notes" + ".md",
        '\n---\n' +paragraph(note)  +  author(name) + '\n---\n', "UTF-8", { 'flags': 'a+' });
}

module.exports = {session_active , create_files, create_tmp , tmp_existe , add_res , add_off_res ,
add_note , add_off_note}