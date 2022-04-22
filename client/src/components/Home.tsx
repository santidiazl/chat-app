import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid, CssBaseline, Button } from '@mui/material';

import SidebarContainer from './SidebarContainer';
import { ActiveChat } from './ActiveChat';
import { User } from '../types';

const Home = () => {
  //   const [isSignedIn, setIsSignedIn] = useState(false);

  //   useEffect(() => {
  //     if(userInfo.)
  //   }, [user.id])

  return (
    <>
      <Button>Sign out</Button>
      <Grid>
        <CssBaseline />
        <SidebarContainer />
        <ActiveChat />
      </Grid>
    </>
  );
};

// const HomeWrapper = connect();

export default Home;
