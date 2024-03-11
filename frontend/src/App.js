// App.js
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/Home/Home";
import Authenticate from "./views/Authenticate";
import { auth } from "./firebase";
import MyTasks from "./views/MyTasks/MyTasks";

function App() {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
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
        <Route exact path="/" element={authUser ? <Home /> : <Authenticate />} />
        <Route exact path="/MyTasks" element={authUser ? <MyTasks /> : <Authenticate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
