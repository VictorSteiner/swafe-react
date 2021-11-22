/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-bind */
import { ListItem, ListItemText, TextField } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Exercise } from '../../api/__generated__';
import { useStoreActions, useStoreState } from '../../hooks/useStore';

interface ExerciseAutocompleteProps {
  onChange: (value: Exercise[]) => void;
  value: Exercise[];
}

export const ExerciseAutocomplete: React.FC<ExerciseAutocompleteProps> = ({
  ...props
}) => {
  const { exercises } = useStoreState((state) => state.exercise);
  const { fetchAll } = useStoreActions((action) => action.exercise);
  const [searchResult, setSearchResult] = useState<Exercise[]>(exercises);

  useEffect(() => {
    fetchAll();
  }, []);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearchResult(
        exercises.filter((x) =>
          x.name?.toLowerCase().includes(event.target.value.toLowerCase()),
        ),
      );
    },
    [exercises],
  );

  return (
    <Autocomplete
      multiple
      disableCloseOnSelect
      value={props.value}
      options={searchResult}
      getOptionSelected={(option, value) =>
        option.exerciseId ? option.exerciseId === value.exerciseId : false
      }
      getOptionLabel={(option) => option.name ?? ''}
      limitTags={3}
      onChange={(_, values) => props.onChange(values)}
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
