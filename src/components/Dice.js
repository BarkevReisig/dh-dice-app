import db from '../database/diceStatsDB.js';
import { Timestamp, collection, addDoc } from 'firebase/firestore'; 
import { useState } from 'react';
import DiceRoller from './DiceRoller.js';
import Statistics from './Statistics.js';
import TrueDate from '../classes/TrueDate.js';

function Dice() {
  const [rollCount, setRollCount] = useState(0);
  const [resultTotal, setResultTotal] = useState(0);

	async function updateDBStats(result) {
		const date = new Date();
		await addDoc(collection(db, 'roll-results'), {
			'roll-value': result,
			'date': new TrueDate(date).fullDate,
      'timestamp': date,
		});
	}		

  function updateStats(result) {
    setResultTotal(resultTotal + result);
    setRollCount(rollCount + 1);
		updateDBStats(result);
  }

  return (
    <>
      <DiceRoller updateStats={updateStats} />
      <Statistics rollCount={rollCount} resultTotal={resultTotal} />
    </>
  );
}

export default Dice;
