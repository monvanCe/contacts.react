import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import Popover from '@mui/material/Popover';
import { useNavigate } from 'react-router-dom';

const Contacts = () => {
  //app'in variableları
  const navigate = useNavigate();
  const [jwt] = useState(localStorage.getItem('token'));
  const token = jwt;
  const [username, setUsername] = useState('');
  const [datas] = useState([]);
  const color = [];
  const [list] = useState([]);
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState('');
  const [slist, setSlist] = useState([]);
  const [cache, setCache] = useState([]);

  //filtreleme işini yapan fonskyinonumuz
  const searchFilter = (e) => {
    list
      .filter((el) =>
        el.props.children.props.children[1].props.children
          .toLowerCase()
          .includes(e)
      )
      .forEach((filteredName) => {
        cache.push(filteredName);
      });
    setSlist(
      cache.map((el) => {
        return el;
      })
    );
    setCache([]);
  };

  //çıkış yapan fonksiyonumuz
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  //liste her tetiklendiğinde counter'ı değiştiren fonksiyon
  useEffect(() => {
    setCount(slist.length);
  }, [slist]);

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
  const makeList = (arr1, arr2) => {
    arr1.forEach((el, c) => {
      arr2.push(
        <li key={c}>
          <div
            style={{
              display: 'flex',
              margin: 15,
              marginLeft: -5,
            }}
          >
            <div
              style={{
                border: '1px solid white',
                backgroundColor: color[c],
                borderRadius: 20,
                height: 40,
                width: 40,
              }}
            >
              <p
                style={{
                  textAlign: 'center',
                  color: 'white',
                  marginTop: 7,
                  fontWeight: '500',
                }}
              >
                {el.name[0]}
              </p>
            </div>
            <div
              style={{
                marginLeft: 15,
                marginTop: 5,
                width: 300,
                fontSize: 14,
              }}
            >
              {el.name}
            </div>
            <div style={{ marginTop: 5, fontSize: 13.5, width: 240 }}>
              {el.number}
            </div>
            {/* rehber düzenleme*/}
            <img
              alt="edit"
              aria-describedby={eid}
              src={require('../assets/edit.svg')}
              onClick={(event) => {
                ehandleClick(event);
                setEc(c);
                seteName(datas[c].name);
                seteNumber(datas[c].number);
              }}
              style={{
                height: 15,
                width: 15,
                marginTop: 7.5,
                cursor: 'pointer',
              }}
            />
            {/* rehber silme */}
            <img
              alt="remove"
              aria-describedby={rid}
              onClick={(event) => {
                rhandleClick(event);
                setEc(c);
                seteName(datas[c].name);
              }}
              src={require('../assets/remove.svg')}
              style={{
                height: 15,
                width: 15,
                marginTop: 7.5,
                marginLeft: 50,
                cursor: 'pointer',
              }}
            />
          </div>
        </li>
      );
    });
    setCount(list.length);
  };

  // addcontact açılır pencere variableları
  const [aanchorEl, setaAnchorEl] = React.useState(null);
  const ahandleClick = (event) => {
    setaAnchorEl(event.currentTarget);
  };
  const ahandleClose = () => {
    setaAnchorEl(null);
  };
  const aopen = Boolean(aanchorEl);
  const aid = aopen ? 'simple-popover' : undefined;
  const [aname, setaName] = useState('');
  const [anumber, setaNumber] = useState('');
  const ahandleName = (event) => {
    setaName(event.target.value);
  };
  const ahandleNumber = (event) => {
    setaNumber(event.target.value);
  };

  // editcontact açılır pencere variableları
  const [ec, setEc] = useState();
  const [eanchorEl, seteAnchorEl] = React.useState(null);
  const ehandleClick = (event) => {
    seteAnchorEl(event.currentTarget);
  };
  const ehandleClose = () => {
    seteAnchorEl(null);
  };
  const eopen = Boolean(eanchorEl);
  const eid = eopen ? 'simple-popover' : undefined;
  const [ename, seteName] = useState('');
  const [enumber, seteNumber] = useState('');
  const ehandleName = (event) => {
    seteName(event.target.value);
  };
  const ehandleNumber = (event) => {
    seteNumber(event.target.value);
  };

  // remove contact açılır pencere variableları
  const [ranchorEl, setrAnchorEl] = React.useState(null);
  const rhandleClick = (event) => {
    setrAnchorEl(event.currentTarget);
  };
  const rhandleClose = () => {
    setrAnchorEl(null);
  };
  const ropen = Boolean(ranchorEl);
  const rid = eopen ? 'simple-popover' : undefined;

  //addcontact fonksiyonu
  const addcontact = (name, number, token) => {
    axios({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'post',
      url: 'http://localhost:3000/user/addcontact',
      data: {
        token: token,
        contact: {
          name: name,
          number: number,
        },
      },
    }).then((res) => console.log('Res', res.data));
    window.location.reload();
  };

  //editcontact fonksiyonu
  const editcontact = (name, number, token, c) => {
    axios({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'post',
      url: 'http://localhost:3000/user/updatecontact',
      data: {
        key: c,
        token: token,
        contact: {
          name: name,
          number: number,
        },
      },
    }).then((res) => console.log('Res', res.data));
    window.location.reload();
  };

  //removecontact fonksiyonu
  const removecontact = (token, c) => {
    axios({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'post',
      url: 'http://localhost:3000/user/deletecontact',
      data: {
        key: c,
        token: token,
      },
    }).then((res) => console.log('Res', res.data));
    window.location.reload();
  };

  //api çekme
  useEffect(() => {
    axios({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'post',
      url: 'http://localhost:3000/user/showcontacts',
      data: {
        token: token,
      },
    })
      .then(({ data }) => {
        // apiden alınan rehberleri datas dizisine gönderme
        console.log('data', data);
        data.contacts.forEach((element) => {
          datas.push({ name: element.name, number: element.number });
        });
        setUsername(data.username);
        console.log('datas', datas);
      })
      .then(() => {
        //datas dizisinin uzunluğu kadar rastgele renk dizisi oluşturma
        datas.forEach(() => {
          color.push(randomColor());
        });

        // liste oluşturucuyu çağırdık
        makeList(datas, list);

        makeList(datas, slist);
      })
      .then(() => {
        //sayıcıyı datas uzunluğuna eşitleme
        setCount(slist.length);
        console.log('list', list);
      });
  }, []);

  return (
    <div
      style={{
        width: 750,
        borderRadius: 8,
        border: '1px solid #dadce0',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 50,
      }}
    >
      <div direction="column" style={{ marginTop: 20 }}>
        <img
          alt="logo"
          src={require('../assets/Logo.png')}
          style={{ height: 58, width: 58, marginLeft: 25 }}
        />

        {/* rehber arama kutucuğu */}
        <TextField
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            searchFilter(e.target.value);
          }}
          style={{ marginLeft: 25, width: 550 }}
        />

        {/* rehber ekleme kısmı buton özellikleri  */}
        <img
          alt="add"
          src={require('../assets/add.svg')}
          aria-describedby={aid}
          onClick={ahandleClick}
          style={{ height: 30, width: 30, marginLeft: 20, cursor: 'pointer' }}
        ></img>
        {/* rehber ekleme kısmı açılır pencere */}
        <Popover
          id={aid}
          open={aopen}
          anchorEl={aanchorEl}
          onClose={ahandleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <div direction="row" style={{ width: 240 }}>
            <div
              style={{ marginTop: 10, marginLeft: 10, height: 70, width: 220 }}
            >
              <TextField label="isim" value={aname} onChange={ahandleName} />
            </div>
            <div style={{ marginLeft: 10, height: 70, width: 220 }}>
              <TextField
                label="numara"
                value={anumber}
                onChange={ahandleNumber}
              />
            </div>
            <div>
              <Button
                variant="contained"
                style={{ display: 'flex', margin: 'auto', marginBottom: 10 }}
                onClick={() => {
                  addcontact(aname, anumber, token);
                }}
              >
                Ekle
              </Button>
            </div>
          </div>
        </Popover>
      </div>

      {/* alt kısım */}
      <div style={{ display: 'flex', height: 25, marginTop: 20 }}>
        <p
          style={{
            fontSize: 15,
            fontWeight: 500,
            width: 325,
            color: '#707070',
            marginLeft: 25,
          }}
        >
          Rehber: {username}
        </p>
        <p
          style={{
            fontSize: 15,
            fontWeight: 500,
            color: '#707070',
            width: 275,
          }}
        >
          Telefon numarası
        </p>
        <Button onClick={logout}>Çıkış Yap</Button>
      </div>
      <hr style={{ margin: 15, color: '#878787' }} />
      <p
        style={{
          marginLeft: 25,
          fontSize: 14,
          color: '#5f6368',
          fontWeight: 500,
        }}
      >
        Kişiler ({count})
      </p>

      {/* kişi listesini görüntülünen kısım */}
      <ul style={{ listStyle: 'none' }}>{slist}</ul>

      {/* rehber düzenleme açılır pencere*/}
      <Popover
        id={eid}
        open={eopen}
        anchorEl={eanchorEl}
        onClose={ehandleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <div direction="row" style={{ width: 240 }}>
          <div
            style={{
              marginTop: 10,
              marginLeft: 10,
              height: 70,
              width: 220,
            }}
          >
            <TextField label="isim" value={ename} onChange={ehandleName} />
          </div>
          <div style={{ marginLeft: 10, height: 70, width: 220 }}>
            <TextField
              label="numara"
              value={enumber}
              onChange={ehandleNumber}
            />
          </div>
          <div>
            <Button
              variant="contained"
              style={{
                display: 'flex',
                margin: 'auto',
                marginBottom: 10,
              }}
              onClick={() => {
                editcontact(ename, enumber, token, ec);
              }}
            >
              Düzenle
            </Button>
          </div>
        </div>
      </Popover>

      {/* rehber silme açılır pencere*/}
      <Popover
        id={rid}
        open={ropen}
        anchorEl={ranchorEl}
        onClose={rhandleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <div direction="row" style={{ width: 240 }}>
          <div
            style={{
              marginTop: 10,
              marginLeft: 10,
              height: 70,
              width: 220,
            }}
          >
            <TextField value={ename} label="name" disabled />
          </div>
          <div style={{ marginLeft: 10, height: 70, width: 220 }}>
            <p>Silmek istediğinize emin misiniz?</p>
          </div>
          <div>
            <Button
              variant="contained"
              style={{
                display: 'flex',
                margin: 'auto',
                marginBottom: 10,
              }}
              onClick={() => {
                removecontact(token, ec);
              }}
            >
              Sil
            </Button>
          </div>
        </div>
      </Popover>
    </div>
  );
};

export default Contacts;
