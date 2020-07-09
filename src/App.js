import React, { useState } from "react";

import Board from "./components/Board";

const App = () => {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [coordinate, setCoordinate] = useState([]);

  const calculateWinner = squares => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  let status;

  if (winner) {
    status = `Winner ${winner}`;
  } else {
    status = `Next Player: ${xIsNext ? "X" : "O"}`;
  }

  const handleClick = i => {
    const newHistory = history.slice(0, stepNumber + 1);
    const newSquares = current.squares.slice();

    if (calculateWinner(newSquares) || newSquares[i]) {
      return;
    }

    newSquares[i] = xIsNext ? "X" : "O";
    console.log(i);
    switch (i) {
      case 0:
        setCoordinate(coordinate.concat("1,1"));
        break;
      case 1:
        setCoordinate(coordinate.concat("1,2"));
        break;
      case 2:
        setCoordinate(coordinate.concat("1,3"));
        break;
      case 3:
        setCoordinate(coordinate.concat("2,1"));
        break;
      case 4:
        setCoordinate(coordinate.concat("2,2"));
        break;
      case 5:
        setCoordinate(coordinate.concat("2,3"));
        break;
      case 6:
        setCoordinate(coordinate.concat("3,1"));
        break;
      case 7:
        setCoordinate(coordinate.concat("3,2"));
        break;
      case 8:
        setCoordinate(coordinate.concat("3,3"));
        break;
      default:
        break;
    }
    console.log(coordinate);
    setHistory(newHistory.concat({ squares: newSquares }));
    setStepNumber(newHistory.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = move => {
    if (!move) {
      setStepNumber(0);
      setHistory([{ squares: Array(9).fill(null) }]);
      setCoordinate(coordinate.slice(0, 1));
      setXIsNext(true);
    } else {
      setStepNumber(move);
      setHistory(stepNumber => {
        return history.slice(0, stepNumber + 1);
      });
      setCoordinate(coordinate.slice(0, move));
      setXIsNext(move % 2 === 0);
    }
  };

  const moves = history.map((step, move) => {
    const desc = move
      ? `Go to move #${move}(${coordinate[move - 1]})`
      : "Go to game start";

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={i => handleClick(i)} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

export default App;
