
/**
 *
 * @param {*} votes
 * @return {*}
 */
const nbVotes = (votes) => {
  let nb = 0;
  votes.forEach((key)=>nb += votes[key].size);
  return nb;
};
module.exports={
  nbVotes,
};
