import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import Dice from "./Dice";

export default function App() {
  let [gameWonStatus, setGameStatus] = useState(false);
  function generateRandomNumbers() {
    const allRandomNumbers = [];
    for (let i = 1; i <= 10; i++) {
      allRandomNumbers.push({
        id: i,
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
      });
    }
    return allRandomNumbers;
  }
  let [randomNumbers, setRandomNumbers] = useState(() =>
    generateRandomNumbers()
  );

  function rollDice() {
    if (!gameWonStatus) {
      setRandomNumbers((prevValues) => {
        return prevValues.map((prevValue) => {
          return prevValue.isHeld === false
            ? { ...prevValue, value: Math.ceil(Math.random() * 6) }
            : prevValue;
        });
      });
    } else {
      setGameStatus(false);
      setRandomNumbers(generateRandomNumbers());
    }
  }

  function hold(id) {
    setRandomNumbers((prevValues) => {
      return prevValues.map((prevValue) => {
        return prevValue.id === id
          ? {
              ...prevValue,
              isHeld: !prevValue.isHeld,
            }
          : prevValue;
      });
    });
  }
  function isGameWon() {
    const isCardsYetToHold = randomNumbers.some(
      (randomNumber) => randomNumber.isHeld === false
    );
    const isAllSameNumber = randomNumbers.every(
      (randomNumber) => randomNumber.value === randomNumbers[0].value
    );

    if (!isCardsYetToHold && isAllSameNumber) {
      setGameStatus(true);
    }
  }
  useEffect(() => {
    isGameWon();
  }, [randomNumbers]);

  return (
    <main>
      {gameWonStatus && <Confetti />}
      <h1 style={{ color: "green" }}>{gameWonStatus && "Game Won!!!"}</h1>
      <div className="container">
        <div className="game-info">
          <h1 className="title">Tenzies</h1>
          <p className="instructions">
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
        </div>
        <div
          className="dices"
          style={
            gameWonStatus
              ? { pointerEvents: "none" }
              : { pointerEvents: "auto" }
          }
        >
          {randomNumbers.map((randomNumberObj, index) => (
            <Dice
              key={index}
              id={randomNumberObj.id}
              hold={hold}
              value={randomNumberObj.value}
              isHeld={randomNumberObj.isHeld}
            />
          ))}
        </div>
        <button className="roll" onClick={rollDice}>
          {gameWonStatus ? "New Game" : "Roll"}
        </button>
      </div>
    </main>
  );
}
