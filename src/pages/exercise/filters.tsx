import { Grid, TextField } from '@material-ui/core';
import { Search } from '@material-ui/icons';
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
          fullWidth
          variant="outlined"
          value={filter.name}
          placeholder="Search..."
          label="Search name"
          onChange={handleQueryChange}
          InputProps={{ endAdornment: <Search color="disabled" /> }}
        />
      </Grid>
    </Grid>
  );
};
