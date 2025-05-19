import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
import { ScrollToTop } from './components/utils';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Meetings from './pages/Meetings';
import Home from './pages/Home';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const location = useLocation();

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme === 'dark' ? 'dark' : 'light');
    } else {
      // Set default theme based on system preference
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

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
