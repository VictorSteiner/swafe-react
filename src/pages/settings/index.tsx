import { Typography, Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { ChangePasswordForm } from './form';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    height: '100vh',
  },
}));

export const SettingsIndex: React.FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h2" color="primary">
            Settings
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box m={6} />

          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h5" color="primary">
                Change Password
              </Typography>
              <Box m={3} />
              <ChangePasswordForm />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
