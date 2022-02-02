/**
 * Get the total number of votes related to a specific poll
 *
 * @param {object} votes - contains votes of different users
 * @param {string} id - The poll's id
 * @return {number}  -total number of votes corresponding to the id poll 
 */
const nb_votes_by_id = (votes, id) => {
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
const delete_votes_by_id = (votes, id) => {
    for (let key in votes) {
        votes[key] = votes[key].filter(vote => vote.split(" ")[1] !== id);
    }
    return votes;
};

module.exports = {
    nb_votes_by_id,
    delete_votes_by_id,
};