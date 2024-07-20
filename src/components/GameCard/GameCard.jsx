import './GameCard.css';

const GameCard = ({gameInfo, setGameFilter}) => {
  return (
    <div className="game-card" onClick={() => setGameFilter(gameInfo.id)} style={{backgroundImage: `url(${gameInfo.icon})`}}>
      <div className="game-name">
        <span>
          {gameInfo.name.replaceAll('-', ' ')}
        </span>
      </div>
    </div>
  )
}

export default GameCard