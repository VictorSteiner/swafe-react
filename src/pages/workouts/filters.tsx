import { Grid, TextField } from '@material-ui/core';
import React, { ChangeEvent, useCallback, useState } from 'react';
import { useStoreActions } from '../../hooks/useStore';

export const WorkoutFilters: React.FC = () => {
  const { setFilter } = useStoreActions((actions) => actions.exercise);

  const [query, setQuery] = useState('');

  const handleQueryChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setQuery(value);
      setFilter({ name: value });
    },
    [setFilter],
  );

  return (
    <Grid container spacing={2} alignContent="center">
      <Grid item>
        <TextField
          placeholder="Workout"
          variant="outlined"
          value={query}
          onChange={handleQueryChange}
        />
      </Grid>
    </Grid>
  );
};
