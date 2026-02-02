import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle = ({ className = "" }) => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        toggleTheme();
      }}
      className={`p-2 rounded-lg bg-gray-800/50 border border-gray-700 text-gray-300 hover:bg-gray-700/70 transition-colors ${className}`}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <Sun size={20} className="text-yellow-300" />
      ) : (
        <Moon size={20} className="text-cyan-400" />
      )}
    </button>
  );
};

export default ThemeToggle;