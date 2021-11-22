/* eslint-disable max-lines-per-function */
/* eslint-disable max-lines */
import {
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  AccessTime,
  AddCircle,
  Description,
  Edit,
  FitnessCenter,
  Replay,
} from '@material-ui/icons';
import { Formik } from 'formik';
import { useCallback, useMemo, useState } from 'react';
import { NoUndefinedField, TypedOmit } from '../../api/types';
import { Exercise, ExerciseDto } from '../../api/__generated__';
import { useStoreActions, useStoreState } from '../../hooks/useStore';
import { CustomDrawer } from './customDrawer';

type UpdateUserDrawerProps = {
  exercise?: Exercise;
  workoutProgramId?: number;
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

export const ExerciseDrawer: React.FC<UpdateUserDrawerProps> = ({
  exercise,
  workoutProgramId,
}) => {
  const classes = useStyles();
  const { loggedInUser } = useStoreState((state) => state.user);
  const { update, create, addToProgram } = useStoreActions(
    (action) => action.exercise,
  );
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
    (payload: NoUndefinedField<ExerciseDto> | Exercise) => {
      if (exercise) {
        update(payload);
      } else if (workoutProgramId) {
        addToProgram({ id: `${workoutProgramId}`, input: payload });
      } else {
        create(payload as NoUndefinedField<TypedOmit<Exercise, 'exerciseId'>>);
      }
      setOpen(false);
    },
    [addToProgram, create, exercise, update, workoutProgramId],
  );

  return (
    <>
      <CustomDrawer open={open} onClose={handleOnClose} onOpen={handleOnOpen}>
        <Formik<Exercise>
          initialValues={
            exercise
              ? exercise
              : {
                  exerciseId: 0,
                  description: '',
                  name: '',
                  personalTrainerId,
                  repetitions: 0,
                  sets: 0,
                  time: '',
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
                      {exercise
                        ? `Update exercise`
                        : workoutProgramId
                        ? 'Add exercise to program'
                        : 'Create exercise'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">
                      {exercise
                        ? 'Fill in form and save changes to exercise'
                        : workoutProgramId
                        ? 'Fill in form and add exercise to program'
                        : 'Fill in form and create exercise'}
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
                      endAdornment: <FitnessCenter color="primary" />,
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
                  <TextField
                    fullWidth
                    type="number"
                    name="sets"
                    value={props.values.sets}
                    variant="outlined"
                    label="Sets"
                    onChange={props.handleChange}
                    InputProps={{ endAdornment: <Replay color="primary" /> }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="number"
                    name="repetitions"
                    value={props.values.repetitions}
                    variant="outlined"
                    label="Repetitions"
                    onChange={props.handleChange}
                    InputProps={{ endAdornment: <Replay color="primary" /> }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="text"
                    name="time"
                    value={props.values.time}
                    variant="outlined"
                    label="Time"
                    onChange={props.handleChange}
                    InputProps={{
                      endAdornment: <AccessTime color="primary" />,
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
                        {exercise
                          ? 'Save'
                          : workoutProgramId
                          ? 'Add'
                          : 'Create'}
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
      {exercise ? (
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
