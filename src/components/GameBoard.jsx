export default function GameBoard({onSelectSquare, board, ifWinner}){
  


  //   const [gameBoard, setGamBoard] = useState(initialGameBoard);

  // function handleSelectedSquare(indexrow,indexcol){
  // setGamBoard((prevGameBoard)=>{
  //   const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])]
  //   updatedBoard[indexrow][indexcol] = activeSymbol;
  //   return updatedBoard;
  // });
  // onSelectSquare();
  // }

  return(<ol id="game-board">
    {board.map((row,indexrow)=>
      <li key={indexrow}>
        <ol>
          {row.map((col,indexcol)=>
            <li key={indexcol}>
              <button onClick={()=> onSelectSquare(indexrow, indexcol)} disabled={ifWinner || col !== null} >{col}</button>
            </li>
          )}
        </ol>
      </li> )}
  </ol>
  );
  
}