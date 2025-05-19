
import { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Moon, Sun, Menu, X, FileText, Users, BookOpenText, ExternalLink } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { motion } from './ui/motion';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

const components: { title: string; href: string; description: string }[] = [
  {
    title: 'Meeting Notes',
    href: '/meetings',
    description:
      'Access all team meeting notes and sprint retrospectives.',
  },
  {
    title: 'Team Members',
    href: '/team',
    description:
      'View all InnovAIte team members and their profiles.',
  },
  {
    title: 'Blog & Vlogs',
    href: '/blog',
    description:
      'Read our latest blogs and watch video content.',
  },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-40 transition-all duration-200',
        isScrolled 
          ? 'bg-black/80 backdrop-blur border-b border-blue-900/30 py-2' 
          : 'bg-transparent py-4'
      )}
    >
      <div className="container flex h-16 items-center px-4 md:px-6">
        <Link to="/" className="flex items-center mr-8">
          <motion.img 
            src="/lovable-uploads/2ac77590-a08e-4983-bafa-7be5dc24647b.png" 
            alt="InnovAIte" 
            className="h-8 w-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span 
            className="ml-2 text-lg font-bold font-mono text-white"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            InnovAIte
          </motion.span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex md:flex-1 md:justify-center">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/">
                  <NavigationMenuLink className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-transparent text-white hover:bg-blue-900/50 dark:hover:bg-blue-950/70"
                  )}>
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white hover:bg-blue-900/50 dark:hover:bg-blue-950/70">
                  Resources
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-black/90 backdrop-blur dark:bg-black/95">
                    {components.map((component) => (
                      <li key={component.title} className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            to={component.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-900/40 hover:text-white focus:bg-blue-900/40 focus:text-white"
                          >
                            <div className="text-sm font-medium leading-none text-white">{component.title}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-white/70">
                              {component.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/blog">
                  <NavigationMenuLink className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-transparent text-white hover:bg-blue-900/50 dark:hover:bg-blue-950/70"
                  )}>
                    <BookOpenText className="mr-1 h-4 w-4" />
                    Blog
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a 
                        href="https://innovate-spark-hackathon-hub.lovable.app" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                        )}
                      >
                        <ExternalLink className="mr-1 h-4 w-4" />
                        Hackathon
                      </a>
                    </TooltipTrigger>
                    <TooltipContent className="bg-black/90 text-white border-blue-800/30">
                      Visit InnovAIte Hackathon Hub
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a 
                        href="https://creative-caramel-881abb.netlify.app/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800"
                        )}
                      >
                        <ExternalLink className="mr-1 h-4 w-4" />
                        No Code Jam
                      </a>
                    </TooltipTrigger>
                    <TooltipContent className="bg-black/90 text-white border-blue-800/30">
                      Visit No Code Jam Platform
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        
        {/* Theme Toggle & Auth Buttons */}
        <div className="ml-auto flex items-center gap-2">
          {/* Theme Toggle */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  className="rounded-full hover:bg-blue-950/50 text-white"
                >
                  {theme === 'dark' ? (
                    <Sun className="h-5 w-5 text-white" />
                  ) : (
                    <Moon className="h-5 w-5 text-white" />
                  )}
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-black/90 text-white border-blue-800/30">
                Switch to {theme === 'dark' ? 'light' : 'dark'} mode
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          {/* Auth Buttons */}
          <div className="hidden md:block">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8 border border-primary">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name?.[0]}</AvatarFallback>
                </Avatar>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="text-white hover:bg-blue-950/50"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                <Link to="/auth">Sign In</Link>
              </Button>
            )}
          </div>
          
          {/* Mobile Navigation Trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden rounded-full hover:bg-blue-950/50 text-white"
              >
                <Menu className="h-5 w-5 text-white" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-64 bg-black/90 backdrop-blur border-blue-900/30">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-8">
                  <Link to="/" className="flex items-center">
                    <img src="/lovable-uploads/2ac77590-a08e-4983-bafa-7be5dc24647b.png" alt="InnovAIte" className="h-8 w-auto" />
                    <span className="ml-2 text-lg font-bold text-white">InnovAIte</span>
                  </Link>
                </div>
                
                <nav className="flex flex-col gap-4">
                  <Link 
                    to="/" 
                    className={cn(
                      "flex items-center text-lg text-white/80 hover:text-white py-2 border-b border-blue-900/30",
                      location.pathname === "/" && "text-white font-medium"
                    )}
                  >
                    Home
                  </Link>
                  <Link 
                    to="/meetings" 
                    className={cn(
                      "flex items-center text-lg text-white/80 hover:text-white py-2 border-b border-blue-900/30",
                      location.pathname === "/meetings" && "text-white font-medium"
                    )}
                  >
                    <FileText className="mr-2 h-5 w-5" />
                    Meeting Notes
                  </Link>
                  <Link 
                    to="/team" 
                    className={cn(
                      "flex items-center text-lg text-white/80 hover:text-white py-2 border-b border-blue-900/30",
                      location.pathname === "/team" && "text-white font-medium"
                    )}
                  >
                    <Users className="mr-2 h-5 w-5" />
                    Team Members
                  </Link>
                  <Link 
                    to="/blog" 
                    className={cn(
                      "flex items-center text-lg text-white/80 hover:text-white py-2 border-b border-blue-900/30",
                      location.pathname === "/blog" && "text-white font-medium"
                    )}
                  >
                    <BookOpenText className="mr-2 h-5 w-5" />
                    Blog & Vlogs
                  </Link>
                  <a 
                    href="https://innovate-spark-hackathon-hub.lovable.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-lg text-blue-400 hover:text-blue-300 py-2 border-b border-blue-900/30"
                  >
                    <ExternalLink className="mr-2 h-5 w-5" />
                    Hackathon Hub
                  </a>
                  <a 
                    href="https://creative-caramel-881abb.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-lg text-purple-400 hover:text-purple-300 py-2 border-b border-blue-900/30"
                  >
                    <ExternalLink className="mr-2 h-5 w-5" />
                    No Code Jam
                  </a>
                </nav>
                
                <div className="mt-auto pt-6">
                  {isAuthenticated && user ? (
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border border-primary">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name?.[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-white">{user.name}</p>
                          <p className="text-sm text-white/60">{user.email}</p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        onClick={logout}
                        className="w-full border-blue-500/30 text-white hover:bg-blue-950/50"
                      >
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                      <Link to="/auth">Sign In</Link>
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
