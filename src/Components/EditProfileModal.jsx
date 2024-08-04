// EditProfileModal.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../CSS/EditProfile.css";
const URL = import.meta.env.VITE_BASE_URL;
import UploadWidget from "./UploadWidget";

// Utility function to format date
const formatDate = (dateString) => {
  if (!dateString) {
    return "00/00/0000";
  }
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};

const EditProfileModal = ({
  setUserProfile,
  onClose,
  userProfile,
  isProfileModalOpen,
  setIsProfileModalOpen,
  user,
}) => {
  // const navigate = useNavigate();
  const [uploadedImage, setUploadedImage] = useState(false);
  const [profile, setProfile] = useState({
    first_name: userProfile.first_name,
    last_name: userProfile.last_name,
    dob: formatDate(userProfile.dob),
    photo: userProfile.photo,
  });

  function setImageURL(uploadedURL) {
    setProfile({
      ...profile,
      photo: uploadedURL,
    });
    setUploadedImage(true);
  }

  const handleEditProfile = async (profile) => {
    try {
      const response = await fetch(`${URL}/api/profile/${userProfile.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(profile),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }
      return await response.json();
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const handleTextChange = (event) => {
    setProfile({
      ...profile,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(profile.dob);
      const updatedProfile = await handleEditProfile(profile);
      console.log("PUT profile modal RESPONSE", updatedProfile);
      if (updatedProfile.id) {
        await setUserProfile(updatedProfile);
        setIsProfileModalOpen(false);
      } else {
        console.error("Error: Profile update failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!isProfileModalOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button
          className="close-button"
          onClick={() => setIsProfileModalOpen(false)}
        >
          X
        </button>
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="upload-image-button">
            <UploadWidget
              setImageURL={setImageURL}
              setUploadedImage={setUploadedImage}
            />

            {uploadedImage ? (
              <div className="image-indicator-green">
                <div>{uploadedImage}</div>
                Image added successfully!
              </div>
            ) : (
              <div className="image-indicator-red">
                Select an image to upload.
              </div>
            )}
          </div>
          <label>
            First Name:
            <input
              type="text"
              id="first_name"
              value={profile.first_name}
              onChange={handleTextChange}
              // required
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              id="last_name"
              value={profile.last_name}
              onChange={handleTextChange}
              // required
            />
          </label>
          <label className="last-label">
            Date of Birth:
            <input
              type="date"
              id="dob"
              value={profile.dob}
              onChange={handleTextChange}
            />
          </label>
          <div className="submit-button-container">
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
