import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useToken } from '../hooks/useToken';
import { LoginIndex } from './login';

export const Content: React.FC = () => {
  const { isExpired } = useToken();

  return (
    <Switch>
      <Route path="/login" component={LoginIndex} />
      {isExpired && <Redirect to="/login" />}
      <Route path="/adminstration" />
    </Switch>
  );
};
