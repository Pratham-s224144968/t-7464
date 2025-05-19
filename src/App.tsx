
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
import { ScrollToTop } from './components/utils';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Meetings from './pages/Meetings';
import Home from './pages/Home';
import { useTheme } from './contexts/ThemeContext';

function App() {
  const { theme } = useTheme();
  const location = useLocation();

  return (
    <div className={theme}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <ScrollToTop />
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/meetings" element={<Meetings />} />
        </Routes>
      
      </ThemeProvider>
    </div>
  );
}

export default App;
