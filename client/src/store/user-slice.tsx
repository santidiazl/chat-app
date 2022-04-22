import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from '../types';

const initialState: User = {} as User;

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userReceived(state: User, action: PayloadAction<User>) {
      const { id, username, email, photoUrl, token } = action.payload;
      state.id = id;
      state.username = username;
      state.email = email;
      state.photoUrl = photoUrl;
      state.token = token;
    },
  },
});

export const { userReceived } = user.actions;
export default user.reducer;
