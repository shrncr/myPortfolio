"use client";
import React from "react";
import { FaGraduationCap, FaBriefcase, FaExchangeAlt } from "react-icons/fa";
import { usePortfolio } from "../context/portfolioContext";
const PortfolioToggle = () => {
  const { portfolioType, setPortfolioType } = usePortfolio();

  const togglePortfolio = () => {
    setPortfolioType(portfolioType  === "academic" ? "professional" : "academic");
  };

  return (
    <button
      className="fixed bottom-8 right-8 flex items-center gap-3 px-5 py-3 bg-gray-800 hover:bg-gray-900 text-white rounded-full shadow-lg transition-transform transform hover:scale-110"
      onClick={togglePortfolio}
    >
      {portfolioType === "academic" ? (
        <>
          <FaBriefcase size={20} />
          <span>Switch to Professional</span>
        </>
      ) : (
        <>
          <FaGraduationCap size={20} />
          <span>Switch to Academic</span>
        </>
      )}
    </button>
  );
};

export default PortfolioToggle;
