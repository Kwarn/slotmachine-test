import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { addToWins, addToTries, resetTally } from '../actions/tallyActions';
import Tries from './Tries';
import Wins from './Wins';

// App is now responsive, further visual tweaks could be added
// though for the sake of time I'm happy with it like this.

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
  height: 50%;
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
  margin-bottom: 20px;
`;

const Slots = styled.div`
  width: 80%;
  height: 50%;
  display: flex;
  justify-content: center;
`;

const Slot = styled.div`
  width: 100%;
  border: 2px solid black;
`;

const Spin = styled.button`
  max-width: 80%;
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
  max-height: 80%;
  display: flex;
  text-align: center;
  flex-direction: column;
  width: 100%;
  font-size: 20px;
  @media (max-width: 400px) {
    font-size: 15px;
  }
`;

const MainSlotMachine = () => {
  // this way of accessing dispatch & state without connect() & mapState/DispatchToProps is new to me, very cool!
  const dispatch = useDispatch();
  const tally = useSelector(state => state.tally);

  // Kept the default amount of colors as it makes manual testing easier for us both!
  // colors can be added at any time without breaking the app.
  const baseColors = ['red', 'blue', 'yellow'];

  const [newColors, setColors] = useState(['grey', 'grey', 'grey']);

  function spin() {
    // generates random int between 0-max
    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }

    // creates an array and fills it with 3 random color strings from baseColors.
    // by accessing the arrays index using a random interger between 0 and the length of the array
    // colors can be added to the baseColors with no further changes needed.
    // alternative implimentation could use while(newArr.length < 3) newArr.push(colors[RandomIntIndex])
    // this seemed the cleanest way, though I'm unsure of the perfomance vs while, in this app I imagine it's negligible

    const newColorsArr = Array.from(
      { length: 3 },
      () => baseColors[getRandomInt(baseColors.length)]
    );

    setColors(newColorsArr);

    // gets the unique occurrences of color strings in newColorsArr, if only one exists all slots must match.

    const isWinningSpin = new Set(newColorsArr).size === 1 ? true : false;

    if (isWinningSpin) {
      dispatch(addToWins());
    }
    dispatch(addToTries());
  }

  // *** on 5 wins the spin button should also become disabled. ***
  // had trouble with this as I'm unfamiliar with styled-components - CSS modules was my go to.
  // In order to dynamically add properties/attributes to styled components it seems you need access to props
  // the CSS declarations would need to exist within the component function scope.
  // I assume there is another way to do this otherwise you may have declared them in the function to start with(?)
  // After 45 mins of attempts: For the sake of time I have gone with this implementation I will do some further reading in the meantime!

  const disabledSpinButtonProps =
    tally.tries >= 5
      ? {
          disabled: true,
          style: { backgroundColor: 'grey' },
        }
      : {};

  // creates an array of <Slot/> components with background-color tied to their respective index in newColors
  const slots = newColors.map((c, idx) => (
    <Slot key={idx} style={{ backgroundColor: newColors[idx] }} />
  ));

  useEffect(() => {
    if (tally.tries >= 5) {
      // sets the message and grammar based on number of wins
      const message =
        tally.wins > 0
          ? `Congratulations! You won ${tally.wins} ${
              tally.wins > 1 ? 'times' : 'time'
            }.`
          : `Unlucky, you didn't win! Maybe it's time to stop!`;
      if (window.confirm(message)) {
        setColors(['grey', 'grey', 'grey']);
        dispatch(resetTally());
      }
    }
  }, [tally.tries, tally.wins, dispatch]);

  return (
    <Parent>
      <SubDiv>
        <Slots>{slots}</Slots>
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
