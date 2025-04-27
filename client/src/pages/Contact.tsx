import { useState } from "react";
import { gsap } from "gsap";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaGithub, FaLinkedinIn, FaTwitter, FaInstagram } from "react-icons/fa";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useEffect } from "react";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const { ref, inView } = useIntersectionObserver({ threshold: 0.1 });
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill out all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await apiRequest("POST", "/api/contact", formData);
      
      toast({
        title: "Success!",
        description: "Your message has been sent successfully. I'll get back to you soon!",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error sending your message. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
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
    }
  }, [inView]);

  return (
    <section id="contact" className="relative min-h-screen flex items-center px-6 md:px-10 py-24">
      <div ref={ref} className="max-w-4xl mx-auto w-full text-center">
        <p className="contact-content text-gold font-mono mb-4">04. What's Next?</p>
        <h2 className="contact-content text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-6">Get In Touch</h2>
        <p className="contact-content text-slate-light max-w-2xl mx-auto mb-12">
          I'm currently looking for new opportunities where I can combine my legal background with my passion for technology. Whether you have a question, a project idea, or just want to say hi, I'll try my best to get back to you!
        </p>
        
        <div className="grid md:grid-cols-2 gap-10 text-left">
          <div className="contact-form">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-slate mb-2 font-mono text-sm">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-navy border border-slate rounded-md py-3 px-4 text-white focus:border-gold focus:outline-none transition-colors duration-300"
                  placeholder="John Doe"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-slate mb-2 font-mono text-sm">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-navy border border-slate rounded-md py-3 px-4 text-white focus:border-gold focus:outline-none transition-colors duration-300"
                  placeholder="johndoe@example.com"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="subject" className="block text-slate mb-2 font-mono text-sm">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-navy border border-slate rounded-md py-3 px-4 text-white focus:border-gold focus:outline-none transition-colors duration-300"
                  placeholder="Project Inquiry"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-slate mb-2 font-mono text-sm">Message</label>
                <textarea 
                  id="message" 
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-navy border border-slate rounded-md py-3 px-4 text-white focus:border-gold focus:outline-none transition-colors duration-300 resize-none"
                  placeholder="Your message here..."
                  required
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="w-full font-mono py-3 px-6 bg-transparent border-2 border-gold text-gold rounded-md hover:bg-gold hover:bg-opacity-10 transition-all duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
          
          <div className="contact-info">
            <div className="bg-navy-light p-8 rounded-lg shadow-lg h-full">
              <h3 className="text-xl font-heading font-semibold text-white mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="text-gold mr-4 mt-1">
                    <FaEnvelope />
                  </div>
                  <div>
                    <p className="font-mono text-sm text-slate mb-1">Email</p>
                    <a href="mailto:hello@zainiarf.com" className="text-white hover:text-gold transition-colors duration-300">hello@zainiarf.com</a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-gold mr-4 mt-1">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <p className="font-mono text-sm text-slate mb-1">Location</p>
                    <p className="text-white">Jakarta, Indonesia</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-gold mr-4 mt-1">
                    <FaPhoneAlt />
                  </div>
                  <div>
                    <p className="font-mono text-sm text-slate mb-1">Phone</p>
                    <a href="tel:+6281234567890" className="text-white hover:text-gold transition-colors duration-300">(+62) 812-3456-7890</a>
                  </div>
                </div>
                
                <div className="pt-4">
                  <p className="font-mono text-sm text-slate mb-3">Social Media</p>
                  <div className="flex space-x-4">
                    <a href="#" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gold transition-colors duration-300">
                      <FaGithub className="text-xl" />
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gold transition-colors duration-300">
                      <FaLinkedinIn className="text-xl" />
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gold transition-colors duration-300">
                      <FaTwitter className="text-xl" />
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gold transition-colors duration-300">
                      <FaInstagram className="text-xl" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
