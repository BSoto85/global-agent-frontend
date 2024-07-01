import React from 'react';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faTrophy, faCogs, faMap, faShieldAlt, faPortrait } from '@fortawesome/free-solid-svg-icons';
import detectiveImage from '../assets/vecteezy_detective-looking-through-case-board_22129502.svg';

function Home() {
  return (
    <div className="App">
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
      <main className="main-content">
        <div className="profile-icon-container">
          <FontAwesomeIcon icon={faPortrait} />
        </div>
        <section id="home" className="section">
          <div className="image-container">
            <img src={detectiveImage} alt="Detective looking through case board" className="detective-image" />
          </div>
          <div className='border-container'>
            {/* <h1>Global Agent</h1> */}
            <p>Welcome to Global Agent, where current events become your next big case! Join our elite team of young investigators to uncover the truth behind today's headlines! Are you ready to earn detective badges and rise through the ranks from Rookie to Master Sleuth & be a top-notch detective?</p>
          </div>
          <div className='login-container'>
            <div className='login-button'>YOUR MISSION AWAITS!</div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
