import { calculateXPProgress } from "../helpers/calculateXPProgress";
import { getRank, ranks } from "../helpers/Ranks";

const ProgressReport = ({ currentStats, user }) => {
  const userRank = getRank(currentStats.xp);
  const currentRankIndex = ranks.findIndex((rank) => rank.name === userRank);
  const nextRank =
    currentRankIndex + 1 < ranks.length
      ? ranks[currentRankIndex + 1]
      : ranks[currentRankIndex];
  const nextBadgeXP = nextRank.minXP;
  const xpNeededForNextBadge = nextBadgeXP - currentStats.xp;

  return (
    <div className="player-stats">
      <div className="rank-container">
        <h2>
          Rank: <span className="rank">{userRank}</span>
        </h2>
      </div>
      <div className="xp-bar-container">
        <div className="xp-progress-bar">
          <div
            className="xp-progress-fill"
            style={{ width: `${calculateXPProgress(currentStats)}%` }}
          ></div>
        </div>
        <div className="user-xp-container">
          <p className="user-xp">
            {currentStats.xp}/{nextBadgeXP} XP
          </p>
        </div>
      </div>
      <p className="points-away">
        Earn {xpNeededForNextBadge} more xp to level up!
      </p>
      <div className="current-stats-container">
        <p>Games Played: {currentStats.games_played}</p>
        <p>Questions Correct: {currentStats.questions_correct}</p>
        <p>Questions Wrong: {currentStats.questions_wrong}</p>
      </div>
    </div>
  );
};

export default ProgressReport;
