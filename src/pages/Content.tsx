/* eslint-disable max-lines */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import React, { useMemo } from 'react';
import {
  Route,
  Routes,
  useNavigate,
  useLocation,
  Navigate,
} from 'react-router-dom';
import { useToken } from '../hooks/useToken';
import { LoginIndex } from './login';
import { SideNavigation } from '../components/navigation/side-navigation';
import Account from '@material-ui/icons/SupervisorAccount';
import Logout from '@material-ui/icons/ExitToApp';
import Workout from '@material-ui/icons/FitnessCenter';
import Program from '@material-ui/icons/Assignment';
import Settings from '@material-ui/icons/Settings';
import DarkMode from '@material-ui/icons/Brightness2';
import LightMode from '@material-ui/icons/Brightness5';
import {
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { WorkoutsIndex } from './workouts';
import { ProgramsIndex } from './programs';
import { SettingsIndex } from './settings';
import { useUser } from '../hooks/useUser';
import { PersonalTrainerPage } from './trainer';
import { ManagerPage } from './manager';
import { CustomerPage } from './customer';
import { useTheme } from '../hooks/useTheme';

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
  icon: {
    color: theme.typography.h6.color,
    textShadow: '0px 1px 0.5px rgba(255,255,255,0.3)',
  },
  link: {
    background: `linear-gradient(-45deg, ${theme.palette.primary.light}, ${theme.palette.secondary.contrastText})`,
    animation: `$gradient 4000ms ${theme.transitions.easing.easeInOut} infinite`,
    backgroundSize: '200% 200%',
  },
  '@keyframes gradient': {
    '0%': {
      backgroundPosition: '0% 50%',
    },
    '50%': {
      backgroundPosition: '100% 50%',
    },
    '100%': {
      backgroundPosition: '0% 50%',
    },
  },
}));

interface LinkListProps {
  label: string;
  to: string;
  icon: React.ReactNode;
}

export const Content: React.FC = () => {
  const { decoded, setToken } = useToken();
  const { user } = useUser();
  const { mode, setMode } = useTheme();
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = useMemo(
    () =>
      decoded?.exp ? Number.parseInt(decoded?.exp) * 1000 > Date.now() : false,
    [decoded?.exp],
  );

  if (!isLoggedIn) {
    return (
      <Routes>
        <Route path="/login" element={<LoginIndex />} />
        <Route path="*" element={<Navigate replace to="/login" />} />
      </Routes>
    );
  }

  const links: LinkListProps[] = [
    {
      icon: <Account className={classes.icon} />,
      label: 'Account',
      to: '/account',
    },
    {
      icon: <Workout className={classes.icon} />,
      label: 'Workouts',
      to: '/workouts',
    },
    {
      icon: <Program className={classes.icon} />,
      label: 'Programs',
      to: '/programs',
    },
    {
      icon: <Settings className={classes.icon} />,
      label: 'Settings',
      to: '/settings',
    },
  ];

  const AccountType = (): JSX.Element => {
    switch (user?.accountType ?? '') {
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
      <SideNavigation>
        <Grid
          container
          className={classes.root}
          direction="column"
          justifyContent="space-between"
        >
          <Grid item>
            {links.map((link) => (
              <ListItem
                // eslint-disable-next-line react/jsx-no-bind
                onClick={() => navigate(link.to)}
                button
                key={link.label}
                className={
                  link.to === location.pathname ? classes.link : undefined
                }
              >
                <ListItemIcon style={{ marginLeft: 4 }}>
                  {link.icon}
                </ListItemIcon>
                <ListItemText>
                  <Typography variant="h6" className={classes.icon}>
                    {link.label}
                  </Typography>
                </ListItemText>
              </ListItem>
            ))}
          </Grid>
          <Grid item>
            <ListItem
              button
              onClick={() => {
                localStorage.removeItem('token');
                setToken(null);
              }}
            >
              <ListItemIcon style={{ marginLeft: 4 }}>
                <Logout className={classes.icon} />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="h6" className={classes.icon}>
                  Logout
                </Typography>
              </ListItemText>
            </ListItem>
            <ListItem
              button
              onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
            >
              <ListItemIcon style={{ marginLeft: 4 }}>
                {mode === 'light' ? (
                  <DarkMode className={classes.icon} />
                ) : (
                  <LightMode className={classes.icon} />
                )}
              </ListItemIcon>
            </ListItem>
          </Grid>
        </Grid>
      </SideNavigation>
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
