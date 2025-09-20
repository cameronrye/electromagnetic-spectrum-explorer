# Theme System Documentation

## Overview
The Electromagnetic Spectrum Explorer features a comprehensive, polished theme system with support for light, dark, and system preference modes. The system has been enhanced with improved color palettes, better typography, and a redesigned theme switcher for optimal user experience.

## Features

### 🎨 Theme Modes
- **Light Mode**: Clean, bright interface optimized for daylight viewing
- **Dark Mode**: Easy-on-the-eyes dark interface for low-light environments  
- **System Mode**: Automatically follows your operating system's theme preference

### 🔧 Technical Implementation

#### Theme Context (`src/contexts/ThemeContext.jsx`)
- React Context API for global theme state management
- Automatic system preference detection using `prefers-color-scheme`
- Theme persistence in localStorage
- Real-time theme switching with smooth transitions

#### Theme Switcher Component (`src/components/ThemeSwitcher.jsx`)
- **Dropdown Design**: Compact dropdown that doesn't interfere with header content
- **Smooth Animations**: Slide-in animations and hover effects
- **System Indicator**: Shows resolved theme when in system mode
- **Mobile Optimized**: Icon-only mode on small screens
- **Accessibility**: Full keyboard navigation and ARIA support
- **Click Outside**: Automatically closes when clicking outside

#### CSS Custom Properties
All theme-related styling uses CSS custom properties for consistent theming:

```css
/* Enhanced Light theme variables */
:root {
  --theme-background: #ffffff;
  --theme-surface: #ffffff;
  --theme-text-primary: #1e293b;      /* Improved contrast */
  --theme-text-secondary: #475569;    /* Better readability */
  --theme-border: #e2e8f0;           /* Softer borders */
  --theme-primary: #3b82f6;          /* Modern blue */
  --theme-success: #10b981;          /* Status colors */
  --theme-warning: #f59e0b;
  --theme-error: #ef4444;
  /* ... more variables */
}

/* Enhanced Dark theme variables */
:root.dark {
  --theme-background: #0f172a;        /* Deep slate */
  --theme-surface: #1e293b;          /* Elevated surfaces */
  --theme-text-primary: #f8fafc;     /* High contrast text */
  --theme-text-secondary: #cbd5e1;   /* Readable secondary */
  --theme-border: #334155;           /* Subtle borders */
  --theme-primary: #60a5fa;          /* Bright accent */
  --theme-success: #34d399;          /* Status colors */
  --theme-warning: #fbbf24;
  --theme-error: #f87171;
  /* ... more variables */
}
```

### 🎯 Usage

#### Using the Theme Hook
```jsx
import { useTheme } from '../contexts/ThemeContext';

function MyComponent() {
  const { theme, resolvedTheme, setTheme, isDark, isLight } = useTheme();
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <p>Resolved theme: {resolvedTheme}</p>
      <button onClick={() => setTheme('dark')}>Switch to Dark</button>
    </div>
  );
}
```

#### Theme-Aware Styling
```css
.my-component {
  background: var(--theme-surface);
  color: var(--theme-text-primary);
  border: 1px solid var(--theme-border);
  transition: all 0.3s ease;
}
```

### 📱 Responsive Design
- Desktop: Full theme switcher with labels and system indicator
- Tablet: Compact version with reduced spacing
- Mobile: Icon-only mode to save space

### ♿ Accessibility
- Proper ARIA labels for screen readers
- Keyboard navigation support
- High contrast ratios in both themes
- Focus indicators using theme colors

### 🔄 Theme Persistence
- User's theme preference is automatically saved to localStorage
- Theme is restored on page reload
- System theme changes are detected and applied in real-time

## File Structure
```
src/
├── contexts/
│   └── ThemeContext.jsx          # Theme context and provider
├── components/
│   ├── ThemeSwitcher.jsx         # Theme switcher component
│   └── ThemeSwitcher.css         # Theme switcher styles
├── App.jsx                       # Updated with ThemeProvider
├── App.css                       # Theme-aware app styles
└── index.css                     # Global theme variables
```

## Browser Support
- Modern browsers with CSS custom properties support
- Graceful fallback for older browsers
- `prefers-color-scheme` media query support
