import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useStoreActions } from '../../hooks/useStore';
import { ManagerFilter } from './filter';
import { ManagerList } from './list';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    height: '100vh',
  },
}));

export const ManagerPage: React.FC = () => {
  const classes = useStyles();
  const { fetchAll: fetchUsers } = useStoreActions((state) => state.user);
  const { fetchAll: fetchWorkoutPrograms } = useStoreActions(
    (state) => state.workout,
  );

  useEffect(() => {
    fetchUsers();
    fetchWorkoutPrograms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h2" color="primary">
            Trainers
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ManagerFilter />
            </Grid>
            <Grid item xs={12}>
              <ManagerList />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
