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
import { AdmininistrationIndex } from './administration';
import { LoginIndex } from './login';
import { SideNavigation } from '../components/navigation/side-navigation';
import Account from '@material-ui/icons/SupervisorAccount';
import Logout from '@material-ui/icons/ExitToApp';
import Workout from '@material-ui/icons/FitnessCenter';
import Program from '@material-ui/icons/Assignment';
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
import { useUser } from '../hooks/useUser';
import { SettingsIndex } from './settings';
import { Settings } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    background: '#FFFFFF',
    height: '100%',
    width: '100%',
  },
  content: {
    display: 'flex',
    flex: 1,
    padding: theme.spacing(0),
    flexDirection: 'column',
    background: '#F7F7F7',
    overflowY: 'hidden',
    height: '100vh',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 2),
    background: '#FFFFFF',
    ...theme.mixins.toolbar,
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  link: {
    background: `linear-gradient(-45deg, ${theme.palette.primary.light}, #FFFFFF)`,
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
      icon: <Account />,
      label: 'Account',
      to: '/account',
    },
    {
      icon: <Workout />,
      label: 'Workouts',
      to: '/workouts',
    },
    {
      icon: <Program />,
      label: 'Programs',
      to: '/programs',
    },
    {
      icon: <Settings />,
      label: 'Settings',
      to: '/settings',
    },
  ];

  return (
    <div className={classes.root}>
      <SideNavigation>
        <Grid container justifyContent="space-between" className={classes.root}>
          <Grid item xs>
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
                  <Typography variant="h6">{link.label}</Typography>
                </ListItemText>
              </ListItem>
            ))}
          </Grid>
          <Grid item xs>
            <ListItem
              button
              onClick={() => {
                localStorage.removeItem('token');
                setToken(null);
              }}
            >
              <ListItemIcon style={{ marginLeft: 4 }}>
                <Logout />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="h6">Logout</Typography>
              </ListItemText>
            </ListItem>
          </Grid>
        </Grid>
      </SideNavigation>
      <main className={classes.content}>
        <main style={{ flex: 1, height: '100%', overflowX: 'hidden' }}>
          <Routes>
            <Route path="/account" element={<AdmininistrationIndex />} />
            <Route path="/workouts" element={<WorkoutsIndex />} />
            <Route path="/programs" element={<ProgramsIndex />} />
            <Route path="/settings" element={<SettingsIndex />} />
            <Route path="*" element={<Navigate replace to="/account" />} />
          </Routes>
        </main>
      </main>
    </div>
  );
};
