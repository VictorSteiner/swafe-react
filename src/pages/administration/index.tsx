/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from 'react';
import { useUser } from '../../hooks/useUser';
import { CustomerIndex } from './customer';
import { ManagerIndex } from './manager';
import { PersonalTrainerIndex } from './trainer';

export const AdmininistrationIndex: React.FC = () => {
  const { user } = useUser();

  if (!user?.accountType) {
    return <>Something went wront, user not found!</>;
  }

  return (
    <>
      {user.accountType === 'Manager' && <ManagerIndex />}
      {user.accountType === 'Client' && <CustomerIndex />}
      {user.accountType === 'PersonalTrainer' && <PersonalTrainerIndex />}
    </>
  );
};
