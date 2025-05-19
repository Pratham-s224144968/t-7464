
import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

export const DesktopAuth = () => {
  const { isAuthenticated, user, logout } = useAuth();

  if (!isAuthenticated || !user) {
    return (
      <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
        <Link to="/auth">Sign In</Link>
      </Button>
    );
  }

  return (
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
  );
};

export default DesktopAuth;
