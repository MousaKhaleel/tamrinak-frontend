import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

const ThemeContext = createContext();

export const ThemeProvider = ({ children, defaultTheme = 'light' }) => {
  // Initialize theme from localStorage or use default
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('appTheme') || defaultTheme;
    }
    return defaultTheme;
  });

  // Apply theme class to document body
  useEffect(() => {
    document.body.className = theme;
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('appTheme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    theme,
    toggleTheme,
    isDark: theme === 'dark',
    isLight: theme === 'light',
  }), [theme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <div className={`theme-wrapper ${theme}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
  defaultTheme: PropTypes.oneOf(['light', 'dark']),
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Optional: Higher Order Component for class components
export const withTheme = (Component) => (props) => {
  const theme = useTheme();
  return <Component {...props} theme={theme} />;
};