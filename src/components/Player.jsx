import {useState} from 'react';

export default function Player({initialName, symbol, isActive, onChangeName}){
const [isEditing,setIsEditing] = useState(false);
const [playerName, setPlayerName] = useState(initialName)

function handleEditClicks(){
  setIsEditing((prevState)=>!prevState);
  if(isEditing){
  onChangeName(symbol, playerName)
}
}

function handleChange(elEvent){
  setPlayerName(elEvent.target.value)
}

let nameChange = <span className="player-name">
  {playerName}</span>

if(isEditing){
  nameChange = (<input value={playerName} onChange={handleChange} className="player-name" required type="text" />)
};


return(
<li className={isActive? 'active': undefined} > 
<span className="player">
{nameChange}
<span className="player-symbol">{symbol}</span>
</span>
<button onClick={handleEditClicks}>{isEditing? "Save"
    : "Edit"}</button>
</li>);
}