import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../CSS/CaseDetails.css";
import AleartModal from "../Components/AleartModal";
import calculateAge from "../helpers/calculateAge";
const URL = import.meta.env.VITE_BASE_URL;

const CaseDetailsPage = ({ translation, user, userAge, setUserAge }) => {
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
          const age = user ? calculateAge(user.dob) : null;
          setUserAge(age);
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

  const {
    article_content,
    article_title,
    photo_url,
    summary_young,
    summary_old,
  } = caseFile;
  const parsedYoungSummary = JSON.parse(summary_young);
  const parsedOldSummary = JSON.parse(summary_old);
  console.log("summary young", parsedYoungSummary.younger_summary[0]);
  console.log("Age", userAge);

  return (
    <div>
      <div className="CaseDetailsPage">
        <div className="content">
          <section>
            <h1>{article_title}</h1>
            <div className="image-container">
              <img src={photo_url} alt="Case" className="case-image" />
            </div>
            <p>
              {showFullCase ? (
                article_content
              ) : userAge >= 15 ? (
                <ul className="summary-list">
                  {parsedOldSummary.older_summary.map(
                    (sentence, i) =>
                      parsedOldSummary.older_summary.length - 1 !== i && (
                        <li>{sentence}</li>
                      )
                  )}
                </ul>
              ) : (
                <ul className="summary-list">
                  {parsedYoungSummary.younger_summary.map(
                    (sentence, i) =>
                      parsedYoungSummary.younger_summary.length - 1 !== i && (
                        <li>{sentence}</li>
                      )
                  )}
                </ul>
              )}
            </p>
          </section>
          <button onClick={toggleView} className="toggle-button">
            {showFullCase ? "View Case Brief" : "View Full Case File"}
          </button>
          <button onClick={handleCollectEvidence} className="questions-button">
            Collect the Evidence
          </button>
        </div>
      </div>
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
