import {
  Box,
  Drawer,
  IconButton,
  styled,
  Theme,
  withTheme,
} from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { useCallback, useState } from 'react';

const drawerWidth = 240;

const useStyles = makeStyles<Theme>((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    height: '100vh',
    backgroundColor: theme.palette.primary.main,
  },
  drawerOpen: {
    width: drawerWidth,
    backgroundColor: theme.palette.primary.main,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClosed: {
    backgroundColor: theme.palette.primary.main,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(8),
  },
  chevron: {
    color: '#FFFFFF',
  },
}));

const DrawerToolbar = styled(withTheme(Box))(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface ISideNavigationProps {}

export const SideNavigation: React.FC<ISideNavigationProps> = ({
  children,
}) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(true);

  const toggleDrawer = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: isOpen,
        [classes.drawerClosed]: !isOpen,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: isOpen,
          [classes.drawerClosed]: !isOpen,
        }),
      }}
    >
      <DrawerToolbar>
        <IconButton onClick={toggleDrawer}>
          {isOpen ? (
            <ChevronLeft className={classes.chevron} />
          ) : (
            <ChevronRight className={classes.chevron} />
          )}
        </IconButton>
      </DrawerToolbar>
      {children}
    </Drawer>
  );
};
