
import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
import { ScrollToTop } from './components/utils';
import { Toaster } from './components/ui/toaster';
import { useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Meetings from './pages/Meetings';
import MeetingDetail from './pages/MeetingDetail';
import MeetingAdmin from './pages/MeetingAdmin';
import Home from './pages/Home';
import Auth from './pages/Auth';
import { useTheme } from './contexts/ThemeContext';
import { toast } from '@/hooks/use-toast';

// Protected Route wrapper component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  
  // Show loading state or redirect if not authenticated
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    // Redirect to login page, but save the location they were trying to access
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }
  
  return <>{children}</>;
};

// Deakin-only route wrapper
const DeakinRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading, isDeakinUser } = useAuth();
  const location = useLocation();
  
  // Show loading state or redirect if not authenticated
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }
  
  if (!isDeakinUser) {
    toast({
      title: "Access Restricted",
      description: "This page is only available to Deakin University members.",
      variant: "destructive"
    });
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  const { theme } = useTheme();
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  
  return (
    <div className={theme}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <ScrollToTop />
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/meetings" element={<Meetings />} />
          <Route 
            path="/meetings/:id" 
            element={
              <ProtectedRoute>
                <MeetingDetail />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/meetings/admin" 
            element={
              <DeakinRoute>
                <MeetingAdmin />
              </DeakinRoute>
            } 
          />
          <Route path="/auth" element={<Auth />} />
        </Routes>
        
        {/* Toast notifications */}
        <Toaster />
      </ThemeProvider>
    </div>
  );
}

export default App;
