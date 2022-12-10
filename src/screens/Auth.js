import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Layout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.getItem('token') ? navigate('/contacts') : navigate('login');
  }, []);

  return (
    <div>
      <p>Giriş Yapılıyor...</p>
    </div>
  );
};

export default Layout;
