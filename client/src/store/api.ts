import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../types';

// Define a service using a base URL and expected endpoints
export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (build) => ({
    signIn: build.mutation<User, Partial<User>>({
      query: (body) => ({
        url: `/signin`,
        method: 'POST',
        body,
      }),
    }),
    signUp: build.mutation<User, Partial<User>>({
      query: (body) => ({
        url: `/signup`,
        method: 'POST',
        body,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useSignInMutation, useSignUpMutation } = chatApi;
