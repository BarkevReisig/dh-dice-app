import db from '../database/diceStatsDB.js';
import { collection, addDoc } from 'firebase/firestore'; 
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import DiceRoller from './DiceRoller.js';
import Statistics from './Statistics.js';
import TrueDate from '../classes/TrueDate.js';

function Dice() {
  const [cookies, setCookie] = useCookies(['rollCount', 'resultTotal']);
  const [rollCount, setRollCount] = useState(cookies.rollCount);
  const [resultTotal, setResultTotal] = useState(cookies.resultTotal);

	async function updateDBStats(result) {
		const date = new Date();
		await addDoc(collection(db, 'roll-results'), {
			'roll-value': result,
			'date': new TrueDate(date).fullDate,
      'timestamp': date,
		});
	}		

  function updateStats(result) {
    const count = (rollCount === undefined ? 0 : rollCount) + 1;
    const total = (resultTotal === undefined ? 0 : resultTotal) + result;
    setRollCount(count);
    setResultTotal(total);
    setCookie('rollCount', count, {maxAge: 20/* 43200 */});
    setCookie('resultTotal', total, {maxAge: 20/* 43200 */});
    console.log(count + '\n' + total);
    updateDBStats(result);
  }

  // useEffect(() => {
  //   setRollCount(cookies.rollCount);
  //   setResultTotal(cookies.resultTotal);
  // }, []);

  return (
    <>
      <DiceRoller updateStats={updateStats} />
      <Statistics rollCount={rollCount} resultTotal={resultTotal} />
    </>
  );
}

export default Dice;
