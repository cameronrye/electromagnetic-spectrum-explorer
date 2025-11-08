import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { ThemeProvider, useTheme } from '../ThemeContext.jsx';

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => { store[key] = value.toString(); },
    removeItem: (key) => { delete store[key]; },
    clear: () => { store = {}; }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// Mock matchMedia
const createMatchMediaMock = (matches) => {
  return vi.fn().mockImplementation((query) => ({
    matches,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn()
  }));
};

describe('ThemeContext', () => {
  beforeEach(() => {
    localStorageMock.clear();
    window.matchMedia = createMatchMediaMock(false); // Default to light mode
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('useTheme hook', () => {
    it('throws error when used outside ThemeProvider', () => {
      expect(() => {
        renderHook(() => useTheme());
      }).toThrow('useTheme must be used within a ThemeProvider');
    });

    it('returns theme context when used inside ThemeProvider', () => {
      const { result } = renderHook(() => useTheme(), {
        wrapper: ThemeProvider
      });

      expect(result.current).toHaveProperty('theme');
      expect(result.current).toHaveProperty('resolvedTheme');
      expect(result.current).toHaveProperty('setTheme');
      expect(result.current).toHaveProperty('toggleTheme');
    });
  });

  describe('ThemeProvider', () => {
    it('initializes with system theme by default', () => {
      const { result } = renderHook(() => useTheme(), {
        wrapper: ThemeProvider
      });

      expect(result.current.theme).toBe('system');
    });

    it('initializes with saved theme from localStorage', () => {
      localStorageMock.setItem('theme', 'dark');

      const { result } = renderHook(() => useTheme(), {
        wrapper: ThemeProvider
      });

      expect(result.current.theme).toBe('dark');
    });

    it('resolves system theme to light when system prefers light', () => {
      window.matchMedia = createMatchMediaMock(false);

      const { result } = renderHook(() => useTheme(), {
        wrapper: ThemeProvider
      });

      expect(result.current.resolvedTheme).toBe('light');
    });

    it('resolves system theme to dark when system prefers dark', () => {
      window.matchMedia = createMatchMediaMock(true);

      const { result } = renderHook(() => useTheme(), {
        wrapper: ThemeProvider
      });

      expect(result.current.resolvedTheme).toBe('dark');
    });

    it('persists theme to localStorage when changed', () => {
      const { result } = renderHook(() => useTheme(), {
        wrapper: ThemeProvider
      });

      act(() => {
        result.current.setTheme('dark');
      });

      expect(localStorageMock.getItem('theme')).toBe('dark');
    });

    it('updates theme when setTheme is called', () => {
      const { result } = renderHook(() => useTheme(), {
        wrapper: ThemeProvider
      });

      act(() => {
        result.current.setTheme('dark');
      });

      expect(result.current.theme).toBe('dark');
      expect(result.current.resolvedTheme).toBe('dark');
    });

    it('toggles through themes in order: light -> dark -> system', () => {
      const { result } = renderHook(() => useTheme(), {
        wrapper: ThemeProvider
      });

      // Start with light
      act(() => {
        result.current.setTheme('light');
      });
      expect(result.current.theme).toBe('light');

      // Toggle to dark
      act(() => {
        result.current.toggleTheme();
      });
      expect(result.current.theme).toBe('dark');

      // Toggle to system
      act(() => {
        result.current.toggleTheme();
      });
      expect(result.current.theme).toBe('system');

      // Toggle back to light
      act(() => {
        result.current.toggleTheme();
      });
      expect(result.current.theme).toBe('light');
    });
  });
});

