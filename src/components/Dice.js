import { useState } from 'react';
import DiceRoller from './DiceRoller.js';
import Statistics from './Statistics.js';

const Dice = () => {
  const [rollCount, setRollCount] = useState(0);
  const [resultTotal, setResultTotal] = useState(0);

  function updateStats() {
  }

  return (
    <>
      <DiceRoller onRoll={updateStats} />
      <Statistics />
    </>
  );
}

export default Dice;
