import React, { useState } from "react";
import { logout } from "../helpers/logout";
import { useNavigate, Link } from "react-router-dom";
// import Navbar from "../Components/NavBar";
import EditProfileModal from "../Components/EditProfileModal";
import { getRank, ranks } from "../helpers/Ranks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPen,
  faCog,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import "../CSS/Profile.css";
const URL = import.meta.env.VITE_BASE_URL;

const ProfilePage = ({ user, isLoading, stats }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(user);
  const navigate = useNavigate();

  const handleEditProfile = async (updatedUser) => {
    try {
      const response = await fetch(`${URL}/api/profile/${user.uid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const updatedProfile = await response.json();
      setUpdatedUser(updatedProfile);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const handleLogout = async () => {
    const result = await logout();
    if (result) {
      navigate("/");
    } else {
      console.error("Failed to log out");
    }
  };

  // Get the current rank and next rank
  const userRank = getRank(stats.xp);
  const currentRankIndex = ranks.findIndex((rank) => rank.name === userRank);
  const nextRank =
    currentRankIndex + 1 < ranks.length
      ? ranks[currentRankIndex + 1]
      : ranks[currentRankIndex];
  const nextBadgeXP = nextRank.minXP;
  const previousRankXP = ranks[currentRankIndex]?.minXP || 0;

  const calculateXPProgress = () => {
    return ((stats.xp - previousRankXP) / (nextBadgeXP - previousRankXP)) * 100;
  };

  const xpNeededForNextBadge = nextBadgeXP - stats.xp;

  return (
    <div className="profile-page">
      <div className="header-actions">
        <button
          className="edit-profile-icon"
          onClick={() => setIsModalOpen(true)}
          style={{
            border: "none",
            background: "none",
            cursor: "pointer",
            marginLeft: "5px",
            marginTop: "-30px",
          }}
        >
          <FontAwesomeIcon icon={faCog} />
        </button>
        <button
          className="edit-profile-icon"
          onClick={handleLogout}
          style={{
            border: "none",
            background: "none",
            cursor: "pointer",
            marginLeft: "15px",
            marginTop: "-30px",
          }}
        >
          <FontAwesomeIcon icon={faSignOutAlt} />
        </button>
      </div>
      <div className="profile-header">
        <div className="profile-picture">
          <img src={user.photo} alt="Profile" />
        </div>
        <div className="profile-details">
          <h2>
            {user.first_name} {user.last_name}
            <button
              className="edit-profile-icon-2"
              onClick={() => setIsModalOpen(true)}
              style={{
                border: "none",
                background: "none",
                cursor: "pointer",
                marginLeft: "10px",
              }}
            >
              <FontAwesomeIcon icon={faUserPen} />
            </button>
          </h2>
          <p>{user.email}</p>
          <p>DOB: {new Date(user.dob).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="profile-badges">
        <div className="rank-container">
          <h2>{userRank}</h2>
          <p className="user-xp">{stats.xp} XP</p>
          <div className="xp-progress-bar">
            <div
              className="xp-progress-fill"
              style={{ width: `${calculateXPProgress()}%` }}
            ></div>

            <p>
              {stats.xp} / {nextBadgeXP} XP
            </p>
          </div>
          <p className="stat">
            You are only {xpNeededForNextBadge} points away from earning your
            next badge!
          </p>
        </div>
      </div>
      <div className="profile-stats">
        <div className="stat">
          <h3>Games Played</h3>
          <p>{stats.games_played}</p>
        </div>
        <div className="stat">
          <h3>Questions Correct</h3>
          <p>{stats.questions_correct}</p>
        </div>
        <div className="stat">
          <h3>Questions Wrong</h3>
          <p>{stats.questions_wrong}</p>
        </div>
      </div>
      <Link to="/countries">
        <button className="new-investigation">Open New Investigation</button>
      </Link>
      <EditProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={user}
        updateUser={handleEditProfile}
      />
    </div>
  );
};

export default ProfilePage;
