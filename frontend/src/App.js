import React from "react";
import Homepage from "./Pages/Homepage.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Profile from "./Pages/Profile.js";
import Preference from "./Pages/Preference.js";
import "./App.css";
import EmailConfirmation from "./Pages/EmailConfirmation.js";

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" exact Component={Homepage} />
          <Route path="/setprofile/:userId" Component={Profile} />
          <Route path="/preference/:userId" Component={Preference} />
          <Route
            path="/emailconfirmation/:userId"
            Component={EmailConfirmation}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
