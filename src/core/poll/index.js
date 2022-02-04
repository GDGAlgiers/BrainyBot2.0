/**
 * Get the total number of votes related to a specific poll
 *
 * @param {object} votes - contains votes of different users
 * @param {string} id - The poll's id
 * @return {number}  -total number of votes corresponding to the id poll
 */
const nbVotes = (votes) => {
  let nb = 0;
  Object.values(votes).forEach((vote)=>{
    nb +=vote.length;
  });
  return nb;
};

module.exports = {
  nbVotes,
};
