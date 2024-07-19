import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import App from '../App';
import { Dashboard } from '../components/Dashboard/Dashboard';
import { Teams } from '../components/Teams/Teams';
import { Settings } from '../components/Settings/Settings';
import { About } from '../components/About/About';
import { FAQ } from '../components/FAQ/FAQ';
import { Feedback } from '../components/Feedback/Feedback';
import { Login } from '../components/Login/Login';
import { Logout } from '../components/Logout/Logout';
import { NotFound } from '../components/NotFound/NotFound';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Dashboard />}/>
      <Route path="teams" element={<Teams />}/>
      <Route path="settings" element={<Settings />}/>
      <Route path="about" element={<About />}/>
      <Route path="faq" element={<FAQ />}/>
      <Route path="feedback" element={<Feedback />}/>
      <Route path="login" element={<Login />}/>
      <Route path="logout" element={<Logout />}/>
      <Route path="*" element={<NotFound />}/>
    </Route>
  )
);