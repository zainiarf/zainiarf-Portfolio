import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedinIn, FaTwitter, FaInstagram } from "react-icons/fa";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hideNav, setHideNav] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [location] = useLocation();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Handle scroll behavior for header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 100) {
        setScrolled(true);
        
        // Hide header when scrolling down, show when scrolling up
        if (currentScrollY > lastScrollY && currentScrollY > 300) {
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

  // Animation variants for mobile menu items
  const menuItemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: {
        delay: i * 0.1 + 0.3,
        duration: 0.5,
        ease: [0.6, 0.05, -0.01, 0.9]
      }
    }),
    exit: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.3
      }
    }
  };

  // Animation variants for mobile menu background
  const menuBackgroundVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3
      }
    },
    exit: {
      opacity: 0,
      transition: {
        delay: 0.3,
        duration: 0.3
      }
    }
  };

  // Hamburger button animation variants
  const hamburgerLineVariants = {
    closed: { rotate: 0, y: 0 },
    open: (i: number) => {
      const variants = [
        { rotate: 45, y: 6 },     // top line
        { opacity: 0, x: -20 },   // middle line
        { rotate: -45, y: -6 }    // bottom line
      ];
      return variants[i];
    }
  };

  return (
    <header
      className={`fixed top-0 w-full bg-opacity-90 backdrop-blur-sm z-50 px-6 md:px-10 py-4 transition-all duration-300 ${
        scrolled
          ? "bg-navy-dark shadow-lg"
          : "bg-navy-dark bg-opacity-70"
      } ${hideNav ? "-translate-y-full" : "translate-y-0"}`}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-heading font-bold text-white hover:text-gold transition-colors duration-300 cursor-pointer group inline-block">
          <span className="text-gold font-mono text-xl mr-2 opacity-90 group-hover:opacity-100 transition-opacity duration-300">&lt;</span>
          zainiarf
          <span className="text-gold font-mono text-xl ml-2 opacity-90 group-hover:opacity-100 transition-opacity duration-300">/&gt;</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-8">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link 
                  href={item.path}
                  className={`nav-link text-slate hover:text-white relative pb-1 transition-colors duration-300 ${
                    location === item.path ? "active text-white" : ""
                  }`}
                >
                  {item.name}
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
        
        {/* Animated Mobile Menu Button */}
        <button
          ref={menuButtonRef}
          className="md:hidden text-white hover:text-gold focus:outline-none relative w-8 h-8 flex flex-col justify-center items-center"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <motion.div 
            className="w-6 h-0.5 bg-current absolute rounded-full"
            custom={0}
            variants={hamburgerLineVariants}
            animate={isOpen ? "open" : "closed"}
            transition={{ duration: 0.3 }}
            style={{ top: "35%" }}
          />
          <motion.div 
            className="w-6 h-0.5 bg-current absolute rounded-full"
            custom={1}
            variants={hamburgerLineVariants}
            animate={isOpen ? "open" : "closed"}
            transition={{ duration: 0.3 }}
          />
          <motion.div 
            className="w-6 h-0.5 bg-current absolute rounded-full"
            custom={2}
            variants={hamburgerLineVariants}
            animate={isOpen ? "open" : "closed"}
            transition={{ duration: 0.3 }}
            style={{ bottom: "35%" }}
          />
        </button>
      </div>
      
      {/* Mobile Navigation with Animated Transitions */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed inset-0 bg-navy-dark bg-opacity-95 z-50 flex justify-center items-center md:hidden"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuBackgroundVariants}
          >
            <nav className="w-full max-w-sm px-6">
              <ul className="flex flex-col items-center justify-center gap-8">
                {navItems.map((item, index) => (
                  <li 
                    key={index}
                    className="w-full text-center"
                  >
                    <motion.div
                      custom={index}
                      variants={menuItemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <Link 
                        href={item.path}
                        className={`block text-white text-xl py-2 font-heading hover:text-gold transition-colors duration-300 ${
                          location === item.path ? "text-gold" : ""
                        }`}
                        onClick={closeMenu}
                      >
                        <span className="text-gold font-mono text-sm opacity-75 mr-2">0{index + 1}.</span>
                        {item.name}
                      </Link>
                    </motion.div>
                  </li>
                ))}
                <li className="w-full text-center">
                  <motion.div
                    custom={navItems.length}
                    variants={menuItemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <a 
                      href="/zainiarf_resume.pdf" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mt-4 inline-block font-mono text-base py-3 px-8 border border-gold text-gold rounded-full hover:bg-gold hover:bg-opacity-10 transition-all duration-300"
                    >
                      Resume
                    </a>
                  </motion.div>
                </li>
              </ul>
            </nav>

            {/* Social media links on mobile menu */}
            <motion.div 
              className="absolute bottom-10 flex justify-center gap-6 w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              exit={{ opacity: 0, y: 20 }}
            >
              {[
                { icon: <FaGithub />, href: "#", label: "GitHub" },
                { icon: <FaLinkedinIn />, href: "#", label: "LinkedIn" },
                { icon: <FaTwitter />, href: "#", label: "Twitter" },
                { icon: <FaInstagram />, href: "#", label: "Instagram" }
              ].map((social, index) => (
                <a 
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate hover:text-gold transition-colors duration-300 text-xl"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
