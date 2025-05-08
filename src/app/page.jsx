"use client";
import React, { useState, useEffect } from "react";
import ProjectsPage from "./portfolio/components/projectsPage";
import { PortfolioProvider, usePortfolio } from "./portfolio/context/portfolioContext";
import FilterPopup from "./portfolio/components/filter";
import PortfolioToggle from "./portfolio/components/toggle";
import Timeline from "./portfolio/components/timeline";
import HonorsGrid from "./portfolio/components/awards";
import Home from "./portfolio/components/multiOption";
import InfiniteSlider from "./portfolio/components/skillsSlider";
import NavBar from "./portfolio/components/navbar";
import GitHubIcon from  '@mui/icons-material/GitHub';
import LinkedInIcon from  '@mui/icons-material/LinkedIn';

const PortfolioContent = () => {
  const [questionStatus, setQuestionSatus] = useState(1);
  const [pType, setPType] = useState("all"); 
  const [filteredExperiences, setFilteredExperiences] = useState([]);
  const experiences = [
    
    {
      academic: true,
      professional: false,
      title: "Publication",
      company: "The Routledge Handbook of User Experience in Technical Communication",
      date: "Proposal Accepted Nov. 2024, Chapter in Progress",
      description: "Co-authoring (with Dr. Lorraine Jacques), “Creating UX Partnerships with Industry Stakeholders: A Case Study in Community Driven Educational Apps”"
    },
    {
      academic: false,
      professional: true,
      title: "Solutions Architect I, IBM watsonx",
      company: "TD SYNNEX",
      date: "May. 2024 - Present",
      description: "Acting as Subject Matter Expert (SME) for IBM watsonx Orchestrate, data, and ai in cross-functional meetings with clients and business partners. Leading partner enablement sessions, providing hands-on guidance and training to BPs"
    },
    {
      academic: false,
      professional: true,
      title: "Tech Scholar",
      company: "TD SYNNEX",
      date: "Sept. 2024 - May 2025",
      description: "Providing presales design consultation to TD SYNNEX partners; Collaborated with IBM team to create interactive AI client demonstration"
    },
    {
      academic: true,
      professional: false,
      title: "Conference Presentation",
      company: "National Conference on Undergraduate Research (NCUR)",
      date: "Apr. 7-9, 2025",
      description: "Poster Title: Natural Interaction, Real Feedback: A Qualitative Assessment of Minimally Invasive Model for End-User Testing in Recreational Environments"
    },
    {
      academic: true,
      professional: false,
      title: "Conference Presentation",
      company: "Florida Undergraduate Research Conference (FURC)",
      date: "Feb. 14-15, 2025",
      description: "Poster Title: Natural Interaction, Real Feedback: A Qualitative Assessment of Minimally Invasive Model for End-User Testing in Recreational Environments"
    },
    {
      academic: true,
      professional: true,
      title: "Coding Instructor",
      company: "The Coder School",
      date: "Sept. 2022 - Geb. 2025",
      description: "Mentoring an average of 10 students ages 8-15 per week in long term projects which utilize technologies such as Java, Javascript, Python, and Lua/Roblox Studio"
    },
    {
      professional: false,
      academic: true,
      title: "Conference Presentation",
      company: "SURF Symposium",
      date: "Aug. 2024",
      description: "Poster Title: A Qualitative Assessment of a New End-User Testing Model for Software Quality"
    },
    {
      academic: false,
      professional: true,
      title: "Full Stack Developer",
      company: "University of Tampa/ Glazer Children &as Museum",
      date: "Jan. 2024 - Aug. 2024",
      description: "Developed web application for Glazer Children &as museum with a team of undergraduates. Additionally, independently deployed, maintained, tested, and improved application May-August."
    },
    {
      academic: true,
      professional: false,
      title: "Summer Undergraduate Research Fellow",
      company: "The University of Tampa",
      date: "June 2024 - Aug. 2024",
      description: "Defined and evaluated model for end user software testing"
    },
    {
      academic: true,
      professional: true,
      title: "Teaching Assistant",
      company: "Lane Technical High School",
      date: "Aug. 2021 - May 2022",
      description: "Led peers in lessons for data science libraries: Pandas, Numpy, and Matplotlib. Assisted groups in development of data science projects exploring citywide social patterns "
    }
  ];
  const { portfolioType, setPortfolioType } = usePortfolio();
  useEffect(()=>{
    setPType(portfolioType)
    console.log(pType)
  },[portfolioType])
useEffect(() => {
  let filtered;
  console.log(pType)
  if (pType === "academic") {
    filtered = experiences.filter(exp => exp.academic==true);
  } else if (pType === "professional") {
    filtered = experiences.filter(exp => exp.professional==true);
  } else {
    filtered = experiences; //all
  }
  console.log(filtered)
  setFilteredExperiences(filtered);
}, [pType]);

  return (
    <div className="App min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-300 p-4 text-black">
      <NavBar />
      
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div id="about" className="flex flex-col lg:flex-row items-center mt-24 lg:items-start gap-3 max-w-6xl mx-auto  mb-16">
          {/* Left Side: Text */}
          {questionStatus == 0 ? (
            <div className="flex-row lg:w-3/4 md:w-3/4 max-w-2xl px-6 lg:px-12 text-left justify-center lg:text-left ">
              <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-800 mb-6">
                Hi, I'm <span className="text-pink-600">Sara Hrnciar </span>
              </h2>
              <p className="text-lg lg:text-xl mb-6">
                I have recently graduated magma cumme laude from The Univesity of Tampa with a B.S. in Computer Science and a minor in mathematics.</p>
              <p className="text-lg lg:text-xl mb-6">
                {portfolioType === "academic"
                  ? "My research interests include theory of computation as well as human centered computing. I admire that my skills can truly impact the world around me, from academia to humanity! Through my research in usability testing, personal projects, and experience as a tutor and teacher, I aspire to make as many peoples' lives as easy as possible."
                  : portfolioType === "professional"
                  ? "I have a strong foundation in the core principles of computer science, and I’m confident in my ability to quickly learn new tools when they’re needed. I’m particularly focused on theory, data structures, and algorithms, but I’m also comfortable building interfaces when necessary."
                  : "I have a strong foundation in the core principles of computer science, and I’m confident in my ability to quickly learn new tools when they’re needed. I’m particularly focused on theory, data structures, and algorithms, but I’m also comfortable building interfaces when necessary.  I admire that my skills can truly impact the world around me, from academia to humanity! Through my research in usability testing, personal projects, and experience as a tutor and teacher, I aspire to make as many peoples' lives as easy as possible."}
              </p>
              <a className="text-lg lg:text-xl mb-6 text-purple-900" href="https://www.linkedin.com/in/sara-hrnciar-681568271" target="_blank" rel="noopener noreferrer">
  Let’s connect on LinkedIn! Whether you're interested in collaborating on projects or just want to stay in touch, I'd love to hear from you.
</a>

            </div>
          ) : (
            <Home state={setQuestionSatus} />
          )}

          {/* Right Side: Image */}
          <div className="lg:w-1/2 md:w-1/2 flex justify-center lg:justify-end px-6 lg:px-12">
            <img
              src="IMG_0545.JPG"
              alt="Presenting my Research at the University of Tampa"
              className="rounded-xl shadow-2xl transition-transform duration-300 ease-in-out max-w-lg w-64 h-auto"
            />
          </div>
        </div>

        <InfiniteSlider />

        {/* Projects Section */}
        <div id="projects" className="text-center mt-16">
          <h2 className="text-3xl font-extrabold mb-4 text-slate-800">Featured Projects</h2>
          <p className="text-lg mb-4 max-w-3xl mx-auto">
            {portfolioType === "academic"
              ? <><span>Below are some of my personal projects. Feel free to explore the source code and to interact with the deployments themselves if the live demo option is available. </span> <a href="https://github.com/shrncr" target="_blank" className="text-purple-900"> Check out my GitHub for more projects! </a></>
              : <><span>Below are some of my personal projects. Feel free to explore the source code and to interact with the deployments themselves if the live demo option is available. </span> <a href="https://github.com/shrncr" target="_blank" className="text-purple-900"> Check out my GitHub for more projects! </a></>}
          </p>
        </div>

        {/* Projects Component */}
        <ProjectsPage projectType={pType} />

        <div>
          <h1 id="experience" className="text-center text-4xl font-bold mt-10 py-8">My Experience</h1>
          <p className="text-center mb-4 ">Reminder that what appears here depends on whether you prefer to explore my academic or professional experience!</p>
          
          <PortfolioToggle/>
          <Timeline experiences={filteredExperiences} />
        </div>
        <div id="honors">
          <HonorsGrid />
        </div>
      </div>
    </div>
  );
};

// Wrap PortfolioContent with PortfolioProvider
const Main = () => (
  <PortfolioProvider>
    <PortfolioContent />
  </PortfolioProvider>
);

export default Main;
