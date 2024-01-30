// App.js
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import Authenticate from "./views/Authenticate";
import { auth } from "./firebase";

function App() {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if(user) {
        setAuthUser(user);
      }
      else {
        setAuthUser(null);
      }
    })
  })

    return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Authenticate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
