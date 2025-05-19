
import React from 'react';
import { ThemeToggle } from './index';
import { DesktopAuth } from './index';
import { MobileNav } from './index';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';

export const NavActions = () => {
  const { isAuthenticated, isDeakinUser } = useAuth();
  
  return (
    <div className="ml-auto flex items-center gap-2">
      {/* Deakin Badge for authenticated Deakin users */}
      {isAuthenticated && isDeakinUser && (
        <Badge className="hidden md:flex bg-blue-600 text-xs font-normal py-1">
          Deakin Member
        </Badge>
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
