import './GameCard.css';
import GameChip from '../GameChip/GameChip';

const GameCard = ({gameInfo, setGameFilter}) => {
  return (
    <div className='game-card-container'>
      <div className="game-card" onClick={() => setGameFilter(gameInfo.id)} style={{backgroundImage: `url(${gameInfo.icon})`}}>
        <div className="game-name">
          <span>
            {gameInfo.name.replaceAll('-', ' ')}
          </span>
        </div>
      </div>
      <GameChip game={gameInfo} />
    </div>
  )
}

export default GameCard