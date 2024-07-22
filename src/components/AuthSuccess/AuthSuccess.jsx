import { useNavigate } from 'react-router-dom';
import { supabase } from '../../utils/createSupabaseClient';
import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        navigate('/');
        toast.success(`Successfully logged in as ${data.user.user_metadata.name}`);
      } else {
        console.log('No user data', data);
      }
    } catch (error) {
      toast('Error fetching user data', error);
      console.error('Error fetching user data', error);
    }
  }

  return (
    <div>AuthSuccess</div>
  );
}
