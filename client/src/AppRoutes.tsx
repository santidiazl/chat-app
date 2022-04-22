import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './components/Home';
import SnackbarError from './components/SnackbarError';

import { useFetchUserQuery } from './store/api';

const AppRoutes = () => {
  const { data, isLoading, isFetching, isError, error } =
    useFetchUserQuery(null);
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {isError && (
        <SnackbarError
          setSnackBarOpen={setSnackBarOpen}
          error={error as FetchBaseQueryError}
          snackBarOpen={snackBarOpen}
        />
      )}
      <Routes>
        <Route path="/" element={data?.id ? <Home /> : <SignIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
