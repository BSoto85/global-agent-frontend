import React from "react";

const Help = ({ isHelpModalOpen, handleHelpModal }) => {
  if (!isHelpModalOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>How to Play</h2>
        <ul>
          <li>Pick a Country: Choose where you want to investigate</li>
          <li>Select Your Case: Pick an interesting case file</li>
          <li>
            Read the Case Brief: Get the scoop on the news story, check out the
            full article if you want.
          </li>
          <li>Answer Questions</li>
          <li>See How You Did</li>
          <li>What's Next? Try again, pick a new case, or change countries</li>
          <li>
            Ready to solve some cases? Click "Begin Investigation" and go get
            'em, detective!
          </li>
        </ul>
        <button onClick={handleHelpModal} className="how-close-button">
          X
        </button>
      </div>
    </div>
  );
};

export default Help;
