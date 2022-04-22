import React from 'react';
import { Button, Snackbar } from '@mui/material';
import { Close } from '@mui/icons-material';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

type Props = {
  snackBarOpen: boolean;
  setSnackBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  error: FetchBaseQueryError;
};

const SnackbarError = ({ snackBarOpen, setSnackBarOpen, error }: Props) => {
  return (
    <Snackbar
      open={snackBarOpen}
      onClose={() => setSnackBarOpen(false)}
      message={
        (error.data as string) || 'Sorry, an error occurred. Please try again'
      }
      action={
        <>
          <Button
            sx={{ color: 'white' }}
            size="small"
            onClick={() => setSnackBarOpen(false)}
          >
            <Close color="secondary" />
          </Button>
        </>
      }
      ContentProps={{
        sx: {
          backgroundColor: 'red',
          fontWeight: 'bold',
        },
      }}
    />
  );
};

export default SnackbarError;
