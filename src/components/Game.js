import { useState, useRef } from "react";
import "./Game.css"

const Game = ({ verifyLetter, pickedWord, pickedCategory, letters, guessedLetters, wrongLetters, guesses, score }) => {

  const [ letter, setLetter ] = useState('');
  const letterInputRef = useRef(null); // Hook useRef cria uma referência ao elemento input ref={letterInputRef} 

  const handleSubmit = async (e) => {
    e.preventDefault();

    await verifyLetter(letter);

    // Foca novamente o elemento ao fim do submit
    letterInputRef.current.focus();
    setLetter('');
  }

  return (
    <div className="game">
      <p className="points">
        <span>Pontuação: {score}</span>
      </p>
      <h1>Qual será a palavra?</h1>
      <h3 className="tip">
        Dica: <span>{pickedCategory[0].toUpperCase() + pickedCategory.substring(1)}</span>
      </h3>
      <p>Você ainda tem {guesses} tentativa(s).</p>

      {/* Verificação se as letras adivinhadas contém na palavra */}
      <div className="wordContainer">
        {letters.map((l, i) => (
          guessedLetters.includes(l) ? (
            <span key={i} className="letter">{l}</span>
            ) : (
            <span key={i} className="blankSquare"></span>
          )
        ))}
      </div>

      <div className="letterContainer">
        <p>Tente adivinhar uma letra da palavra:</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="letter"
            maxLength="1"
            required
            onChange={(e) => setLetter(e.target.value)}
            value={letter}
            ref={letterInputRef} 
          />
          <button>Enviar</button>
        </form>
      </div>
      
      {/* Exibe as letras erradas informadas */}
      <div className="worngLettersContainer">
        <p>Letras já utilizadas:</p>
        {wrongLetters.map((wl, i) => (
          <span key={i}>{wl}, </span>
        ))}
      </div>

      {/* <button onClick={verifyLetter}>Finalizar jogo</button> */}
    </div>
  )
}

export default Game;