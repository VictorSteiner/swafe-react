import { User } from '../../services/user';
import { Delete } from '@material-ui/icons';
import {
  Avatar,
  Card,
  CardHeader,
  IconButton,
  Grid,
  CardContent,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { WorkoutProgram } from '../../api/__generated__';
import { NoUndefinedField } from '../../api/types';
import { useStoreActions } from '../../hooks/useStore';
import { useCallback } from 'react';

interface UserCardProps {
  user: User;
  workouts?: NoUndefinedField<WorkoutProgram>[];
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
  updateIcon: {
    color: theme.palette.secondary.main,
  },
  openIcon: {
    color: theme.palette.primary.main,
  },
}));

export const UserCard: React.FC<UserCardProps> = ({ user, workouts }) => {
  const deleteUser = useStoreActions((action) => action.user.delete);
  const classes = useStyles();

  const handleDelete = useCallback(() => {
    deleteUser(user.userId.toString());
  }, [deleteUser, user.userId]);

  return (
    <Card elevation={1}>
      <CardHeader
        avatar={
          <Avatar
            style={{
              backgroundColor:
                user.accountType === 'PersonalTrainer' ? '#94E8B4' : '#5E8C61',
            }}
          >
            {`${user.firstName.charAt(0).toUpperCase()}${user.lastName
              .charAt(0)
              .toUpperCase()}`}
          </Avatar>
        }
        title={`${user.lastName}, ${user.firstName}`}
        subheader={
          user.accountType === 'PersonalTrainer'
            ? 'Personal trainer'
            : user.accountType
        }
        action={
          <>
            <IconButton onClick={handleDelete}>
              <Delete className={classes.deleteIcon} />
            </IconButton>
          </>
        }
      />
      {!!workouts?.length && (
        <CardContent>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Typography variant="subtitle1">Workouts</Typography>
            </Grid>
            {workouts?.map((workout, index) => (
              <Grid item key={workout.workoutProgramId}>
                {index < 2 && (
                  <Grid container direction="column" spacing={2}>
                    <Grid item>{workout.name}</Grid>
                    <Grid item>{workout.description}</Grid>
                  </Grid>
                )}
              </Grid>
            ))}
          </Grid>
        </CardContent>
      )}
    </Card>
  );
};
