function paragraph(text) {
    return '<p>' + text + '</p>'
}


function h1(text) { return '<h1>' + text + '</h1>' }



function h2(text) { return '<h2>' + text + '</h2>' }



function h3(text) { return '<h3>' + text + '</h3>' }



function h4(text) { return '<h4>' + text + '</h4>' }



function h5(text) {
    return '<h5>' + text + '</h5>'
}


function h6(text) { return '<h6>' + text + '</h6>' }



function link(text, url) {return '<a href="' + url + '">' + text + '</a>'}



function bold(text) { return '<b>' + text + '</b>' }



function italic(text) { return '<i>' + text + '</i>' }



function author(text) { return '<span>' + italic(" -Added by{} " + bold(text)) + '</span>' }



function list_item(body, auth) { return '<li>' + body + author(auth) + '</li>' + '\n' }

module.exports = { h1, h2, h3, h4, h5, h6, italic, bold, paragraph, author, list_item, link }