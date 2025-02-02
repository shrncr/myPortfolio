import React, { useEffect, useState } from "react";
import { usePortfolio } from "../context/portfolioContext";
import { FaGraduationCap, FaBriefcase } from "react-icons/fa";

const FilterPopup = () => {
  const { portfolioType, setPortfolioType } = usePortfolio();
  const [showPopup, setShowPopup] = useState(true);

  // Prevent scrolling when popup is open
  useEffect(() => {
    if (portfolioType==="None") {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = "auto"; // Re-enable scrolling
      setShowPopup(false); // Close the popup once a choice is made
    }
  }, [portfolioType]);

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
      <div className="bg-white p-6 sm:p-8 md:p-12 rounded-xl mx-6 shadow-2xl text-center max-w-3xl w-full transform transition-all scale-105">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
          Breaking question:
        </h2>
        <p className="text-base sm:text-lg text-gray-600 mb-8">
          Would you like to explore my <strong>academic</strong> or <strong>professional</strong> journey? I recommend both--it makes me look most impressive--but if you have a preference, choose it!
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-8">
          {/* Academic Button */}
          <button
            className="flex items-center gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-blue-600 hover:bg-blue-800 text-white rounded-lg text-base sm:text-lg font-medium transition-transform transform hover:scale-105"
            onClick={() => setPortfolioType("academic")}
          >
            <FaGraduationCap size={24} sm={28} />
            Academic
          </button>

          {/* Professional Button */}
          <button
            className="flex items-center gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-green-600 hover:bg-green-800 text-white rounded-lg text-base sm:text-lg font-medium transition-transform transform hover:scale-105"
            onClick={() => setPortfolioType("professional")}
          >
            <FaBriefcase size={24} sm={28} />
            Professional
          </button>

          {/* Both Button */}
          <button
            className="flex items-center gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-red-400 hover:bg-red-600 text-white rounded-lg text-base sm:text-lg font-medium transition-transform transform hover:scale-105"
            onClick={() => setPortfolioType("both")}
          >
            <FaGraduationCap size={24} sm={28} />
            <FaBriefcase size={24} sm={28} />
            Both
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPopup;
