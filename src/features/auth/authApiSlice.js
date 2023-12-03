import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: () => ({
        url: "/myself",
        method: "GET",
      }),
    }),
    signUp: builder.mutation({
      query: (credentials) => ({
        url: "/signup",
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useLoginMutation, useSignUpMutation } = authApiSlice;
