import React, { useState, useEffect, ReactNode } from 'react';
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from '@mui/material/styles';
import { getOptionsFromStorage } from '../functions/storage';
import { ThemeMode } from '../types/ThemeMode';
import { ThemeContext } from './ThemeContext';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>('light');

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const options = await getOptionsFromStorage();
        setThemeState(options.theme);
      } catch (error) {
        console.error('Failed to load theme:', error);
        setThemeState('light');
      }
    };
    loadTheme();
  }, []);

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
  };

  const muiTheme = createTheme({
    typography: {
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    },
    palette: {
      mode: theme,
      primary: {
        main: '#1976d2',
      },
      background: {
        default: theme === 'dark' ? '#1a1a1a' : '#f9f9f9',
        paper: theme === 'dark' ? '#2d2d2d' : '#ffffff',
      },
      text: {
        primary: theme === 'dark' ? '#ffffff' : '#000000',
        secondary: theme === 'dark' ? '#b0b0b0' : '#666666',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          contained: ({ theme }) => ({
            textTransform: 'none',
            fontWeight: 500,
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.getContrastText(theme.palette.primary.main),
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
          }),
        },
      },
    },
  });

  const value = {
    theme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
