/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-bind */
import { ListItem, ListItemText, TextField } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import { ChangeEvent, useCallback, useEffect } from 'react';
import { Exercise } from '../../api/__generated__';
import { useStoreActions, useStoreState } from '../../hooks/useStore';

interface ExerciseAutocompleteProps {
  onChange: (value: Exercise | null) => void;
  value: Exercise | null;
}

export const ExerciseAutocomplete: React.FC<ExerciseAutocompleteProps> = ({
  ...props
}) => {
  const { searchExercises } = useStoreState((state) => state.exercise);
  const { fetchAll, setFilter } = useStoreActions((action) => action.exercise);

  useEffect(() => {
    fetchAll();
  }, []);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setFilter({ name: event.target.value });
    },
    [searchExercises],
  );

  const handleResetFilter = useCallback(() => {
    setFilter({ name: '' });
  }, []);

  return (
    <Autocomplete
      value={props.value}
      options={searchExercises}
      getOptionSelected={(option, value) =>
        option.exerciseId ? option.exerciseId === value.exerciseId : false
      }
      getOptionLabel={(option) => option.name ?? ''}
      limitTags={3}
      onOpen={handleResetFilter}
      onChange={(_, values) => props.onChange(values)}
      onClose={handleResetFilter}
      noOptionsText="No exercises exists"
      loadingText="Searching for exercises..."
      getLimitTagsText={(more) => `+${more} more`}
      renderOption={(option, state) => (
        <ListItem disabled={state.selected}>
          <ListItemText
            primary={option.name}
            secondary={`Sets: ${option.sets ?? ''} ${
              option.repetitions === 0
                ? `Time: ${option.time ?? ''}`
                : `Repetions: ${option.repetitions ?? ''}`
            }`}
          />
        </ListItem>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          inputProps={{ ...params.inputProps }}
          label="Exercises"
          variant="outlined"
          onChange={handleInputChange}
          InputProps={{
            ...params.InputProps,
            endAdornment: <Search />,
          }}
        />
      )}
    />
  );
};
