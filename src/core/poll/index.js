/**
 * Get the total number of votes related to a specific poll
 *
 * @param {object} votes - contains votes of different users
 * @param {string} id - The poll's id
 * @return {number}  -total number of votes corresponding to the id poll 
 */
const nb_votes = (votes) => {
    let nb = 0;
    for (let key in votes) {
        nb += votes[key].length;
    }
    return nb;
};

module.exports = {
    nb_votes
};