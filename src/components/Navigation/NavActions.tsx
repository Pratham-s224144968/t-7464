
import React from 'react';
import { ThemeToggle } from './index';
import { DesktopAuth } from './index';
import { MobileNav } from './index';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';

export const NavActions = () => {
  const { isAuthenticated, isDeakinUser } = useAuth();
  
  return (
    <div className="ml-auto flex items-center gap-2">
      {/* Deakin Badge for authenticated Deakin users */}
      {isAuthenticated && isDeakinUser && (
        <>
          <Badge className="hidden md:flex bg-blue-600 text-xs font-normal py-1">
            Deakin Member
          </Badge>
          
          {/* Admin Link for Deakin users */}
          <Button 
            variant="ghost" 
            size="sm"
            className="hidden md:flex h-8 text-blue-400 hover:text-blue-300"
            asChild
          >
            <Link to="/meetings/admin">
              <Users className="mr-1 h-4 w-4" /> Admin
            </Link>
          </Button>
        </>
      )}
      
      {/* Theme Toggle */}
      <ThemeToggle />
      
      {/* Desktop Auth Buttons */}
      <div className="hidden md:block">
        <DesktopAuth />
      </div>
      
      {/* Mobile Navigation */}
      <MobileNav />
    </div>
  );
};

export default NavActions;
