import React, { useState } from 'react';
import axios from 'axios';
import { Stack } from '@mui/material';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
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
  const [username, setUsername] = useState('');

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const sendRegister = async (e, p, u) => {
    await axios({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'post',
      url: 'http://localhost:3000/user/register',
      data: {
        email: e,
        username: u,
        password: p,
      },
    }).then((res) => console.log('Res', res.data));
  };

  return (
    <div
      style={{
        border: '1px solid #dadce0',
        width: 450,
        height: 575,
        borderRadius: 8,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 140,
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
          Contacts
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
          Contacts'a kayıt ol
        </p>
        <Stack direction="column">
          <TextField
            id="email"
            label="Bir E-posta Girin"
            style={{ marginTop: 30 }}
            value={email}
            onChange={handleEmail}
          />
          <TextField
            id="username"
            label="Bir kullanıcı adı girin"
            style={{ marginTop: 30 }}
            value={username}
            onChange={handleUsername}
          />
          <Stack direction="row">
            <TextField
              id="passowrd"
              label="Şifre Oluşturun"
              type={visibility}
              style={{ marginTop: 20, width: 310 }}
              value={password}
              onChange={handlePassword}
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
            Kayıt olmak üzre Contacs mesafeli sözleşmesini kabul etmektesiniz.
            <Button style={{ fontSize: 11, lineHeight: 1.4, marginLeft: -4 }}>
              Okumak için Tıklayın
            </Button>
          </p>
        </Stack>
        <Button
          variant="text"
          style={{ marginTop: 20 }}
          onClick={() => {
            navigate('/login');
          }}
        >
          <p style={{ fontSize: 11, fontWeight: 700, margin: 'auto' }}>
            Hesabınız var mı?
          </p>
        </Button>
        <Button
          variant="contained"
          style={{ marginTop: 20, marginLeft: 120 }}
          onClick={() => {
            sendRegister(email, password, username);
          }}
        >
          Kayıt ol
        </Button>
      </div>
    </div>
  );
};

export default Register;
