import './Dashboard.css';
import React, { useEffect, useState } from 'react';
import { supabase } from '../../utils/createSupabaseClient';
import { TeamCard } from '../TeamCard/TeamCard';

export const Dashboard = () => {
  const [userId, setUserId] = useState(1);
  const [userSubscriptions, setUserSubscriptions] = useState([]);
  const [mostSubscriptions, setMostSubscriptions] = useState([]);

  useEffect(() => {
    fetchUserSubscriptions();
    fetchMostSubscribed(userId);
  }, [userId]);

  async function fetchUserSubscriptions() {
    const { data } = await supabase
      .from('subscriptions')
      .select('team_id, teams(*, games(*))')
      .eq('user_id', userId);

    setUserSubscriptions(data);
  }

  // todo: move this nasty looking hook to a utils file
  async function fetchMostSubscribed(userId) {
    try {
      // Step 1: Fetch all subscriptions
      const { data: allSubscriptions, error: allSubscriptionsError } = await supabase
        .from('subscriptions')
        .select('team_id');

      if (allSubscriptionsError) {
        throw new Error(`Error fetching all subscriptions: ${allSubscriptionsError.message}`);
      }

      // Count subscriptions by team
      const subscriptionCounts = allSubscriptions.reduce((acc, { team_id }) => {
        acc[team_id] = (acc[team_id] || 0) + 1;
        return acc;
      }, {});

      // Step 2: Fetch the subscribed team IDs for the user
      const { data: subscribedTeams, error: subscribedTeamsError } = await supabase
        .from('subscriptions')
        .select('team_id')
        .eq('user_id', userId);

      if (subscribedTeamsError) {
        throw new Error(`Error fetching subscribed teams: ${subscribedTeamsError.message}`);
      }

      const subscribedTeamIds = subscribedTeams.map(sub => sub.team_id);

      // Step 3: Fetch all teams along with their games
      const { data: allTeams, error: allTeamsError } = await supabase
        .from('teams')
        .select('*, games(*)');

      if (allTeamsError) {
        throw new Error(`Error fetching teams: ${allTeamsError.message}`);
      }

      // Step 4: Exclude the teams the user is subscribed to and add the subscription counts
      const teamsWithCounts = allTeams
        .filter(team => !subscribedTeamIds.includes(team.id))
        .map(team => ({
          teams: {
            ...team,
            subscription_count: subscriptionCounts[team.id] || 0
          }
        }));

      // Sort teams by subscription count in descending order
      teamsWithCounts.sort((a, b) => b.teams.subscription_count - a.teams.subscription_count);

      console.log('Teams with most subscriptions that user is not subscribed to:', teamsWithCounts);
      setMostSubscriptions(teamsWithCounts.filter((team) => team.teams.subscription_count > 0));
    } catch (error) {
      console.error(error.message);
      setMostSubscriptions([]);
    }
  }

  return (
    <div>
      <div className="subscriptions">
        <h3>Your Subscriptions</h3>
        <div className="subscriptions-grid">
          {/* todo: make a TeamsCarousel component and use it here and below */}
          {userSubscriptions && userSubscriptions.map((subscription) => (
            <TeamCard key={subscription.teams.id} teamInfo={subscription.teams} subscribed={true}/>
          ))}
        </div>
      </div>
      <div className="most-subscriptions">
        <h3>Suggested Teams</h3>
        <div className="most-subscriptions-grid">
          {mostSubscriptions && mostSubscriptions.map((subscription) => (
            <div className='most-subscribed-card'>
              <TeamCard key={subscription.teams.id} teamInfo={subscription.teams} />
              <span className='subscriber-count'>{subscription.teams.subscription_count} {subscription.teams.subscription_count > 1 ? 'subscribers' : 'subscriber'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
