import "./StartScreen.css";

let title1 = "Palavra";
let title2 = "Secreta";
title1 = title1.split("");
title2 = title2.split("");

const StartScreen = ({ startGame }) => {
  return (
    <div className="start bounceIn">
      <h1>
        {
          title1.map(t => (
            t === " " ? 
              <span className="title">{t}</span> :
              <span className="title">{t}</span>
          ))
        }
      </h1>
      <h1>
        {
          title2.map(t => (
            t === " " ? 
              <span className="title">{t}</span> :
              <span className="title">{t}</span>
          ))
        }
      </h1>
      <p>Um simples jogo de adivinhar palavras. Divirta-se!</p>
      <button onClick={startGame}>Começar o jogo</button>
    </div>
  )
}

export default StartScreen;