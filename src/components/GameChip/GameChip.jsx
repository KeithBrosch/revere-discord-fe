import './GameChip.css'

const GameChip = ({gameInfo}) => {
  
  return (
    <div className={`game-chip ${gameInfo.name.toLowerCase()}`}>{gameInfo.name.replaceAll('-', ' ')}</div>
  )
}

export default GameChip