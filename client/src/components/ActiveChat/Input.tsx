import React, { useState } from 'react';
import { FormControl, FilledInput } from '@mui/material';

const Input = () => {
  return (
    <form>
      <FormControl>
        <FilledInput disableUnderline name="text" />
      </FormControl>
    </form>
  );
};

export default Input;
