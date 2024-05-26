import db from '../database/diceStatsDB.js';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useState, useEffect } from 'react';

function UserStats({ rollCount, resultTotal }) {
  return (
    <div>
      {rollCount !== undefined && <p>
        <b>Your Session Stats</b>
        <br/>
        Session roll count: {rollCount}
        <br/>
        Session roll average: {(resultTotal / rollCount).toFixed(2)}
        <br/>
      </p>}
    </div>
  );
}

function GlobalStats({ averageResultForDay, group }) {
  if(group !== '') {
    return (
      <p>
        <b>Group&#39;s Stats</b>
        <br/>
        Roll average: {averageResultForDay}
      </p>
    );
  }
}

function Statistics({ rollCount, resultTotal, group }) {
  const [averageResultForDay, setaverageResultForDay] = useState();

  useEffect(() => {
    async function getaverageResultForDayForToday() {
      const q = query(
        collection(db, 'roll-results'), 
        where('group', '==', group));
      const rollResults = await getDocs(q);
      let count = 0;
      let resultTotal = 0;
      rollResults.docs.forEach((result) => {
        count++;
        resultTotal += result.get('roll-value');
      });
      setaverageResultForDay((resultTotal / count).toFixed(2));
    }
    getaverageResultForDayForToday();
  }, [rollCount, group]);

  return (
    <div id='Statistics'>
      <UserStats rollCount={rollCount} resultTotal={resultTotal} />
      <GlobalStats averageResultForDay={averageResultForDay} group={group} />
    </div>
  );
}

export default Statistics;
