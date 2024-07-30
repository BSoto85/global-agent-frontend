import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import EditProfileModal from "../Components/EditProfileModal";
import { getRank, ranks } from "../helpers/Ranks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { auth } from "../helpers/firebase";
import { toast } from "react-toastify";
import {
  faUserPen,
  faCircleQuestion,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import "../CSS/Profile.css";
import Help from "../Components/Help";
const URL = import.meta.env.VITE_BASE_URL;

const ProfilePage = ({
  stats,
  userProfile,
  setUserProfile,
  setUserStats,
  user,
  isHelpModalOpen,
  handleHelpModal,
}) => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Utility function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const dateWithoutTime = date.toISOString().split('T')[0];
  const [year, month, day] = dateWithoutTime.split("-")
  return `${month}/${day}/${year}`
};

  console.log("USER STATE ON PROFILE", user);
  console.log("USERPROFILE STATE ON PROFILE", userProfile)
  async function handleLogout() {
    try {
      const logout = async () => {
        try {
          // Firebase logout
          await auth.signOut();
          localStorage.removeItem("token");
          return true;
        } catch (error) {
          console.log(error);
          return false;
        }
      };
      const loggedOut = await logout();
      if (loggedOut === true) {
        setUserProfile(null);
        setUserStats(null);
        navigate("/");
        toast.success("User logged out successfully!", {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "bottom-center",
      });
      console.error("Error logging out:", error.message);
    }
  }

  const calculateXPProgress = (stats) => {
    if (!stats) return 0;
    const userRank = getRank(stats.xp);
    const currentRankIndex = ranks.findIndex((rank) => rank.name === userRank);
    const nextRank =
      currentRankIndex + 1 < ranks.length
        ? ranks[currentRankIndex + 1]
        : ranks[currentRankIndex];
    const nextBadgeXP = nextRank.minXP;
    const previousRankXP = ranks[currentRankIndex]?.minXP || 0;
    return ((stats.xp - previousRankXP) / (nextBadgeXP - previousRankXP)) * 100;
  };

  useEffect(() => {
    const fetchUserProfileAndStats = async () => {
      try {
        const profileResponse = await fetch(`${URL}/api/profile/${user.uid}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const profileData = await profileResponse.json();
        setUserProfile(profileData);

        const statsResponse = await fetch(
          `${URL}/api/stats/${profileData.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const statsData = await statsResponse.json();
        setUserStats(statsData);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch profile or stats:", error);
        setIsLoading(false);
      }
    };

    fetchUserProfileAndStats();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const userRank = getRank(stats.xp);
  const currentRankIndex = ranks.findIndex((rank) => rank.name === userRank);
  const nextRank =
    currentRankIndex + 1 < ranks.length
      ? ranks[currentRankIndex + 1]
      : ranks[currentRankIndex];
  const nextBadgeXP = nextRank.minXP;
  const previousRankXP = ranks[currentRankIndex]?.minXP || 0;
  const xpNeededForNextBadge = nextBadgeXP - stats.xp;

  return (
    <div className="profile-page">
      <div className="header-actions">
        <button
          className="edit-profile-icon"
          onClick={handleHelpModal}
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
        <Help
          isHelpModalOpen={isHelpModalOpen}
          handleHelpModal={handleHelpModal}
        />
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
          <img
            src={
              userProfile.photo
                ? userProfile.photo
                : "https://res.cloudinary.com/dnqfg86zq/image/upload/t_Fill300x300/v1722043800/jfqgd8tngquhcbkphbf2.jpg"
            }
            alt="Profile"
          />
        </div>
        <div className="profile-details">
          <h2>
            {userProfile.first_name} {userProfile.last_name}
            <button
              className="edit-profile-icon-2"
              onClick={() => setIsProfileModalOpen(true)}
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
          <p>DOB: {formatDate(userProfile.dob)}</p>
        </div>
      </div>
      <div className="profile-badges">
        <div className="rank-container">
          <h2>{userRank}</h2>
          <p className="user-xp">{stats.xp} XP</p>
          <div className="xp-progress-bar">
            <div
              className="xp-progress-fill"
              style={{ width: `${calculateXPProgress(stats)}%` }}
            ></div>
            {/* <p>
              {stats.xp} / {nextBadgeXP} XP
            </p> */}
          </div>
          <p className="points-away">
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
      user={user}
        setUserProfile={setUserProfile}
        userProfile={userProfile}
        isProfileModalOpen={isProfileModalOpen}
        setIsProfileModalOpen={setIsProfileModalOpen}
      />
    </div>
  );
};

export default ProfilePage;
