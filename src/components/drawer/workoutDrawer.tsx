/* eslint-disable react/jsx-no-bind */
/* eslint-disable max-lines */
import {
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AddCircle, Description, Edit, Title } from '@material-ui/icons';
import { Formik } from 'formik';
import { useCallback, useMemo, useState } from 'react';
import { NoUndefinedField } from '../../api/types';
import { WorkoutProgram } from '../../api/__generated__';
import { useStoreActions, useStoreState } from '../../hooks/useStore';
import { ClientAutocomplete } from '../autocomplete/clientAutocomplete';
import { ExerciseAutocomplete } from '../autocomplete/exerciseAutocomplete';
import { CustomDrawer } from './customDrawer';

type WorkoutProgramDrawerProps = {
  workoutProgram?: WorkoutProgram;
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

export const WorkoutProgramDrawer: React.FC<WorkoutProgramDrawerProps> = ({
  workoutProgram,
}) => {
  const classes = useStyles();
  const { loggedInUser } = useStoreState((state) => state.user);

  const { update, create } = useStoreActions((action) => action.workout);
  const [open, setOpen] = useState(false);

  const personalTrainerId = useMemo(
    () =>
      loggedInUser?.accountType === 'PersonalTrainer'
        ? loggedInUser.userId
        : null,
    [loggedInUser?.accountType, loggedInUser?.userId],
  );

  const handleOnClose = useCallback(() => setOpen(false), []);

  const handleOnOpen = useCallback(() => setOpen(true), []);

  const handleSubmit = useCallback(
    (payload: NoUndefinedField<WorkoutProgram> | WorkoutProgram) => {
      if (workoutProgram) {
        update(payload);
      } else {
        create(payload as NoUndefinedField<WorkoutProgram>);
      }
      setOpen(false);
    },
    [create, update, workoutProgram],
  );

  if (!personalTrainerId) {
    return <>Error!</>;
  }

  return (
    <>
      <CustomDrawer open={open} onClose={handleOnClose} onOpen={handleOnOpen}>
        <Formik<NoUndefinedField<WorkoutProgram>>
          initialValues={
            workoutProgram
              ? (workoutProgram as NoUndefinedField<WorkoutProgram>)
              : {
                  personalTrainerId,
                  clientId: 0,
                  description: '',
                  exercises: [],
                  name: '',
                  workoutProgramId: 0,
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
                      {workoutProgram ? `Update program` : 'Create program'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">
                      {workoutProgram
                        ? 'Fill in form and save changes to program'
                        : 'Fill in form and create program'}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="name"
                    value={props.values.name}
                    variant="outlined"
                    label="Name"
                    onChange={props.handleChange}
                    InputProps={{
                      endAdornment: <Title color="primary" />,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    name="description"
                    value={props.values.description}
                    variant="outlined"
                    label="Description"
                    onChange={props.handleChange}
                    InputProps={{
                      endAdornment: <Description color="primary" />,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <ClientAutocomplete
                    value={props.values.clientId ?? null}
                    onChange={(value) => {
                      props.setFieldValue('clientId', value);
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <ExerciseAutocomplete
                    value={props.values.exercises ?? []}
                    onChange={(values) => {
                      props.setFieldValue('exercises', values);
                    }}
                  />
                </Grid>
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
                      <Typography>
                        {workoutProgram ? 'Save' : 'Create'}
                      </Typography>
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
      {workoutProgram ? (
        <IconButton onClick={handleOnOpen}>
          <Edit />
        </IconButton>
      ) : (
        <IconButton onClick={handleOnOpen}>
          <AddCircle />
        </IconButton>
      )}
    </>
  );
};
