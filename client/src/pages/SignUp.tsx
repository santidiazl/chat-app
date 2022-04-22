import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Grid,
  Box,
  Button,
  FormControl,
  TextField,
  FormHelperText,
} from '@mui/material';

import { User } from '../types';
import { RootState } from '../store';
import { useSignUpMutation } from '../store/api';

const SignUp = (): JSX.Element => {
  const user: User = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const [signUp] = useSignUpMutation();
  const [mismatchError, setMismatchError] = useState(false);

  const handleSignUp = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const form = evt.target as HTMLFormElement;
    const username = form.username.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirm = form.confirm.value;

    if (!password !== confirm) {
      setMismatchError(true);
    }

    await signUp({ username, password, email }).unwrap();
  };

  if (user.id) {
    navigate('/home');
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
          <Button onClick={() => navigate('/signin')}>Sign in instead</Button>
        </Grid>
        <form onSubmit={handleSignUp}>
          <Grid>
            <Grid>
              <FormControl>
                <TextField
                  aria-label="username"
                  label="Username"
                  name="username"
                  type="text"
                  required
                />
              </FormControl>
            </Grid>
            <Grid>
              <FormControl>
                <TextField
                  label="E-mail address"
                  aria-label="e-mail address"
                  type="email"
                  name="email"
                  required
                />
              </FormControl>
            </Grid>
            <Grid>
              <FormControl error={mismatchError}>
                <TextField
                  aria-label="password"
                  label="Password"
                  type="password"
                  inputProps={{ minLength: 6 }}
                  name="password"
                  required
                />
              </FormControl>
            </Grid>
            <Grid>
              <FormControl error={mismatchError}>
                <TextField
                  label="Confirm"
                  aria-label="Confirm password"
                  type="password"
                  inputProps={{ minLength: 6 }}
                  name="confirm"
                  required
                />
                {mismatchError && (
                  <FormHelperText>
                    Those passwords didn’t match. Try again.
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Button type="submit" variant="contained" size="large">
              Create account
            </Button>
          </Grid>
        </form>
      </Box>
    </Grid>
  );
};

export default SignUp;
