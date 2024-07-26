import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
// import Navbar from "../Components/NavBar";
import "../CSS/CaseFiles.css";
const URL = import.meta.env.VITE_BASE_URL;

const CaseFilesPage = ({ countries }) => {
  const { countryId } = useParams();
  const [countryName, setCountryName] = useState("");
  const [caseFiles, setCaseFiles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Find the specific country by countryId from the passed prop
    const country = countries.find(
      (country) => country.id.toString() === countryId
    );
    if (country) {
      setCountryName(country.name);
    } else {
      setError("Country not found");
      return;
    }

    // Fetch case files for the specific country
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

  if (error) {
    return <div>Error: {error}</div>;
  }
  // Image URL for the case file items
  const imageUrl =
    "https://res.cloudinary.com/dhexjuuzd/image/upload/v1720022191/images_8_nwnyck.jpg";

  return (
    <div className="CaseFilesPage">
      <h1>Case Files: {countryName}</h1>
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
              <h2>{caseFile.article_title}</h2>
            </div>
          </Link>
        ))}
      </div>
      {/* <Navbar /> */}
    </div>
  );
};

export default CaseFilesPage;
