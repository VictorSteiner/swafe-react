import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { TokenContextProvider } from './hooks/useToken';
import { Content } from './pages/content';
import { CssBaseline } from '@material-ui/core';
import { UserContextProvider } from './hooks/useUser';
import { ThemeContextProvider } from './hooks/useTheme';

const App: React.FC = () => {
  return (
    <ThemeContextProvider>
      <TokenContextProvider>
        <UserContextProvider>
          <Router>
            <CssBaseline />
            <Content />
          </Router>
        </UserContextProvider>
      </TokenContextProvider>
    </ThemeContextProvider>
  );
};

export default App;
