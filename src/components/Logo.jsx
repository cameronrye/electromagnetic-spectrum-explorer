import React from 'react';
import './Logo.css';

/**
 * Logo component for the Electromagnetic Spectrum Explorer.
 * 
 * Displays the application logo with subtle animations including:
 * - Fade-in on page load
 * - Gentle hover effect with scale and glow
 * - Optional subtle pulse animation
 * 
 * @component
 * @example
 * <Logo />
 * 
 * @returns {JSX.Element} Animated logo component
 */
const Logo = () => {
  // Use import.meta.env.BASE_URL to ensure correct path in both dev and production
  const logoPath = `${import.meta.env.BASE_URL}logo.svg`;
  
  return (
    <div className="logo-container">
      <img 
        src={logoPath}
        alt="Electromagnetic Spectrum Explorer Logo - Electromagnetic waves with spectrum gradient"
        className="app-logo"
        aria-label="Application logo showing electromagnetic waves"
      />
    </div>
  );
};

export default React.memo(Logo);
