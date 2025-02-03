import { motion, useAnimation, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

const techStack = [
  { name: "React" }, { name: "Next.js" }, { name: "Node.js" }, { name: "Tailwind CSS" },
  { name: "JavaScript" }, { name: "TypeScript" }, { name: "Python" }, { name: "MongoDB" },
  { name: "PostgreSQL" }, { name: "mySQL" }, { name: "Vercel" }, { name: "Trello" },
  { name: "Figma" }, { name: "Git" }, { name: "Flask" }, { name: "Express.js" },
  { name: "Postman" }, { name: "AWS Gateway" }, { name: "AWS Lambda" }, { name: "AWS S3" },
  { name: "Java" }, { name: "C" }, { name: "HTML/CSS" }, { name: "Scala" },
  { name: "Lua" }, { name: "PHP" }, { name: "R" }
];

const InfiniteSlider = () => {
  const controls = useAnimation();
  const x = useMotionValue(0);
  const position = useRef(0);
  const springX = useSpring(x, { damping: 50, stiffness: 150 });
  const transformX = useTransform(springX, (value) => `${value}px`);

  const animateLoop = () => {
    controls.start({
      x: [position.current, position.current - 500],
      transition: { repeat: Infinity, duration: 25, ease: "linear" },
    });
  };

  useEffect(() => {
    animateLoop();
  }, []);

  return (
    <div className="w-full overflow-hidden py-3 touch-pan-x">
      <motion.div
        className="flex space-x-4 cursor-grab active:cursor-grabbing"
        drag="x"
        dragConstraints={{ left: -500, right: 500 }}
        onDragStart={() => controls.stop()} 
        onDragEnd={(event, info) => {
          position.current += info.offset.x;
          x.set(position.current);
          requestAnimationFrame(animateLoop);
        }}
        animate={controls}
        style={{ x: transformX }}
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
