import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Exhibition from "../Exhibition";
import Google from "./Google";

const Header = () => {
  function colorActiveButton(e) {
    const buttons = document.getElementsByClassName("link");
    for (const button of buttons) {
      button.style.background = "black";
      button.style.color = "white";
    }
    e.target.style.background = "white";
    e.target.style.color = "black";
  }

  return (
    <div>
      <nav id="header">
        <Link className="link" to="/exhibition" onClick={colorActiveButton}>
          Digital Exhibition
        </Link>
        <Link className="link" to="/login" onClick={colorActiveButton}>
          Login
        </Link>
        <Link className="link" to="/register" onClick={colorActiveButton}>
          Register
        </Link>
        <Link className="link" to="/google" onClick={colorActiveButton}>
          Login with Google
        </Link>
      </nav>
      <h1 id="title">Digital Exhibition</h1>
      <Routes>
        <Route path="/exhibition" element={<Exhibition />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/google" element={<Google />} />
      </Routes>
    </div>
  );
};

export default Header;
