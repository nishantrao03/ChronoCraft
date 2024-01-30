import React, { useState } from 'react';
import Login from '../components/Auth/LogIn';
import Signup from '../components/Auth/SignUp';

export default function Authenticate() {
    const [view, setView] = useState(0);

    const DirectToSignUp = () => {
        setView(1)
    };

    const DirectToLogin = () => {
        setView(0)
    };

  return (
    
        (view==0) ?
        <Login DirectToSignUp={DirectToSignUp} />
        :
        <Signup DirectToLogin={DirectToLogin} />
    
  )
}
