/**
 *
 * @param {*} text
 * @return {string}
 */
function paragraph(text) {
  return '<p>' + text + '</p>';
}

/**
   *
   * @param {*} text
   * @return {string}
   */
function h1(text) {
  return '<h1>' + text + '</h1>';
}

/**
   *
   * @param {*} text
   * @return {string}
   */
function h2(text) {
  return '<h2>' + text + '</h2>';
}

/**
   *
   * @param {*} text
   * @return {string}
   */
function h3(text) {
  return '<h3>' + text + '</h3>';
}

/**
   *
   * @param {*} text
   * @return {string}
   */
function h4(text) {
  return '<h4>' + text + '</h4>';
}

/**
   *
   * @param {*} text
   * @return {string}
   */
function h5(text) {
  return '<h5>' + text + '</h5>';
}

/**
   *
   * @param {*} text
   * @return {string}
   */
function h6(text) {
  return '<h6>' + text + '</h6>';
}

/**
   *
   * @param {*} text
   * @param {*} url
   * @return {string}
   */
function link(text, url) {
  return '<a href="' + url + '">' + text + '</a>';
}

/**
   *
   * @param {*} text
   * @return {string}
   */
function bold(text) {
  return '<b>' + text + '</b>';
}

/**
   *
   * @param {*} text
   * @return {string}
   */
function italic(text) {
  return '<i>' + text + '</i>';
}

/**
   *
   * @param {*} text
   * @return {string}
   */
function author(text) {
  return '<span>' + italic(' -Added by ' + bold(text)) + '</span>';
}

/**
   *
   * @param {*} body
   * @param {*} auth
   * @return {string}
   */
function listItem(body, auth) {
  return '<li>' + body + author(auth) + '</li>' + '\n';
}

module.exports = {h1, h2, h3, h4, h5, h6, italic,
  bold, paragraph, author, listItem, link};

