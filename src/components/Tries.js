import React from 'react';
import { useSelector } from 'react-redux';

// TASK
// Display the number of tries, i.e 'You've tried x times'

function Tries() {
  const tally = useSelector(state => state.tally);

  return `You have tried ${tally.tries} times!

   Tries remaining: ${Math.abs(tally.tries - 5)}`;
}

export default Tries;
