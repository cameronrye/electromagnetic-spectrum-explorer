import React, { createContext, useContext, useEffect, useState } from 'react';

/**
 * Theme context for managing application-wide theme state.
 * Supports light, dark, and system preference modes with persistent storage.
 */
const ThemeContext = createContext();

/**
 * Hook to access theme context.
 *
 * @returns {Object} Theme context value
 * @returns {string} theme - Current theme setting ('light', 'dark', 'system')
 * @returns {string} resolvedTheme - Actual theme being used ('light' or 'dark')
 * @returns {function} setTheme - Function to change theme
 * @returns {function} toggleTheme - Function to cycle through themes
 *
 * @throws {Error} When used outside of ThemeProvider
 *
 * @example
 * const { theme, setTheme, resolvedTheme } = useTheme();
 */
// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

/**
 * Theme provider component that manages theme state and system preference detection.
 *
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 *
 * @example
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 */
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Check localStorage first, then system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
      return savedTheme;
    }
    return 'system';
  });

  const [resolvedTheme, setResolvedTheme] = useState('light');

  // Function to get system theme preference
  const getSystemTheme = () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  // Update resolved theme when theme changes or system preference changes
  useEffect(() => {
    const updateResolvedTheme = () => {
      const newResolvedTheme = theme === 'system' ? getSystemTheme() : theme;
      setResolvedTheme(newResolvedTheme);
      
      // Update document class and color-scheme
      document.documentElement.className = newResolvedTheme;
      document.documentElement.style.colorScheme = newResolvedTheme;
    };

    updateResolvedTheme();

    // Listen for system theme changes when using system theme
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => updateResolvedTheme();
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  // Save theme preference to localStorage
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const setThemeMode = (newTheme) => {
    if (['light', 'dark', 'system'].includes(newTheme)) {
      setTheme(newTheme);
    }
  };

  const toggleTheme = () => {
    const themes = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const value = {
    theme,
    resolvedTheme,
    setTheme: setThemeMode,
    toggleTheme,
    isLight: resolvedTheme === 'light',
    isDark: resolvedTheme === 'dark',
    isSystem: theme === 'system'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
