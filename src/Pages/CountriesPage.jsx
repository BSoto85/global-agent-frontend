import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/CountriesPage.css";
import Help from "../Components/Help";

const CountriesPage = ({
  countries,
  isHelpModalOpen,
  setIsHelpModalOpen,
  handleHelpModal,
}) => {
  // State to keep track of the selected country ID
  const [selectedCountryId, setSelectedCountryId] = useState("");
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Function to handle click event on a country
  const handleCountryClick = (countryId) => {
    setSelectedCountryId(countryId);
    navigate(`/countries/${countryId}/casefiles`);
  };

  return (
    <div className="CountriesPage">
      <div className="character-container">
        <img
          src="https://res.cloudinary.com/dhexjuuzd/image/upload/v1722612674/GlobalAgent-CropGirlAgentBack_1_sw5bpj.png"
          alt="Detective"
          className="character-image"
        />
        <div className="speech-bubble">
          <p>Select a country and start your investigation!</p>
        </div>
      </div>
      <main className="main-content">
        <section>
          <div className="countries-list">
            <h1>Where Should We Investigate Today?</h1>
            {countries.map((country, index) => (
              <div
                key={index}
                onClick={() => handleCountryClick(country.id)}
                className={`country-container ${
                  selectedCountryId === country.id ? "selected" : ""
                }`}
              >
                <div>
                  <h2 className="country-name">{country.name}</h2>
                </div>
                <img
                  src={country.silhouette}
                  alt={`${country.name} silhouette`}
                  className="flag-image"
                />
              </div>
            ))}
          </div>
          <div className="login-container" onClick={handleHelpModal}>
            <div className="login-button how-to-play">How to Play</div>
          </div>
        </section>
      </main>
      <Help
        isHelpModalOpen={isHelpModalOpen}
        handleHelpModal={handleHelpModal}
      />
    </div>
  );
};

export default CountriesPage;
