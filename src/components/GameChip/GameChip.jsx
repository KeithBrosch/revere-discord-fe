import './GameChip.css'

const GameChip = ({game}) => {
  return (
    <div className={`game-chip ${game.name.toLowerCase()}`}>{game.name.replaceAll('-', ' ')}</div>
  )
}

export default GameChip