import React from "react";
import SignUp from "./components/Auth/SignUp";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import Home from "./components/Home/Home";

function App() {
  return (
    <div>
      <Route path="/" exact>
        <SignUp />
      </Route>
      <Route path="/home">
        <Home />
      </Route>
    </div>
  );
}

export default App;
