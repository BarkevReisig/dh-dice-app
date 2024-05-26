import db from '../database/diceStatsDB.js';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useState, useEffect } from 'react';

function UserStats({ rollCount, resultTotal }) {
  return (
    <div>
      {rollCount !== 0 && <p>
        Session roll count: {rollCount}
        <br/>
        Session average: {(resultTotal / rollCount).toFixed(2)}
      </p>}
    </div>
  );
}

function GlobalStats({ averageResultForDay }) {
  return (
      <p>
        Today&#39;s global average: {averageResultForDay}
      </p>
  );
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
    <div>
      <UserStats rollCount={rollCount} resultTotal={resultTotal} />
      <GlobalStats averageResultForDay={averageResultForDay} />
    </div>
  );
}

export default Statistics;
