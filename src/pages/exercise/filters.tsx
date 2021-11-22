import { Grid, TextField } from '@material-ui/core';
import React, { ChangeEvent, useCallback } from 'react';
import { ExerciseDrawer } from '../../components/drawer/exerciseDrawer';
import { useStoreActions, useStoreState } from '../../hooks/useStore';

export const ExerciseFilters: React.FC = () => {
  const { setFilter } = useStoreActions((actions) => actions.exercise);
  const { filter } = useStoreState((state) => state.exercise);

  const handleQueryChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value: name } = event.target;
      setFilter({ name });
    },
    [setFilter],
  );

  return (
    <Grid container spacing={2} alignContent="center">
      <Grid item>
        <ExerciseDrawer />
      </Grid>
      <Grid item>
        <TextField
          placeholder="Workout"
          variant="outlined"
          value={filter.name}
          onChange={handleQueryChange}
        />
      </Grid>
    </Grid>
  );
};
