import React, { useState } from 'react';
import socket from './socket';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Grid,
  Box,
  Button,
  FormControl,
  TextField,
  FormHelperText,
} from '@mui/material';

import { User } from './types';
import { RootState, AppDispatch } from './store';
import { useSignUpMutation } from './store/api';
import { getUser } from './store/userReducer';

type Props = {
  user: User;
  getUser: (user: User) => void;
};

const Page = ({ user, getUser }: Props) => {
  const navigate = useNavigate();
  const [signUp] = useSignUpMutation();
  const [mismatchError, setMismatchError] = useState(false);

  const handleCreateAccount = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const form = evt.target as HTMLFormElement;
    const username = form.username.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirm = form.confirm.value;

    if (!password !== confirm) {
      setMismatchError(true);
    }

    const user = await signUp({ username, password, email }).unwrap();
    localStorage.setItem('chat-token', user.token);
    getUser(user);
    socket.emit('go-online', user.id);
  };

  if (user.id) {
    navigate('/home');
  }
  return (
    <Grid container>
      <Box>
        <Grid container item>
          <Button onClick={() => navigate('/signin')}>Sign in instead</Button>
        </Grid>
        <form onSubmit={handleCreateAccount}>
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
              Create
            </Button>
          </Grid>
        </form>
      </Box>
    </Grid>
  );
};

const mapStateToProps = ({ user }: RootState) => {
  return {
    user,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    getUser: (user: User) => {
      dispatch(getUser(user));
    },
  };
};

const SignUp = connect(mapStateToProps, mapDispatchToProps)(Page);

export default SignUp;
