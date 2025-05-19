
import React from 'react';
import { ThemeToggle } from './ThemeToggle';
import { DesktopAuth } from './DesktopAuth';
import { MobileNav } from './MobileNav';

export const NavActions = () => {
  return (
    <div className="ml-auto flex items-center gap-2">
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
