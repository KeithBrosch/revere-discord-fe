import './Dashboard.css';
import React, { useEffect, useState } from 'react'
import { supabase } from '../../utils/createSupabaseClient';
import { TeamCard } from '../TeamCard/TeamCard';

export const Dashboard = () => {
  const [userId, setUserId] = useState(1);
  const [userSubscriptions, setUserSubscriptions] = useState([]);

  useEffect(() => {
    fetchUserSubscriptions();
  }, [])

  async function fetchUserSubscriptions() {
    const { data } = await supabase
    .from('subscriptions')
    .select('team_id, teams(*, games(*))')
    .eq('user_id', 1);

    setUserSubscriptions(data);
  }

  // todo: on mount, send to login page if not logged in
  return (
    <div>
      <div className="subscriptions">
        <h3>Your Subscriptions</h3>
        <div className="subscriptions-grid">
          {userSubscriptions && userSubscriptions.map((subscription) => <TeamCard key={subscription.teams.id} teamInfo={subscription.teams}/>)}
        </div>
      </div>
    </div>
  )
}