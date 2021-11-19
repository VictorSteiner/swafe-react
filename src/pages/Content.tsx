import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { LoginIndex } from './login';
import { makeStyles } from '@material-ui/core/styles';
import { WorkoutsIndex } from './workouts';
import { ProgramsIndex } from './programs';
import { SettingsIndex } from './settings';
import { PersonalTrainerPage } from './trainer';
import { ManagerPage } from './manager';
import { CustomerPage } from './customer';
import { useStoreState } from '../hooks/useStore';
import { DefaultSideNavigation } from '../components/navigation/defaultSideNavigation';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    background: theme.palette.primary.main,
    height: '100%',
    width: '100%',
  },
  content: {
    display: 'flex',
    flex: 1,
    padding: theme.spacing(0),
    flexDirection: 'column',
    background: theme.palette.background.default,
    overflowY: 'hidden',
    height: '100vh',
  },
}));

export const Content: React.FC = () => {
  const isLoggedIn = useStoreState((state) => state.user.isLoggedIn);
  const loggedInUser = useStoreState((state) => state.user.loggedInUser);
  const classes = useStyles();

  if (!isLoggedIn) {
    return (
      <Routes>
        <Route path="/login" element={<LoginIndex />} />
        <Route path="*" element={<Navigate replace to="/login" />} />
      </Routes>
    );
  }

  const AccountType = (): JSX.Element => {
    switch (loggedInUser?.accountType ?? '') {
      case 'Manager':
        return <ManagerPage />;
      case 'Client':
        return <CustomerPage />;
      case 'PersonalTrainer':
        return <PersonalTrainerPage />;
      default:
        return <></>;
    }
  };

  return (
    <div className={classes.root}>
      <DefaultSideNavigation />
      <main className={classes.content}>
        <main style={{ flex: 1, height: '100%', overflowX: 'hidden' }}>
          <Routes>
            <Route path="/account/*" element={AccountType()} />
            <Route path="/workouts/*" element={<WorkoutsIndex />} />
            <Route path="/programs/*" element={<ProgramsIndex />} />
            <Route path="/settings/*" element={<SettingsIndex />} />
            <Route path="*" element={<Navigate replace to="/account" />} />
          </Routes>
        </main>
      </main>
    </div>
  );
};
