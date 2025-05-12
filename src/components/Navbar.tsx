
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sun, Moon, Sparkles } from "lucide-react";
import { motion } from "@/components/ui/motion";
import { useTheme } from "@/contexts/ThemeContext";
import { useState, useEffect } from "react";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  
  // Track scroll position for navbar effects
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({
      behavior: "smooth"
    });
  };
  
  return (
    <motion.nav 
      className={`fixed w-full z-50 backdrop-blur-md transition-all duration-300 ${
        scrolled ? "bg-background/80 shadow-md dark:bg-black/50" : "bg-transparent"
      }`}
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
          <motion.div
            className="relative"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <motion.img 
              alt="InnovAIte Logo" 
              className="h-10 mr-2" 
              src="/lovable-uploads/51cf0d4a-c9a3-4770-aa88-a1c8095ba729.png"
              initial={{ rotate: 0 }}
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ 
                repeat: Infinity, 
                repeatType: "loop", 
                duration: 5,
                ease: "easeInOut" 
              }}
            />
            <motion.div 
              className="absolute -inset-1 rounded-full opacity-70 blur-md"
              animate={{ 
                backgroundColor: ['rgba(139, 92, 246, 0.3)', 'rgba(249, 115, 22, 0.3)', 'rgba(139, 92, 246, 0.3)'] 
              }}
              transition={{ duration: 5, repeat: Infinity }}
            />
          </motion.div>
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="gradient-text font-bold"
          >
            InnovAIte
          </motion.span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          {["home", "portfolio", "about", "resources", "team", "contact"].map((section, index) => (
            <motion.button 
              key={section}
              onClick={() => scrollToSection(section)} 
              className="text-sm font-medium hover:text-primary transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left" 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.1 * (index + 1),
                type: "spring",
                stiffness: 400,
                damping: 10
              }}
              whileHover={{
                y: -2,
                textShadow: "0 0 8px rgba(139, 92, 246, 0.5)"
              }}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </motion.button>
          ))}
        </div>

        <div className="flex items-center">
          <motion.div 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              rotate: [0, 2, -2, 0],
              transition: {
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            <Button 
              variant="outline" 
              size="icon" 
              onClick={toggleTheme} 
              className="rounded-full border border-primary/20 hover:bg-primary/10 relative overflow-hidden glow-primary"
              aria-label="Toggle theme"
            >
              <motion.div 
                className="absolute inset-0 opacity-20"
                animate={{
                  background: theme === 'dark' 
                    ? ['rgba(139, 92, 246, 0)', 'rgba(139, 92, 246, 0.2)', 'rgba(139, 92, 246, 0)'] 
                    : ['rgba(249, 115, 22, 0)', 'rgba(249, 115, 22, 0.2)', 'rgba(249, 115, 22, 0)']
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              
              {theme === "dark" ? (
                <motion.div
                  key="sun-icon"
                  initial={{ y: 30, opacity: 0, rotate: 0 }}
                  animate={{ y: 0, opacity: 1, rotate: 360 }}
                  exit={{ y: -30, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Sun className="h-[1.2rem] w-[1.2rem] text-yellow-400" />
                </motion.div>
              ) : (
                <motion.div
                  key="moon-icon"
                  initial={{ y: 30, opacity: 0, scale: 0.5 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Moon className="h-[1.2rem] w-[1.2rem] text-blue-400" />
                </motion.div>
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
