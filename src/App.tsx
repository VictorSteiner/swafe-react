import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { tokenContext, useToken } from './hooks/useToken';
import { Content } from './pages/Content';
import { CssBaseline } from '@material-ui/core';
import { userContext, useUser } from './hooks/useUser';

const App: React.FC = () => {
  const tokenContextValue = useToken();
  const userContextValue = useUser();

  return (
    <tokenContext.Provider value={tokenContextValue}>
      <userContext.Provider value={userContextValue}>
        <Router>
          <CssBaseline />
          <Content />
        </Router>
      </userContext.Provider>
    </tokenContext.Provider>
  );
};

export default App;
