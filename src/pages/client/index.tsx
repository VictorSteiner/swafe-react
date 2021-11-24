import { Box, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useStoreState } from '../../hooks/useStore';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    height: '100vh',
  },
}));

export const CustomerPage: React.FC = () => {
  const classes = useStyles();
  const { trainer, loggedInUser } = useStoreState((state) => state.user);

  return (
    <Box className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h2" color="primary">
            Account
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container direction="column" spacing={2}>
            <Grid item container spacing={2}>
              <Grid item>
                {loggedInUser?.firstName}, {loggedInUser?.lastName}
              </Grid>
              <Grid item>{loggedInUser?.email}</Grid>
            </Grid>
            <Grid item container spacing={2}>
              <Grid item>
                {trainer?.firstName}, {trainer?.lastName}
              </Grid>
              <Grid item>{trainer?.email}</Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
