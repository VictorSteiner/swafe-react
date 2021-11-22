import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useStoreActions } from '../../hooks/useStore';
import { WorkoutProgramList } from './list';
import { WorkoutProgramFilter } from './filter';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    height: '100vh',
  },
}));

export const ProgramsIndex: React.FC = () => {
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
            Workout programs
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <WorkoutProgramFilter />
            </Grid>
            <Grid item xs={12}>
              <WorkoutProgramList />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
