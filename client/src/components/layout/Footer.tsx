import { FaGithub, FaLinkedinIn, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-navy-dark py-8 px-6 text-center">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-center space-x-6 mb-4 md:hidden">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-slate hover:text-gold transition-colors duration-300"
            aria-label="GitHub Profile"
          >
            <FaGithub />
          </a>
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-slate hover:text-gold transition-colors duration-300"
            aria-label="LinkedIn Profile"
          >
            <FaLinkedinIn />
          </a>
          <a 
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-slate hover:text-gold transition-colors duration-300"
            aria-label="Twitter Profile"
          >
            <FaTwitter />
          </a>
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-slate hover:text-gold transition-colors duration-300"
            aria-label="Instagram Profile"
          >
            <FaInstagram />
          </a>
        </div>
        
        <p className="text-slate text-sm font-mono">Designed & Built by zainiarf</p>
      </div>
    </footer>
  );
};

export default Footer;
