import db from '../database/diceStatsDB.js';
import { collection, addDoc } from 'firebase/firestore'; 
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import DiceRoller from './DiceRoller.js';
import Statistics from './Statistics.js';
import Group from './Group.js';

function Dice() {
  const [cookies, setCookie] = useCookies(['rollCount', 'resultTotal', 'group']);
  const [rollCount, setRollCount] = useState(cookies.rollCount);
  const [resultTotal, setResultTotal] = useState(cookies.resultTotal);
  const [group, setGroup] = useState(cookies.group === undefined ? '' : cookies.group);
  const sessionCookieMaxAge = 21600;

	async function updateDBStats(result, success, degrees, target) {
		const date = new Date();
		await addDoc(collection(db, 'roll-results'), {
      'timestamp': date,
      'group': group,
			'roll-value': result,
      'success': success,
      'degrees': degrees,
      'target': target,
		});
	}		

  function updateStats(result, success, degrees, target) {
    const count = (rollCount === undefined ? 0 : rollCount) + 1;
    const total = (resultTotal === undefined ? 0 : resultTotal) + result;
    setRollCount(count);
    setResultTotal(total);
    setCookie('rollCount', count, {maxAge: sessionCookieMaxAge});
    setCookie('resultTotal', total, {maxAge: sessionCookieMaxAge});
    updateDBStats(result, success, degrees, target);
  }

  function updateGroup(event) {
    event.preventDefault();
    setGroup(event.target[0].value);
    setCookie('group', group, {maxAge: sessionCookieMaxAge});
  }

  return (
    <div id='Dice'>
      <h1>Dark Heresy 2e Dice Roller</h1>
      <DiceRoller updateStats={updateStats} />
      <Statistics rollCount={rollCount} resultTotal={resultTotal} group={group} />
      <Group onClick={updateGroup} group={group} />
    </div>
  );
}

export default Dice;
