import './GameCard.css';
import GameChip from '../GameChip/GameChip';

const GameCard = ({gameInfo, setGameFilter, deselected}) => {
  return (
    <div className={deselected ? 'game-card-container deselected' : 'game-card-container'}>
      <div className="game-card" onClick={() => setGameFilter(gameInfo)} style={{backgroundImage: `url(${gameInfo.icon})`}}>
        <div className="game-name">
          <span>
            {gameInfo.name.replaceAll('-', ' ')}
          </span>
        </div>
      </div>
      <GameChip gameInfo={gameInfo} />
    </div>
  )
}

export default GameCard