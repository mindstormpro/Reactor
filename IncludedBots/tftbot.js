export default state => {
  // Cooperate on the first round if there's no history
  if (!state.history || state.history.length === 0) {
    return ["C", state.memory];
  }
  
  // Grab the previous round's data
  const lastRound = state.history[state.history.length - 1];
  
  // Retrieve the opponent's move (checking standard property names)
  const opponentMove = lastRound.opponent !== undefined ? lastRound.opponent : lastRound[1]; 
  
  // Play what they just played
  return [opponentMove || "C", state.memory];
}