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
  border-radius: 40px;
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
  margin: 2px;
`;

const Spin = styled.button`
  max-width: 80%;
  width: 200px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  font-weight: bold;
  color: white;
  user-select: none;
  :hover {
    cursor: pointer;
  }
  background: ${props => (props.disabled ? 'grey' : 'blue')};
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

const Divider = styled.hr`
  width: 80%;
  height: 2px;
  background-color: black;
  border: none;
`;

const MainSlotMachine = () => {
  // this way of accessing dispatch & state without connect() & mapState/DispatchToProps is new to me, very cool!
  const dispatch = useDispatch();
  const tally = useSelector(state => state.tally);
  const [newColors, setNewColors] = useState(['grey', 'grey', 'grey']);

  // Kept the default amount of colors as it makes manual testing easier for us both!
  // colors can be added at any time without breaking the app.
  const baseColors = ['red', 'blue', 'yellow'];

  function spin() {
    // returns random int between 0-max
    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }

    // creates an array containing 3 random color strings from baseColors.
    // by accessing the baseColors index using a random int between 0 and baseColors.length:
    // colors added to baseColors will be included in the spin.
    const newColorsArr = Array.from(
      { length: 3 },
      () => baseColors[getRandomInt(baseColors.length)]
    );
    setNewColors(newColorsArr);

    // gets the unique occurrences of color strings in newColorsArr, if only one exists all slots must match.
    const isWinningSpin = new Set(newColorsArr).size === 1;

    if (isWinningSpin) {
      dispatch(addToWins());
    }
    dispatch(addToTries());
  }

  // creates an array of <Slot/> components with background-color tied to their respective index in newColors
  const slots = newColors.map((c, idx) => (
    <Slot key={idx} style={{ backgroundColor: newColors[idx] }} />
  ));

  useEffect(() => {
    if (tally.wins === 5) {
      if (
        window.confirm(
          'Congratulations! You won 5 times! Time to stop gambling!'
        )
      ) {
        setNewColors(['grey', 'grey', 'grey']);
        dispatch(resetTally());
      }
    }
  }, [tally.tries, tally.wins, dispatch]);

  return (
    <Parent>
      <SubDiv>
        <Slots>{slots}</Slots>
        <Spin disabled={tally.wins === 5} onClick={() => spin()}>
          Spin!
        </Spin>
      </SubDiv>
      <SubDiv>
        <Header>Tally</Header>
        <Tally>
          <Wins />
          <Divider />
          <Tries />
        </Tally>
      </SubDiv>
    </Parent>
  );
};

export default MainSlotMachine;
