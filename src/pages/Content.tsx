import React, { useMemo } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { LoginIndex } from './login';
import { makeStyles } from '@material-ui/core/styles';
import { ExercisesIndex } from './exercise';
import { ProgramsIndex } from './programs';
import { SettingsIndex } from './settings';
import { PersonalTrainerPage } from './trainer';
import { ManagerPage } from './manager';
import { CustomerPage } from './client';
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

  const mainRoutes = useMemo(
    () => [
      {
        path: '/account',
        element:
          loggedInUser?.accountType === 'Manager' ? (
            <ManagerPage />
          ) : loggedInUser?.accountType === 'Client' ? (
            <CustomerPage />
          ) : (
            <PersonalTrainerPage />
          ),
        policy: ['PersonalTrainer', 'Client', 'Manager'],
      },
      {
        path: '/exercises/*',
        element: <ExercisesIndex />,
        policy: ['PersonalTrainer'],
      },
      {
        path: '/programs/*',
        element: <ProgramsIndex />,
        policy: ['PersonalTrainer', 'Client'],
      },
      {
        path: '/settings/*',
        element: <SettingsIndex />,
        policy: ['PersonalTrainer', 'Client', 'Manager'],
      },
    ],
    [loggedInUser?.accountType],
  );

  if (!isLoggedIn) {
    return (
      <Routes>
        <Route path="/login" element={<LoginIndex />} />
        <Route path="*" element={<Navigate replace to="/login" />} />
      </Routes>
    );
  }

  return (
    <div className={classes.root}>
      <DefaultSideNavigation />
      <main className={classes.content}>
        <main style={{ flex: 1, height: '100%', overflowX: 'hidden' }}>
          <Routes>
            {mainRoutes.map(
              (route) =>
                route.policy.includes(loggedInUser?.accountType ?? '') && (
                  <Route key={route.path} {...route} />
                ),
            )}
            <Route path="*" element={<Navigate replace to="/account" />} />
          </Routes>
        </main>
      </main>
    </div>
  );
};
