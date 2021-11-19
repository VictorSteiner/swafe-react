import {
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SideNavigation } from './side-navigation';
import Account from '@material-ui/icons/SupervisorAccount';
import Logout from '@material-ui/icons/ExitToApp';
import Workout from '@material-ui/icons/FitnessCenter';
import Program from '@material-ui/icons/Assignment';
import Settings from '@material-ui/icons/Settings';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStoreActions } from '../../hooks/useStore';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    background: theme.palette.primary.main,
    height: '100%',
    width: '100%',
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

export const DefaultSideNavigation: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useStoreActions((action) => action.user);

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

  return (
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
              <ListItemIcon style={{ marginLeft: 4 }}>{link.icon}</ListItemIcon>
              <ListItemText>
                <Typography variant="h6" className={classes.icon}>
                  {link.label}
                </Typography>
              </ListItemText>
            </ListItem>
          ))}
        </Grid>
        <Grid item>
          <ListItem button onClick={logout()}>
            <ListItemIcon style={{ marginLeft: 4 }}>
              <Logout className={classes.icon} />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="h6" className={classes.icon}>
                Logout
              </Typography>
            </ListItemText>
          </ListItem>
        </Grid>
      </Grid>
    </SideNavigation>
  );
};
