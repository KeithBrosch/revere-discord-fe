import React, { useEffect } from 'react';
import './SideNav.css';
import { NavLink } from "react-router-dom";
import revereLogo from '../../assets/horse-head-solid.svg';

import { useNavigate } from 'react-router-dom';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../../utils/createSupabaseClient';
import { Auth } from '@supabase/auth-ui-react';
import { toast } from 'react-toastify';

export const SideNav = ({ user, setUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event) => {
      console.log(event);
      if (event === "SIGNED_IN") {
        navigate("/success");
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  const signOutUser = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
    } else {
      setUser({});
      navigate('/');
      window.location.reload();
      toast.success(`Successfully logged out`);
    }
  };

  const navItems = [
    { text: 'Dashboard', route: '/', class: '' },
    { text: 'Teams', route: '/teams', class: '' },
    { text: 'Settings', route: '/settings', class: '' },
    { text: 'About', route: '/about', class: '' },
    { text: 'FAQ', route: '/faq', class: '' },
    { text: 'Feedback', route: '/feedback', class: '' },
  ];

  return (
    <div className="side-nav">
      <div className="logo-container">
        <img src={revereLogo} alt='Revere' />
      </div>
      <div className="nav-items">
        {navItems.map((item) => (
          <NavLink key={item.route} to={item.route} className={(navData) => (navData.isActive ? `active nav-item ${item.class}` : `nav-item ${item.class}`)}>
            <span className='title'>{item.text}</span>
          </NavLink>
        ))}
      </div>
      <div className="auth-container">
        {Object.keys(user).length === 0 ? (
          <Auth 
            supabaseClient={supabase}
            onlyThirdPartyProviders={true}
            appearance={{ theme: ThemeSupa }}
            providers={["discord"]}
          />
        ) : (
          <button className="sign-out-button" onClick={signOutUser}>
            <img src={user.user_metadata.picture} />
            Sign Out
          </button>
        )}
      </div>
    </div>
  );
};
