import { FaGithub, FaLinkedinIn, FaTwitter, FaInstagram } from "react-icons/fa";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

interface SocialLinksProps {
  isVertical?: boolean;
  className?: string;
}

const SocialLinks = ({ isVertical = true, className = "" }: SocialLinksProps) => {
  const { ref, inView } = useIntersectionObserver();

  const socialLinks = [
    { icon: <FaGithub className="text-xl" />, url: "https://github.com", label: "GitHub" },
    { icon: <FaLinkedinIn className="text-xl" />, url: "https://linkedin.com", label: "LinkedIn" },
    { icon: <FaTwitter className="text-xl" />, url: "https://twitter.com", label: "Twitter" },
    { icon: <FaInstagram className="text-xl" />, url: "https://instagram.com", label: "Instagram" }
  ];

  return (
    <div
      ref={ref}
      className={`${className} ${isVertical ? "fixed left-10 bottom-0 hidden xl:block z-10" : ""}`}
    >
      <ul 
        className={`
          ${isVertical 
            ? "flex flex-col items-center gap-6 after:content-[''] after:w-[1px] after:h-[90px] after:bg-slate" 
            : "flex items-center gap-6"
          }
        `}
      >
        {socialLinks.map((social, index) => (
          <li 
            key={index}
            className={`
              ${inView ? "opacity-100" : "opacity-0"} 
              transition-all duration-500 ease-out
            `}
            style={{ 
              transitionDelay: `${index * 100}ms`,
              transform: inView ? "translateY(0)" : "translateY(20px)" 
            }}
          >
            <a
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="text-slate hover:text-gold transform hover:-translate-y-[5px] transition-all duration-300"
            >
              {social.icon}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SocialLinks;
