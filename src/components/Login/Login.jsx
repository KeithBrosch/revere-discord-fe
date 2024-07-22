import './Login.css';
import { supabase } from '../../utils/createSupabaseClient';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();

  supabase.auth.onAuthStateChange(async (event) => {
    if (event == "SIGNED_IN") {
        navigate("/success");
    }
});
  return (
    <div className='login'>
      <Auth 
        supabaseClient={supabase}
        onlyThirdPartyProviders={true}
        providers={["discord"]}
      />
    </div>
  )
}
