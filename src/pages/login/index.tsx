import { createStyles, makeStyles } from '@material-ui/core';
import React from 'react';
import { LoginForm } from './form';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.primary.main,
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100vw',
      height: '100vh',
    },
    circle: {
      position: 'absolute',
      borderRadius: '50%',
      background: 'white',
      animation: '$ripple 15s infinite',
      boxShadow: `0px 0px 1px 0px ${theme.palette.primary.light}`,
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(0.8)',
      },
      '50%': {
        transform: 'scale(1.2)',
      },
      '100%': {
        transform: 'scale(0.8)',
      },
    },
  }),
);

export const LoginIndex: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {Array(5)
        .fill(undefined)
        .map((_, index) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className={classes.circle}
            style={{
              width: 200 * index + 1,
              height: 200 * index + 1,
              left: -100 * index + 1,
              bottom: -100 * index + 1,
              opacity: 1 - 0.12 * (index + 1),
            }}
          />
        ))}

      <LoginForm />
    </div>
  );
};
