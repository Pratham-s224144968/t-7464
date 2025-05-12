
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { SunMoon } from "lucide-react";
import { motion } from "@/components/ui/motion";
import { useTheme } from "@/contexts/ThemeContext";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({
      behavior: "smooth"
    });
  };
  
  return <motion.nav className="fixed w-full z-50 border-b border-primary/20 backdrop-blur-sm" 
    initial={{
      y: -100,
      opacity: 0
    }} 
    animate={{
      y: 0,
      opacity: 1
    }} 
    transition={{
      duration: 0.5
    }}
  >
      <div className="container mx-auto flex items-center justify-between h-16">
        <Link to="/" className="flex items-center font-mono text-xl font-bold">
          <img alt="InnovAIte Logo" className="h-10 mr-2" src="/lovable-uploads/51cf0d4a-c9a3-4770-aa88-a1c8095ba729.png" />
          InnovAIte
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <motion.button 
            onClick={() => scrollToSection('home')} 
            className="text-sm font-medium hover:text-primary transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left" 
            whileHover={{
              y: -2
            }} 
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 10
            }}
          >
            Home
          </motion.button>
          
          <motion.button 
            onClick={() => scrollToSection('portfolio')} 
            className="text-sm font-medium hover:text-primary transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left" 
            whileHover={{
              y: -2
            }} 
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 10
            }}
          >
            Portfolio
          </motion.button>
          
          <motion.button 
            onClick={() => scrollToSection('about')} 
            className="text-sm font-medium hover:text-primary transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left" 
            whileHover={{
              y: -2
            }} 
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 10
            }}
          >
            About Us
          </motion.button>
          
          <motion.button 
            onClick={() => scrollToSection('resources')} 
            className="text-sm font-medium hover:text-primary transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left" 
            whileHover={{
              y: -2
            }} 
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 10
            }}
          >
            Resources
          </motion.button>
          
          <motion.button 
            onClick={() => scrollToSection('team')} 
            className="text-sm font-medium hover:text-primary transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left" 
            whileHover={{
              y: -2
            }} 
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 10
            }}
          >
            Team
          </motion.button>
          
          <motion.button 
            onClick={() => scrollToSection('contact')} 
            className="text-sm font-medium hover:text-primary transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left" 
            whileHover={{
              y: -2
            }} 
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 10
            }}
          >
            Contact
          </motion.button>
        </div>

        <div className="flex items-center">
          <motion.div 
            whileHover={{
              scale: 1.05
            }} 
            whileTap={{
              scale: 0.95
            }}
          >
            <Button 
              variant="outline" 
              size="icon" 
              onClick={toggleTheme} 
              className="rounded-full border border-primary/20 hover:bg-primary/10"
            >
              <SunMoon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <SunMoon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.nav>;
};

export default Navbar;
