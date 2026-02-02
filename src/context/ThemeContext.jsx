import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Get stored theme preference
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) return storedTheme;
    
    // Default to dark theme for portfolio
    return 'dark';
  });

  useEffect(() => {
    // Apply theme to document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.style.backgroundColor = '#0f0f0f';
      document.documentElement.style.color = '#e5e5e5';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.backgroundColor = '#ffffff';
      document.documentElement.style.color = '#1f2937';
    }
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};