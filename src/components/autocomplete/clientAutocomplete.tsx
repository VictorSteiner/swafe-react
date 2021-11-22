/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-bind */
import { ListItem, ListItemText, TextField } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { NoUndefinedField } from '../../api/types';
import { User } from '../../api/__generated__';
import { useStoreActions, useStoreState } from '../../hooks/useStore';

interface ClientAutocompleteProps {
  onChange: (value: number | null) => void;
  value: number | null;
}

export const ClientAutocomplete: React.FC<ClientAutocompleteProps> = ({
  ...props
}) => {
  const { clients } = useStoreState((state) => state.user);
  const { fetchAll, setFilter } = useStoreActions((action) => action.user);
  const [searchResult, setSearchResult] = useState<User[]>(clients);
  const user = useMemo(
    () =>
      (clients.find(
        (x) => x.userId === props.value,
      ) as NoUndefinedField<User>) ?? null,
    [],
  );

  useEffect(() => {
    fetchAll();
    setFilter({ name: '' });
  }, []);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearchResult(
        clients.filter((x) =>
          `${x.firstName} ${x.lastName}`
            .toLowerCase()
            .includes(event.target.value.toLowerCase()),
        ),
      );
    },
    [clients],
  );

  return (
    <Autocomplete
      multiple={false}
      value={user}
      options={searchResult}
      getOptionSelected={(option, value) =>
        option.userId ? option.userId === value.userId : false
      }
      getOptionLabel={(option) => `${option.lastName}, ${option.firstName}`}
      limitTags={3}
      onChange={(_, value) => {
        props.onChange(value?.userId ?? null);
      }}
      noOptionsText="No exercises exists"
      loadingText="Searching for exercises..."
      getLimitTagsText={(more) => `+${more} more`}
      disableClearable
      renderOption={(option, state) => (
        <ListItem disabled={state.selected}>
          <ListItemText
            primary={`${option.lastName}, ${option.firstName}`}
            secondary={option.email}
          />
        </ListItem>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          inputProps={{ ...params.inputProps }}
          label="Client"
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
