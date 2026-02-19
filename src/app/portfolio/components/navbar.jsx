"use client";

import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import NextLink from "next/link";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PortfolioToggle from "./toggle";

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    // Update active section based on scroll position
    const sections = ["about", "projects", "experience", "honors"];
    const scrollPosition = window.scrollY + 100;

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const { offsetTop, offsetHeight } = element;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { id: "about", label: "About Me" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "honors", label: "Awards and Affiliations" },
  ];

  return (
    <>
      <nav
        className={`${
          isScrolled 
            ? "bg-neutral-900/90 backdrop-blur-md shadow-lg" 
            : "bg-neutral-900/75 backdrop-blur-sm"
        } fixed w-full top-0 left-0 z-fixed transition-all duration-normal`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4">
          {/* Logo/Name */}
          <NextLink 
            href="/"
            className="--color-neutral-900 font-medium text-lg hover:text-primary-200 transition-colors duration-fast cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-neutral-900 rounded-md px-2 py-1"
          >
            Sara Hern-Car
          </NextLink>
          
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden flex items-center text-slate text-2xl p-2 hover:bg-neutral-800 rounded-md transition-colors duration-fast focus:outline-none focus:ring-2 focus:ring-primary-500"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? "✖" : "☰"}
          </button>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center space-x-8 text-slate font-medium">
            {navLinks.map((link) => (
              <li key={link.id}>
                <Link
                  to={link.id}
                  smooth={true}
                  duration={500}
                  className={`cursor-pointer transition-colors duration-fast px-3 py-2 rounded-md hover:--color-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    activeSection === link.id 
                      ? "text-primary-400 font-semibold" 
                      : "text-neutral-900"
                  }`}
                  aria-current={activeSection === link.id ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            
            <li>
              <NextLink
                href="/blog"
                className="cursor-pointer transition-colors duration-fast px-3 py-2 rounded-md hover:--color-neutral-900 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                Blog
              </NextLink>
            </li>

            {/* Social Media Links */}
            <li className="flex space-x-3 ml-4 pl-4 border-l border-neutral-700">
              <a
                href="https://www.linkedin.com/in/sara-hrnciar-681568271/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-800 hover:text-primary-900 transition-colors duration-fast p-2 rounded-md hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                aria-label="LinkedIn profile"
              >
                <LinkedInIcon fontSize="medium" />
              </a>
              <a
                href="https://github.com/shrncr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-800 hover:text-primary-900 transition-colors duration-fast p-2 rounded-md hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                aria-label="GitHub profile"
              >
                <GitHubIcon fontSize="medium" />
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-modal-backdrop lg:hidden animate-fadeIn"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
          
          <div className="fixed top-0 right-0 bottom-0 w-80 bg-neutral-900 z-modal lg:hidden shadow-2xl animate-slideIn">
            {/* Close Button */}
            <div className="flex justify-end p-4">
              <button
                className="text-slate text-3xl p-2 hover:bg-neutral-800 rounded-md transition-colors duration-fast focus:outline-none focus:ring-2 focus:ring-primary-500"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
              >
                ✖
              </button>
            </div>

            {/* Mobile Menu Content */}
            <div className="flex flex-col px-6 py-8">
              <PortfolioToggle />
              
              <nav className="mt-8" role="navigation" aria-label="Mobile navigation">
                <ul className="flex flex-col space-y-4 text-slate font-medium">
                  {navLinks.map((link) => (
                    <li key={link.id}>
                      <Link
                        to={link.id}
                        smooth={true}
                        duration={500}
                        className={`block cursor-pointer transition-all duration-fast px-4 py-3 rounded-lg hover:bg-neutral-800 hover:--color-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                          activeSection === link.id 
                            ? "bg-neutral-800 text-primary-400 font-semibold" 
                            : "text-neutral-900"
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                        aria-current={activeSection === link.id ? "page" : undefined}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                  
                  <li>
                    <NextLink
                      href="/blog"
                      className="block cursor-pointer transition-all duration-fast px-4 py-3 rounded-lg hover:bg-neutral-800 hover:--color-neutral-900 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Blog
                    </NextLink>
                  </li>
                </ul>
              </nav>

              {/* Social Media Section */}
              <div className="mt-12 pt-8 border-t border-neutral-800">
                <p className="text-neutral-400 text-sm font-medium mb-4">Let's Connect!</p>
                <div className="flex space-x-4">
                  <a
                    href="https://www.linkedin.com/in/sara-hrnciar-681568271/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-300 hover:text-primary-400 transition-colors duration-fast p-3 rounded-lg hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    aria-label="LinkedIn profile"
                  >
                    <LinkedInIcon fontSize="large" />
                  </a>
                  <a
                    href="https://github.com/shrncr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-300 hover:text-primary-400 transition-colors duration-fast p-3 rounded-lg hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    aria-label="GitHub profile"
                  >
                    <GitHubIcon fontSize="large" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
