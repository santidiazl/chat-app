import React from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid, Box, Button, FormControl, TextField } from '@mui/material';

import { getUser } from './store/userReducer';
import { RootState, AppDispatch } from './store';
import { useSignInMutation } from './store/api';
import { User } from './types';

type Props = {
  user: User;
  getUser: (user: User) => void;
};

const Page = ({ user, getUser }: Props): JSX.Element => {
  const navigate = useNavigate();
  const [signIn] = useSignInMutation();

  const handleSignIn = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const form = evt.target as HTMLFormElement;
    const username = form.username.value;
    const password = form.password.value;

    const user = await signIn({ username, password }).unwrap();
    localStorage.setItem('chat-token', user.token);
    getUser(user);
  };

  if (user.id) {
    navigate('/home');
  }

  return (
    <Grid container>
      <Box>
        <Grid container item>
          <Button onClick={() => navigate('/signup')}>Create an account</Button>
        </Grid>
        <form onSubmit={handleSignIn}>
          <Grid>
            <Grid>
              <FormControl margin="normal" required>
                <TextField
                  aria-label="username"
                  label="Username"
                  name="username"
                  type="text"
                />
              </FormControl>
            </Grid>
            <FormControl margin="normal" required>
              <TextField
                label="password"
                aria-label="password"
                type="password"
                name="password"
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

const SignIn = connect(mapStateToProps, mapDispatchToProps)(Page);

export default SignIn;
