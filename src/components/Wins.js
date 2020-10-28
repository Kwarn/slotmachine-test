import React from 'react';
import { useSelector } from 'react-redux';

// TASK
// Display the number of wins, i.e 'You've won x times'

function Wins() {
  const tally = useSelector(state => state.tally);
  let message =
    tally.wins > 0
      ? `Congratulations! You have won ${tally.wins} times!`
      : `No wins yet, keep trying!`;

  return message;
}

export default Wins;
