/* eslint-disable react/jsx-no-bind */
// import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useStoreState } from '../../hooks/useStore';

// const useStyles = makeStyles((theme) => ({
//   toolbar: {
//     backgroundColor: theme.palette.background.paper,
//   },
// }));

export const ManagerPage: React.FC = () => {
  const { loggedInUser } = useStoreState((state) => state.user);
  return <>{loggedInUser?.accountType}</>;
};
