import "./Game.css"

const Game = ({ verifyLetter, pickedWord, pickedCategory, letters, guessedLetters, wrongLetters, guesses, score }) => {
  return (
    <div className="game">
      <p className="points">
        <span>Pontuação: {score}</span>
      </p>
      <h1>Adivinhe a Palavra</h1>
      <h3 className="tip">
        Dica sobre a palavra: <span>{pickedCategory}</span>
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
        <p>Tente adivinhar uma letra da palavra</p>
        <form>
          <input type="text" name="letter" maxLength="1" required />
          <button>Jogar</button>
        </form>
      </div>
      
      {/* Exibe as letras erradas informadas */}
      <div className="worngLettersContainer">
        <p>Letras já utilizadas</p>
        {wrongLetters.map((wl, i) => (
          <span key={i}>{wl}, </span>
        ))}
      </div>

      <button onClick={verifyLetter}>Finalizar jogo</button>
    </div>
  )
}

export default Game;