import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [numbers, setNumbers] = useState([]);
  const [clickNumbers, setclickNumbers] = useState([]);
  const [status, setStatus] = useState('idle');
  const [deciseconds, setDeciseconds] = useState(0);
  const [numberPositions, setNumberPositions] = useState({});
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const startGame = () => {
    const num = parseInt(inputValue, 10);
    if (!isNaN(num) && num > 0) {
      const newNumbers = Array.from({ length: num }, (_, i) => i + 1);
      setNumbers(newNumbers);
      setclickNumbers([]);
      setStatus('playing');
      setDeciseconds(0);
      const positions = {};
      newNumbers.forEach((number) => {
        positions[number] = getRandomPosition();
    });
    setNumberPositions(positions);
  }
  };

  const handleButtonClick = (number) => {
    if (status !== 'playing') return;
    if (number === clickNumbers.length + 1) {
      setclickNumbers([...clickNumbers, number])
      if (clickNumbers.length === numbers.length - 1) {
        setStatus('won');
      }
    } else {
      setStatus('lost');
    }
  };

  const resetGame = () => {
    setInputValue('');
    setNumbers([]);
    setclickNumbers([]);
    setStatus('idle');
    setDeciseconds(0);
    setNumberPositions({});
  };


  useEffect(() => {
    let timer = null;
    if (status === 'playing') {
      timer = setInterval(() => {
        setDeciseconds((prevDeciseconds) => prevDeciseconds + 1);
      }, 100);
    } else if (status === 'won' || status === 'lost') {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [status]);


  const getRandomPosition = () => {
    const top = Math.floor(Math.random() * 90);
    const left = Math.floor(Math.random() * 90); 
    return { top: `${top}%`, left: `${left}%` };
  };

  return (
    <div className="App">
      <h1>LET'S PLAY</h1>
      <div className='input-point'>
        <label>
          Points 
        </label>
        <input
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter a number"
          disabled={status === 'playing' && numbers.length > 0}
        />
      </div>
       
        <div className='time-box'>Time: {deciseconds}</div>
      
      <div>
        <button className='btn-start' onClick={startGame} disabled={status === 'playing' && numbers.length > 0}>
          Start Game
        </button>
      </div>

      

      {status === 'won' && <h2>You Won!</h2>}
      {status === 'lost' && <h2>Game Over!</h2>}
      <div>
        <div className='box-number'>
          {numbers.map((number) =>
            !clickNumbers.includes(number) ? (
              <button className='btn-number' key={number} onClick={() => handleButtonClick(number)}  style={{ position: 'absolute', ...numberPositions[number] }} >
                {number}
              </button> 
            ) : null
          )}
        </div>
      </div>


      {(status === 'won' || status === 'lost') && (
        <button onClick={resetGame}>Reset Game</button>
      )}
    </div>
  );
}

export default App;
