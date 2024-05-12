import db from '../database/diceStatsDB.js';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import TrueDate from '../classes/TrueDate.js';

function Statistics({ rollCount, resultTotal }) {
  const [averageResultForDay, setaverageResultForDay] = useState();
  const date = new TrueDate(new Date());

  useEffect(() => {
    async function getaverageResultForDayForToday() {
      const q = query(
        collection(db, 'roll-results'), 
        where('date', '==', date.fullDate));
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
  }, [rollCount, date.fullDate]);

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
