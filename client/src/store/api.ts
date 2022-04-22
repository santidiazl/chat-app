import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ThunkDispatch, AnyAction } from '@reduxjs/toolkit';

import { User } from '../types';
import { userOnline } from '../store/utils/thunkCreators';

const dispatchUserOnline = async (
  _: null | Partial<User>,
  {
    dispatch,
    queryFulfilled,
  }: {
    dispatch: ThunkDispatch<any, any, AnyAction>;
    queryFulfilled: any;
  },
) => {
  try {
    const { data } = await queryFulfilled;
    console.log('Dispatching user: ', data);
    dispatch(userOnline(data));
  } catch (error) {}
};

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('authorization') || null;
      if (token) {
        headers.set('authorization', token);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    fetchUser: build.query<User, null>({
      query: () => ({
        url: `/auth/user`,
        method: 'GET',
      }),
      onQueryStarted: dispatchUserOnline,
    }),
    signIn: build.mutation<User, Partial<User>>({
      query: (body) => ({
        url: `/signin`,
        method: 'POST',
        body,
      }),
      onQueryStarted: async (
        _: null | Partial<User>,
        {
          dispatch,
          queryFulfilled,
        }: {
          dispatch: ThunkDispatch<any, any, AnyAction>;
          queryFulfilled: any;
        },
      ) => {
        try {
          const { data } = await queryFulfilled;
          console.log('Dispatching user: ', data);
          dispatch(userOnline(data));
        } catch (error) {}
      },
    }),
    signUp: build.mutation<User, Partial<User>>({
      query: (body) => ({
        url: `/signup`,
        method: 'POST',
        body,
      }),
      onQueryStarted: dispatchUserOnline,
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation, useFetchUserQuery } =
  chatApi;
