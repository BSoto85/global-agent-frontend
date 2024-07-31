import React, { useEffect, useState } from "react";
// import Navbar from "../Components/NavBar";
import "../CSS/LeaderboardPage.css";
import { useNavigate } from "react-router-dom";
const URL = import.meta.env.VITE_BASE_URL;

const LeaderboardPage = ({userProfile}) => {
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

          // Sort users by XP in descending order
          const sortedData = data.sort((a, b) => b.xp - a.xp);

          setUsersXP(sortedData);

        if (userProfile !== null ){
          console.log(userProfile, "*****")

        const currentUserIndex = sortedData.findIndex(
          (user) => user.id === userProfile.id
        );

        if (currentUserIndex !== -1) {
          setXpToBeatNext(
            data[currentUserIndex - 1].points - data[currentUserIndex].points
          );
          setNextUser(data[currentUserIndex - 1].username);
        }
      }
      } catch (error) {
        console.error("Error fetching users and XP:", error);
      }
    };
    fetchUsersXP();
  }, [userProfile]);

  const handleClick = () => {
    navigate("/login")
  }

  return (
    <div className="leaderboard-container">
      {/* <Navbar /> */}
      <h1>LEADERBOARD</h1>
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
                key={user.id}
                className={user.id === userProfile.id ? "current-user" : ""}
              >
                <td className="rankholder">{index + 1}</td>
                <td className="nameholder">
                  {user.first_name} {user.last_name[0]}
                </td>
                <td className="xpholder">{user.xp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="investigation-info">
        <p>
          You're only {xpToBeatNext} XP away from beating @{nextUser}!
        </p>
        <button
          className="buttonest"
          onClick={handleClick} 
        >
          OPEN NEW INVESTIGATION
        </button>
      </div>
    </div>
  );
};

export default LeaderboardPage;
