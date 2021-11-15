import React from 'react';
import { AccountType } from '../../api/types';
import { useUser } from '../../hooks/useUser';
import { CustomerIndex } from './customer';
import { ManagerIndex } from './manager';
import { PersonalTrainerIndex } from './trainer';

export const AdmininistrationIndex: React.FC = () => {
  const { user } = useUser();

  if (!user) {
    return <>Something went wront, user not found!</>;
  }

  return (
    <>
      {(user?.accountType as AccountType) === 'Manager' && <ManagerIndex />}
      {(user?.accountType as AccountType) === 'Client' && <CustomerIndex />}
      {(user?.accountType as AccountType) === 'PersonalTrainer' && (
        <PersonalTrainerIndex />
      )}
    </>
  );
};
