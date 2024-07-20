import './TeamCard.css'
import GameChip from '../GameChip/GameChip'

export const TeamCard = ({teamInfo, subscribed = false}) => {
  return (
    <div className={subscribed ? 'team-card subscribed' : 'team-card'}>
      {/* todo: use defulat game logos for teams without logos */}
      <img src={teamInfo.logo || teamInfo.games.icon} alt={teamInfo.name} />
      <span>{teamInfo.name}</span>
      <GameChip game={teamInfo.games}/>
    </div>
  )
}
