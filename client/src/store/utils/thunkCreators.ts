import { AnyAction } from '@reduxjs/toolkit';
import { ThunkAction } from '@reduxjs/toolkit';

import { userReceived } from '../user-slice';
import { RootState } from '..';
import { User } from '../../types';
import socket from '../../socket';

type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

export const userOnline =
  (user: User): AppThunk =>
  async (dispatch) => {
    localStorage.setItem('authorization', user.token || '');
    dispatch(userReceived(user));
    socket.emit('user-online', user.id);
  };
