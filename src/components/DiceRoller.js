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
    <>
      Rolled a {diceRoll} <br/>
      {text}
    </>
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
    setTarget(target);
    setDiceRoll(resultOfRoll);
    setSuccess((resultOfRoll <= target && resultOfRoll !== 100) || resultOfRoll === 1);
    setDegrees(Math.abs(Math.floor(resultOfRoll / 10) - Math.floor(target / 10)) + 1);
    updateStats(resultOfRoll);
  }

  return (
    <>
      <h1>Dark Heresy 2e Dice Roller</h1>
      <DiceForm onClick={calculateDiceRoll}/>
      <p>
        {target && <DiceRollResult diceRoll={diceRoll} success={success} degrees={degrees}/>}
      </p>
    </>
  );
}

export default DiceRoller;

