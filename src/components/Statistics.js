import db from '../database/diceStatsDB.js';
import { collection, getDocs } from 'firebase/firestore';
import { useState, useEffect } from 'react';

function Statistics({ rollCount, resultTotal }) {
  const [averageResultForDay, setaverageResultForDay] = useState();

  useEffect(() => {
    async function getaverageResultForDayForToday() {
      const rollResults = await getDocs(collection(db, 'roll-results'));
      let count = 0;
      let resultTotal = 0;
      rollResults.docs.map((result) => {
        count++;
        resultTotal += result.get('roll-value');
      });
      setaverageResultForDay((resultTotal / count).toFixed(2));
    }
    getaverageResultForDayForToday();
  }, [rollCount]);

  return (
    <>
      {rollCount !== 0 && <p>
        Session roll count: {rollCount}
        <br/>
        Average roll result: {(resultTotal / rollCount).toFixed(2)}
      </p>}
      <p>
        {averageResultForDay}
      </p>
    </>
  );
}

export default Statistics;
