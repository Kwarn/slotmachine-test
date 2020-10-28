import { useSelector } from 'react-redux';

// Like the window.confirm() message in MainSlotMachine
// this sets the message displayed and grammar based on tally.wins

function Wins() {
  const tally = useSelector(state => state.tally);
  let message =
    tally.wins > 0
      ? `Congratulations! You have won ${tally.wins} ${
          tally.wins > 1 ? 'times!' : 'time!'
        }`
      : `No wins yet. Keep trying!`;

  return message;
}

export default Wins;
