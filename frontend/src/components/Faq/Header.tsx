import React, { useState } from "react";
import logoImage from "../../assets/Logo.svg"; // Corrected import path

const Header = ({ selectedLanguage, onLanguageChange }) => {
  const [showLanguageList, setShowLanguageList] = useState(false);

  const handleLanguageChange = (language) => {
    onLanguageChange(language); // Notify parent component about the language change
    setShowLanguageList(false); // Close the list after selection
  };

  return (
    <header className="bg-[#7091E6] text-white px-6 py-4 flex justify-between items-center">
      <div className="flex items-center">
        <div className="flex items-center space-x-2">
          {/* Image Logo */}
          <div className="bg-gradient-to-r from-[#7091E6] to-[#8697C4] p-3">
            <img
              src={logoImage} // Use your imported logo image here
              alt="Rankister Logo"
              className="w-32 h-20 transform scale-110 object-contain" // Increased size and zoomed in
            />
          </div>
          {/* Dynamic Header Text */}
          <h1 className="text-xl font-semibold">
            {selectedLanguage === "Italian" ? "FAQ Rankister" : "Rankister Help Center"}
          </h1>
        </div>
      </div>
      <div className="flex items-center space-x-6">
        <button className="text-white hover:underline">Submit Ticket</button>
        <div className="relative">
          <button
            className="text-white hover:underline"
            onClick={() => setShowLanguageList(!showLanguageList)} // Toggle list on click
          >
            {selectedLanguage} {/* Display the selected language */}
          </button>
          {/* Language List */}
          {showLanguageList && (
            <div className="absolute top-full left-0 mt-2 bg-white text-gray-800 rounded-lg shadow-lg">
              <button
                className="block w-full px-4 py-2 hover:bg-gray-100 rounded-lg text-left"
                onClick={() => handleLanguageChange("Italian")}
              >
                Italian
              </button>
              <button
                className="block w-full px-4 py-2 hover:bg-gray-100 rounded-lg text-left"
                onClick={() => handleLanguageChange("English")}
              >
                English
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;