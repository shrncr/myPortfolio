import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PortfolioToggle from "./toggle";
export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav
        className={`${
          isScrolled ? "bg-slate-950 bg-opacity-75" : "bg-slate-950 bg-opacity-25"
        } p-6 fixed w-full top-0 left-0 z-50 shadow-lg transition-all duration-300`}
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <p className="text-white text-fuchsia-200 font-light italic cursor-pointer">
            Sara Hern-Car
          </p>
          
          <div
            className="lg:hidden flex items-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="flex-col">
            <button className="text-white text-2xl ">
              {isMenuOpen ? "✖" : "☰"}
            </button>
            
            </div>
            
          </div>
          <ul
            className={`lg:flex space-x-8 text-white font-semibold ${
              isMenuOpen ? "block" : "hidden"
            } lg:block`}
          >
            
            <li>
              <Link
                to="about"
                smooth={true}
                duration={500}
                className="cursor-pointer hover:text-red-100"
              >
                About Me
              </Link>
            </li>
            <li>
              <Link
                to="projects"
                smooth={true}
                duration={500}
                className="cursor-pointer hover:text-red-100"
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                to="experience"
                smooth={true}
                duration={500}
                className="cursor-pointer hover:text-red-100"
              >
                Experience
              </Link>
            </li>
            <li>
              <Link
                to="honors"
                smooth={true}
                duration={500}
                className="cursor-pointer hover:text-red-100"
              >
                Awards and Affiliations
              </Link>
            </li>
            

            {/* Social Media Links in Desktop View */}
            <li className="flex space-x-4">
              <a
                href="https://www.linkedin.com/in/sara-hrnciar-681568271/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-700"
              >
                <LinkedInIcon fontSize="large" />
              </a>
              <a
                href="https://github.com/shrncr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-black"
              >
                <GitHubIcon fontSize="large" />
              </a>
            </li>
          </ul>
        </div>
      </nav>
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
      <div
        className={`${
          isMenuOpen
            ? "fixed top-0 left-0 right-0 bottom-0 bg-slate-950 z-50 flex justify-center items-center opacity-100 transition-all duration-300"
            : "hidden"
        }`}
      >
        <div className="absolute top-4 right-4">
          <button
            className="text-white text-3xl"
            onClick={() => setIsMenuOpen(false)}
          >
            ✖
          </button>
        </div>
        <ul className="flex flex-col items-center text-white font-semibold space-y-6">
        <PortfolioToggle/>
          <li>
            <Link
              to="about"
              smooth={true}
              duration={500}
              className="cursor-pointer hover:text-red-100"
              onClick={() => setIsMenuOpen(false)}
            >
              About Me
            </Link>
          </li>
          <li>
            <Link
              to="projects"
              smooth={true}
              duration={500}
              className="cursor-pointer hover:text-red-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              to="experience"
              smooth={true}
              duration={500}
              className="cursor-pointer hover:text-red-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Experience
            </Link>
          </li>
          <li>
            <Link
              to="honors"
              smooth={true}
              duration={500}
              className="cursor-pointer hover:text-red-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Awards and Affiliations
            </Link>
          </li>
          <li className="pt-8">
            Let's Connect!
          </li>
          
          {/* Social Media Links in Mobile View */}
          <li className="flex space-x-4 mt-6">
            <a
              href="https://www.linkedin.com/in/sara-hrnciar-681568271/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-700"
            >
              <LinkedInIcon fontSize="large" />
            </a>
            <a
              href="https://github.com/shrncr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-black"
            >
              <GitHubIcon fontSize="large" />
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
