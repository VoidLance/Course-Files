import React from 'react';
import logo from '../assets/logo.jpg';
import './Header.css'

const Header = ({ title, subtitle }) => {
  return (
    <header id="header" className="header">
      <img src={logo} alt="Investment Calculator Logo" className="header-logo" />
      <div className="header-text">
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
      </div>
    </header>
  );
};

export default Header;

