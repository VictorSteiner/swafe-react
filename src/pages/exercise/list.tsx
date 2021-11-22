import { CircularProgress, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { NoUndefinedField } from '../../api/types';
import { Exercise } from '../../api/__generated__';
import { ExerciseCard } from '../../components/card/exerciseCard';
import { useStoreState } from '../../hooks/useStore';

export const ExerciseList: React.FC = () => {
  const { exercises, isLoading } = useStoreState((state) => state.exercise);

  return (
    <Grid container spacing={2}>
      {exercises.length > 0 && (
        <Grid container spacing={2}>
          {exercises.map((exercise) => (
            <Grid item key={exercise.exerciseId} xs={12} lg={6}>
              <ExerciseCard exercise={exercise as NoUndefinedField<Exercise>} />
            </Grid>
          ))}
        </Grid>
      )}
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
