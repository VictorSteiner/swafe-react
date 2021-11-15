import {
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  makeStyles,
} from '@material-ui/core';
import React, { useCallback, useMemo } from 'react';
import { login } from '../../api/services/userService';
import { Login } from '../../api/__generated__';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { Formik } from 'formik';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}));

export const LoginForm: React.FC = () => {
  const history = useHistory();
  const classes = useStyles();

  const handleLogin = useCallback(() => {
    history.push('/administration');
  }, [history]);

  const handleSubmit = useCallback(
    (request: Login, _) => {
      login(request)
        .then((response) => {
          localStorage.setItem(
            'token',
            response.data.jwt ? response.data.jwt : '',
          );
        })
        .then(handleLogin);
    },
    [handleLogin],
  );

  const validationSchema = useMemo(
    () =>
      yup.object().shape<Record<keyof Login, yup.AnySchema>>({
        email: yup.string().required('Email is required'),
        password: yup.string().required('Password is required'),
      }),
    [],
  );

  return (
    <Paper elevation={1} className={classes.root}>
      <Formik<Login>
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnMount
      >
        {(props) => (
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                name="email"
                color="primary"
                value={props.values.email}
                type="email"
                placeholder="Email"
                onChange={props.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                name="password"
                color="primary"
                value={props.values.password}
                type="password"
                placeholder="Password"
                onChange={props.handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <Button
                onClick={props.submitForm}
                color="primary"
                variant="contained"
                disabled={!props.isValid}
                fullWidth
              >
                <Typography>Login</Typography>
              </Button>
            </Grid>
          </Grid>
        )}
      </Formik>
    </Paper>
  );
};
