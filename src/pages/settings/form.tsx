/* eslint-disable react/jsx-no-bind */
import {
  Grid,
  TextField,
  Button,
  Typography,
  makeStyles,
  CircularProgress,
} from '@material-ui/core';
import React, { useMemo } from 'react';
import { NewPassword } from '../../api/__generated__';
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

export const ChangePasswordForm: React.FC = () => {
  const { changePassword } = useStoreActions((action) => action.user);
  const { isLoading } = useStoreState((state) => state.user);
  const classes = useStyles();

  const validationSchema = useMemo(
    () =>
      yup.object().shape<Record<keyof NewPassword, yup.AnySchema>>({
        email: yup.string().required('Email is required'),
        oldPassword: yup.string().required('Old password required'),
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
        <Formik<NewPassword>
          initialValues={{ email: '', password: '', oldPassword: '' }}
          validationSchema={validationSchema}
          onSubmit={changePassword}
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
                  label="Email"
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
                  name="oldPassword"
                  color="primary"
                  value={props.values.oldPassword}
                  type="password"
                  label="Old password"
                  placeholder="Old password"
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
                  label="New password"
                  value={props.values.password}
                  type="password"
                  placeholder="New password"
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
                  <Typography>Change</Typography>
                </Button>
              </Grid>
            </Grid>
          )}
        </Formik>
      )}
    </>
  );
};
