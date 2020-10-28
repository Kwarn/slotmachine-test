// removed react import as no JSX is being returned
import { useSelector } from 'react-redux';

function Tries() {
  const tally = useSelector(state => state.tally);

  return `Total tries: ${tally.tries}`;
}

export default Tries;
