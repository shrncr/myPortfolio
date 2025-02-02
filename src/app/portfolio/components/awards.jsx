import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SchoolIcon from '@mui/icons-material/School';
import GroupIcon from '@mui/icons-material/Group';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { ChevronLeft, ChevronRight } from "lucide-react";

const awards = [
  { title: "Vice President, Girls Who Code", year: "September 2024-Present", description: "My most significant responsibilities include organizing meeting plans and leading instructional meetings.", icon: GroupIcon },
  { title: "Member, IEEE", year: "October 2024-Present", description: "", icon: GroupIcon },
  { title: "Deans List", year: "Fall 2023, Spring 2024, Fall 2024", description: "The dean's list is composed of undergraduate students who have achieved a grade point average of 3.75 or better during the semester.", icon: SchoolIcon },
  { title: "Aves Vocational Scholarship", year: "Awarded May 2022, Recurring", description: "Invitation-only scholarship for students who demonstrate a strong passion in their desired career path (In my case, Computer Science!)", icon: SchoolIcon },
  { title: "Presidential Merit Scholarship", year: "Awarded May 2022, Recurring", description: "Awarded to high school applicants who attend full time and have an average unweighted 3.8 GPA and 1294 SAT score.", icon: SchoolIcon },
  { title: "SURF Grant", year: "2024", description: "Research grant awarded for undergraduate research funding. I personally used this grant to study a new model for end user testing under the mentorship of Dr. Lorraine Jacques.", icon: SchoolIcon },
  { title: "IBM Watsonx Technical Sales Intermediate Badge", year: "2024", description: "Earned for proficiency in IBM Watsonx AI sales and solutions.", icon: WorkspacePremiumIcon },
  { title: "IBM Watsonx Sales Foundation Badge", year: "2024", description: "Certification in foundational IBM Watsonx sales skills.", icon: WorkspacePremiumIcon },
];

const HonorsGrid = () => {
  const [flippedIndexes, setFlippedIndexes] = useState(Array(awards.length).fill(false));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize(); 
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleFlip = (index) => {
    setFlippedIndexes((prev) =>
      prev.map((flipped, i) => (i === index ? !flipped : flipped))
    );
  };
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % awards.length);
  };
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + awards.length) % awards.length);
  };
  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <h2 className="text-3xl font-bold text-center text-slate-900 mb-6">Honors, Awards, and Affiliations</h2>
      <p className="text-center text-gray-600 mb-4">Click a card to learn more</p>
      <div className={`${isMobile ? "relative w-full" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"} gap-6`}>
        {isMobile ? (
          <>
            <motion.div className="relative w-full overflow-hidden">
              <motion.div
                className="flex w-full"
                animate={{ x: `-${currentIndex * 100}%` }}
                transition={{ type: "tween", stiffness: 80, damping: 20 }}
              >
                {awards.map((award, index) => (
                  <motion.div
                    key={index}
                    onClick={() => handleFlip(index)}
                    className="flex-shrink-0 w-full"
                  >
                    <motion.div
                      className="relative w-full h-48 transform-style-3d"
                      animate={{ rotateY: flippedIndexes[index] ? 180 : 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      {/*front*/}
                      <div className={`absolute w-full h-full bg-slate-800 p-6 rounded-xl shadow-lg text-white flex flex-col items-center justify-center backface-hidden ${flippedIndexes[index] ? "hidden" : ""}`}>
                        <award.icon className="text-white text-5xl mb-2" />
                        <h3 className="text-xl font-semibold">{award.title}</h3>
                        <p className="text-md text- slate-200">{award.year}</p>
                      </div>
                      {/*back*/}
                      <div className={`absolute w-full h-full bg-slate-900 p-6 rounded-xl shadow-lg text-white flex flex-col items-center justify-center backface-hidden ${flippedIndexes[index] ? "" : "hidden"}`} style={{ transform: "rotateY(180deg)" }}>
                        <p className="text-center text-slate-200">{award.description}</p>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
              <button
                onClick={prevSlide}
                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-slate-600 p-2 rounded-full shadow-md hover:bg-slate-500 "
              >
                <ChevronLeft className="text-white w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-slate-600 p-2 rounded-full shadow-md hover:bg-slate-500"
              >
                <ChevronRight className="text-white w-6 h-6" />
              </button>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {awards.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full ${currentIndex === index ? "bg-slate-600" : "bg-gray-300"}`}
                  />
                ))}
              </div>
            </motion.div>
          </>
        ) : (
          awards.map((award, index) => (
            <motion.div
              key={index}
              onClick={() => handleFlip(index)}
              className="w-full cursor-pointer perspective"
            >
              <motion.div
                className="relative w-full h-48 transform-style-3d"
                animate={{ rotateY: flippedIndexes[index] ? 180 : 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className={`absolute w-full h-full bg-slate-800 p-6 rounded-xl shadow-lg text-white flex flex-col items-center justify-center text-center backface-hidden ${flippedIndexes[index] ? "hidden" : ""}`}>
                  <award.icon className="text-white text-5xl mb-2" />
                  <h3 className="text-xl font-semibold">{award.title}</h3>
                  <p className="text-md text- slate-200">{award.year}</p>
                </div>
                <div className={`absolute w-full h-full bg-slate-900 p-6 rounded-xl shadow-lg text-white flex flex-col items-center justify-center backface-hidden ${flippedIndexes[index] ? "" : "hidden"}`} style={{ transform: "rotateY(180deg)" }}>
                  <p className="text-center text-slate-200">{award.description}</p>
                </div>
              </motion.div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default HonorsGrid;
