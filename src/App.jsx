import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { SideNav } from './components/SideNav/SideNav';
import './App.css';

function App() {
  const [user, setUser] = useState({});

  const userUpdated = function(event) {
    console.log(event);
    setUser(event);
  };

  return (
    <>
      <SideNav setUser={userUpdated} user={user} />
      <div className="outlet-container">
        {/* Pass the setUser function to the Outlet context */}
        <Outlet context={{ user, setUser: userUpdated }} />
      </div>
    </>
  );
}

export default App;
