/* eslint-disable react/jsx-no-bind */
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
import * as yup from 'yup';
import { Formik } from 'formik';
import { useToken } from '../../hooks/useToken';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}));

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { setToken } = useToken();
  const classes = useStyles();

  const handleNavigation = useCallback(() => {
    navigate('/administration');
  }, [navigate]);

  const handleSubmit = useCallback(
    (request: Login, _) => {
      login(request)
        .then((response) => {
          if (response.data.jwt) {
            localStorage.setItem('token', response.data.jwt);
            setToken(response.data.jwt);
          }
        })
        .then(handleNavigation);
    },
    [handleNavigation, setToken],
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
                onKeyPress={(event) => {
                  if (event.key === 'Enter') {
                    props.submitForm();
                  }
                }}
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
                onKeyPress={(event) => {
                  if (event.key === 'Enter') {
                    props.submitForm();
                  }
                }}
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
