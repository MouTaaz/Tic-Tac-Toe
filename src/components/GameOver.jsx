export default function GameOver({winner, onRestart}){
 return( <div id="game-over">
    <h2>Game Over!</h2>
    {winner && <p>{winner} Won 🎉 The Game </p> }
    {!winner && <p>It's A Draw !!</p> }
    <p>
    <button onClick={onRestart}>Rematch</button>
    </p>
  </div>
  );
}