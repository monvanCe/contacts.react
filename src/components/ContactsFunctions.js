import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { contactsStyles } from './Styles';

//rastgele renk return eden fonksiyon
const randomColor = () => {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 14)];
  }
  return color;
};

//diziyi listeleme array'ine importlayan fonksiyon
export const makeList = (
  el,
  c,
  setEshow,
  setC,
  setName,
  setNumber,
  setRshow
) => {
  return (
    <li key={c}>
      <div
        style={{
          display: 'flex',
          margin: 15,
          marginLeft: -5,
        }}
      >
        <div
          style={{ ...contactsStyles.brand, backgroundColor: randomColor() }}
        >
          <p style={contactsStyles.brandtext}>{el.name[0]}</p>
        </div>

        <div style={contactsStyles.name}>{el.name}</div>
        <div style={contactsStyles.number}>{el.number}</div>

        {/* rehber düzenleme*/}
        <img
          alt="edit"
          src={require('../assets/edit.svg')}
          onClick={() => {
            setEshow(true);
            setC(c);
            setName(el.name);
            setNumber(el.number);
          }}
          style={contactsStyles.edit}
        />
        {/* rehber silme */}
        <img
          alt="remove"
          onClick={() => {
            setRshow(true);
            setC(c);
            setName(el.name);
          }}
          src={require('../assets/remove.svg')}
          style={contactsStyles.remove}
        />
      </div>
    </li>
  );
};

export const LogoutModal = (props) => {
  const navigate = useNavigate();
  return (
    <Modal
      show={props.show}
      onHide={() => props.setLshow(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <h3>Çıkmak istediğinize emin misiniz?</h3>
      </Modal.Header>
      <Modal.Body>
        <Button
          variant="contained"
          onClick={() => {
            localStorage.removeItem('token');
            navigate('/');
          }}
          style={{ display: 'flex', margin: 'auto' }}
        >
          Eminim!
        </Button>
      </Modal.Body>
    </Modal>
  );
};

//addcontact modeli
export const AddContactModal = (props) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  return (
    <Modal
      show={props.show}
      onHide={() => props.setAshow(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <h3>Kişi Ekleyin</h3>
      </Modal.Header>
      <Modal.Body>
        <div direction="row" style={{ display: 'flex' }}>
          <div
            style={{
              marginTop: 10,
              marginLeft: 10,
              height: 70,
            }}
          >
            <TextField
              label="isim"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div style={{ marginLeft: 10, height: 70, marginTop: 10 }}>
            <TextField
              label="numara"
              value={number}
              onChange={(e) => {
                setNumber(e.target.value);
              }}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="contained"
          style={{
            display: 'flex',
            margin: 'auto',
            marginBottom: 10,
          }}
          onClick={() => {
            addcontactfunction(name, number, props);
            props.setAshow(false);
          }}
        >
          Ekle
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

//addcontact fonksiyonu
const addcontactfunction = (name, number, props) => {
  axios({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'post',
    url: 'http://localhost:3001/user/addcontact',
    data: {
      token: props.token,
      contact: {
        name: name,
        number: number,
      },
    },
  }).then(
    props.list.push(
      makeList({ name: name, number: number }, props.list.length)
    ),
    props.slist.push(
      makeList({ name: name, number: number }, props.slist.length)
    ),
    props.setCount(props.slist.length)
  );
};

//edit contact modeli
export const EditContactModal = (props) => {
  const [ename, setEname] = useState(props.name);
  const [enumber, setEnumber] = useState(props.number);

  useEffect(() => {
    setEname(props.name);
    setEnumber(props.number);
  }, [props.name]);

  return (
    <Modal
      show={props.show}
      onHide={() => props.setEshow(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <h3>Kişinizi Düzenleyin</h3>
      </Modal.Header>
      <Modal.Body>
        <div direction="row" style={{ display: 'flex' }}>
          <div
            style={{
              marginTop: 10,
              marginLeft: 10,
              height: 70,
            }}
          >
            <TextField
              label="isim"
              value={ename}
              onChange={(e) => {
                setEname(e.target.value);
              }}
            />
          </div>
          <div style={{ marginLeft: 10, height: 70, marginTop: 10 }}>
            <TextField
              label="numara"
              value={enumber}
              onChange={(e) => {
                setEnumber(e.target.value);
              }}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="contained"
          style={{
            display: 'flex',
            margin: 'auto',
            marginBottom: 10,
            backgroundColor: 'orange',
          }}
          onClick={() => {
            editcontactfunction(ename, enumber, props);
            props.setEshow(false);
          }}
        >
          Düzenle
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

//editcontact fonksiyonu
const editcontactfunction = (name, number, props) => {
  axios({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'post',
    url: 'http://localhost:3001/user/updatecontact',
    data: {
      key: props.c,
      token: props.token,
      contact: {
        name: name,
        number: number,
      },
    },
  }).then(
    props.list.splice(
      props.c,
      1,
      makeList(
        { name: name, number: number },
        props.c,
        props.setEshow,
        props.setC,
        props.setName,
        props.setNumber
      )
    ),
    props.slist.splice(
      props.c,
      1,
      makeList(
        { name: name, number: number },
        props.c,
        props.setEshow,
        props.setC,
        props.setName,
        props.setNumber
      )
    )
  );
};

export const RemoveContactModal = (props) => {
  return (
    <Modal
      show={props.show}
      onHide={() => {
        props.setRshow(false);
      }}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <h3>Silmek İstediğinize emin misiniz ?</h3>
      </Modal.Header>
      <Modal.Body>
        <div direction="row" style={{ display: 'flex' }}>
          <p>{props.name}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="contained"
          style={{
            display: 'flex',
            margin: 'auto',
            marginBottom: 10,
            backgroundColor: 'red',
          }}
          onClick={() => {
            RemoveContactFunction(props);
            props.setRshow(false);
          }}
        >
          Sil
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

//removecontact fonksiyonu
const RemoveContactFunction = (props) => {
  axios({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'post',
    url: 'http://localhost:3001/user/deletecontact',
    data: {
      key: props.c,
      token: props.token,
    },
  })
    .then(props.list.splice(props.c, 1), props.slist.splice(props.c, 1))
    .then(props.setCount(props.slist.length));
};
