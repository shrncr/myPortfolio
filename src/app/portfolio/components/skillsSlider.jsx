import { motion } from "framer-motion";

const techStack = [
  { name: "React"},
  { name: "Next.js"},
  { name: "Node.js"},
  { name: "Tailwind CSS"},
  { name: "JavaScript"},
  { name: "TypeScript"},
  { name: "Python",},
  { name: "MongoDB",   },
  { name: "PostgreSQL",   },
  { name: "mySQL",   },
  { name: "Vercel",   },
  { name: "Trello",   },
  { name: "Figma",   },
  { name: "Git",   },
  { name: "Flask",   },
  { name: "Express.js",   },
  { name: "Postman",   },
  { name: "AWS Gateway",   },
  { name: "AWS Lambda",   },
  { name: "AWS S3",   },
  { name: "Java",   },
  { name: "C",   },
  { name: "HTML/CSS",   },
  { name: "Scala",   },
  { name: "Lua",   },
  { name: "PHP",   },
  { name: "R",   },
];

const InfiniteSlider = () => {
  return (
    <div className="w-full overflow-hidden py-3">
      <motion.div
        className="flex space-x-4"
        initial={{ x: 0 }}
        animate={{ x: ["0%", "-250%"] }} // Moves left infinitely
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
      >
        {[...techStack, ...techStack].map((tech, index) => (
          <motion.div
            key={index}
            className="bg-pink-100 px-4 py-0 rounded-xl shadow-md text-black flex items-center justify-center text-sm font-semibold"
          >
            {tech.name}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default InfiniteSlider;
