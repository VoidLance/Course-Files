import React from 'react';
import logo from './images/Placeholder-523345509.png'

const Header = () => {
  return (
    <header>
      <h1>Job Board</h1>
      <img src={logo} width={200}/>
      <img src="https://picsum.photos/200/300"/>
    </header>
  );
};

export default Header
