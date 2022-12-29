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

  const [ pickedWord, setPickedWord ] = useState('');
  const [ pickedCategory, setPickedCategory ] = useState('');
  const [ letters, setLetters ] = useState([]);


  // escolhe a palavra e a categoria
  const pickedWordAndCategory = () => {
    // captura as keys (nomes) de cada array dentro do objeto
    const categories = Object.keys(words);

    // captura uma categoria aleatória (conforme a quantidade de keys do objeto) .floor arredonda o float
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];
    // captura uma palavra aleatória dentro da categoria (conforme a quantidade de palavras)
    const word = words[category][Math.floor(Math.random() * words[category].length)];

    // retorna a palavra e a categoria aleatória desestruturado como um objeto
    return { word, category };
  }

  // inicia o jogo
  const startGame = () => {
    // captura a palavra e categoria aleatória
    const { word, category } = pickedWordAndCategory()

    // cria um array de letras com a palavra aleatória e em minúsculo
    let wordLetters = word.split("");
    wordLetters = wordLetters.map(l => l.toLowerCase())

    // insere nos estados
    setPickedCategory(category);
    setPickedWord(word);
    setLetters(wordLetters)

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
