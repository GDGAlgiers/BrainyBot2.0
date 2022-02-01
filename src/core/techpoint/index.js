const fs = require('fs');
const markdown = require('../../utils/markdown/index');


const tmppath = './tmp';

/**
 *
 * @return {*}
 */
function sessionActive() {
  const date = new Date();
  return fs.existsSync(tmppath + '/' + date.toDateString() + '.md');
}
/**
 *
 */
function createTmp() {
  fs.mkdir(tmppath, function(err, path) {
    console.log(err);
  });
}

/**
 *
 * @param {*} sessionTitle
 */
function createFiles(sessionTitle) {
  const content = +markdown.h1('---\nTitle: ' + sessionTitle) + '\n---\n' +
          'Techpoint : ' + sessionTitle + '\n' +
          markdown.bold(date.toDateString()) + '\n';
  fs.appendFile(tmppath + '/' + date.toDateString() +
   '.md', content, function(err) {
    console.log(err);
  } );
  fs.appendFile(tmppath + '/notes' +
    '.md', markdown.h2('NOTES'), function(err) {
    console.log(err);
  } );
  fs.appendFile(tmppath + '/resources' +
   '.md', markdown.h2('RESOURCES'), function(err) {
    console.log(err);
  } );
  fs.appendFile(tmppath + '/off_notes' +
  '.md', markdown.h2('OFF NOTES'), function(err) {
    console.log(err);
  } );
  fs.appendFile(tmppath + '/off_resources' +
   '.md', markdown.h2('OFF RESOURCES'), function(err) {
    console.log(err);
  } );
}
/**
 *
 * @return {*}
 */
function tmpExist() {
  return fs.existsSync(tmppath);
}

/**
 *
 * @param {*} url
 * @param {*} descreption
 * @param {*} name
 */
function addRes(url, descreption, name) {
  fs.appendFileSync(tmppath + '/resources' + '.md',
      '\n---\n' + markdown.link(url, url) + ' ' +
      markdown.paragraph(descreption) + markdown.author(name) + '\n---\n',
      'UTF-8', {'flags': 'a+'});
}
/**
 *
 * @param {*} url
 * @param {*} descreption
 * @param {*} name
 */
function addOffRes(url, descreption, name) {
  fs.appendFileSync(tmppath + '/off_resources' + '.md',
      '\n---\n' + markdown.link(url, url) + ' ' +
      markdown.paragraph(descreption) + markdown.author(name) + '\n---\n',
      'UTF-8', {'flags': 'a+'});
}
/**
 *
 * @param {*} note
 * @param {*} name
 */
function addNote(note, name) {
  fs.appendFileSync(tmppath + '/notes' + '.md',
      '\n---\n' + markdown.paragraph(note) + markdown.author(name) +
       '\n---\n', 'UTF-8', {'flags': 'a+'});
}
/**
 *
 * @param {*} note
 * @param {*} name
 */
function addOffNote(note, name) {
  fs.appendFileSync(tmppath + '/off_notes' + '.md',
      '\n---\n' + markdown.paragraph(note) + markdown.author(name) +
       '\n---\n', 'UTF-8', {'flags': 'a+'});
}
module.exports = {
  addOffNote,
  addNote,
  addOffRes,
  addRes,
  tmpExist,
  createFiles,
  sessionActive,
  createTmp,
};
