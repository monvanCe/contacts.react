import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { TextField } from '@mui/material';

const Contacts = () => {
  const datas = [['monvance', '+90(554)9501820']];

  const color = [];

  const [list, setList] = useState([]);

  const [count, setCount] = useState(0);

  const randomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const [ul, setUl] = useState('');

  useEffect(() => {
    axios
      .get('https://randomuser.me/api/?results=5&inc=name,phone')
      .then(({ data }) => {
        data.results.forEach((element) => {
          datas.push([
            element.name.first + ' ' + element.name.last,
            element.phone,
          ]);
        });
      })
      .then(() => {
        datas.forEach(() => {
          color.push(randomColor());
        });

        setList(
          datas.map((el, c) => {
            return (
              <li key={c}>
                <div
                  onMouseEnter={() => {
                    setUl('black');
                  }}
                  onMouseLeave={() => {}}
                  id="container"
                  style={{
                    display: 'flex',
                    margin: 15,
                    marginLeft: -5,
                    cursor: 'pointer',
                    backgroundColor: ul,
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
                      {el[0][0]}
                    </p>
                  </div>

                  <div
                    style={{
                      marginLeft: 15,
                      marginTop: 5,
                      width: 395,
                      fontSize: 14,
                    }}
                  >
                    {el[0]}{' '}
                  </div>
                  <div style={{ marginTop: 5, fontSize: 13.5 }}>{el[1]}</div>
                </div>
              </li>
            );
          })
        );
      })
      .then(() => {
        setCount(datas.length);
        console.log('datas', datas);
      });
  }, []);

  console.log('list', list);

  return (
    <div
      style={{
        width: 1000,
        borderRadius: 8,
        border: '1px solid #dadce0',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 50,
      }}
    >
      <div direction="column" style={{ marginTop: 20 }}>
        <img
          src={require('../assets/Logo.png')}
          style={{ height: 58, width: 58, marginLeft: 25 }}
        />
        <TextField
          label="Rehberinizde arama yapın"
          style={{ marginLeft: 125, width: 450 }}
        />
      </div>
      <div style={{ display: 'flex', height: 25, marginTop: 20 }}>
        <p
          style={{
            fontSize: 15,
            fontWeight: 500,
            width: 450,
            color: '#707070',
            marginLeft: 25,
          }}
        >
          {' '}
          Koleksiyonun Adı
        </p>
        <p style={{ fontSize: 15, fontWeight: 500, color: '#707070' }}>
          Telefon numarası
        </p>
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
      <ul style={{ listStyle: 'none' }}>{list}</ul>
    </div>
  );
};

export default Contacts;
