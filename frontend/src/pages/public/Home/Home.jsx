import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import logo from "../../../assets/logo.png"; // update path if needed

function Home() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login"); // redirect to login page
  };

  return (
    <div className="home-container" onClick={handleClick}>
      <div className="blockchain-bg"></div>
      <div className="logo-wrapper">
        <img src={logo} alt="AfriEthAgriTrack Logo" className="logo-animate" />
        <h1 className="home-title">AfriEthAgriTrack</h1>
        <p className="home-subtitle">🌾 Blockchain-powered agriculture for Africa 🚀</p>
        <p className="home-click-text">👉 Tap anywhere to continue</p>
      </div>
    </div>
  );
}

export default Home;
