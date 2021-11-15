/* eslint-disable react/jsx-no-bind */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import React, { useMemo } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { DecodedToken, useToken } from '../hooks/useToken';
import { AdmininistrationIndex } from './administration';
import { LoginIndex } from './login';
import jwt_decode from 'jwt-decode';
import { SideNavigation } from '../components/navigation/side-navigation';
import Account from '@material-ui/icons/SupervisorAccount';
import Logout from '@material-ui/icons/ExitToApp';
import {
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { logout } from '../api/services/userService';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
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
  const { token } = useToken();
  const classes = useStyles();
  const history = useHistory();

  const isLoggedIn = useMemo(() => {
    const decoded: DecodedToken | null = token ? jwt_decode(token) : null;

    return decoded?.exp
      ? Number.parseInt(decoded?.exp) * 1000 > Date.now()
      : false;
  }, [token]);

  if (!isLoggedIn) {
    return (
      <Switch>
        <Route path="/login" component={LoginIndex} />
        <Redirect to="/login" />
      </Switch>
    );
  }

  const links: LinkListProps[] = [
    {
      icon: <Account />,
      label: 'Account',
      to: '/administration',
    },
  ];

  return (
    <>
      <SideNavigation>
        <Grid container justifyContent="space-between" className={classes.root}>
          <Grid item xs>
            {links.map((link) => (
              <ListItem
                // eslint-disable-next-line react/jsx-no-bind
                onClick={() => history.replace(link.to)}
                button
                key={link.label}
                className={
                  link.to === history.location.pathname
                    ? classes.link
                    : undefined
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
            <ListItem button onClick={logout}>
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="h6">Logout</Typography>
              </ListItemText>
            </ListItem>
          </Grid>
        </Grid>
      </SideNavigation>
      <Switch>
        <Redirect from="/login" to="/administration" />
        <Redirect exact from="/" to="/administration" />
        <Route path="/login" component={LoginIndex} />
        <Route path="/administration" component={AdmininistrationIndex} />
      </Switch>
    </>
  );
};
