import { Grid, TextField } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import React, { useCallback } from 'react';
import { WorkoutProgramDrawer } from '../../components/drawer/workoutDrawer';
import { useStoreActions, useStoreState } from '../../hooks/useStore';

export const WorkoutProgramFilter: React.FC = () => {
  const { loggedInUser } = useStoreState((state) => state.user);
  const { filter } = useStoreState((state) => state.workout);
  const { setFilter } = useStoreActions((action) => action.workout);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFilter({ name: event.target.value });
    },
    [setFilter],
  );

  return (
    <Grid container spacing={2} alignItems="center">
      {loggedInUser?.accountType === 'PersonalTrainer' && (
        <Grid item>
          <WorkoutProgramDrawer />
        </Grid>
      )}
      <Grid item>
        <TextField
          fullWidth
          variant="outlined"
          value={filter.name}
          label="Search name"
          placeholder="Search..."
          onChange={handleChange}
          InputProps={{ endAdornment: <Search color="disabled" /> }}
        />
      </Grid>
    </Grid>
  );
};
