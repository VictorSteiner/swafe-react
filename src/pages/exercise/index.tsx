import { Box, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import { useStoreActions } from '../../hooks/useStore';
import { ExerciseFilters } from './filters';
import { ExerciseList } from './list';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    height: '100vh',
  },
}));

export const ExercisesIndex: React.FC = () => {
  const classes = useStyles();
  const { fetchAll } = useStoreActions((actions) => actions.exercise);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return (
    <Box className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h2" color="primary">
            Exercises
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <ExerciseFilters />
            </Grid>
            <Grid item>
              <ExerciseList />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
