import { Button } from '@material-ui/core';
import React, { useCallback } from 'react';

export const AdmininistrationIndex: React.FC = () => {
  const logout = useCallback(() => {
    localStorage.removeItem('token');
  }, []);

  return <Button onClick={logout}>Log me out!</Button>;
};
