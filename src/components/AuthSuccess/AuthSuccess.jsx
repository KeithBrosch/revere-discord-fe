import { useNavigate } from 'react-router-dom';
import { supabase } from '../../utils/createSupabaseClient';
import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

export const AuthSuccess = () => {
  const navigate = useNavigate();
  const { setUser } = useOutletContext();

  useEffect(() => {
    getUserData();
  }, []);

  async function getUserData() {
    try {
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;
      if (data?.user) {
        setUser(data.user);
        navigate('/')
      } else {
        console.log('No user data', data);
      }
    } catch (error) {
      console.error('Error fetching user data', error);
    }
  }

  return (
    <div>AuthSuccess</div>
  );
}
