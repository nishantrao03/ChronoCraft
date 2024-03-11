import React, { useState } from 'react';
import Login from '../components/Auth/LogIn';
import Signup from '../components/Auth/SignUp';
import axios from 'axios';

export default function Authenticate() {
    const [view, setView] = useState(0);

    const DirectToSignUp = () => {
        setView(1)
    };

    const DirectToLogin = () => {
        setView(0)
    };

    const CreateUser = (uid) => {
        axios.post('http://localhost:5000/api/auth', { userID: uid })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error('Error signing up:', error);
        });
    };

  return (
    
        (view==0) ?
        <Login DirectToSignUp={DirectToSignUp} CreateUser={(uid) => CreateUser(uid)} />
        :
        <Signup DirectToLogin={DirectToLogin} CreateUser={(uid) => CreateUser(uid)} />
    
  )
}
