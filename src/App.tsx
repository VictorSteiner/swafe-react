import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { Content } from './pages/content';
import { CssBaseline } from '@material-ui/core';
import { ThemeContextProvider } from './hooks/useTheme';
import { StoreProvider } from './hooks/useStore';
import { SnackbarProvider } from 'notistack';

const App: React.FC = () => {
  return (
    <SnackbarProvider>
      <ThemeContextProvider>
        <StoreProvider>
          <Router>
            <CssBaseline />
            <Content />
          </Router>
        </StoreProvider>
      </ThemeContextProvider>
    </SnackbarProvider>
  );
};

export default App;
