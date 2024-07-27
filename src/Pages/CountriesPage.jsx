import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/CountriesPage.css";
import Help from "../Components/Help";

const CountriesPage = ({ countries, isHelpModalOpen, setIsHelpModalOpen }) => {
  // State to keep track of the selected country ID
  const [selectedCountryId, setSelectedCountryId] = useState("");
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Function to handle click event on a country
  const handleCountryClick = (countryId) => {
    setSelectedCountryId(countryId);
  };

  // Function to handle submit button click
  const handleSubmit = () => {
    if (selectedCountryId) {
      navigate(`/countries/${selectedCountryId}/casefiles`);
    } else {
      alert("Please select a country to investigate.");
    }
  };

  const handleHelpModal = () => {
    setIsHelpModalOpen(!isHelpModalOpen);
  };

  console.log(countries);
  return (
    <div className="CountriesPage">
      <main className="main-content">
        <section>
          <div className="countries-list">
            <h1>Select A Country To Investigate</h1>
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
                  src={country.flag}
                  alt={`${country.name} flag`}
                  className="flag-image"
                />
              </div>
            ))}
          </div>
          <button onClick={handleSubmit} className="submit-button">
            OPEN NEW INVESTIGATION
          </button>
          <div className="login-container" onClick={handleHelpModal}>
            <div className="login-button">How to Play</div>
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
