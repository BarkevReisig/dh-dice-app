import { useState } from 'react';

function DiceForm({ onClick }) {
  return (
    <form onSubmit={(event) => onClick(event)}>
      <label>Enter the target number to roll under</label> <br/>
      <input type='number'/> <br/>
      <input type='submit' value='Roll the dice'/>
    </form>
  );
}

function DiceRollResult({ diceRoll, success, degrees }) {
  let text;
  if(success) {
    text = `Succeeded with ${degrees} degrees of success`;
  } else {
    text = `Failed with ${degrees} degrees of failure`;
  }
  return (
    <p>
      Rolled a {diceRoll} <br/>
      {text}
    </p>
  );
}

function DiceRoller({ updateStats }) {
  const [diceRoll, setDiceRoll] = useState();
  const [success, setSuccess] = useState();
  const [degrees, setDegrees] = useState();
  const [target, setTarget] = useState();

  function rollDice() {
    return Math.floor(Math.random() * 100) + 1;
  }
  
  function calculateDiceRoll(event) {
    event.preventDefault();
    const target = event.target[0].value;
    if (!target) return;
    const resultOfRoll = rollDice();
    const success = (resultOfRoll <= target && resultOfRoll !== 100) || resultOfRoll === 1;
    const degrees = Math.abs(Math.floor(resultOfRoll / 10) - Math.floor(target / 10)) + 1;
    setTarget(target);
    setDiceRoll(resultOfRoll);
    setSuccess(success);
    setDegrees(degrees);
    updateStats(resultOfRoll, success, degrees, target);
  }

  return (
    <div id='DiceRoller'>
      <DiceForm onClick={calculateDiceRoll}/>
      {target && <DiceRollResult diceRoll={diceRoll} success={success} degrees={degrees}/>}
    </div>
  );
}

export default DiceRoller;

