import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { isMobile } from 'react-device-detect';

import {
  AddContactModal,
  EditContactModal,
  RemoveContactModal,
  LogoutModal,
  makeList,
  searchFilter,
} from '../components/ContactsFunctions';

import { contactsStyles } from '../components/Styles';

const Contacts = () => {
  //app'in variableları
  const navigate = useNavigate();
  const [token] = useState(localStorage.getItem('token'));
  const [username, setUsername] = useState('');
  const [datas] = useState([]);
  const [list] = useState([]);
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState('');
  const [slist, setSlist] = useState([]);
  const [cache, setCache] = useState([]);

  //token yoksa giriş ekranına gönder
  useEffect(() => {
    !localStorage.getItem('token') && navigate('/login');
  }, []);

  //Modallerin(açılır pencereler) variableları
  const [ashow, setAshow] = useState(false);
  const [eshow, setEshow] = useState(false);
  const [rshow, setRshow] = useState(false);
  const [lshow, setLshow] = useState(false);
  const [c, setC] = useState();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  //api çekme
  useEffect(() => {
    // post gönderme
    axios({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'post',
      url: 'http://localhost:3001/user/showcontacts',
      data: {
        token: token,
      },
    })
      .then(({ data }) => {
        // apiden alınan rehberleri datas dizisine gönderme
        data.contacts.forEach((element) => {
          datas.push({ name: element.name, number: element.number });
        });

        //logonun altındaki username'i atıyor
        setUsername(data.username);
      })
      .then(() => {
        //list dizisini doldurur
        datas.forEach((el, c) => {
          list.push(
            makeList(el, c, setEshow, setC, setName, setNumber, setRshow)
          );
        });

        //slist dizisini doldurur
        datas.forEach((el, c) => {
          slist.push(
            makeList(el, c, setEshow, setC, setName, setNumber, setRshow)
          );
        });
      })
      .then(() => {
        //sayıcıyı slist dizisinin uzunluğuna eşitleme
        setCount(slist.length);
      });
  }, []);

  return (
    //contacts screen dış container
    <div style={contactsStyles.container}>
      <div direction="column" style={{ marginTop: 20 }}>
        {/* app logo */}
        <img
          alt="logo"
          src={require('../assets/Logo.png')}
          style={contactsStyles.logo}
        />

        {/* rehber arama kutucuğu */}
        <TextField
          size={isMobile ? 'small' : 'normal'}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            searchFilter(e.target.value, list, cache, setSlist, setCache);
          }}
          style={contactsStyles.search}
        />

        {/* rehber ekleme kısmı buton özellikleri  */}
        <img
          alt="add"
          src={require('../assets/add.svg')}
          onClick={() => {
            setAshow(true);
          }}
          style={contactsStyles.add}
        ></img>
      </div>

      {/* alt kısım */}
      <div style={contactsStyles.alt}>
        <p style={contactsStyles.username}>{username}</p>
        <p style={contactsStyles.telefon}>Telefon numarası</p>
        <Button onClick={() => setLshow(true)} style={contactsStyles.çıkış}>
          Çıkış Yap
        </Button>
      </div>

      {/* ayırım çizgisi */}
      <hr style={{ margin: 15, color: '#878787' }} />

      {/* kişi sayısı */}
      <p style={contactsStyles.kişiler}>Kişiler ({count})</p>

      {/* kişi listesini görüntülünen kısım */}
      <ul style={{ listStyle: 'none' }}>{slist}</ul>

      {/* rehber ekleme kısmı açılır pencere */}
      <AddContactModal
        setAshow={setAshow}
        list={list}
        slist={slist}
        setCount={setCount}
        show={ashow}
        token={token}
        onHide={() => setAshow(false)}
      />

      {/* rehber düzenleme açılır pencere */}
      <EditContactModal
        list={list}
        setRshow={setRshow}
        slist={slist}
        setCount={setCount}
        c={c}
        setC={setC}
        setName={setName}
        setNumber={setNumber}
        name={name}
        number={number}
        token={token}
        setEshow={setEshow}
        show={eshow}
        onHide={() => setEshow(false)}
      />

      {/* rehber silme açılır pencere*/}
      <RemoveContactModal
        name={name}
        token={token}
        c={c}
        setRshow={setRshow}
        list={list}
        slist={slist}
        setCount={setCount}
        show={rshow}
        onHide={() => setRshow(false)}
      />

      {/* çıkış onay açılır penceresi */}
      <LogoutModal
        show={lshow}
        setLshow={setLshow}
        onHide={() => setLshow(false)}
      />
    </div>
  );
};

export default Contacts;
