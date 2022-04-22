import React from 'react';
import { FormControl, FilledInput, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Search = () => {
  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) =>
    evt.preventDefault();

  return (
    <form onSubmit={handleSubmit}>
      <FormControl fullWidth hiddenLabel>
        <FilledInput
          name="search"
          disableUnderline
          placeholder="Search"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </FormControl>
    </form>
  );
};

export default Search;
