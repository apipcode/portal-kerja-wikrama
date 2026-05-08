import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    // 1. Check local storage first
    const saved = localStorage.getItem('theme');
    if (saved) return saved;

    // 2. Scheduled Dark Mode: 18:00 to 06:00
    const hour = new Date().getHours();
    if (hour >= 18 || hour < 6) return 'dark';

    // 3. Fallback to OS preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Optional: Auto-check every hour to switch theme if user hasn't set one manually
  useEffect(() => {
    const interval = setInterval(() => {
      if (!localStorage.getItem('theme_manual_override')) {
        const hour = new Date().getHours();
        const scheduledTheme = (hour >= 18 || hour < 6) ? 'dark' : 'light';
        if (scheduledTheme !== theme) {
          setTheme(scheduledTheme);
        }
      }
    }, 60000 * 60); // Check every hour
    return () => clearInterval(interval);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      // Mark manual override so auto-schedule doesn't flip it unexpectedly
      localStorage.setItem('theme_manual_override', 'true');
      return newTheme;
    });
  };

  return { theme, toggleTheme };
};
