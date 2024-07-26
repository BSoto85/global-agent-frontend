import React from "react";
import "../CSS/HelpModal.css";
import Help from "../Components/Help";

const HelpPage = ({ isOpen, onClose }) => {
  return <Help isOpen={isOpen} onClose={onClose} />;
};

export default HelpPage;
