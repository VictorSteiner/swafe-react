/* eslint-disable react/jsx-no-bind */
// import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useUser } from '../../hooks/useUser';

// const useStyles = makeStyles((theme) => ({
//   toolbar: {
//     backgroundColor: theme.palette.background.paper,
//   },
// }));

export const ManagerPage: React.FC = () => {
  const { user } = useUser();

  return <>{user?.accountType}</>;
};
