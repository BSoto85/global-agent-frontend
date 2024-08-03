import React, { useEffect, useState } from "react";
import "../CSS/LeaderboardPage.css";
import { useNavigate } from "react-router-dom";
const URL = import.meta.env.VITE_BASE_URL;

const LeaderboardPage = ({ userProfile }) => {
  const [usersXP, setUsersXP] = useState([]);
  const [xpToBeatNext, setXpToBeatNext] = useState(0);
  const [nextUser, setNextUser] = useState("");
  // let currentUser = "";
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsersXP = async () => {
      try {
        const response = await fetch(`${URL}/api/stats/leaderboard`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("**DATA**", data);

        // Sort users by XP in descending order
        const sortedData = data.sort((a, b) => b.xp - a.xp);

        setUsersXP(sortedData);

        if (userProfile !== null) {
          console.log(userProfile, "*****");

          const currentUserIndex = sortedData.findIndex(
            (user) => user.id === userProfile.id
          );

          if (currentUserIndex >= 0) {
            setXpToBeatNext(
              sortedData[currentUserIndex - 1].xp -
                sortedData[currentUserIndex].xp
            );
            setNextUser(sortedData[currentUserIndex - 1].first_name);
          }
        }
      } catch (error) {
        console.error("Error fetching users and XP:", error);
      }
    };
    fetchUsersXP();
  }, [userProfile]);

  const handleClick = () => {
    userProfile === null ? navigate("/login") : navigate("/countries");
  };

  return (
    <div className="leaderboard-container">
      {/* 🥇🥈🥉 */}
      <h1>🏆 LEADERBOARD 🏆</h1>
      <div className="leaderboard">
        <table>
          <thead>
            <tr className="underlinenames">
              <th>Rank</th>
              <th>Name</th>
              <th>XP</th>
            </tr>
          </thead>
          <tbody>
            {usersXP.map((user, index) => (
              <tr
                key={index}
                className={
                  userProfile !== null && user.id === userProfile.id
                    ? "current-user"
                    : ""
                }
              >
                <td className="rankholder">{index + 1}</td>
                <td className="nameholder">
                  {user.first_name}{" "}
                  {user.last_name ? user.last_name[0] + "." : ""}
                </td>
                <td className="xpholder">{user.xp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="investigation-info">
        {userProfile && (
          <p>
            <span className="leaderboard-span">{userProfile.first_name}</span>,
            you are only{" "}
            <span className="leaderboard-span">{xpToBeatNext}</span> XP away
            from beating <span className="leaderboard-span">{nextUser}</span>!
          </p>
        )}
        <button className="buttonest" onClick={handleClick}>
          OPEN NEW INVESTIGATION
        </button>
      </div>
    </div>
  );
};

export default LeaderboardPage;
