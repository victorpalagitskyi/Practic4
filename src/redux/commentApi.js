import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_ENDPOINT = '/comments';
const BASE_URL = '';


export const commentApi = createApi({
  reducerPath: 'comments',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ['Comments'],
  endpoints: (builder) => ({
    getComments: builder.query({
      query: () => 'https://api.fake.rest/aa1af2b3-7f00-479d-be6b-85a5ef53e301/get',  
    }),
    addComments: builder.mutation({
      query: (body) => ({
        url: 'https://api.fake.rest/aa1af2b3-7f00-479d-be6b-85a5ef53e301/post',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Comments'],
    }),
  }),
  })


export const {useGetCommentsQuery, useAddCommentsMutation} = commentApi;
