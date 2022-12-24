import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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
        name: props.name,
        number: props.number,
      },
    },
  }).then(
    props.list.push(
      props.makeList({ name: name, number: number }, props.list.length)
    ),
    props.slist.push(
      props.makeList({ name: name, number: number }, props.slist.length)
    ),
    props.setCount(props.slist.length)
  );
};

//edit contact modeli
export const EditContactModal = (props) => {
  const [ename, setEname] = useState(props.name);
  const [enumber, setEnumber] = useState(props.number);

  props.show && !ename && setEname(props.name);
  props.show && !ename && setEnumber(props.number);

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
      props.makeList({ name: name, number: number }, props.c)
    ),
    props.slist.splice(
      props.c,
      1,
      props.makeList({ name: name, number: number }, props.c)
    ),
    props.setCount(props.slist.length)
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
