import React, { useContext, useMemo } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { DecodedToken, useToken } from '../hooks/useToken';
import { AdmininistrationIndex } from './administration';
import { LoginIndex } from './login';
import jwt_decode from 'jwt-decode';

export const Content: React.FC = () => {
  const { token } = useToken();

  const isLoggedIn = useMemo(() => {
    const decoded: DecodedToken | null = token?.jwt
      ? jwt_decode(token.jwt)
      : null;

    return decoded?.exp
      ? Number.parseInt(decoded?.exp) * 1000 > Date.now()
      : false;
  }, [token?.jwt]);

  if (!isLoggedIn) {
    return (
      <Switch>
        <Route path="/login" component={LoginIndex} />
        <Redirect to="/login" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/login" component={LoginIndex} />
      <Route path="/administration" component={AdmininistrationIndex} />
    </Switch>
  );
};
