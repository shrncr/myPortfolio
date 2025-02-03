"use client";
import React, { useState } from 'react';
import { delay, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const Home = (props) => {
  const [selectedValue, setSelectedValue] = useState("______");
  const [isCorrect, setIsCorrect] = useState(false);
  const router = useRouter();
  const { width, height } = useWindowSize();
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const handleRadioChange = async (value) => {
    setSelectedValue(value);
    setIsCorrect(value === "Hern-Car");
    if (isCorrect === true){
        console.log("Hi")
        await delay(4000)
        props.state(0)
    }
    
  };

  const options = [
    "Hern-See-Are",
    "Hern-Car",
    "Hern-See-Air",
  ];

  return (
    <div className="flex flex-col items-center lg:flex-row lg:justify-center gap-8 max-w-7xl mx-auto mb-16 px-4 lg:px-0">
      {isCorrect && <Confetti width={width} height={height} numberOfPieces={150} gravity={0.7} />}
      <motion.div 
        className="bg-white text-gray-900 shadow-2xl rounded-3xl p-8 w-full max-w-xl relative z-10"
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1, x: selectedValue !== "______" && !isCorrect ? [-10, 10, -10, 10, 0] : 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-6">Hi, I'm Sara Hrnciar!</h1>
        <p className="text-center text-lg sm:text-xl mb-4">And now you want to ask, "How do you say your last name?"</p>
        <p className="text-center text-lg sm:text-xl mb-4">If we were face to face, I would challenge you to guess first. Go ahead, guess!</p>

        <div className="space-y-4">
          {options.map((option, index) => (
            <motion.div 
              key={option} 
              className="flex items-center bg-slate-900 text-white p-3 rounded-lg shadow-md cursor-pointer hover:scale-105 transform transition-transform" 
              whileHover={{ scale: 1.05 }}
              onClick={() => handleRadioChange(option)}
            >
              <input
                type="radio"
                id={option}
                value={option}
                checked={selectedValue === option}
                onChange={() => handleRadioChange(option)}
                className="hidden"
              />
              <label htmlFor={option} className="ml-2 text-lg font-medium cursor-pointer w-full">
                {index + 1}. {option}
              </label>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-8 p-4 bg-slate-200 rounded-xl shadow-inner text-center" 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-xl sm:text-2xl font-semibold">
            <span className="text-gray-700">"Hmmm, Sara </span>
            {isCorrect ? <span className="text-green-700 font-bold">{selectedValue}</span>
            :<span className="text-red-700 font-bold">{selectedValue}</span>}
            
            <span className="text-gray-700">?"</span>
          </p>
        </motion.div>
        
      </motion.div>
      
    </div>
  );
};

export default Home;
 