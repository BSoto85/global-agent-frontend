import React from 'react';
import { useNavigate} from "react-router-dom";
const ProgressReport = ({ currentStats, user }) => {
  const navigate = useNavigate();
  const goToProfile = () => {
    navigate(`/profile/${user.uid}`)
  };
  return (
    <div className="player-stats">
      <h2>Progress Report</h2>
      <h3>Rank: Junior Detective</h3>
      <p>XP: {currentStats.xp}</p>
      <p>Games Played: {currentStats.games_played}</p>
      <p>Questions Correct: {currentStats.questions_correct}</p>
      <p>Questions Wrong: {currentStats.questions_wrong}</p>
      <button className="retry-button" onClick={goToProfile} >Go To Profile</button>
    </div>
  );
};

export default ProgressReport;
