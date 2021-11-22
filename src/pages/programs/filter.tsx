import { Grid, TextField } from '@material-ui/core';
import React, { useCallback } from 'react';
import { WorkoutProgramDrawer } from '../../components/drawer/workoutDrawer';
import { useStoreActions, useStoreState } from '../../hooks/useStore';

export const WorkoutProgramFilter: React.FC = () => {
  const { filter } = useStoreState((state) => state.exercise);
  const { setFilter } = useStoreActions((action) => action.exercise);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value: name } = event.target;
      setFilter({ name });
    },
    [setFilter],
  );

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <WorkoutProgramDrawer />
      </Grid>
      <Grid item>
        <TextField
          variant="outlined"
          value={filter.name}
          onChange={handleChange}
          label="Name"
        />
      </Grid>
    </Grid>
  );
};
