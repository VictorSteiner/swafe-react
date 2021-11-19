import { Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useStoreActions } from '../../hooks/useStore';
import { WorkoutFilters } from './filters';
import { WorkoutList } from './list';

export const WorkoutsIndex: React.FC = () => {
  // const { fetchAll } = useStoreActions((actions) => actions.exercise);

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>{/* <WorkoutFilters /> */}</Grid>
      <Grid item>{/* <WorkoutList /> */}</Grid>
    </Grid>
  );
};
