import React, { useState, useCallback, useEffect } from 'react';
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';
import { useLocaleStorage } from '../hooks/useLocalStorage';
import { ThemeContext } from './ThemeContext';
import type {ThemeMode} from './ThemeContext'

// export const useTheme = () => {
//   const context = useContext(ThemeContext);
//   if (context === undefined) {
//     throw new Error('useTheme must be used within a ThemeProvider');
//   }
//   return context;
// };

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [storedTheme, setStoredTheme] = useLocaleStorage<ThemeMode>('theme', 'dark');
  const [themeMode, setThemeMode] = useState<ThemeMode>(storedTheme);

// Функция для получения актуальной темы с учетом системных настроек
  const getActualTheme = useCallback((mode: ThemeMode): 'light' | 'dark' => {
    if (mode === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      return mediaQuery.matches ? 'dark' : 'light';
    }
    return mode;
  }, []);
  const theme = createTheme({
    palette: {
      mode: getActualTheme(themeMode),
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
    },
  });

  const toggleTheme = useCallback(() => {
    const newTheme = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(newTheme);
    setStoredTheme(newTheme);
  }, [themeMode, setStoredTheme]);

  const handleSetThemeMode = useCallback((mode: ThemeMode) => {
    setThemeMode(mode);
    setStoredTheme(mode);
  }, [setStoredTheme]);

  // Синхронизация с системной темой
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (storedTheme === 'system') {
        setThemeMode(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, [storedTheme]);

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme, setThemeMode: handleSetThemeMode }}>
      <MUIThemeProvider theme={theme}>
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};