import React from 'react';
import './Footer.css';

/**
 * Footer component with copyright and attribution
 */
function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <p className="footer-made-with">
          Made with <span className="heart" aria-label="love">❤️</span>
        </p>
        <p className="footer-copyright">
          Copyright © 2025 <a
            href="https://rye.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            Cameron Rye
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;

