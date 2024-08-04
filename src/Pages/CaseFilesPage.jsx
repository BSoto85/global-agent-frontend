import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../CSS/CaseFiles.css";
const URL = import.meta.env.VITE_BASE_URL;

const CaseFilesPage = ({ countries }) => {
  const { countryId } = useParams();
  const [countryName, setCountryName] = useState("");
  const [caseFiles, setCaseFiles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const country = countries.find(
      (country) => country.id.toString() === countryId
    );
    if (country) {
      setCountryName(country.name);
    } else {
      setError("Country not found");
      return;
    }

    const fetchCaseFiles = async () => {
      try {
        const response = await fetch(`${URL}/api/case_files/${countryId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch case files");
        }
        const data = await response.json();
        setCaseFiles(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCaseFiles();
  }, [countryId, countries]);

  const getBackgroundImage = () => {
    switch (countryId) {
      case "1": // ID for France
        return 'url("https://res.cloudinary.com/dhexjuuzd/image/upload/v1722797606/HD-wallpaper-french-flag-lines-flag-of-france-flags-france-flag_ukxoox.jpg")';
      case "2": // ID for Mexico
        return 'url("https://res.cloudinary.com/dhexjuuzd/image/upload/v1722797241/HD-wallpaper-mexican-flag-silk-flag-of-mexico-flags-mexico-flag_or0zkq.jpg")';
      case "3": // ID for Germany
        return 'url("https://res.cloudinary.com/dhexjuuzd/image/upload/v1722797732/HD-wallpaper-flag-of-germany-german-flag-german-flag-germany_nael9v.jpg")';
      default:
        return "none";
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  const imageUrl =
    "https://res.cloudinary.com/dhexjuuzd/image/upload/v1720022191/images_8_nwnyck.jpg";

  return (
    <div className="CaseFilesPage" style={{ backgroundImage: getBackgroundImage() }}>
      <h1>Case Files: {countryName}</h1>
      <div className="character-container-casefile">
        <img
          src="https://res.cloudinary.com/dhexjuuzd/image/upload/v1722612674/GlobalAgent-CropGirlAgentBack_1_sw5bpj.png"
          alt="Detective"
          className="character-image-casefile"
        />
        <div className="speech-bubble-casefile">
          <p>Select a case and start your investigation!</p>
        </div>
      </div>
      <div className="case-files-list">
        {caseFiles.map((caseFile, index) => (
          <Link
            key={caseFile.id}
            to={`/countries/${countryId}/case_files/${caseFile.id}`}
            className="case-file-item"
          >
            <div className="case-file-content">
              <p className="case-label">Case #{caseFile.article_id}</p>
              <img src={imageUrl} alt={`Image for ${caseFile.article_title}`} />
              {caseFile.article_title.length > 75 ? (
                <h2>{caseFile.article_title.substring(0, 75)}...</h2>
              ) : (
                <h2>{caseFile.article_title}</h2>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CaseFilesPage;
