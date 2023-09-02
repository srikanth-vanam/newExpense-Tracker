import React from "react";
import SignUp from "./components/Auth/SignUp";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import Home from "./components/Home/Home";
import Profile from "./components/Auth/Profile/Profile";

function App() {
  return (
    <div>
      <Route path="/" exact>
        <SignUp />
      </Route>
      <Route path="/home">
        <Home />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
    </div>
  );
}

export default App;
