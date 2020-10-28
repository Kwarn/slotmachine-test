import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector, connect } from 'react-redux';
import { addToWins, addToTries, resetTally } from '../actions/tallyActions';
import Tries from './Tries';
import Wins from './Wins';

const Parent = styled.div`
  height: 100%;
  width: 100%;
  background: #dcdcf3;
  display: flex;
  align-items: center;
  justify-content: space-around;
  @media (max-width: 1023px) {
    flex-direction: column;
  }
`;

const SubDiv = styled.div`
  position: relative;
  height: 80%;
  width: 40%;
  margin: 20px;
  padding: 30px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  background: #e09e9e;
  @media (max-width: 1023px) {
    width: 80%;
    max-height: 40%;
  }
`;

const Header = styled.div`
  height: 60px;
  width: 100%;
  background: #cc6d6d;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 26px;
  color: white;
`;

const Slots = styled.div`
  width: 80%;
  height: 50%;
  display: flex;
  justify-content: center;
`;

const Slot = styled.div`
  height: 200px;
  width: 120px;
  border: 2px solid black;
`;

const Spin = styled.button`
  max-width: 90%;
  width: 300px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  font-weight: bold;
  background: blue;
  color: white;
  user-select: none;
  :hover {
    cursor: pointer;
  }
`;

const Tally = styled.div`
  white-space: pre-line;
  display: flex;
  text-align: center;
  flex-direction: column;
  width: 100%;
  font-size: 20px;
`;

const MainSlotMachine = () => {
  // The dispatch function for dispatching actions when we
  // call our action creators.
  const dispatch = useDispatch();

  // Getting our main tally data from redux state.
  const tally = useSelector(state => state.tally);

  // A few random base colors. To worsen the odds of winning,
  // you can add more colors.
  const baseColors = ['red', 'blue', 'yellow', 'green'];

  // By default, the slot machine colors are all grey. You can change
  // this if you want.
  const [newColors, setColors] = useState(['grey', 'grey', 'grey']);

  // TASK
  // Here is the main spin function which should be called
  // every time we press the Spin button. This function should:

  // 1. Add to our tally tries in the redux state. (i.e dispatch(addToTries()))

  // 2. Randomly select a color 3 times from our base colors, and
  // set them in our local state above, newColors.

  // 3. If all the colors are the same, we add to our tally wins.

  function spin() {
    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }

    const newColorsArr = Array.from(
      { length: 3 },
      () => baseColors[getRandomInt(baseColors.length)]
    );
    setColors(newColorsArr);

    const isWinningSpin = new Set(newColorsArr).size === 1 ? true : false;
    if (isWinningSpin) {
      dispatch(addToWins());
    }
    dispatch(addToTries());
  }

  // TASK
  // In this lifecycle function, of the tally wins reaches 5,
  // have a window.confirm message come up telling the user to 'Stop Gambling!'.
  // on 5 wins the spin button should also become disabled.
  // On selecting 'ok', the tally wins and tries are reset.

  const disabledSpinButtonProps =
    tally.tries >= 5
      ? {
          disabled: true,
          style: { backgroundColor: 'grey' },
        }
      : {};

  useEffect(() => {
    if (tally.tries >= 5) {
      if (window.confirm('Stop Gambling!')) {
        dispatch(resetTally());
      }
    }
  });

  // TASK
  // Within the Slots div, create 3 slots. (Create a styled component called 'Slot'
  // and render it out 3 times). Their background colors should be those stored
  // in the newColors array. (Use inline styling)

  return (
    <Parent>
      <SubDiv>
        <Slots>
          <Slot style={{ backgroundColor: newColors[0] }} />
          <Slot style={{ backgroundColor: newColors[1] }} />
          <Slot style={{ backgroundColor: newColors[2] }} />
        </Slots>
        <Spin {...disabledSpinButtonProps} onClick={() => spin()}>
          Spin!
        </Spin>
      </SubDiv>
      <SubDiv>
        <Header>Tally</Header>
        <Tally>
          <Wins />
          <hr
            style={{
              width: '80%',
              height: '2px',
              backgroundColor: 'black',
              border: 'none',
              marginTop: '40px',
              marginBottom: '40px',
            }}
          />
          <Tries />
        </Tally>
      </SubDiv>
    </Parent>
  );
};

export default MainSlotMachine;
