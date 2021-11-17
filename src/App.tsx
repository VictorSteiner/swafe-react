import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { TokenContextProvider } from './hooks/useToken';
import { Content } from './pages/content';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { theme } from './theme';
import { UserContextProvider } from './hooks/useUser';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <TokenContextProvider>
        <UserContextProvider>
          <Router>
            <CssBaseline />
            <Content />
          </Router>
        </UserContextProvider>
      </TokenContextProvider>
    </ThemeProvider>
  );
};

export default App;
