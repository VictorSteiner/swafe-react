import {
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Edit, Mail, Person, PersonAdd, VpnKey } from '@material-ui/icons';
import { Formik } from 'formik';
import { useCallback, useState } from 'react';
import { NoUndefinedField } from '../../api/types';
import { useStoreActions, useStoreState } from '../../hooks/useStore';
import { User } from '../../services/user';
import { CustomDrawer } from './customDrawer';

type UpdateUserDrawerProps = {
  user?: User;
};

const useStyles = makeStyles((theme) => ({
  form: {
    [theme.breakpoints.up('xs')]: {
      width: '400px',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100vw',
    },
    padding: theme.spacing(2),
  },
}));

export const UserDrawer: React.FC<UpdateUserDrawerProps> = ({ user }) => {
  const classes = useStyles();
  const { loggedInUser } = useStoreState((state) => state.user);
  const { update, create } = useStoreActions((action) => action.user);
  const [open, setOpen] = useState(false);

  const handleOnClose = useCallback(() => setOpen(false), []);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const handleOnOpen = useCallback(() => setOpen(true), []);

  const handleSubmit = useCallback(
    (payload: NoUndefinedField<User>) => {
      if (user) {
        update(payload);
      } else {
        create(payload);
      }
    },
    [create, update, user],
  );

  return (
    <>
      <CustomDrawer open={open} onClose={handleOnClose} onOpen={handleOnOpen}>
        <Formik<User>
          initialValues={
            user
              ? user
              : {
                  personalTrainerId:
                    loggedInUser?.accountType === 'PersonalTrainer'
                      ? loggedInUser.userId
                      : 0,
                  userId: 0,
                  firstName: '',
                  lastName: '',
                  email: '',
                  password: '',
                  accountType:
                    loggedInUser?.accountType === 'Manager'
                      ? 'PersonalTrainer'
                      : 'Client',
                }
          }
          onSubmit={handleSubmit}
        >
          {(props) => (
            <form className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12} container>
                  <Grid item xs={12}>
                    <Typography variant="h4">
                      {user
                        ? `Update ${user.firstName}`
                        : loggedInUser?.accountType === 'PersonalTrainer'
                        ? 'Create new client'
                        : 'Create new personal trainer'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">
                      Fill in form and save changes to user
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="firstName"
                    value={props.values.firstName}
                    variant="outlined"
                    label="First name"
                    onChange={props.handleChange}
                    InputProps={{ endAdornment: <Person color="primary" /> }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="lastName"
                    value={props.values.lastName}
                    variant="outlined"
                    label="Last name"
                    onChange={props.handleChange}
                    InputProps={{ endAdornment: <Person color="primary" /> }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="email"
                    value={props.values.email}
                    variant="outlined"
                    label="Email"
                    onChange={props.handleChange}
                    InputProps={{ endAdornment: <Mail color="primary" /> }}
                  />
                </Grid>
                {!user && (
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="password"
                      value={props.values.password}
                      variant="outlined"
                      label="Password"
                      onChange={props.handleChange}
                      InputProps={{ endAdornment: <VpnKey color="primary" /> }}
                    />
                  </Grid>
                )}
                <Grid
                  item
                  xs={12}
                  container
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={2}
                >
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      disabled={props.isSubmitting}
                      // eslint-disable-next-line react/jsx-no-bind
                      onClick={() => {
                        props.handleSubmit();
                      }}
                    >
                      <Typography>{user ? 'Save' : 'Create'}</Typography>
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant="outlined"
                      color="primary"
                      disabled={props.isSubmitting}
                      onClick={handleOnClose}
                    >
                      <Typography>Cancel</Typography>
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </CustomDrawer>
      {user ? (
        <IconButton onClick={handleOnOpen}>
          <Edit />
        </IconButton>
      ) : (
        <IconButton onClick={handleOnOpen}>
          <PersonAdd />
        </IconButton>
      )}
    </>
  );
};
