import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import { root } from '../index'
import Login from './Login'
import Register from './Register'


const gologin = () => {
  root.render(
      <Login />
  );
}

const goregister = () => {
  root.render(
    <Register />
  )
}


function Auth() {

    return (
      <div>
      <button onClick={gologin}>
        go to login
      </button>
      <button onClick={goregister}>
        go to Register
      </button>
      </div>
    );
}
  
export default Auth;