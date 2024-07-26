import React from 'react';

const ProgressReport = ({ currentStats }) => {
  return (
    <div className="player-stats">
      <h2>Progress Report</h2>
      <h3>Rank: Junior Detective</h3>
      <p>XP: {currentStats.xp}</p>
      <p>Games Played: {currentStats.games_played}</p>
      <p>Questions Correct: {currentStats.questions_correct}</p>
      <p>Questions Wrong: {currentStats.questions_wrong}</p>
    </div>
  );
};

export default ProgressReport;
