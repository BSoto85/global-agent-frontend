import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import EditProfileModal from "../Components/EditProfileModal";
import { getRank, ranks } from "../helpers/Ranks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {auth} from "../helpers/firebase"
import { toast } from "react-toastify";
import {
  faUserPen,
  faCircleQuestion,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import "../CSS/Profile.css";
const URL = import.meta.env.VITE_BASE_URL;

const ProfilePage = ({ stats, userProfile, setUserProfile, setUserStats, setUser }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      const logout = async () => {
        try {
          //firebase logout
          localStorage.removeItem('token')
          await auth.signOut()
          return true
        } catch (error) {
          console.log(error)
          
          return false
        }
      }  
      const loggedOut = await logout()
      if (loggedOut === true) {
      setUserProfile(null)
      setUserStats(null)
      navigate('/');
      toast.success('User logged out successfully!', {
        position: 'top-center',
      });
    }
      
      // setUser(null)
      console.log('User logged out successfully!');
    } catch (error) {
      toast.error(error.message, {
        position: 'bottom-center',
      });
      console.error('Error logging out:', error.message);
    }
  }

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
      setUserProfile(updatedProfile);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  // Get the current rank and next rank
  
  let userRank, nextRank, nextBadgeXP, previousRankXP, xpNeededForNextBadge;

  if (stats) {
  const userRank = getRank(stats.xp);

  const currentRankIndex = ranks.findIndex((rank) => rank.name === userRank);
    nextRank =
    currentRankIndex + 1 < ranks.length
      ? ranks[currentRankIndex + 1]
      : ranks[currentRankIndex];
      nextBadgeXP = nextRank.minXP;
      previousRankXP = ranks[currentRankIndex]?.minXP || 0;
      xpNeededForNextBadge = nextBadgeXP - stats.xp;
  }

  const calculateXPProgress = () => {
    return ((stats.xp - previousRankXP) / (nextBadgeXP - previousRankXP)) * 100;
  };


  // const xpNeededForNextBadge = nextBadgeXP - stats.xp;
  console.log(userProfile)
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
          <FontAwesomeIcon icon={faCircleQuestion} size="xl" />
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
          <FontAwesomeIcon icon={faSignOutAlt} size="xl" />
        </button>
      </div>
      <div className="profile-header">
        <div className="profile-picture">
          <img src={userProfile.photo} alt="Profile" />
        </div>
        <div className="profile-details">
          <h2>
            {userProfile.first_name} {userProfile.last_name}Profile
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
          <p>{userProfile.email}</p>
          <p>DOB: {new Date(userProfile.dob).toLocaleDateString()}</p>
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
        user={userProfile}
        updateUser={handleEditProfile}
      />
    </div>
  );
};

export default ProfilePage;
