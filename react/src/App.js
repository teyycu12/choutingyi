import React, { useState } from 'react';
import './BombGame.css';

function BombGame() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [bomb, setBomb] = useState(Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('請輸入你的猜測！');
  const [isGameOver, setIsGameOver] = useState(false);
  const [guessHistory, setGuessHistory] = useState([]);

  const failSound = new Audio('/fail.mp3');
  const successSound = new Audio('/success.mp3');

  const handleGuess = () => {
    const numGuess = parseInt(guess, 10);
    if (isNaN(numGuess)) {
      setMessage('請輸入有效數字！');
      return;
    }

    setGuessHistory([...guessHistory, numGuess]);

    if (numGuess === bomb) {
      setMessage(`恭喜！你踩到炸彈，數字是 ${bomb}！`);
      setIsGameOver(true);
      successSound.play();
    } else if (numGuess < bomb) {
      setMin(numGuess + 1);
      setMessage(`炸彈在比 ${numGuess} 大的數字！`);
      failSound.play();
    } else {
      setMax(numGuess - 1);
      setMessage(`炸彈在比 ${numGuess} 小的數字！`);
      failSound.play();
    }
    setGuess('');
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleGuess();
    }
  };

  const resetGame = () => {
    setMin(1);
    setMax(100);
    setBomb(Math.floor(Math.random() * 100) + 1);
    setMessage('請輸入你的猜測！');
    setIsGameOver(false);
    setGuess('');
    setGuessHistory([]);
  };

  return (
    <div className="game-container">
      {/* 第一部分：主標題和副標題 */}
      <div className="section title-section">
        <h1>蹦蹦炸彈！</h1>
        <h2>一起來猜數字踩炸彈</h2>
      </div>

      {/* 第二部分：顯示範圍 */}
      <div className="section range-section">
        <p>範圍: {min} - {max}</p>
      </div>

      {/* 第三部分：輸入框和按鈕 */}
      <div className="section input-section">
        <p>{message}</p>
        {!isGameOver && (
          <>
            <input
              type="number"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              min={min}
              max={max}
              onKeyDown={handleKeyPress} /* 監聽鍵盤事件 */
              disabled={isGameOver}
              className="input"
            />
            <button onClick={handleGuess} className="button">猜測</button>
          </>
        )}

        {isGameOver && (
          <button onClick={resetGame} className="button">重新開始</button>
        )}
      </div>

      {/* 第四部分：猜測紀錄 */}
      <div className="section history-section">
        <h3>猜測紀錄</h3>
        <ul className="guess-history">
          {guessHistory.map((guess, index) => (
            <li key={index}>猜測 {index + 1}: {guess}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default BombGame;
