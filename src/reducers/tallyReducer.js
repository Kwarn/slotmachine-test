import { ADD_TO_WINS, ADD_TO_TRIES, RESET_TALLY } from '../actions/types';

const tallyState = { wins: 0, tries: 0 };

export const listTally = (state = tallyState, action) => {
  switch (action.type) {
    case ADD_TO_WINS:
      return { ...state, wins: (state.wins += 1) };

    case ADD_TO_TRIES:
      return { ...state, tries: (state.tries += 1) };

    case RESET_TALLY:
      return { tries: 0, wins: 0 };

    default:
      return state;
  }
};
