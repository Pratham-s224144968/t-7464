
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, FileText, Users, BookOpenText, ExternalLink } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';

export const MobileNav = () => {
  const { isAuthenticated, user, logout, isDeakinUser } = useAuth();
  const location = useLocation();

  return (
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
              {!isAuthenticated && <span className="ml-2 text-xs text-blue-400">(Login required)</span>}
              {isAuthenticated && !isDeakinUser && <span className="ml-2 text-xs text-blue-400">(Deakin only)</span>}
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
                location.pathname.includes("/blog") && "text-white font-medium"
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
                    <div className="flex items-center">
                      <p className="font-medium text-white">{user.name}</p>
                      {isDeakinUser && (
                        <Badge className="ml-2 bg-blue-600 text-xs font-normal py-0.5">Deakin</Badge>
                      )}
                    </div>
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
  );
};

export default MobileNav;
