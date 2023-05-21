import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_ENDPOINT = '/comments';
const BASE_URL = 'https://6469cb4503bb12ac2092bf99.mockapi.io';


export const commentApi = createApi({
  reducerPath: 'comments',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ['Comments'],
  endpoints: (builder) => ({
    getComments: builder.query({
      query: () => API_ENDPOINT,  
    }),
    addComments: builder.mutation({
      query: (body) => ({
        url: API_ENDPOINT,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Comments'],
    }),
    updateCommentsLike: builder.mutation({
      query: ({id, ...body}) => ({
        url: `${API_ENDPOINT}/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Comments'],
    }),
    deleteComments: builder.mutation({
      query: ( id ) => ({
        url: `${API_ENDPOINT}/${id}`,
        method: 'Delete',
      }),
      invalidatesTags: ['Comments'],
    })
  }),
  })


export const {useGetCommentsQuery, useAddCommentsMutation, useUpdateCommentsLikeMutation, useDeleteCommentsMutation} = commentApi;
