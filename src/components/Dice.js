import fbapp from '../database/diceStatsDB.js';
import { getFirestore, doc, setDoc, Timestamp } from "firebase/firestore"; 
import { useState } from 'react';
import DiceRoller from './DiceRoller.js';
import Statistics from './Statistics.js';

function Dice() {
  const [rollCount, setRollCount] = useState(0);
  const [resultTotal, setResultTotal] = useState(0);
	const db = getFirestore(fbapp);

	async function updateDBStats(result) {
		const date = new Date();
		const timestamp = Timestamp.fromDate(date);
		await setDoc(doc(db, "roll-results", `${date}`), {
			"roll-value": result,
			date: timestamp
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
