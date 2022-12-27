import "./GameOver.css"

const GameOver = ({ retry }) => {
  return (
    <div>
      <button onClick={retry}>Tentar novamente</button>
    </div>
  )
}

export default GameOver;