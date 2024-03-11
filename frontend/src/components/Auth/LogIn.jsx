import React, { useState } from 'react';
import { auth, provider } from '../../firebase';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider} from "firebase/auth"

const Login = ({ DirectToSignUp, CreateUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Implement your login logic here
    // For simplicity, just printing the email for now
    console.log('Login with:', email);
    // Call onLogin prop to handle login logic in the parent component
    signInWithEmailAndPassword(auth,email,password)
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
        const uid =result.user.uid;
        CreateUser(uid);
      })
      .catch((error) => {
        console.error('Google login error:', error);
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit" onClick={handleLogin}>Login</button>
      </form>
      <button onClick={googleLogin}>Sign In with Google</button>
      <p>
        Don't have an account? <a href="#" onClick={DirectToSignUp}>Create a new account here</a>
      </p>
    </div>
  );
};

export default Login;
