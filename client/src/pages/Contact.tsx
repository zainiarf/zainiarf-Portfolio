import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

import { 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaGithub, 
  FaLinkedinIn, 
  FaTwitter, 
  FaInstagram, 
  FaPaperPlane, 
  FaCheck,
  FaTimes,
  FaSpinner
} from "react-icons/fa";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const Contact = () => {
  const { ref, inView } = useIntersectionObserver({ threshold: 0.1 });
  const { toast } = useToast();
  const contactMapRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [formTouched, setFormTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [activeField, setActiveField] = useState<string | null>(null);
  
  // Field focus animations
  const handleFocus = (fieldId: string) => {
    setActiveField(fieldId);
  };
  
  const handleBlur = (fieldId: string) => {
    setActiveField(null);
    setFormTouched({ ...formTouched, [fieldId]: true });
    validateField(fieldId, formData[fieldId as keyof FormData]);
  };
  
  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    
    // Clear error when typing if field was previously marked as error
    if (formErrors[id as keyof FormErrors]) {
      setFormErrors(prev => ({ ...prev, [id]: undefined }));
    }
  };
  
  // Validate a single field
  const validateField = (field: string, value: string) => {
    let error = "";
    
    switch (field) {
      case "name":
        if (!value.trim()) {
          error = "Name is required";
        } else if (value.trim().length < 2) {
          error = "Name must be at least 2 characters";
        }
        break;
      case "email":
        if (!value.trim()) {
          error = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Please enter a valid email address";
        }
        break;
      case "message":
        if (!value.trim()) {
          error = "Message is required";
        } else if (value.trim().length < 10) {
          error = "Message must be at least 10 characters";
        }
        break;
      default:
        break;
    }
    
    setFormErrors(prev => ({ ...prev, [field]: error || undefined }));
    return !error;
  };
  
  // Validate all form fields
  const validateForm = () => {
    const fieldValidations = {
      name: validateField("name", formData.name),
      email: validateField("email", formData.email),
      message: validateField("message", formData.message)
    };
    
    // Mark all fields as touched for visual feedback
    setFormTouched({
      name: true,
      email: true,
      subject: true,
      message: true
    });
    
    return Object.values(fieldValidations).every(isValid => isValid);
  };
  
  // Handle form submission with Formspree
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Form Error",
        description: "Please correct the errors in the form.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus("loading");
    
    try {
      // Submit form to Formspree
      const response = await fetch("https://formspree.io/f/mwpokzly", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error("Failed to submit form");
      }
      
      setSubmitStatus("success");
      toast({
        title: "Message Sent!",
        description: "Your message has been sent successfully. I'll get back to you soon!",
      });
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: ""
        });
        setFormTouched({});
        setSubmitStatus("idle");
      }, 2000);
      
    } catch (error) {
      setSubmitStatus("error");
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again later.",
        variant: "destructive"
      });
      
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 2000);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Interactive background effect for contact section
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      gsap.to(".contact-gradient", {
        background: `radial-gradient(circle at ${x * 100 + 50}% ${y * 100 + 50}%, rgba(255, 215, 0, 0.08), rgba(0, 0, 0, 0) 70%)`,
        duration: 0.5
      });
    };
    
    if (ref.current) {
      ref.current.addEventListener("mousemove", handleMouseMove);
    }
    
    return () => {
      if (ref.current) {
        ref.current.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [ref]);
  
  // Animate content when in view
  useEffect(() => {
    if (inView) {
      gsap.fromTo(
        ".contact-content",
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8,
          ease: "power2.out" 
        }
      );
      
      gsap.fromTo(
        ".contact-form",
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8,
          delay: 0.2,
          ease: "power2.out" 
        }
      );
      
      gsap.fromTo(
        ".contact-info",
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8,
          delay: 0.4,
          ease: "power2.out" 
        }
      );
      
      // Particle-like dots animation
      gsap.fromTo(
        ".particle",
        { 
          scale: 0,
          opacity: 0 
        },
        { 
          scale: 1,
          opacity: 0.7, 
          duration: 0.8,
          stagger: 0.1,
          ease: "elastic.out(1, 0.5)" 
        }
      );
    }
  }, [inView]);

  // Get animation class based on field status
  const getFieldAnimationClass = (fieldId: string) => {
    if (activeField === fieldId) return "border-gold shadow-glow";
    if (formErrors[fieldId as keyof FormErrors] && formTouched[fieldId]) return "border-red-500";
    if (formTouched[fieldId] && !formErrors[fieldId as keyof FormErrors]) return "border-green-500";
    return "border-slate";
  };

  // Button state variants for submit button
  const submitButtonVariants = {
    idle: {
      backgroundColor: "transparent",
      borderColor: "#FFD700",
      color: "#FFD700"
    },
    loading: {
      backgroundColor: "rgba(255, 215, 0, 0.1)",
      borderColor: "#FFD700",
      color: "#FFD700"
    },
    success: {
      backgroundColor: "rgba(34, 197, 94, 0.2)",
      borderColor: "#22C55E",
      color: "#22C55E"
    },
    error: {
      backgroundColor: "rgba(239, 68, 68, 0.2)",
      borderColor: "#EF4444",
      color: "#EF4444"
    }
  };

  return (
    <section id="contact" className="relative min-h-screen flex items-center px-6 md:px-10 py-24 overflow-hidden">
      {/* Interactive background gradient */}
      <div className="contact-gradient absolute inset-0 opacity-30 pointer-events-none"></div>
      
      {/* Decorative particles */}
      {[...Array(15)].map((_, i) => (
        <div 
          key={i}
          className="particle absolute w-2 h-2 rounded-full bg-gold opacity-0 pointer-events-none"
          style={{ 
            left: `${Math.random() * 90 + 5}%`, 
            top: `${Math.random() * 90 + 5}%`,
            boxShadow: '0 0 10px rgba(255, 215, 0, 0.8)'
          }}
        ></div>
      ))}
      
      <div ref={ref} className="max-w-5xl mx-auto w-full text-center relative z-10">
        <p className="contact-content text-gold font-mono mb-4 animate-fade-in" style={{animationDelay: '0.1s'}}>
          04. What's Next?
        </p>
        
        <h2 className="contact-content text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-6 animate-fade-in" style={{animationDelay: '0.2s'}}>
          Get In Touch
        </h2>
        
        <p className="contact-content text-slate-light max-w-2xl mx-auto mb-12 animate-fade-in" style={{animationDelay: '0.3s'}}>
          I'm currently looking for new opportunities where I can combine my legal background with my passion for technology. Whether you have a question, a project idea, or just want to say hi, I'll try my best to get back to you!
        </p>
        
        <div className="grid md:grid-cols-2 gap-10 text-left">
          <div className="contact-form order-2 md:order-1">
            <form 
              onSubmit={handleSubmit} 
              className="rounded-lg bg-navy-light bg-opacity-40 backdrop-blur-sm p-6 shadow-lg border border-navy-light"
              action="https://formspree.io/f/mwpokzly"
              method="POST"
            >
              {/* Hidden field for Formspree */}
              <input type="hidden" name="_subject" value="New contact from portfolio website" />
              <div className="mb-5">
                <label htmlFor="name" className="block text-slate mb-2 font-mono text-sm flex justify-between">
                  <span>Name <span className="text-gold">*</span></span>
                  {formErrors.name && formTouched.name && (
                    <span className="text-red-500 text-xs">{formErrors.name}</span>
                  )}
                </label>
                <div className="relative">
                  <input 
                    type="text" 
                    id="name" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => handleFocus("name")}
                    onBlur={() => handleBlur("name")}
                    className={`w-full bg-navy border rounded-md py-3 pl-10 pr-4 text-white focus:outline-none transition-all duration-300 ${getFieldAnimationClass("name")}`}
                    placeholder="John Doe"
                    required
                  />
                  <span className="absolute left-3 top-3.5 text-gold">
                    {formTouched.name && !formErrors.name ? <FaCheck className="text-green-500" /> : null}
                    {formTouched.name && formErrors.name ? <FaTimes className="text-red-500" /> : null}
                    {(!formTouched.name || (activeField === "name")) && <span className="text-slate-light opacity-70">#</span>}
                  </span>
                </div>
              </div>
              
              <div className="mb-5">
                <label htmlFor="email" className="block text-slate mb-2 font-mono text-sm flex justify-between">
                  <span>Email <span className="text-gold">*</span></span>
                  {formErrors.email && formTouched.email && (
                    <span className="text-red-500 text-xs">{formErrors.email}</span>
                  )}
                </label>
                <div className="relative">
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => handleFocus("email")}
                    onBlur={() => handleBlur("email")}
                    className={`w-full bg-navy border rounded-md py-3 pl-10 pr-4 text-white focus:outline-none transition-all duration-300 ${getFieldAnimationClass("email")}`}
                    placeholder="johndoe@example.com"
                    required
                  />
                  <span className="absolute left-3 top-3.5 text-gold">
                    <FaEnvelope className="text-slate-light opacity-70" />
                  </span>
                </div>
              </div>
              
              <div className="mb-5">
                <label htmlFor="subject" className="block text-slate mb-2 font-mono text-sm">Subject</label>
                <div className="relative">
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => handleFocus("subject")}
                    onBlur={() => handleBlur("subject")}
                    className={`w-full bg-navy border rounded-md py-3 pl-10 pr-4 text-white focus:outline-none transition-all duration-300 ${getFieldAnimationClass("subject")}`}
                    placeholder="Project Inquiry"
                  />
                  <span className="absolute left-3 top-3.5">
                    <span className="text-slate-light opacity-70">/</span>
                  </span>
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-slate mb-2 font-mono text-sm flex justify-between">
                  <span>Message <span className="text-gold">*</span></span>
                  {formErrors.message && formTouched.message && (
                    <span className="text-red-500 text-xs">{formErrors.message}</span>
                  )}
                </label>
                <div className="relative">
                  <textarea 
                    id="message" 
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => handleFocus("message")}
                    onBlur={() => handleBlur("message")}
                    className={`w-full bg-navy border rounded-md py-3 pl-10 pr-4 text-white focus:outline-none transition-all duration-300 resize-none ${getFieldAnimationClass("message")}`}
                    placeholder="Your message here..."
                    required
                  ></textarea>
                  <span className="absolute left-3 top-3.5">
                    <span className="text-slate-light opacity-70">{">"}</span>
                  </span>
                </div>
                <div className="text-right mt-1">
                  <span className="text-xs text-slate-light">
                    {formData.message.length} / 500
                  </span>
                </div>
              </div>
              
              <button 
                type="submit" 
                className={`w-full font-mono py-3 px-6 border-2 rounded-md flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-70 mobile-touch-feedback
                  ${submitStatus === "idle" ? "border-gold text-gold hover:bg-gold hover:bg-opacity-10" : ""}
                  ${submitStatus === "loading" ? "border-gold bg-opacity-10 bg-gold text-gold" : ""}
                  ${submitStatus === "success" ? "border-green-500 bg-green-500 bg-opacity-20 text-green-500" : ""}
                  ${submitStatus === "error" ? "border-red-500 bg-red-500 bg-opacity-20 text-red-500" : ""}
                `}
                disabled={isSubmitting}
              >
                {submitStatus === "loading" && <FaSpinner className="animate-spin" />}
                {submitStatus === "success" && <FaCheck />}
                {submitStatus === "error" && <FaTimes />}
                {submitStatus === "idle" && <FaPaperPlane />}
                <span>
                  {submitStatus === "loading" && "Sending..."}
                  {submitStatus === "success" && "Message Sent!"}
                  {submitStatus === "error" && "Failed to Send"}
                  {submitStatus === "idle" && "Send Message"}
                </span>
              </button>
            </form>
          </div>
          
          <div className="contact-info order-1 md:order-2">
            <div className="bg-navy-light bg-opacity-40 backdrop-blur-sm p-8 rounded-lg shadow-lg h-full border border-navy-light">
              <h3 className="text-xl font-heading font-semibold text-white mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start contact-item hover:translate-x-1 transition-transform duration-300">
                  <div className="text-gold mr-4 mt-1">
                    <FaEnvelope />
                  </div>
                  <div>
                    <p className="font-mono text-sm text-slate mb-1">Email</p>
                    <a 
                      href="mailto:hello@zainiarf.com" 
                      className="text-white hover:text-gold transition-colors duration-300 flex items-center" 
                      aria-label="Email hello@zainiarf.com"
                    >
                      hello@zainiarf.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start contact-item hover:translate-x-1 transition-transform duration-300">
                  <div className="text-gold mr-4 mt-1">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <p className="font-mono text-sm text-slate mb-1">Location</p>
                    <p className="text-white">Jakarta, Indonesia</p>
                  </div>
                </div>
                
                <div className="flex items-start contact-item hover:translate-x-1 transition-transform duration-300">
                  <div className="text-gold mr-4 mt-1">
                    <FaPhoneAlt />
                  </div>
                  <div>
                    <p className="font-mono text-sm text-slate mb-1">Phone</p>
                    <a 
                      href="tel:+6281234567890" 
                      className="text-white hover:text-gold transition-colors duration-300"
                      aria-label="Phone number +62 812-3456-7890"
                    >
                      (+62) 812-3456-7890
                    </a>
                  </div>
                </div>
                
                {/* Map visualization - mobile friendly */}
                <div className="pt-4 relative">
                  <div className="rounded-lg overflow-hidden h-[180px] relative" ref={contactMapRef}>
                    <div className="absolute inset-0 bg-navy-dark opacity-30 z-10 pointer-events-none"></div>
                    <iframe
                      title="Location Map"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253840.65086637408!2d106.68942494803341!3d-6.229728025971202!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x100c5e82dd4b820!2sJakarta%2C%20Indonesia!5e0!3m2!1sen!2sid!4v1650338711010!5m2!1sen!2sid"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={false}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>
                
                <div className="pt-4">
                  <p className="font-mono text-sm text-slate mb-3">Social Media</p>
                  <div className="flex space-x-4">
                    {[
                      { icon: <FaGithub />, label: "GitHub", url: "#" },
                      { icon: <FaLinkedinIn />, label: "LinkedIn", url: "#" },
                      { icon: <FaTwitter />, label: "Twitter", url: "#" },
                      { icon: <FaInstagram />, label: "Instagram", url: "#" }
                    ].map((social, index) => (
                      <a 
                        key={index}
                        href={social.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="bg-navy-dark p-2 rounded-full text-white hover:text-gold hover:translate-y-[-5px] hover:bg-opacity-20 hover:bg-gold transition-all duration-300 inline-block"
                        aria-label={social.label}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Mobile-friendly quick contact options */}
            <div className="mt-5 flex flex-wrap gap-3 md:hidden">
              <a
                href="tel:+6281234567890"
                className="flex items-center gap-2 bg-navy-light px-4 py-2 rounded-full text-white hover:bg-gold hover:text-navy transition-all duration-300"
              >
                <FaPhoneAlt /> Call
              </a>
              <a
                href="mailto:hello@zainiarf.com"
                className="flex items-center gap-2 bg-navy-light px-4 py-2 rounded-full text-white hover:bg-gold hover:text-navy transition-all duration-300"
              >
                <FaEnvelope /> Email
              </a>
              <a
                href="https://wa.me/6281234567890"
                className="flex items-center gap-2 bg-navy-light px-4 py-2 rounded-full text-white hover:bg-gold hover:text-navy transition-all duration-300"
              >
                <FaPhoneAlt /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
