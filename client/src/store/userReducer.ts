import { AnyAction } from '@reduxjs/toolkit';

import { User } from '../types';

const GET_USER = 'GET_USER';
const SET_FETCHING_STATUS = 'SET_FETCHING_STATUS';

// ACTIONS

export const getUser = (user: User) => ({
  type: GET_USER,
  payload: {
    user,
  },
});

export const setFetchingStatus = (fetching: boolean) => ({
  type: SET_FETCHING_STATUS,
  payload: {
    fetching,
  },
});

// REDUCER

const userReducer = (state = { fetching: true }, action: AnyAction) => {
  switch (action.type) {
    case GET_USER:
      return action.payload.user;
    case SET_FETCHING_STATUS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
