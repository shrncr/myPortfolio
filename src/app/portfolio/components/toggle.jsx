import React, { useContext, useEffect } from 'react';
import { usePortfolio } from '../context/portfolioContext'; // Assuming PortfolioContext is set up
import { FaGraduationCap, FaBriefcase } from "react-icons/fa";
const PortfolioToggle = () => {
  const { portfolioType, setPortfolioType } = usePortfolio();
  console.log("Current Portfolio Type:", portfolioType);
  const handleChange = (event) => {
    setPortfolioType(event.target.id); // Update the context with the selected value
  };
  useEffect(()=>{
console.log("hi")
  },[portfolioType])

  return (
    <div className="flex items-center justify-center">
      <div className="inline-flex overflow-hidden border border-gray-200 bg-white rounded-lg">
        <label htmlFor="academic" className="cursor-pointer text-black">
          <input
            type="radio"
            name="portfolioType"
            id="academic"
            className="sr-only peer"
            checked={portfolioType === 'academic'}
            onChange={handleChange}
          />
          <span className="relative inline-flex items-center h-full py-2 pr-3 space-x-2 text-xs pl-7 peer-checked:bg-blue-200">
            <FaGraduationCap/>
            <span className="before:w-2 before:h-2  before:rounded-full before:absolute before:top-[14px] before:left-3">Academic</span>
          </span>
        </label>
        
        <label htmlFor="professional" className="cursor-pointer text-black">
          <input
            type="radio"
            name="portfolioType"
            id="professional"
            className="sr-only peer"
            checked={portfolioType === 'professional'}
            onChange={handleChange}
          />
          <span className="relative inline-flex items-center h-full py-2 pr-3 space-x-2 text-xs pl-7 peer-checked:bg-green-200">
            <FaBriefcase/>
            <span className="before:w-2 before:h-2  before:rounded-full before:absolute before:top-[14px] before:left-3">Professional</span>
          </span>
        </label>
        
        <label htmlFor="both" className="cursor-pointer text-black">
          <input
            type="radio"
            name="portfolioType"
            id="both"
            className="sr-only peer"
            checked={portfolioType === 'both'}
            onChange={handleChange}
          />
          <span className="relative inline-flex items-center h-full py-2 pr-3 space-x-2 text-xs pl-7 peer-checked:bg-red-200">
            <FaGraduationCap/>
            <FaBriefcase/>
            <span className="before:w-2 before:h-2  before:rounded-full before:absolute before:top-[14px] before:left-3">Both</span>
          </span>
        </label>
      </div>
    </div>
  );
};

export default PortfolioToggle;
