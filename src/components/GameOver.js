import "./GameOver.css"

const GameOver = ({ retry, score }) => {
  return (
    <div>
      <h1>Fim de Jogo!</h1>
      <h2>Pontuação total: <span>{score}</span></h2>
      <button onClick={retry}>Tente novamente</button>
    </div>
  )
}

export default GameOver;