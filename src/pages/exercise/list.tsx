import { Card, CircularProgress, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useStoreState } from '../../hooks/useStore';

export const ExerciseList: React.FC = () => {
  const { exercises, isLoading } = useStoreState((state) => state.exercise);

  return (
    <Grid container spacing={2}>
      {exercises.length > 0 &&
        exercises.map((exercise) => (
          <Card key={exercise.exerciseId}>
            <Grid item xs={12}>
              <Typography>{exercise.name}</Typography>
            </Grid>
          </Card>
        ))}
      {isLoading && (
        <Grid container justifyContent="center">
          <Grid item>
            <CircularProgress />
          </Grid>
        </Grid>
      )}
      {exercises.length === 0 && !isLoading && (
        <Grid container justifyContent="center">
          <Grid item>
            <Typography variant="h5">No exercises exists</Typography>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};
