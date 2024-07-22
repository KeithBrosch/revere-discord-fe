import { useState, useEffect } from 'react';
import { supabase } from '../../utils/createSupabaseClient';
import { useOutletContext } from 'react-router-dom';
import './Teams.css';
import GameCard from '../GameCard/GameCard';
import { TeamCard } from '../TeamCard/TeamCard';

export const Teams = () => {
  const { allGames } = useOutletContext();
  const [allTeams, setAllTeams] = useState([]);
  const [selectedGame, setSelectedGame] = useState({});

  // when a game is clicked, set it as the active game and fetch teams
  const setGameFilter = (event) => {
    setSelectedGame(event);
    fetchTeams(selectedGame);
  }

  async function fetchTeams(selectedGame) {
    console.log(selectedGame);
    if (selectedGame?.id) {
      // startLoading();
      const { data } = await supabase
        .from('teams')
        .select('*')
        .eq('game_id', selectedGame.id);

      setAllTeams(data);
      // stopLoading();
    }
  }

  return (
    <div>
      <div className="filters">
        <h2>Filter Teams by Game</h2>
        <div className="games-filter">
          {allGames && allGames.map((game) => (
            <GameCard key={game.id} gameInfo={game} setGameFilter={setGameFilter} deselected={selectedGame.id !== game.id && Object.keys(selectedGame).length > 0}/>
          ))}
        </div>
      </div>
      {allTeams.length > 0 && <div className="teams-grid">
        {allTeams.map((team) => (
          <TeamCard key={`team-${team.id}`} teamInfo={team} />
        ))}
      </div>}
    </div>
  );
};
