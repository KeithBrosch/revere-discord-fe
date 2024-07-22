import './TeamCard.css'
import { useOutletContext } from 'react-router-dom';
import GameChip from '../GameChip/GameChip'

export const TeamCard = ({teamInfo, subscribed = false}) => {
  const { allGames } = useOutletContext();

  return (
    <div className={subscribed ? 'team-card subscribed' : 'team-card'}>
      {/* todo: use defulat game logos for teams without logos */}
      <img src={teamInfo.logo || allGames.find((game) => game.id === teamInfo.game_id).icon || ''} alt={teamInfo.name} />
      <span>{teamInfo.name}</span>
      {/* <GameChip game={teamInfo.games || teamInfo}/> */}
      <GameChip gameInfo={allGames.find((game) => game.id === teamInfo.game_id)}/>
    </div>
  )
}
