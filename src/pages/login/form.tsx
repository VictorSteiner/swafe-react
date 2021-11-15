import { Grid, TextField, Button, Typography } from '@material-ui/core';
import React, { useCallback, useState } from 'react';
import { Login } from '../../api/__generated__';
import { useToken } from '../../hooks/useToken';

export const LoginForm: React.FC = () => {
  const { setToken, userId, isExpired } = useToken();
  const [formValue, setFormValue] = useState<Login>({
    email: '',
    password: '',
  });

  const handleSubmit = useCallback(() => {}, []);

  const handleEmailChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setFormValue((prev) => ({ ...prev, email: event.target.value }));
    },
    [],
  );

  const handlePasswordChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setFormValue((prev) => ({ ...prev, password: event.target.value }));
    },
    [],
  );

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12}>
        <TextField
          fullWidth
          value={formValue.email}
          type="email"
          placeholder="Email"
          onChange={handleEmailChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          value={formValue.password}
          type="password"
          placeholder="Password"
          onChange={handlePasswordChange}
        />
      </Grid>
      <Grid item xs={4}>
        <Button onClick={handleSubmit}>
          <Typography>Login</Typography>
        </Button>
      </Grid>
    </Grid>
  );
};
