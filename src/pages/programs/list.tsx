import { Grid } from '@material-ui/core';
import { WorkoutCard } from '../../components/card/workoutCard';
import { useStoreState } from '../../hooks/useStore';

export const WorkoutProgramList: React.FC = () => {
  const { workoutProgramsQuery } = useStoreState((state) => state.workout);

  return (
    <Grid container spacing={2}>
      {workoutProgramsQuery.map((workoutProgram) => (
        <Grid item key={workoutProgram.workoutProgramId} xs={12} lg={6}>
          <WorkoutCard workoutProgram={workoutProgram} />
        </Grid>
      ))}
    </Grid>
  );
};
