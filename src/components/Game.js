import "./Game.css"

const Game = ({ verifyLetter }) => {
  return (
    <div>
      <button onClick={verifyLetter}>Finalizar jogo</button>
    </div>
  )
}

export default Game;