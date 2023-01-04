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

// quantidade de tentativas
const guessesQty = 3;

function App() {
  
  const [ gameStage, setGameStage ] = useState(stages[0].name); // status do jogo
  const [ words ] = useState(wordsList); // lista de palavras do jogo

  const [ pickedWord, setPickedWord ] = useState(''); // palavra selecionada
  const [ pickedCategory, setPickedCategory ] = useState(''); // categoria selecionada
  const [ letters, setLetters ] = useState([]); // letras da palavra selecionada em array
  
  const [ guessedLetters, setGuessedLetters ] = useState([]); // letras adivinhadas
  const [ wrongLetters, setWrongLetters ] = useState([]); // letras erradas

  const [ guesses, setGuesses ] = useState(guessesQty); // quantidade de chances de adivinhar as letras
  const [ score, setScore ] = useState(0); // pontuação



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
  const verifyLetter = (letter) => {

    const normalizedLetter = letter.toLowerCase();

    // verifica se a letra já foi enviada anteriormente
    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    // verifica se a letra informada esta correta ou errada
    if (letters.includes(normalizedLetter)) {
      // actualGuessedLetters é um array com o valor atual de guessedLetters (função nativa de um setState)
      setGuessedLetters(actualGuessedLetters => [
        ...actualGuessedLetters,
        normalizedLetter
      ]);
      setScore(actualScore => actualScore + 3);
    } else {
      setWrongLetters(actualWrongLetters => [
        ...actualWrongLetters,
        normalizedLetter
      ]);
      setGuesses(actualGuesses => actualGuesses - 1); // diminui 1 chance ao errar
    }
  }

  // limpa as letras adivinhadas e erradas
  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  }

  // executa sempre que guesses for alterado
  useEffect(() => {
    if(guesses <= 0) {
      clearLetterStates();
      setGameStage(stages[2].name); // finaliza o jogo
    }
  }, [guesses])

  // logs fora da variavel (dentro de verifyLetter() eles exibem antes da alteração)
  console.log(guessedLetters);
  console.log(wrongLetters);
  console.log(guesses);

  // reinicia o jogo
  const retry = () => {
    setScore(0);
    setGuesses(guessesQty);
    setGameStage(stages[0].name);
  }

  return (
    <div className="App">
      {   // Inicio do jogo ...
      gameStage === "start" &&
        <StartScreen
          startGame={startGame}
        />
      } { // ... durante o jogo ...
      gameStage === "game" && 
        <Game 
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      } { // ... fim do jogo.
      gameStage === "end" &&
        <GameOver 
          retry={retry}
          score={score}
        />
      }
    </div>
  );
}

export default App;
