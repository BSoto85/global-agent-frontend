import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import ProgressReport from "../Components/ProgessReport";
import "../CSS/ResultPage.css";
const URL = import.meta.env.VITE_BASE_URL;

const ResultsPage = ({ userStats, user, userProfile }) => {
  const { countryId, caseFileId } = useParams();
  const location = useLocation();
  const [currentStats, setCurrentStats] = useState(userStats);
  const [hasUpdated, setHasUpdated] = useState(false);

  const score = location.state?.score || 0;
  const totalQuestions = location.state?.totalQuestions || 0;

  useEffect(() => {
    if (userStats) {
      setCurrentStats(userStats);
    }
  }, [userStats]);

  const calculateXPEarned = () => {
    return score * 25;
  };

  const updatePlayerStats = async (updatedStats) => {
    if (!userProfile || !userProfile.uid) {
      console.error("User profile UID is missing.");
      return;
    }

    try {
      const response = await fetch(`${URL}/api/stats/${userProfile.uid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await user?.getIdToken()}`,
        },
        body: JSON.stringify(updatedStats),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update player stats: ${errorText}`);
      }

      const data = await response.json();
      console.log("Updated stats:", data);
    } catch (error) {
      console.error("Error updating player stats:", error);
    }
  };

  useEffect(() => {
    if (currentStats && !hasUpdated && score > 0) {
      const xpEarned = calculateXPEarned();

      const newCurrentStats = {
        ...currentStats,
        xp: currentStats.xp + xpEarned,
        games_played: currentStats.games_played + 1,
        questions_correct: currentStats.questions_correct + score,
        questions_wrong: currentStats.questions_wrong + (totalQuestions - score),
      };
      setCurrentStats(newCurrentStats);

      const smallIncrement = {
        xp: xpEarned,
        games_played: 1,
        questions_correct: score,
        questions_wrong: totalQuestions - score,
      };
      updatePlayerStats(smallIncrement);
      setHasUpdated(true);
    }
  }, [currentStats, score, totalQuestions, hasUpdated, userProfile]);

  if (!currentStats) {
    return <p>Loading player stats...</p>;
  }

  return (
    <div className="ResultsPage">
      <h2>Case {caseFileId}</h2>
      <div className="findings-border">
        <p>
          Findings: {score} / {totalQuestions}
        </p>
        <p>XP Earned: {calculateXPEarned()}</p>
        <h3>Questions Summary:</h3>
        <div className="result-buttons">
          <Link
            to={`/countries/${countryId}/case_files/${caseFileId}/questions`}
            className="retry-link"
            state={{ refresh: true }}
          >
            <button className="retry-button">Retry Quiz</button>
          </Link>
          <Link to="/countries">
            <button>Start New Game</button>
          </Link>
        </div>
      </div>
      {userProfile !== null ? (
        <ProgressReport currentStats={currentStats} />
      ) : (
        <div className="register-save">
          <p>Want to save your progress?</p>
          <Link to="/login">
            <button>Login to Save Progress</button>
          </Link>
          <Link to="/register">
            <button>Register and Save</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ResultsPage;







