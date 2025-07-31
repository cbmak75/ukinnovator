import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Since we removed authentication, redirect to the main landing page
    navigate('/', { replace: true });
  }, [navigate]);

  return null;
};

export default Auth;