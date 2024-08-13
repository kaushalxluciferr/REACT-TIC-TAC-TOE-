import { useState } from 'react';
import './App.css';

function App() {
  const [board, setboard] = useState(Array(9).fill(null));
  const [wiiner, setwinner] = useState(null);
  const [turn, setturn] = useState(true);

  const rendersquare = (index) => (
    <button className='square' onClick={() => handleclick(index)}>
      {board[index]}
    </button>
  );

  const handleclick = (index) => {
    if (board[index] || wiiner) {
      return;
    }
    console.log(index, "clicked");
    const newboard = [...board];
    newboard[index] = turn ? "X" : "O";
    setboard(newboard);
    setturn(!turn);
    const a = checkwinner(newboard);
    if (a) {
      setwinner(newboard[a[0]]);
    }
  };

  function checkwinner(newboard) {
    const comb = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for (let i = 0; i < comb.length; i++) {
      const [a, b, c] = comb[i];
      if (newboard[a] && newboard[a] === newboard[b] && newboard[b] === newboard[c]) {
        return comb[i];
      }
    }
    return null;
  }

  function reset() {
    setboard(Array(9).fill(null));
    setwinner(null);
    setturn(true);
  }

  function check() {
    return turn ? "X" : "O";
  }

  const isDraw = board.every(cell => cell !== null) && !wiiner;

  return (
    <>
      <div className="app">
        Tic-Tac-Toe <br /> <br />
        {check()} turn
      </div>
      <div className="board">
        <div className="board-row">
          {rendersquare(0)}
          {rendersquare(1)}
          {rendersquare(2)}
        </div>
        <div className="board-row">
          {rendersquare(3)}
          {rendersquare(4)}
          {rendersquare(5)}
        </div>
        <div className="board-row">
          {rendersquare(6)}
          {rendersquare(7)}
          {rendersquare(8)}
        </div>
      </div>
      <button onClick={reset}>reset</button>
      <div className="footer">
        {wiiner ? <div>{wiiner} is the winner of the game</div> : isDraw ? <div>It's a draw!</div> : null}
      </div>
    </>
  );
}

export default App;
