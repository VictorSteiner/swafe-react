import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Delete } from '@material-ui/icons';
import { useCallback } from 'react';
import { NoUndefinedField } from '../../api/types';
import { Exercise } from '../../api/__generated__';
import { useStoreActions, useStoreState } from '../../hooks/useStore';
import { ExerciseDrawer } from '../drawer/exerciseDrawer';

interface ExerciseCardProps {
  exercise: NoUndefinedField<Exercise>;
}

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2),
    height: theme.spacing(18),
  },
  add: {
    border: `4px dashed ${theme.palette.success.main}`,
  },
  delete: {
    border: `4px dashed ${theme.palette.error.main}`,
  },
  addIcon: {
    color: theme.palette.success.main,
    height: theme.spacing(6),
    width: 'auto',
  },
  deleteIcon: {
    color: theme.palette.secondary.main,
  },
}));

export const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise }) => {
  const classes = useStyles();
  const { loggedInUser } = useStoreState((state) => state.user);
  const deleteExercise = useStoreActions((action) => action.exercise.delete);

  const handleDelete = useCallback(() => {
    deleteExercise(`${exercise.exerciseId}`);
  }, [deleteExercise, exercise.exerciseId]);

  return (
    <Card elevation={1}>
      <CardHeader
        title={exercise.name}
        subheader={`Sets: ${exercise.sets} ${
          exercise.repetitions === 0
            ? `Time: ${exercise.time}`
            : `Repetions: ${exercise.repetitions}`
        }`}
        action={
          <>
            {loggedInUser?.accountType === 'PersonalTrainer' && (
              <>
                <IconButton>
                  <ExerciseDrawer exercise={exercise} />
                </IconButton>
                <IconButton onClick={handleDelete}>
                  <Delete className={classes.deleteIcon} />
                </IconButton>
              </>
            )}
          </>
        }
      />
      <CardContent>
        <Typography>{exercise.description}</Typography>
      </CardContent>
    </Card>
  );
};
