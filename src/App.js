import './styles/App.css';
import { FaHandRock, FaHandPaper, FaHandScissors } from "react-icons/fa";
import { useState } from 'react';

const actions = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
};

function randomAction() {

  const keys = Object.keys(actions);
  const index = Math.floor(Math.random() * keys.length);
  return keys[index];
}

function whoWin (action1, action2) {
  if(action1 === action2) {
    return 0;
  } else if (actions[action1] === action2) {
    return -1;
  } else if (actions[action2] === action1) {
    return 1;
  }
  return null; 
}

function ActionIcon ({action, ...props}) {
  const icons = {
    rock: FaHandRock,
    paper: FaHandPaper,
    scissors: FaHandScissors,
  }; 
  const Icon = icons[action]
  return (<Icon {...props}/>)
  
}

function Player ({ name = "Player", score = 0, action="paper"}) {
  return(
    <div className='player'>
      <div className='score'>{`${name}: ${score}`}</div>
      <div className='action'>
        {action && <ActionIcon action={action} size={80}/>}
      </div>
    </div>
  )
}

function ActionBtn ({action = "rock", onActionSelected}) {
  return (
    <button className='button' onClick={()=> onActionSelected(action)}>
    <ActionIcon action={action} size={40}/>
  </button>
  )
}

function WinnerIs({winner = 0}) {
  const result = {
    "-1": "Tu as gagné !",
    "0": "Égalité !", 
    "1": "Tu as perdu !",
  }; 
  return (
    <h2>{result[winner]}</h2>
  )
}

function App() {

  const [playerAction, setActionPlayer] = useState("");
  const [computerAction, setActionComputer] = useState("");

  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [winner, setWinner] = useState(0);

  const onActionSelected = (selectedAction) => {
    const newComputerAction = randomAction(); 

    setActionPlayer(selectedAction);
    setActionComputer(newComputerAction);

    const showWinner = whoWin (selectedAction, newComputerAction);
    setWinner(showWinner);
    if (showWinner === -1) {
      setPlayerScore(playerScore +1);
    } else if (showWinner === 1) {
      setComputerScore(computerScore +1);
    }
  
  };


  return (
    <div className='body'>
      <h1>Rock Paper Scissors</h1>
      <div>
        <div className='container'>
          <Player name="Player" score={playerScore} action={playerAction}/>
          <Player name="Computer" score={computerScore} action={computerAction}/>
        </div>
        <div>
          <ActionBtn action="rock" onActionSelected={onActionSelected}/>
          <ActionBtn action="paper"onActionSelected={onActionSelected}/>
          <ActionBtn action="scissors"onActionSelected={onActionSelected}/>
        </div>
        <WinnerIs winner={winner}/>
      </div>
    </div>
  );
}

export default App;
