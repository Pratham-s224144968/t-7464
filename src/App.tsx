
import React from 'react';
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
import Home from './pages/Home';
import Auth from './pages/Auth';

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
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ScrollToTop />
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        
        {/* Meetings routes */}
        <Route 
          path="/meetings" 
          element={
            <ProtectedRoute>
              <Meetings />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/meetings/:id" 
          element={
            <ProtectedRoute>
              <MeetingDetail />
            </ProtectedRoute>
          } 
        />
        
        <Route path="/auth" element={<Auth />} />
      </Routes>
      
      {/* Toast notifications */}
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
