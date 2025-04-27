import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { FaGithub, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  // Handle scroll behavior for header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    // Prevent body scrolling when menu is open
    document.body.style.overflow = !isOpen ? "hidden" : "auto";
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = "auto";
  };

  // Define navigation items
  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Skills", path: "/skills" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" }
  ];

  return (
    <header
      className={`fixed top-0 w-full bg-opacity-90 backdrop-blur-sm z-50 px-6 md:px-10 py-4 transition-all duration-300 ${
        scrolled ? "bg-navy-dark shadow-lg" : "bg-navy-dark bg-opacity-70"
      }`}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/">
          <div className="text-2xl font-heading font-bold text-white hover:text-gold transition-colors duration-300 cursor-pointer group inline-block">
            <span className="text-gold font-mono text-xl mr-2 opacity-90 group-hover:opacity-100 transition-opacity duration-300">&lt;</span>
            zainiarf
            <span className="text-gold font-mono text-xl ml-2 opacity-90 group-hover:opacity-100 transition-opacity duration-300">/&gt;</span>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-8">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link 
                  href={item.path}
                >
                  <span className={`nav-link text-slate hover:text-white relative pb-1 transition-colors duration-300 cursor-pointer ${
                    location === item.path ? "active text-white" : ""
                  }`}>
                    {item.name}
                  </span>
                </Link>
              </li>
            ))}
            <li>
              <a 
                href="/zainiarf_resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="ml-4 font-mono text-sm py-2 px-4 border border-gold text-gold rounded hover:bg-gold hover:bg-opacity-10 transition-all duration-300"
              >
                Resume
              </a>
            </li>
          </ul>
        </nav>
        
        {/* Simple Hamburger Menu Button */}
        <button
          className="md:hidden text-white hover:text-gold focus:outline-none w-8 h-8 flex flex-col justify-center items-center"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <span className={`w-6 h-0.5 bg-white mb-1.5 transition-all duration-300 ${isOpen ? "transform rotate-45 translate-y-2" : ""}`}></span>
          <span className={`w-6 h-0.5 bg-white mb-1.5 transition-all duration-300 ${isOpen ? "opacity-0" : "opacity-100"}`}></span>
          <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? "transform -rotate-45 -translate-y-2" : ""}`}></span>
        </button>
      </div>
      
      {/* Simple Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-navy-dark bg-opacity-95 z-40 pt-20 md:hidden">
          <nav className="w-full h-full flex flex-col justify-between">
            <ul className="flex flex-col items-center gap-6 p-6">
              {navItems.map((item, index) => (
                <li key={index} className="w-full text-center">
                  <Link href={item.path}>
                    <div
                      className={`block text-xl py-3 cursor-pointer ${location === item.path ? "text-gold" : "text-white"}`}
                      onClick={closeMenu}
                    >
                      <span className="text-gold opacity-75 mr-2">0{index + 1}.</span>
                      {item.name}
                    </div>
                  </Link>
                </li>
              ))}
              <li className="w-full text-center mt-4">
                <a 
                  href="/zainiarf_resume.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block py-3 px-8 border border-gold text-gold rounded-full hover:bg-gold hover:bg-opacity-10 transition-all duration-300"
                >
                  Resume
                </a>
              </li>
            </ul>
            
            {/* Simple social media links */}
            <div className="p-6 flex justify-center gap-6 w-full mb-8">
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-slate hover:text-gold text-xl" aria-label="GitHub">
                <FaGithub />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-slate hover:text-gold text-xl" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-slate hover:text-gold text-xl" aria-label="Twitter">
                <FaTwitter />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
