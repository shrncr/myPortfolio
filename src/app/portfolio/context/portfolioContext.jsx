"use client";
import { createContext, useState, useEffect, useContext } from "react";

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [portfolioType, setPortfolioType] = useState("None"); // 'academic' or 'professional'
useEffect(()=>{console.log(portfolioType)},[portfolioType])
  return (
    <PortfolioContext.Provider value={{ portfolioType, setPortfolioType }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext);
