import db from '../database/diceStatsDB.js';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useState, useEffect } from 'react';

function UserStats({ rollCount, resultTotal }) {
  return (
    <div id='UserStats'>
      {rollCount !== undefined && <p>
        <b>Your Session Stats</b>
        <br/>
        Roll count: {rollCount}
        <br/>
        Roll average: {(resultTotal / rollCount).toFixed(2)}
        <br/>
      </p>}
    </div>
  );
}

function GlobalStats({ averageGroupResult, group }) {
  if(group !== '') {
    return (
      <div id='GlobalStats'>
        <p>
          <b>Group&#39;s Stats</b>
          <br/>
          Roll count:
          <br/>
          Roll average: {averageGroupResult}
          <br/>
        </p>
      </div>
    );
  }
}

function Statistics({ rollCount, resultTotal, group }) {
  const [averageGroupResult, setaverageGroupResult] = useState();

  useEffect(() => {
    async function getaverageGroupResultForToday() {
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
      setaverageGroupResult((resultTotal / count).toFixed(2));
    }
    getaverageGroupResultForToday();
  }, [rollCount, group]);

  return (
    <div id='Statistics'>
      <UserStats rollCount={rollCount} resultTotal={resultTotal} />
      <GlobalStats averageGroupResult={averageGroupResult} group={group} />
    </div>
  );
}

export default Statistics;
