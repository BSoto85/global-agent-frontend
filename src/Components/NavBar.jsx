import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faTrophy, faMap, faShieldAlt, faPortrait } from '@fortawesome/free-solid-svg-icons';
import '../App.css'; 

const Navbar = () => {
  return (
    <header className="navbar">
      <ul className="nav-links">
        <li>
          <a href="#home">
            <FontAwesomeIcon icon={faHome} />
          </a>
        </li>
        <li>
          <a href="#leaderboard">
            <FontAwesomeIcon icon={faTrophy} />
          </a>
        </li>
        <li>
          <a href="#map">
            <FontAwesomeIcon icon={faMap} />
          </a>
        </li>
        <li>
          <a href="#shield">
            <FontAwesomeIcon icon={faShieldAlt} />
          </a>
        </li>
      </ul>
    </header>
  );
};

export default Navbar;
