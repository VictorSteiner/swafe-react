import { Dialog, IconButton } from '@material-ui/core';
import { Info } from '@material-ui/icons';
import { useCallback, useState } from 'react';
import { NoUndefinedField } from '../../api/types';
import { Exercise } from '../../api/__generated__';
import { ExerciseCard } from '../card/exerciseCard';

type ExerciseDialogProps = {
  exercise: Exercise;
};

export const ExerciseDialog: React.FC<ExerciseDialogProps> = ({ exercise }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <ExerciseCard exercise={exercise as NoUndefinedField<Exercise>} />
      </Dialog>
      <IconButton onClick={handleOpen}>
        <Info color="primary" />
      </IconButton>
    </>
  );
};
