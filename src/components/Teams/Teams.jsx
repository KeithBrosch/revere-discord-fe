import { useState, useEffect } from 'react';
import { supabase } from '../../utils/createSupabaseClient';
import { useOutletContext } from 'react-router-dom';
import './Teams.css';
import GameCard from '../GameCard/GameCard';
import { TeamCard } from '../TeamCard/TeamCard';

export const Teams = () => {
  const { allGames } = useOutletContext();
  const [allTeams, setAllTeams] = useState([]);
  const [selectedGame, setSelectedGame] = useState();

  useEffect(() => {
    if (allGames && allGames.length > 0) {
      setSelectedGame(prevSelectedGame => prevSelectedGame || allGames[0]);
    }
  }, [allGames]);

  // get games on mount
  useEffect(() => {
    fetchGames();
  }, []);

  // get teams whenever selected game changes
  useEffect(() => {
    if (selectedGame) {
      console.log(selectedGame);
      fetchTeams();
    }
  }, [selectedGame]);

  const setGameFilter = (event) => {
    setSelectedGame(event);
  };

  async function fetchGames() {
    const { data } = await supabase
      .from('games')
      .select('*');
    // Update allGames here if needed
  }

  async function fetchTeams() {
    const { data } = await supabase
      .from('teams')
      .select('*')
      .eq('game_id', selectedGame.id);
    setAllTeams(data);
  }

  return (
    <div>
      <div className="filters">
        <h2>Filter Teams by Game</h2>
        <div className="games-filter">
          {allGames && allGames.map((game) => (
            <GameCard key={game.id} gameInfo={game} setGameFilter={setGameFilter} />
          ))}
        </div>
      </div>
      {allTeams.length > 0 && <div className="teams">
        {allTeams.map((team) => (
          <span>{JSON.stringify(team)}</span>
          // <TeamCard key={`team-${team.id}`} teamInfo={team} />
        ))}
      </div>}
    </div>
  );
};
