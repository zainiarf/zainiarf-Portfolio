import { motion } from "framer-motion";
import { Link } from "wouter";
import { NAV_LINKS } from "@/lib/constants";

const Header = () => {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full top-0 z-50 bg-navy/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/">
            <a className="text-xl font-bold">zainiarf</a>
          </Link>
          <nav>
            <ul className="flex space-x-6">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <Link href={link.path}>
                    <a className="hover:text-gold transition-colors">{link.name}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;