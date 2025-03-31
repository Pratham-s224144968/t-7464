
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { GitMerge, MessageSquare, FileText } from "lucide-react";
import { motion } from "@/components/ui/motion";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const handleAuthAction = () => {
    if (user) {
      signOut();
    } else {
      navigate("/auth");
    }
  };

  return (
    <motion.nav 
      className="fixed w-full z-50 border-b border-white/10 bg-black/90 backdrop-blur-sm"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex items-center justify-between h-16">
        <Link to="/" className="flex items-center font-mono text-xl font-bold text-white">
          <img 
            src="/lovable-uploads/2ac77590-a08e-4983-bafa-7be5dc24647b.png" 
            alt="InnovAIte Logo" 
            className="h-10 mr-2" 
          />
          InnovAIte
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <motion.button 
            onClick={() => scrollToSection('home')} 
            className="text-sm font-medium text-white/80 hover:text-blue-400 transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-blue-400 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            Home
          </motion.button>
          <motion.button 
            onClick={() => scrollToSection('about')} 
            className="text-sm font-medium text-white/80 hover:text-blue-400 transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-blue-400 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            About Us
          </motion.button>
          <motion.button 
            onClick={() => scrollToSection('projects')} 
            className="text-sm font-medium text-white/80 hover:text-blue-400 transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-blue-400 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            Projects
          </motion.button>
          <motion.button 
            onClick={() => scrollToSection('gitlab')} 
            className="text-sm font-medium text-white/80 hover:text-blue-400 transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-blue-400 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <span className="flex items-center">
              GitLab <GitMerge className="ml-1 h-3 w-3" />
            </span>
          </motion.button>
          <motion.button 
            onClick={() => scrollToSection('teams')} 
            className="text-sm font-medium text-white/80 hover:text-blue-400 transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-blue-400 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <span className="flex items-center">
              MS Teams <MessageSquare className="ml-1 h-3 w-3" />
            </span>
          </motion.button>
          <motion.button 
            onClick={() => scrollToSection('meetings')} 
            className="text-sm font-medium text-white/80 hover:text-blue-400 transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-blue-400 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <span className="flex items-center">
              Meetings <FileText className="ml-1 h-3 w-3" />
            </span>
          </motion.button>
          <motion.button 
            onClick={() => scrollToSection('contact')} 
            className="text-sm font-medium text-white/80 hover:text-blue-400 transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-blue-400 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            Contact
          </motion.button>
        </div>

        <div className="flex items-center space-x-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white/80 hover:text-white hover:bg-white/10"
              onClick={handleAuthAction}
            >
              {user ? "Logout" : "Login"}
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="sm" 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => {
                if (!user) {
                  navigate("/auth");
                  // Set signup mode through state or URL parameter if needed
                }
              }}
            >
              Get Started
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
