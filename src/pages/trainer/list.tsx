import React from 'react';
import { useStoreState } from '../../hooks/useStore';
import { UserCard } from '../../components/card/userCard';
import { Grid } from '@material-ui/core';

export const TrainerList: React.FC = () => {
  const clients = useStoreState((state) => state.user.clients);

  return (
    <Grid container spacing={2}>
      {clients.map((client) => (
        <Grid item key={client.userId} xs={12} lg={6}>
          <UserCard user={client} />
        </Grid>
      ))}
    </Grid>
  );
};
