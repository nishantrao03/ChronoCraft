import React, { useState } from 'react';
import { auth, provider } from '../../firebase';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth"

const Signup = ({ DirectToLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    // Implement your login logic here
    // For simplicity, just printing the email for now
    // Call onLogin prop to handle login logic in the parent component
    createUserWithEmailAndPassword(auth,email,password)
    .then((userCredential) => {
        console.log(userCredential);
    }).catch((error) => {
        console.log(error);
    })
  };

  const googleLogin = () => {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        console.log('Google login success:', result.user);
      })
      .catch((error) => {
        console.error('Google login error:', error);
      });
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <label>Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit" onClick={handleSignup}>Signup</button>
      </form>
      <button onClick={googleLogin}>Sign In with Google</button>
      <p>
        Already have an account? <a href="#" onClick={ DirectToLogin }>Log in here</a>
      </p>
    </div>
  );
};

export default Signup;
