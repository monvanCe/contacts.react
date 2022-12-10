import React, { useState, useEffect } from 'react';
import { Stack } from '@mui/material';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.getItem('token')
      ? navigate('/contacts')
      : console.log('token mevcut değil');
  }, []);

  //validasyon variableları
  const [Remail, setRemail] = useState({
    value: 'email',
    status: true,
  });

  const [Rpassword, setRpassword] = useState({
    value: 'password',
    status: true,
  });

  //validasyonlar fonksiyonları
  const emailValidator = (email) => {
    const re = /\S+@\S+\.\S+/;
    if (!email) return 'Email boş olamaz';
    if (!re.test(email)) return 'Geçerli bi email adresi giriniz';
    return '';
  };

  const passValidator = (password) => {
    if (!password) return 'Şifre boş olamaz';
    return '';
  };

  const [visibility, setVisibility] = useState('password');

  const changeVisibility = () => {
    if (visibility === 'password') {
      setVisibility('text');
    } else {
      setVisibility('password');
    }
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const sendLogin = (e, p) => {
    if (emailValidator(e) || passValidator(p)) {
      if (emailValidator(e)) {
        setRemail({ value: emailValidator(e), status: false });
      } else {
        setRemail({ status: true });
      }
      if (passValidator(p)) {
        setRpassword({ value: passValidator(p), status: false });
      } else {
        setRpassword({ status: true });
      }
    } else {
      axios({
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'post',
        url: 'http://localhost:3001/user/login',
        data: {
          email: e,
          password: p,
        },
      })
        .then((response) => {
          console.log(response.data);
          if (response.data.status) {
            localStorage.setItem('token', response.data.token);
            navigate('/contacts');
          } else {
            console.log('giriş başarısız');
          }
        })
        .catch((error) => {
          console.log(error);
        });
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
          alt="logo"
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
            error={!Remail.status}
            id="email"
            label={!Remail.status ? Remail.value : 'Email adresinizi girin'}
            style={{ marginTop: 30 }}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Stack direction="row">
            <TextField
              error={!Rpassword.status}
              id="passowrd"
              label={!Rpassword.status ? Rpassword.value : 'Şifrenizi girin'}
              type={visibility}
              style={{ marginTop: 20, width: 310 }}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <img
              alt="password-eye"
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
                opacity: 0.55,
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
        <Button
          variant="text"
          style={{ marginTop: 20 }}
          onClick={() => {
            navigate('/register');
          }}
        >
          <p style={{ fontSize: 11, fontWeight: 700, margin: 'auto' }}>
            Hesabınız yok mu?
          </p>
        </Button>
        <Button
          variant="contained"
          style={{ marginTop: 20, marginLeft: 120 }}
          onClick={() => {
            sendLogin(email, password);
          }}
        >
          Giriş Yap
        </Button>
      </div>
    </div>
  );
};

export default Login;
