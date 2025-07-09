import {useState} from 'react';
import GameBoard from './components/GameBoard.jsx'
import Player from "./components/player"
import Log from './components/Log.jsx'
import {WINNING_COMBINATIONS} from './WINNING_COMBINATIONS.js'
import GameOver from './components/GameOver.jsx'

const initialGameBoard = [
  [null,null,null],
  [null,null,null],
  [null,null,null],
]

function elActiveplayer(gameTurns){
  let currentPlayer = 'X';
      
  if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function driveWinner(gameBoard, players){

  let winner;
  for (const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]
    if(firstSquareSymbol &&
       firstSquareSymbol === secondSquareSymbol &&
        firstSquareSymbol === thirdSquareSymbol ){
          winner = players[firstSquareSymbol];}
  }
return winner;
};

function updateGameBoardMoves(gameTurns){
  let gameBoard = [...initialGameBoard.map(innerArray=>[...innerArray])];

  for (const turn of gameTurns){
    // const {square,player}=turn;
    // const {row,col} = square;
    // gameBoard[row][col]=player;
    
    gameBoard[turn.square.row][turn.square.col] = turn.player; 
  }
  return gameBoard;
}

function App() {
  const [players, setPlayers] = useState({
    'X': 'player 1',
    'O': 'player 2'
  })
  const [gameTurns,setGameTurns] = useState([])
  // const [activePlayer, setActivePlayer] = useState('X')
  
  const activePlayer = elActiveplayer(gameTurns);
  const gameBoard = updateGameBoardMoves(gameTurns)

  const winner = driveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectedSquare(rowIndex, colIndex){
    // setActivePlayer((currentActivePlayer)=> currentActivePlayer === 'X'? 'O': 'X');
    setGameTurns((prevTurns) => {
      // let currentPlayer = 'X';
      // if(prevTurns.length > 0 && prevTurns[0].player === 'X'){
      //   currentPlayer = 'O';
      // }
      const currentPlayer = elActiveplayer(prevTurns)
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns
      ];
      return updatedTurns;
    });
  }

  function rematchGame(){
    setGameTurns([])
  }
  function handlePlayerName(symbolMe,newName){
    setPlayers(prevPlayers=> {
      return{
        ...prevPlayers,
        [symbolMe]: newName
      };
    })
  };
  return <main>
  <div id="game-container" >
      <ol id="players" className="highlight-player">
        <Player initialName="Player 1" 
        symbol="X" 
        isActive ={activePlayer === 'X'}
        onChangeName = {handlePlayerName}/>
        <Player initialName="Player 2" 
        symbol="O" 
        isActive ={activePlayer === 'O'}
        onChangeName = {handlePlayerName}
        />
      </ol>
      {(winner || hasDraw) && <GameOver winner={winner}
       onRestart={rematchGame} />}

      <GameBoard onSelectSquare={handleSelectedSquare}
       board={gameBoard} activeSymbol={activePlayer}
        ifWinner={winner}></GameBoard>
    </div>
    <Log turns={gameTurns}/>
  </main>
}

export default App;
