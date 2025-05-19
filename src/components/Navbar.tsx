
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { BrandLogo, DesktopNavItems, NavActions } from './Navigation';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
        {/* Brand Logo */}
        <BrandLogo />
        
        {/* Desktop Navigation */}
        <DesktopNavItems />
        
        {/* Theme Toggle & Auth Buttons */}
        <NavActions />
      </div>
    </header>
  );
};

export default Navbar;
