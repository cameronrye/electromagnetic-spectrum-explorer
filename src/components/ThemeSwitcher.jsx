import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import './ThemeSwitcher.css';

/**
 * Theme selection dropdown component.
 *
 * Provides a user interface for switching between light, dark, and system theme modes.
 * Includes visual indicators for the current theme and system preference detection.
 *
 * @component
 * @example
 * <ThemeSwitcher />
 *
 * @returns {JSX.Element} Theme switcher dropdown interface
 */
const ThemeSwitcher = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const themes = [
    {
      value: 'light',
      label: 'Light',
      icon: '☀️',
      description: 'Light theme'
    },
    {
      value: 'dark',
      label: 'Dark',
      icon: '🌙',
      description: 'Dark theme'
    },
    {
      value: 'system',
      label: 'System',
      icon: '💻',
      description: 'Follow system preference'
    }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentTheme = themes.find(t => t.value === theme);

  const handleThemeSelect = (newTheme) => {
    setTheme(newTheme);
    setIsOpen(false);
  };

  return (
    <div className="theme-switcher" ref={dropdownRef}>
      <button
        className="theme-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Theme selector"
        aria-expanded={isOpen}
      >
        <span className="theme-trigger-icon">{currentTheme?.icon}</span>
        <span className="theme-trigger-label">{currentTheme?.label}</span>
        {theme === 'system' && (
          <span className="system-indicator">
            ({resolvedTheme === 'dark' ? '🌙' : '☀️'})
          </span>
        )}
        <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>

      {isOpen && (
        <div className="theme-dropdown">
          {themes.map((themeOption) => (
            <button
              key={themeOption.value}
              className={`theme-option ${theme === themeOption.value ? 'active' : ''}`}
              onClick={() => handleThemeSelect(themeOption.value)}
              title={themeOption.description}
              aria-label={`Switch to ${themeOption.label.toLowerCase()} theme`}
            >
              <span className="theme-option-icon">{themeOption.icon}</span>
              <span className="theme-option-label">{themeOption.label}</span>
              {themeOption.value === 'system' && theme === 'system' && (
                <span className="system-indicator-dropdown">
                  ({resolvedTheme === 'dark' ? '🌙' : '☀️'})
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Memoize component to prevent unnecessary re-renders
export default React.memo(ThemeSwitcher);
