import React from "react";
import { useNavigate } from "react-router-dom";
import { calculateXPProgress } from "../helpers/calculateXPProgress";
import { getRank } from "../helpers/Ranks";

const ProgressReport = ({ currentStats, user }) => {
  const navigate = useNavigate();

  const goToProfile = () => {
    navigate(`/profile/${user.uid}`);
  };

  const userRank = getRank(currentStats.xp);

  return (
    <div className="player-stats">
      <h2>Progress Report</h2>
      <div className="xp-progress-bar">
        <div
          className="xp-progress-fill"
          style={{ width: `${calculateXPProgress(currentStats)}%` }}
        ></div>
      </div>
      <h3>
        Rank: <span className="rank">{userRank}</span>
      </h3>
      <p>XP: {currentStats.xp}</p>
      <p>Games Played: {currentStats.games_played}</p>
      <p>Questions Correct: {currentStats.questions_correct}</p>
      <p>Questions Wrong: {currentStats.questions_wrong}</p>
      <button className="retry-button gray" onClick={goToProfile}>
        Go To Profile
      </button>
    </div>
  );
};

export default ProgressReport;
