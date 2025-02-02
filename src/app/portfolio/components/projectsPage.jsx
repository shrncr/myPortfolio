import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Project from './project';

// Icons
import BugReportIcon from '@mui/icons-material/BugReport';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MovieIcon from '@mui/icons-material/Movie';
import GrainIcon from '@mui/icons-material/Grain';
import ComputerIcon from '@mui/icons-material/Computer';
import SpaIcon from '@mui/icons-material/Spa';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import SortIcon from '@mui/icons-material/Sort';
import StorageIcon from '@mui/icons-material/Storage';
import HttpsIcon from '@mui/icons-material/Https';
import AbcIcon from '@mui/icons-material/Abc';
import AttractionsIcon from '@mui/icons-material/Attractions';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import BuildIcon from '@mui/icons-material/Build';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import CalculateIcon from '@mui/icons-material/Calculate';
import ForestIcon from "@mui/icons-material/ForestOutlined";

const projectsData = [
    { title: "Glazer Children's Museum", category:["Web","Featured"],skills:["MongoDB","Express.JS","React.JS","Node.JS", "AWS"],icon: AttractionsIcon, desc: "Webapp developed by myself and a few other undergrads for a collaboration between UTampa's Psychology department and a local children's museum.", source: "https://github.com/shrncr/GCM", isDeployed:true, deployedLink: "https://thelearningproject.vercel.app/" },
        { title: "CritterChat", category:["Hardware","Featured"], skills:["RaspberryPi","Circuits","Python","Tkinter","Flask","Postman"],icon: BugReportIcon, desc: "Built the software and hardware to allow two raspberry pis to send videos, drawings, and audio messages to the other. Messages disappear after other pi opens them.", source: "https://github.com/shrncr/CritterChat", isDeployed:false },
        { title: "PinTheBay", category:["Web"],skills:["MongoDB","Express.JS","React.JS","Node.JS"],icon: LocationOnIcon, desc: "Geoguesser for residents of Tampa Bay. One photo per day, refreshed daily at 6pm EST.", source: "https://github.com/shrncr", isDeployed:true, deployedLink: "https://www.pinthebay.com/" },
        { title: "NightlyReel", category:["Web"],skills:["MongoDB","Express.JS","React.JS","Node.JS", "Postman"],icon: MovieIcon, desc: "Recommends movies/tv shows similar to the one you're looking for. Filter by streaming services.", source: "https://github.com/shrncr",isDeployed:true,  deployedLink: "https://www.nightlyreel.com/" },
        { title: "Sudoku Solver", category:["DSA","Featured"],skills:["Java","Graph Theory"],icon: GrainIcon, desc: "Implemented BFS and DLS algorithms as referenced from scholarly paper. Developed dynamic preprocessing system for sudoku boards of any size, and achieved 3x performace improvement above BFS and DLS", isDeployed:false, source: "https://github.com/shrncr/GraphSodoku",   },
        { title: "Program Profiler", category:["DSA", "Featured"],skills:["Python","SciPy","Numpy","Linear Algebra"],icon: ComputerIcon, desc: "Determines the likelihood of a student's work being influenced by an outside source such as GenAI or another student", source: "https://github.com/shrncr/ProgramProfiler", isDeployed:false,   },
        { title: "Sephora Chrome Extension", category:["Web"],skills:["JavaScript"],icon: SpaIcon, desc: "A chrome extension built for Sephora's website, which scans ingredients for unclean ingredients", source: "https://github.com/shrncr/IrritantChrome", isDeployed:true,deployedLink: "https://chromewebstore.google.com/detail/skin-irritant-scanner/dfjalffpecaoggbgcjcfpggjkgabjdkj" },
        { title: "The ButcherShop",category:["DSA"],skills:["MongoDB","MySQL","Python","Tkinter"], icon: RestaurantIcon, desc: "Interactive butchershop check out screen that connect's to a MongoDB.", source: "https://github.com/shrncr/Butchershop-Database-Checkout-Screen",isDeployed:false,   },
        { title: "Linked List Sorter",category:["DSA"],skills:["Python"], icon: SortIcon, desc: "Implemented Quick, Merge, Bubble, and Insertion sorts for linked lists", source: "https://github.com/shrncr/LinkedListSorts", isDeployed:false,  },
        { title: "Cache MME Emulator",category:["OS-Inspired","Featured"],skills:["Java"], icon: StorageIcon, desc: "Emulates a computer's Cache-CPU system", source: "https://github.com/shrncr/CacheMMEmulator",isDeployed:false,   },
        { title: "Ziv Encoder", category:["OS-Inspired"],skills:["Java"],icon: HttpsIcon, desc: "Encodes string to binary with Ziv encoding", source: "https://github.com/shrncr/encoder",isDeployed:false,  },
        { title: "TREES!",category:["DSA","Featured"],skills:["Java"], icon: ForestIcon, desc: "Implemented Red Black Tree, Binary Tree, and AVL Tree", source: "https://github.com/shrncr/Trees",isDeployed:false,    },
        { title: "Pattern Matching", category:["DSA"],skills:["Java"],icon: AbcIcon, desc: "Implemented Brute force, KMP, and Boyer Moore pattern matching algorithms on custom Linked List class", isDeployed:false, source: "https://github.com/shrncr/PatternMatching",   },
        { title: "Process Tracing",category:["OS-Inspired"],skills:["C"], icon: AccountTreeIcon, desc: "Program replicates process tracing in an OS", source: "https://github.com/shrncr/ProcessTracing", isDeployed:false,   },
        { title: "Semaphores!",category:["OS-Inspired"],skills:["C"], icon: BuildIcon, desc: "Uses threading and semaphores to visualize characters(threads) from Mario Bros to open valves one at a time (critical sections)", isDeployed:false, source: "https://github.com/shrncr/SemaphoricValves",   },
        { title: "Simon Game", category:["Hardware"],skills:["Python","RaspberryPi","Circuits"],icon: Brightness1Icon, desc: "Used Raspberry Pi to create the beloved children's game, Simon", isDeployed:false, source: "https://github.com/shrncr/raspPiSimon", isDeployed: false,   },
        { title: "Calculator (With Infix and Postfix)",category:["DSA"],skills:["Python"], icon: CalculateIcon, desc: "Converts user-input equations (infix) into postfix, and then solves.", isDeployed:false, source: "https://github.com/shrncr/Calculator", isDeployed: true,   } 
];
const categories = [
  "Featured",
  "Web",
  "OS-Inspired",
  "DSA",
  "Hardware",
  "View All",
];

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("Featured");

  const filteredProjects =
  selectedCategory === "View All"
    ? projectsData
    : projectsData.filter((proj) => proj.category.includes(selectedCategory));

return (
  <div className="container mx-auto px-4 py-10 ">
    {/* Toggle Buttons */}
    <div className="flex flex-wrap justify-center gap-4 mb-8 ">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            selectedCategory === category
              ? "bg-slate-800 text-white shadow-md"
              : "bg-slate-600 text-gray-300 hover:bg-slate-500"
          }`}
        >
          {category}
        </button>
      ))}
    </div>

    <AnimatePresence>
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Project
              title={project.title}
              description={project.desc}
              source={project.source}
              deployedLink={project.deployedLink}
              icon={project.icon}
              skills={project.skills}
              isDeployed={project.isDeployed}
            />
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
    {filteredProjects.length === 0 && (
      <p className="text-center text-gray-400 mt-6">No projects found for this category.</p>
    )}
  </div>
);
}
