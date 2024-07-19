import './SideNav.css'
import { Link } from "react-router-dom";
import revereLogo from '../../assets/horse-head-solid.svg';
import teamsIcon from '../../assets/plus-solid.svg'
import settingsIcon from '../../assets/gear-solid.svg'
import aboutIcon from '../../assets/circle-info-solid.svg'
import faqIcon from '../../assets/question-solid.svg'
import feedbackIcon from '../../assets/comment-solid.svg'
import loginIcon from '../../assets/right-from-bracket-solid.svg'
import logoutIcon from '../../assets/right-from-bracket-solid.svg'
import { useState } from 'react';

export const SideNav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navItems = [
    {
      icon: revereLogo,
      text: '',
      route: '/',
      class: 'logo-item',
    },
    {
      icon: teamsIcon,
      text: 'Teams',
      route: '/teams',
      class: '',
    },
    {
      icon: settingsIcon,
      text: 'Settings',
      route: '/settings',
      class: '',
    },
    {
      icon: aboutIcon,
      text: 'About',
      route: '/about',
      class: '',
    },
    {
      icon: faqIcon,
      text: 'FAQ',
      route: '/faq',
      class: '',
    },
    {
      icon: feedbackIcon,
      text: 'Feedback',
      route: '/feedback',
      class: '',
    },
    {
      icon: isLoggedIn ? logoutIcon : loginIcon,
      text: isLoggedIn ? 'Log Out' :  'Log In',
      route: isLoggedIn ? 'logout' :  'login',
      class: 'auth',
    },
  ]

  return (
    <div className="side-nav">
      {navItems.map((item) => (
        <Link key={item.route} to={item.route} className={`nav-item ${item.class}`}>
          <img src={item.icon} alt={item.text} />
          <span className='title'>{item.text}</span>
        </Link>
      ))}
    </div>
  )
}
