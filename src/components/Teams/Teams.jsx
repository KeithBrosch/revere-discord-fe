import { useState } from 'react'
import { supabase } from '../../utils/createSupabaseClient'
import { useEffect } from 'react';
import './Teams.css';
import GameCard from '../GameCard/GameCard';

import dotenv from 'dotenv';

export const Teams = () => {
  const [allGames, setAllGames] = useState([]);
  const [selectedGameId, setSelectedGameId] = useState(-1);
  const [allTeams, setAllTeams] = useState([]);

  // get games on mount
  useEffect(() => {
    fetchGames();
  }, []);

  // get teams whenever selected game changes
  useEffect(() => {
    fetchTeams();
  }, [selectedGameId])

  async function fetchGames() {
    const { data } = await supabase
      .from('games')
      .select('*');

      console.log(data);

      setAllGames(data);
  }

  async function fetchTeams() {
    const { data } = await supabase
      .from('teams')
      .select('*')
      .eq('game_id', selectedGameId);

      console.log(data);

      setAllTeams(data);
  }

  return (
    <div>
      {/* This route will have 2 child routes: My Subscriptions, and Explore All Teams */}
      <div className="filters">
        <h2>Filter Teams by Game</h2>
        <div className="games-filter">
          {allGames && allGames.map((game) => <GameCard key={game.id} gameInfo={game} setGameFilter={(event) => setSelectedGameId(event)} />)}
        </div>
      </div>
    </div>
  )
}
