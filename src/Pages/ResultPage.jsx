import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import ProgressReport from "../Components/ProgessReport";
import "../CSS/ResultPage.css";
const URL = import.meta.env.VITE_BASE_URL;
const ResultsPage = ({ userStats, user, userProfile, setUserStats }) => {
  const { countryId, caseFileId } = useParams();
  const location = useLocation();
  const [currentStats, setCurrentStats] = useState(userStats);
  const [hasUpdated, setHasUpdated] = useState(false);
  const navigate = useNavigate();
  const score = location.state?.score || 0;
  const totalQuestions = location.state?.totalQuestions || 0;
  useEffect(() => {
    if (userStats) {
      setCurrentStats(userStats);
    }
  }, [userStats]);
  const calculateXPEarned = () => (score === 4 ? 125 : score * 25)
  const updatePlayerStats = async (stats) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${URL}/api/stats/${userProfile.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(stats),
      });
      console.log("response from UPDATE PLAYER STATS", response)
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update player stats: ${errorText}`);
      }
      const data = await response.json();
      console.log("data", data)
      console.log("USER STATS FROM RESULTS", userStats)
      await setUserStats(data)
      console.log("USER STATS FROM RESULTS after SETTING STATE", userStats)
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
  // if (!currentStats) {
  //   return <p>Loading player stats...</p>;
  // }
  const goToProfile = () => {
    navigate(`/profile/${user.uid}`);
  };
  return (
    <div className="ResultsPage">
      <h2>Case #{caseFileId}</h2>
      <div className="findings-border">
        <p>
          You got {score} out of 4 questions!
        </p>
        {/* <h3>Results:</h3> */}
        {score === 4 && (
          <>
        <p>Wow you got them all correct!</p>
        <img src="https://res.cloudinary.com/dgifdj6nx/image/upload/v1722620587/GlobalAgent-ConfettiOnlyNB_elnjhf.gif" alt="" />
        <img src="https://res.cloudinary.com/dgifdj6nx/image/upload/v1722620587/GlobalAgent-ConfettiOnlyNB_elnjhf.gif" alt="" />
        <img src="https://res.cloudinary.com/dgifdj6nx/image/upload/v1722620587/GlobalAgent-ConfettiOnlyNB_elnjhf.gif" alt="" />
        <img className="confetti-image" src="https://res.cloudinary.com/dgifdj6nx/image/upload/v1722620587/GlobalAgent-ConfettiOnlyNB_elnjhf.gif" alt="" />
        <img  className="confetti-image" src="https://res.cloudinary.com/dgifdj6nx/image/upload/v1722620587/GlobalAgent-ConfettiOnlyNB_elnjhf.gif" alt="" />
          <p>Bonus XP: 25</p>
        </>
      )}
        <p>Total XP Earned: {calculateXPEarned()}</p>
        <div className="result-buttons">
          <Link
            to={`/countries/${countryId}/case_files/${caseFileId}/questions`}
            className="retry-link"
            state={{ refresh: true }}
          >
            <button className="retry-button">Retry Quiz</button>
          </Link>
          <Link to="/countries">
            <button className="retry-button">Start New Game</button>
          </Link>
          <button className="retry-button" onClick={goToProfile}>
        Go To Profile
      </button>
        </div>
      </div>
      {<ProgressReport currentStats={currentStats} user={user}/>}
    </div>
  );
};
export default ResultsPage;