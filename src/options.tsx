import React from 'react';
import ReactDOM from 'react-dom/client';
import OptionsApp from './OptionsApp';
import { ThemeProvider } from './contexts/ThemeProvider';
import { CssBaseline } from '@mui/material';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <CssBaseline />
      <OptionsApp />
    </ThemeProvider>
  </React.StrictMode>
);
