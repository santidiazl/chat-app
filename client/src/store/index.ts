import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import userSlice from './user-slice';
import { chatApi } from './api';

export const store = configureStore({
  reducer: { user: userSlice, [chatApi.reducerPath]: chatApi.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(chatApi.middleware, logger),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
