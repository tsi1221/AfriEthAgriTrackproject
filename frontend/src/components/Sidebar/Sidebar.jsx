import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ toggleTheme, currentTheme, toggleLanguage, currentLang }) => {
  return (
    <div className="sidebar">
      <h2>AgriTrack</h2>
      <nav>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/profileDashboard">Profile</NavLink>
        <NavLink to="/marketplace">Marketplace</NavLink>
      </nav>
      <div className="sidebar-buttons">
        <button onClick={toggleTheme}>
          {currentTheme === "light" ? "Night Mode" : "Sun Mode"}
        </button>
        <button onClick={toggleLanguage}>
          {currentLang === "en" ? "Amharic" : "English"}
        </button>
        <button onClick={() => alert("Logged out!")}>Logout</button>
      </div>
    </div>
  );
};

export default Sidebar;
