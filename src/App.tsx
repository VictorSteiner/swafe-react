import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { tokenContext, useToken } from './hooks/useToken';
import { Content } from './pages/content';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { userContext, useUser } from './hooks/useUser';
import { theme } from './theme';

const App: React.FC = () => {
  const tokenContextValue = useToken();
  const userContextValue = useUser();

  return (
    <ThemeProvider theme={theme}>
      <tokenContext.Provider value={tokenContextValue}>
        <userContext.Provider value={userContextValue}>
          <Router>
            <CssBaseline />
            <Content />
          </Router>
        </userContext.Provider>
      </tokenContext.Provider>
    </ThemeProvider>
  );
};

export default App;
