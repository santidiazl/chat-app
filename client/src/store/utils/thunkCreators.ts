import { AnyAction } from '@reduxjs/toolkit';
import { ThunkAction } from '@reduxjs/toolkit';

import { setFetchingStatus } from '../userReducer';
import { RootState } from '..';

type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

export const fetchUser = (): AppThunk => async (dispatch) => {
  dispatch(setFetchingStatus(true));
  try {
  } catch (err) {
    console.error(err);
  }
};
