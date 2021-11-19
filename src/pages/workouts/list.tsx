import { Card, CircularProgress, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useStoreState } from '../../hooks/useStore';

export const WorkoutList: React.FC = () => {
  const { exercises, isLoading } = useStoreState((state) => state.exercise);

  return (
    <Grid container spacing={2}>
      {exercises.map((exercise) => (
        <Card key={exercise.exerciseId}>
          <Grid item xs={12}>
            <Typography>{exercise.name}</Typography>
          </Grid>
        </Card>
      ))}
      {isLoading && (
        <Grid item>
          <CircularProgress />
        </Grid>
      )}
    </Grid>
  );
};
