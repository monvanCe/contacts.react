import { isMobile } from 'react-device-detect';

export const contactsStyles = {
  brand: isMobile
    ? { border: '1px solid white', borderRadius: 15, height: 30, width: 30 }
    : {
        border: '1px solid white',
        borderRadius: 20,
        height: 40,
        width: 40,
      },

  brandtext: isMobile
    ? { textAlign: 'center', color: 'white', marginTop: 2.5, fontWeight: '500' }
    : {
        textAlign: 'center',
        color: 'white',
        marginTop: 7,
        fontWeight: '500',
      },

  name: isMobile
    ? { marginLeft: 15, marginTop: 5, width: 100, fontSize: 12 }
    : {
        marginLeft: 15,
        marginTop: 10,
        width: 300,
        fontSize: 14,
      },

  number: isMobile
    ? { arginTop: 5, fontSize: 12, width: 115 }
    : {
        marginTop: 5,
        fontSize: 13.5,
        width: 240,
      },

  edit: isMobile
    ? { height: 12, width: 12, marginTop: 7.5, cursor: 'pointer' }
    : {
        height: 15,
        width: 15,
        marginTop: 7.5,
        cursor: 'pointer',
      },

  remove: isMobile
    ? {
        height: 12,
        width: 12,
        marginTop: 7.5,
        marginLeft: 20,
        cursor: 'pointer',
      }
    : {
        height: 15,
        width: 15,
        marginTop: 7.5,
        marginLeft: 50,
        cursor: 'pointer',
      },

  container: isMobile
    ? {
        width: 350,
        borderRadius: 8,
        border: '1px solid #dadce0',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 50,
      }
    : {
        width: 750,
        borderRadius: 8,
        border: '1px solid #dadce0',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 50,
      },

  logo: isMobile
    ? { height: 40, width: 40, marginLeft: 25 }
    : {
        height: 58,
        width: 58,
        marginLeft: 25,
      },

  search: isMobile
    ? { marginLeft: 25, width: 190 }
    : {
        marginLeft: 25,
        width: 550,
      },

  add: isMobile
    ? { height: 25, width: 25, marginLeft: 20, cursor: 'pointer' }
    : {
        height: 30,
        width: 30,
        marginLeft: 20,
        cursor: 'pointer',
      },

  alt: {
    display: 'flex',
    height: 25,
    marginTop: 20,
  },

  username: isMobile
    ? {
        fontSize: 12,
        fontWeight: 500,
        width: 125,
        color: '#707070',
        marginLeft: 25,
      }
    : {
        fontSize: 15,
        fontWeight: 500,
        width: 340,
        color: '#707070',
        marginLeft: 25,
      },

  telefon: isMobile
    ? { fontSize: 12, fontWeight: 500, color: '#707070', width: 115 }
    : {
        fontSize: 15,
        fontWeight: 500,
        color: '#707070',
        width: 260,
      },

  çıkış: isMobile ? { fontSize: 11, marginTop: -5 } : {},
  kişiler: {
    marginLeft: 25,
    fontSize: 12,
    color: '#5f6368',
    fontWeight: 500,
  },
};
