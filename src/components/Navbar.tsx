
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="relative w-full z-50 border-b border-white/10 bg-black/90 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between h-16">
        <Link to="/" className="flex items-center font-mono text-xl font-bold text-white">
          <img 
            src="/lovable-uploads/3f33997c-c5f6-4835-b087-7fd5e1060a12.png" 
            alt="InnovAIte Logo" 
            className="h-10 mr-2" 
          />
          InnovAIte
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <button 
            onClick={() => scrollToSection('home')} 
            className="text-sm font-medium text-white/80 hover:text-primary"
          >
            Home
          </button>
          <button 
            onClick={() => scrollToSection('about')} 
            className="text-sm font-medium text-white/80 hover:text-primary"
          >
            About Us
          </button>
          <button 
            onClick={() => scrollToSection('projects')} 
            className="text-sm font-medium text-white/80 hover:text-primary"
          >
            Projects
          </button>
          <button 
            onClick={() => scrollToSection('gitlab')} 
            className="text-sm font-medium text-white/80 hover:text-primary"
          >
            GitLab Repos
          </button>
          <button 
            onClick={() => scrollToSection('contact')} 
            className="text-sm font-medium text-white/80 hover:text-primary"
          >
            Contact
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10">
            Login
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
