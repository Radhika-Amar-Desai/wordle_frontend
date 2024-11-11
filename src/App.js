import React, { useState } from 'react';
import './App.css';

const MAX_GUESSES = 6;
const WORD_LENGTH = 5;

// Component for each letter box in the game board
function GameBoardBox({ onChange, value }) {
  const handleInputChange = (e) => {
    const letter = e.target.value.toUpperCase();
    if (/^[A-Z]?$/.test(letter)) { // Only allows one uppercase letter
      onChange(letter);
    }
  };

  return (
    <input
      type="text"
      maxLength="1"
      value={value}
      onChange={handleInputChange}
      className="game-board-box"
    />
  );
}

// Component for each row in the game board
function GameBoardRow({ guess, onLetterChange }) {
  return (
    <div className="game-board-row">
      {Array.from({ length: WORD_LENGTH }).map((_, index) => (
        <GameBoardBox
          key={index}
          value={guess[index] || ''}
          onChange={(letter) => onLetterChange(index, letter)}
        />
      ))}
    </div>
  );
}

// Component for the game board containing all rows
function GameBoard() {
  const [guesses, setGuesses] = useState(
    Array(MAX_GUESSES).fill(Array(WORD_LENGTH).fill(''))
  );

  const handleLetterChange = (rowIndex, letterIndex, letter) => {
    const newGuesses = guesses.map((guess, i) =>
      i === rowIndex
        ? guess.map((l, j) => (j === letterIndex ? letter : l))
        : guess
    );
    setGuesses(newGuesses);
  };

  return (
    <div className="game-board">
      {guesses.map((guess, rowIndex) => (
        <GameBoardRow
          key={rowIndex}
          guess={guess}
          onLetterChange={(index, letter) => handleLetterChange(rowIndex, index, letter)}
        />
      ))}
    </div>
  );
}

function App() {
  return (
    <div className="app">
      <h1>Wordle UI</h1>
      <GameBoard />
    </div>
  );
}

export default App;
