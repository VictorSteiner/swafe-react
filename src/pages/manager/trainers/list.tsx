import React from 'react';
import { useStoreState } from '../../../hooks/useStore';
import { UserCard } from '../../../components/card/userCard';
import { Grid } from '@material-ui/core';

export const ManagerTrainerList: React.FC = () => {
  const trainers = useStoreState((state) => state.user.trainers);

  return (
    <Grid container spacing={2}>
      {trainers.map((trainer) => (
        <Grid item key={trainer.userId} xs={4}>
          <UserCard user={trainer} />
        </Grid>
      ))}
    </Grid>
  );
};
