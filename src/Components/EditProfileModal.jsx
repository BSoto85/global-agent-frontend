// EditProfileModal.jsx
import React, { useState } from "react";
import "../CSS/EditProfile.css";
const URL = import.meta.env.VITE_BASE_URL;

const EditProfileModal = ({ isOpen, onClose, user, updateUser }) => {
  const [email, setEmail] = useState(user.email);
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [dob, setDob] = useState(user.dob);
  const [photo, setPhoto] = useState(user.photo);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedUser = {
      email,
      first_name: firstName,
      last_name: lastName,
      dob,
      photo,
    };

    try {
      const response = await fetch(`${URL}/api/profile/1`, {
        method: "PUT", // or 'POST' depending on your backend
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      updateUser(updatedUser);
      onClose();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            First Name:
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>
          <label>
            Date of Birth:
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />
          </label>
          <label>
            Photo URL:
            <input
              type="url"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              required
            />
          </label>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
