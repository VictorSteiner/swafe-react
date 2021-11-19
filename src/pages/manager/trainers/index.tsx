import { Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useStoreActions } from '../../../hooks/useStore';
import { ManagerTrainerList } from './list';

export const ManagerTrainerIndex: React.FC = () => {
  const { fetchAll: fetchUsers } = useStoreActions((state) => state.user);
  const { fetchAll: fetchWorkoutPrograms } = useStoreActions(
    (state) => state.workout,
  );

  useEffect(() => {
    fetchUsers();
    fetchWorkoutPrograms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}></Grid>
      <Grid item xs={12}>
        <ManagerTrainerList />
      </Grid>
    </Grid>
  );
};
