
import React, { createContext, useState, useContext, useEffect } from "react";

type ThemeContextType = {
  theme: "light" | "dark";
  toggleTheme: () => void;
};

// Create the context with a default value
const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {}
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<"light" | "dark">("light"); // Default to light theme
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    setMounted(true);
    
    // First try to get theme from localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else if (savedTheme === "light") {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      // Default to light theme
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Update document class and localStorage when theme changes
  useEffect(() => {
    if (!mounted) return;
    
    // Add a transition class to the body for smooth theme changes
    document.body.classList.add('transition-colors');
    document.body.classList.add('duration-300');
    
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    
    localStorage.setItem("theme", theme);
    console.log("Theme changed to:", theme);
    
    // Optional: Trigger a custom event that other components can listen for
    window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === "dark" ? "light" : "dark";
      return newTheme;
    });
  };

  // Create the context value
  const contextValue: ThemeContextType = {
    theme,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
