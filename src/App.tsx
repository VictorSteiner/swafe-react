import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { Content } from './pages/content';
import { CssBaseline } from '@material-ui/core';
import { ThemeContextProvider } from './hooks/useTheme';
import { StoreProvider } from './hooks/useStore';

const App: React.FC = () => {
  return (
    <ThemeContextProvider>
      <StoreProvider>
        <Router>
          <CssBaseline />
          <Content />
        </Router>
      </StoreProvider>
    </ThemeContextProvider>
  );
};

export default App;
