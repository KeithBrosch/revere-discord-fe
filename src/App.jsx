import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { SideNav } from './components/SideNav/SideNav';
import { supabase } from './utils/createSupabaseClient';
import { ToastContainer } from 'react-toastify';
import './App.css';

function App() {
  const [user, setUser] = useState({});
  const [allGames, setAllGames] = useState([]);

  useEffect(() => {
    fetchGames();
  });


  const userUpdated = function(event) {
    setUser(event);
  };

  async function fetchGames() {
    const { data } = await supabase
      .from('games')
      .select('*');

      setAllGames(data);
  }

  return (
    <>
      <SideNav setUser={userUpdated} user={user} />
      <div className="outlet-container">
        {/* Pass the setUser function to the Outlet context */}
        <Outlet context={{ user, allGames, setUser: userUpdated }} />
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          theme="light"
          />
      </div>
    </>
  );
}

export default App;
