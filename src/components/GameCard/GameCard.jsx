import './GameCard.css';

const GameCard = ({gameInfo}) => {
  return (
    <div className="game-card" style={{backgroundImage: `url(${gameInfo.icon})`}}>
    </div>
  )
}

export default GameCard