import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Grid, Box, Button, FormControl, TextField } from '@mui/material';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

import { RootState } from '../store';
import { useSignInMutation } from '../store/api';

const SignIn = (): JSX.Element => {
  const navigate = useNavigate();
  const [signIn, { data, error }] = useSignInMutation();
  let errorData: any = null;

  if (error) {
    errorData = (error as FetchBaseQueryError).data;
  }

  const handleSignIn = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const form = evt.target as HTMLFormElement;
    const username = form.username.value;
    const password = form.password.value;

    await signIn({ username, password }).unwrap();
  };

  if (data?.id) {
    navigate('./home');
  }

  return (
    <Grid
      container
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Box>
        <Grid container item>
          <Button onClick={() => navigate('/signup')}>Create account</Button>
        </Grid>
        <form onSubmit={handleSignIn}>
          <Grid>
            <Grid>
              <FormControl margin="normal" required>
                <TextField
                  error={Boolean(errorData?.username)}
                  aria-label="username"
                  label="Username"
                  name="username"
                  type="text"
                  helperText={errorData?.username ? errorData?.error : ''}
                />
              </FormControl>
            </Grid>
            <FormControl margin="normal" required>
              <TextField
                error={Boolean(errorData?.password)}
                label="Password"
                aria-label="password"
                type="password"
                name="password"
                helperText={errorData?.password ? errorData?.error : ''}
              />
            </FormControl>
            <Grid>
              <Button type="submit" variant="contained" size="large">
                Sign in
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Grid>
  );
};

export default SignIn;
