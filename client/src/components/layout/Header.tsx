import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hideNav, setHideNav] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [location] = useLocation();

  // Handle scroll behavior for header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 100) {
        setScrolled(true);
        
        // Hide header when scrolling down, show when scrolling up
        if (currentScrollY > lastScrollY) {
          setHideNav(true);
        } else {
          setHideNav(false);
        }
      } else {
        setScrolled(false);
        setHideNav(false);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

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
        scrolled
          ? "bg-navy-dark shadow-lg"
          : "bg-navy-dark bg-opacity-70"
      } ${hideNav ? "-translate-y-full" : "translate-y-0"}`}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/">
          <a className="text-2xl font-heading font-bold text-white hover:text-gold transition-colors duration-300 cursor-pointer group inline-block">
            <span className="text-accent font-mono text-xl mr-2 opacity-90 group-hover:opacity-100 transition-opacity duration-300">&lt;</span>
            zainiarf
            <span className="text-accent font-mono text-xl ml-2 opacity-90 group-hover:opacity-100 transition-opacity duration-300">/&gt;</span>
          </a>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-8">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link href={item.path}>
                  <a className={`nav-link text-slate hover:text-white relative pb-1 transition-colors duration-300 ${
                    location === item.path ? "active text-white" : ""
                  }`}>
                    {item.name}
                  </a>
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
        
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white hover:text-gold focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      
      {/* Mobile Navigation */}
      <div className={`fixed inset-0 bg-navy-dark bg-opacity-95 z-50 flex justify-center items-center md:hidden transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}>
        <button
          className="absolute top-6 right-6 text-white hover:text-gold focus:outline-none"
          onClick={closeMenu}
          aria-label="Close Menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <nav>
          <ul className="flex flex-col items-center justify-center gap-8">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link href={item.path}>
                  <a 
                    className="text-white text-xl hover:text-gold transition-colors duration-300"
                    onClick={closeMenu}
                  >
                    {item.name}
                  </a>
                </Link>
              </li>
            ))}
            <li>
              <a 
                href="/zainiarf_resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-4 inline-block font-mono text-base py-2 px-6 border border-gold text-gold rounded hover:bg-gold hover:bg-opacity-10 transition-all duration-300"
              >
                Resume
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
