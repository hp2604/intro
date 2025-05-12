
'use client';

import type { ReactNode } from 'react';
import { useState, useEffect } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<string>('light'); // Default theme

  useEffect(() => {
    // This effect runs once on mount to set the initial theme based on localStorage or system preference
    // It complements the FOUC prevention script in RootLayout.
    let initialTheme = 'light';
    try {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme) {
        initialTheme = storedTheme;
      } else {
        // Fallback to system preference if no theme is stored
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
          initialTheme = 'dark';
        }
      }
    } catch (e) {
      // localStorage might be disabled or unavailable
      console.warn('Could not access localStorage for theme:', e);
    }
    setTheme(initialTheme); // Set our React state
  }, []);


  useEffect(() => {
    // This effect runs whenever the theme state changes
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {
      console.warn('Could not save theme to localStorage:', e);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
