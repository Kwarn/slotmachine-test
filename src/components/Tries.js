// removed react import as no JSX is being returned
import { useSelector } from 'react-redux';

// Math.abs provides the difference between tries and total tries allowed

const TOTAL_TRIES_ALLOWED = 5;

function Tries() {
  const tally = useSelector(state => state.tally);

  return `Attempts remaining: ${Math.abs(tally.tries - TOTAL_TRIES_ALLOWED)}`;
}

export default Tries;
