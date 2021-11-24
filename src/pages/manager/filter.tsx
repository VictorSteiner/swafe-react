import { TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { Search } from '@material-ui/icons';
import React, { useCallback } from 'react';
import { UserDrawer } from '../../components/drawer/userDrawer';
import { useStoreActions, useStoreState } from '../../hooks/useStore';

export const ManagerFilter: React.FC = () => {
  const setFilter = useStoreActions((action) => action.user.setFilter);
  const filter = useStoreState((state) => state.user.filter);

  const handleNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setFilter({ name: event.target.value }),
    [setFilter],
  );

  return (
    <Grid container spacing={2}>
      <Grid item>
        <UserDrawer />
      </Grid>
      <Grid item>
        <TextField
          fullWidth
          variant="outlined"
          value={filter.name}
          placeholder="Search..."
          label="Search name"
          onChange={handleNameChange}
          InputProps={{ endAdornment: <Search color="disabled" /> }}
        />
      </Grid>
    </Grid>
  );
};
