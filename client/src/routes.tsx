import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';

import SignIn from './SignIn';
import SignUp from './SignUp';
import { AppDispatch, RootState } from './store';

const AppRoutes = () => {
  //   const [errorMessage, setErrorMessage] = useState('');
  //   const [snackBarOpen, setSnackBarOpen] = useState(false);

  // useEffect(() => {
  //   fetchUser();
  // }, [fetchUser]);
  return (
    <>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
};

// const mapStateToProps = ({ user }: RootState) => ({
//   user,
// });

// const mapDispatchToProps = (dispatch: AppDispatch) => ({
//   fetchUser() {
//     dispatch();
//   },
// });

export default AppRoutes;
