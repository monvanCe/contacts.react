import React, { useState } from 'react';
import { Stack } from '@mui/material';
import { TextField, Button } from '@mui/material';

const Login = () => {
  const [visibility, setVisibility] = useState('password');

  const changeVisibility = () => {
    if (visibility === 'password') {
      setVisibility('text');
    } else {
      setVisibility('password');
    }
  };

  return (
    <div
      style={{
        border: '1px solid #dadce0',
        width: 450,
        height: 500,
        borderRadius: 8,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 140,
        display: 'flex',
      }}
    >
      <div style={{ marginTop: '4%', marginLeft: '9%', marginRight: '9%' }}>
        <img
          src={require('../assets/Logo.png')}
          style={{
            height: 70,
            width: 70,
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        />
        <p style={{ textAlign: 'center', fontSize: 24, fontWeight: 400 }}>
          Oturum Aç
        </p>
        <p
          style={{
            textAlign: 'center',
            fontSize: 16,
            fontWeight: 400,
            letterSpacing: 0.1,
            lineHeight: 0,
          }}
        >
          Contact Hesabınızı Kullanın
        </p>
        <Stack direction="column">
          <TextField
            id="email"
            label="Bir E-posta Girin"
            style={{ marginTop: 30 }}
          />
          <Stack direction="row">
            <TextField
              id="passowrd"
              label="Şifre Oluşturun"
              type={visibility}
              style={{ marginTop: 20, width: 310 }}
            />
            <img
              src={
                visibility === 'password'
                  ? require('../assets/eye-off.png')
                  : require('../assets/eye-on.png')
              }
              onClick={() => changeVisibility()}
              style={{
                height: 35,
                width: 35,
                marginTop: 33,
                marginLeft: 15,
              }}
            />
          </Stack>
          <p
            style={{
              fontSize: 14,
              color: '#5f6368',
              lineHeight: 1.4,
              marginTop: 32,
            }}
          >
            Bu cihazda geçici oturum açmak istiyorsanız lütfen misafir modunu
            kullanın
          </p>
        </Stack>
        <Button variant="text" style={{ marginTop: 20 }}>
          <p style={{ fontSize: 11, fontWeight: 700, margin: 'auto' }}>
            Hesabınız yok mu?
          </p>
        </Button>
        <Button variant="contained" style={{ marginTop: 20, marginLeft: 120 }}>
          Giriş Yap
        </Button>
      </div>
    </div>
  );
};

export default Login;
