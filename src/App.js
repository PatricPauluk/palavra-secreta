// CSS
import './App.css';

// React
import { useCallback, useEffect, useState } from 'react';

// Data
import { wordsList } from './data/words';

// Components
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';


// O jogo tem 3 estágios
const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

function App() {
  
  const [ gameStage, setGameStage ] = useState(stages[0].name);
  const [ words ] = useState(wordsList);

  // inicia o jogo
  const startGame = () => {
    setGameStage(stages[1].name);
  }
  
  // verifica a letra enviada
  const verifyLetter = () => {
    setGameStage(stages[2].name);
  }

  // reinicia o jogo
  const retry = () => {
    setGameStage(stages[0].name)
  }

  return (
    <div className="App">
      { gameStage === "start" && <StartScreen startGame={startGame} /> }
      { gameStage === "game" && <Game verifyLetter={verifyLetter} /> }
      { gameStage === "end" && <GameOver retry={retry} /> }
    </div>
  );
}

export default App;
