import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../CSS/CaseDetails.css";
// import Navbar from "../Components/NavBar";
import AleartModal from "../Components/AleartModal";
const URL = import.meta.env.VITE_BASE_URL;

const CaseDetailsPage = ({ translation }) => {
  const { userUid, countryId, caseFileId } = useParams();
  const [caseFile, setCaseFile] = useState(null);
  const [error, setError] = useState(null);
  const [showFullCase, setShowFullCase] = useState(false);
  const [isAleartModalOpen, setIsAleartModalOpen] = useState(false);

  useEffect(() => {
    const fetchCaseFileData = async () => {
      try {
        const response = await fetch(`${URL}/api/case_files/${countryId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch case files");
        }
        const data = await response.json();
        // Find the specific case file using caseFileId
        const caseFileData = data.find(
          (file) => file.id.toString() === caseFileId
        );
        if (caseFileData) {
          setCaseFile(caseFileData);
        } else {
          throw new Error("Case file not found");
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCaseFileData();
  }, [countryId, caseFileId]);

  // Function to toggle the view between summary and full case file
  const toggleView = () => {
    setShowFullCase(!showFullCase);
  };

  // Open the AleartModal
  const handleCollectEvidence = () => {
    setIsAleartModalOpen(true);
  };

  // Close the AleartModal
  const handleCloseAleartModal = () => {
    setIsAleartModalOpen(false);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!caseFile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="CaseDetailsPage">
        <div className="content">
          <section>
            <h1>{caseFile.article_title}</h1>
            <div className="image-container">
              <img src={caseFile.photo_url} alt="Case" className="case-image" />
            </div>
            <p>
              {showFullCase ? caseFile.article_content : caseFile.summary_young}
            </p>
          </section>
          <button onClick={toggleView} className="toggle-button">
            {showFullCase ? "View Summary" : "View Full Case File"}
          </button>
          <button onClick={handleCollectEvidence} className="questions-button">
            Collect the Evidence
          </button>
        </div>
      </div>
      {/* <Navbar /> */}
      <AleartModal
        isOpen={isAleartModalOpen}
        onClose={handleCloseAleartModal}
        countryId={countryId}
        caseFile={caseFile}
        translation={translation}
      />
    </div>
  );
};

export default CaseDetailsPage;
