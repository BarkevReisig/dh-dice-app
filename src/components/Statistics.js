//import { useState } from 'react';

function Statistics({ rollCount, resultTotal }) {
  return (
    <>
      {rollCount !== 0 && <p>
        Session roll count: {rollCount}
        <br/>
        Average roll result: {(resultTotal / rollCount).toFixed(2)}
      </p>}
    </>
  );
}

export default Statistics;
