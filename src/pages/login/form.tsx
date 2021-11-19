/* eslint-disable react/jsx-no-bind */
import {
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  makeStyles,
  CircularProgress,
} from '@material-ui/core';
import React, { useMemo } from 'react';
import { Login } from '../../api/__generated__';
import * as yup from 'yup';
import { Formik } from 'formik';
import { useStoreActions, useStoreState } from '../../hooks/useStore';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  spinner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export const LoginForm: React.FC = () => {
  const { login } = useStoreActions((action) => action.user);
  const { isLoading } = useStoreState((state) => state.user);
  const classes = useStyles();

  const validationSchema = useMemo(
    () =>
      yup.object().shape<Record<keyof Login, yup.AnySchema>>({
        email: yup.string().required('Email is required'),
        password: yup.string().required('Password is required'),
      }),
    [],
  );

  return (
    <>
      {isLoading && (
        <div className={classes.spinner}>
          <CircularProgress size="large" />
        </div>
      )}
      {!isLoading && (
        <Paper elevation={1} className={classes.root}>
          <Formik<Login>
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={login}
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
                    disabled={!props.isValid || isLoading}
                    fullWidth
                  >
                    <Typography>Login</Typography>
                  </Button>
                </Grid>
              </Grid>
            )}
          </Formik>
        </Paper>
      )}
    </>
  );
};
