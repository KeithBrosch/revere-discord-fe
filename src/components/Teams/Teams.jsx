import { useState } from 'react'
import { supabase } from '../../utils/createSupabaseClient'
import { useEffect } from 'react';
import './Teams.css';
import GameCard from '../GameCard/GameCard';

import dotenv from 'dotenv';

export const Teams = () => {
  const [allGames, setAllGames] = useState([]);

  useEffect(() => {
    fetchGames();
  }, [])

  async function fetchGames() {
    const { data } = await supabase
      .from('games')
      .select('*');

      console.log(data);

      setAllGames(data);
  }

  return (
    <div>
      {/* This route will have 2 child routes: My Subscriptions, and Explore All Teams */}
      <div className="filters">
        <h2>Filter Teams by Game</h2>
        <div className="games-filter">
          {allGames && allGames.map((game) => <GameCard key={game.id} gameInfo={game} />)}
        </div>
      </div>
    </div>
  )
}
