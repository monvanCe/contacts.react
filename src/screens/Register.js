import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Stack } from '@mui/material';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  //rotasyon default variable'ı
  const navigate = useNavigate();

  //token verifikasyonu
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

  const [Rusername, setRusername] = useState({
    value: 'username',
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
    if (password.length < 5) return 'Şifre en az 5 karakter olmalı ';
    return '';
  };

  const usernameValidator = (name) => {
    if (!name) return 'Username boş olamaz';
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
  const [username, setUsername] = useState('');

  const sendRegister = (e, p, u) => {
    if (emailValidator(e) || usernameValidator(u) || passValidator(p)) {
      if (emailValidator(e)) {
        setRemail({ value: emailValidator(e), status: false });
      } else {
        setRemail({ status: true });
      }
      if (usernameValidator(u)) {
        setRusername({ value: usernameValidator(u), status: false });
      } else {
        setRusername({ status: true });
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
        url: 'http://localhost:3001/user/register',
        data: {
          email: e,
          username: u,
          password: p,
        },
      }).then((res) => {
        console.log('Res', res.data);
        if (res.data.password) {
          navigate('/login');
        } else {
          if (res.data.keyPattern.email) {
            setRemail({ value: 'Bu email zaten kayıtlı', status: false });
            setRusername({ status: true });
            setRpassword({ status: true });
          } else {
            res.data.keyPattern.username &&
              setRusername({
                value: 'Bu username zaten kayıtlı',
                status: false,
              });
            setRemail({ status: true });
          }
        }
      });
    }
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
            error={!Remail.status}
            id="email"
            label={!Remail.status ? Remail.value : 'lütfen bir email girin'}
            style={{ marginTop: 30 }}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            error={!Rusername.status}
            id="username"
            label={
              !Rusername.status ? Rusername.value : 'Bir kullanıcı adı girin'
            }
            style={{ marginTop: 30 }}
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <Stack direction="row">
            <TextField
              error={!Rpassword.status}
              id="passowrd"
              label={!Rpassword.status ? Rpassword.value : 'Şifre Oluşturun'}
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
