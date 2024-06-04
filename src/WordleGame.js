import React, { useState, useEffect } from 'react';
import './WordleGame.css'; 
import words from './words.json';

const WordleGame = () => {
  const [guesses, setGuesses] = useState(['', '', '', '', '', '']);
  const [currentGuess, setCurrentGuess] = useState('');
  const [solution, setSolution] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Set random solution words
    const w = words.words;
    const solution = w[Math.floor(Math.random() * w.length)];
    console.log(solution);
    setSolution(solution);
  }, []);

  const handleGuess = () => {
    if (currentGuess.length !== 5) {
      setMessage('Guess must be a 5-letter word.');
      return;
    }

    const updatedGuesses = [...guesses];
    console.log(JSON.stringify(updatedGuesses));
    //find the first empty guess
    const guessIndex = updatedGuesses.findIndex(g => g === '');
    if (guessIndex !== -1) {
      updatedGuesses[guessIndex] = currentGuess;
      // updates the guesses array with the new guess
      setGuesses(updatedGuesses);
      // clears the input field
      setCurrentGuess('');

      if (currentGuess.toLowerCase() === solution.toLowerCase()) {
        setIsGameOver(true);
        setMessage('You\'ve got it!');
      } else if (updatedGuesses[5] !== '') {
        setIsGameOver(true);
        setMessage(`Mmmh... not quite! The word was ${solution}.`);
      } else {
        setMessage('');
      }
    }else{
      console.log("Guesses are full");
    }
  };

  const handleGuessChange = (e) => {
    setCurrentGuess(e.target.value);
  };

  return (
    <div className="wordle-game">
      <h1>Wordle Game</h1>
      <div className="guesses">
        {guesses.map((guess, index) => (
          <div key={index} className="guess">
            {guess.split('').map((letter, i) => (
              <span
                key={i}
                style={{color:
                  letter.toLowerCase() === solution[i].toLowerCase() ? "green" : (solution.includes(letter.toLowerCase()) ? "mustard" : "grey")
                }}
              >{letter}
              </span>
            ))}
          </div>
        ))}
      </div>
      {!isGameOver && (
        <div className="input-section">
          <input
            type="text"
            value={currentGuess}
            onChange={handleGuessChange}
            maxLength="5"
          />
          <button onClick={handleGuess}>Guess Now!</button>
        </div>
      )}
      <div className="message">
        {message}
        <div className="message-play-again">
          {isGameOver && <button onClick={() => window.location.reload()}>Play Again</button>}
        </div>
      </div>
    </div>
  );
};

export default WordleGame;