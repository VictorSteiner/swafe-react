import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useStoreState } from '../../hooks/useStore';
import { ManagerTrainerIndex } from './trainers';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    height: '100vh',
  },
}));

export const ManagerPage: React.FC = () => {
  const classes = useStyles();
  const { loggedInUser } = useStoreState((state) => state.user);

  return (
    <Box className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h2" color="primary">
            {loggedInUser?.accountType}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <ManagerTrainerIndex />
        </Grid>
      </Grid>
    </Box>
  );
};
