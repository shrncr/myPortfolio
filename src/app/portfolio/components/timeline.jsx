import React from "react";
import { motion } from "framer-motion";

// Timeline Item Animation
const timelineItemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

// Timeline Component
const Timeline = ({ experiences }) => {
    console.log(experiences)
  return (
    <div className="relative overflow-hidden py-12">
      {/* Timeline Vertical Line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gray-300 h-full z-0"></div>

      {/* Timeline Items */}
      <div className="container mx-auto px-6 space-y-12">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            className={`flex flex-col items-center md:flex-row ${
              index % 2 === 0 ? "md:flex-row-reverse" : ""
            }`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={timelineItemVariants}
          >
            {/* Experience Content */}
            <div className="md:w-1/2 p-6 bg-gradient-to-br from-white to-gray-100 shadow-xl rounded-2xl z-30 transition-transform transform hover:scale-105 duration-300">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">{exp.title}</h3>
              <p className="text-sm sm:text-base text-gray-700 mt-1 font-medium">{exp.company} - {exp.date}</p>
              <p className="text-sm sm:text-base text-gray-600 mt-3 leading-relaxed">{exp.description}</p>
            </div>

            {/* Timeline Indicator (Circle) */}
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-pink-500 text-white text-xs sm:text-lg font-bold rounded-full flex items-center justify-center shadow-md z-10 mx-4 border-4 border-white">
              {index + 1}
            </div>

            {/* Spacer for Alternating Layout */}
            <div className="md:w-1/2"></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
