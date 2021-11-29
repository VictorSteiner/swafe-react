/* eslint-disable react/jsx-no-bind */
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Delete, ExpandMore, RemoveCircle } from '@material-ui/icons';
import { useCallback, useMemo, useState } from 'react';
import { WorkoutProgram } from '../../api/__generated__';
import { useStoreActions, useStoreState } from '../../hooks/useStore';
import { ExerciseDialog } from '../dialog/exerciseDialog';
import { ExerciseDrawer } from '../drawer/exerciseDrawer';
import { WorkoutProgramDrawer } from '../drawer/workoutDrawer';

interface WorkoutCardProps {
  workoutProgram: WorkoutProgram;
}

const useStyles = makeStyles((theme) => ({
  li: {
    '& .MuiListItem-container::marker': {
      marker: null,
    },
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
  deleteIcon: {
    color: theme.palette.secondary.main,
  },
}));

export const WorkoutCard: React.FC<WorkoutCardProps> = ({ workoutProgram }) => {
  const classes = useStyles();
  const { clients, loggedInUser } = useStoreState((state) => state.user);
  const deleteWorkout = useStoreActions((action) => action.workout.delete);
  const deleteExercise = useStoreActions((action) => action.exercise.delete);
  const [expanded, setExpanded] = useState(false);

  const client = useMemo(
    () => clients.find((x) => x.userId === workoutProgram.clientId),
    [clients, workoutProgram.clientId],
  );

  const handleExpand = useCallback(() => setExpanded((prev) => !prev), []);

  const handleDelete = useCallback(() => {
    deleteWorkout(`${workoutProgram.workoutProgramId}`);
  }, [deleteWorkout, workoutProgram.workoutProgramId]);

  const handleExerciseDelete = useCallback(
    (id: number) => {
      deleteExercise(`${id}`);
    },
    [deleteExercise],
  );

  return (
    <Card elevation={1}>
      <CardHeader
        avatar={
          <Avatar className={classes.avatar}>
            {`${workoutProgram.name?.charAt(0)}${workoutProgram.name?.charAt(
              1,
            )}`.toUpperCase()}
          </Avatar>
        }
        title={workoutProgram.name}
        subheader={`${client?.lastName}, ${client?.firstName}`}
        action={
          loggedInUser?.accountType === 'PersonalTrainer' ? (
            <>
              <WorkoutProgramDrawer workoutProgram={workoutProgram} />
              <IconButton onClick={handleDelete}>
                <Delete className={classes.deleteIcon} />
              </IconButton>
            </>
          ) : (
            <></>
          )
        }
      />
      <CardContent>
        <Typography>{workoutProgram.description}</Typography>
      </CardContent>
      <CardActions>
        <IconButton
          onClick={handleExpand}
          style={{
            transform: !expanded ? 'rotate(0deg)' : 'rotate(180deg)',
            marginLeft: 'auto',
          }}
        >
          <ExpandMore />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Grid container direction="column">
            <Grid item xs={12} container justifyContent="space-between">
              <Grid item>
                <Typography variant="h5">Exercises</Typography>
              </Grid>
              <Grid item>
                {!!workoutProgram.workoutProgramId &&
                  loggedInUser?.accountType === 'PersonalTrainer' && (
                    <ExerciseDrawer
                      workoutProgramId={workoutProgram.workoutProgramId}
                    />
                  )}
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <List>
                {workoutProgram.exercises?.map((exercise) => (
                  <ListItem
                    key={exercise.exerciseId}
                    disableGutters
                    dense
                    divider
                    className={classes.li}
                  >
                    <ListItemText
                      primary={exercise.name}
                      secondary={`Sets: ${exercise.sets} ${
                        exercise.repetitions === 0
                          ? `Time: ${exercise.time}`
                          : `Repetions: ${exercise.repetitions}`
                      }`}
                    ></ListItemText>

                    <ListItemSecondaryAction>
                      <>
                        <ExerciseDialog exercise={exercise} />
                        {loggedInUser?.accountType === 'PersonalTrainer' && (
                          <>
                            <ExerciseDrawer exercise={exercise} />
                            <IconButton
                              onClick={() =>
                                exercise.exerciseId
                                  ? handleExerciseDelete(exercise.exerciseId)
                                  : {}
                              }
                            >
                              <RemoveCircle className={classes.deleteIcon} />
                            </IconButton>
                          </>
                        )}
                      </>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>
    </Card>
  );
};
