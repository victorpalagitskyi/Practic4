import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './filterSlice';
import { commentApi } from './commentApi';
import  commentsDataSlice  from './commentsDataSlice';

export const store = configureStore({
  reducer: {
    filter: filterSlice,
    commentsData: commentsDataSlice,
    [commentApi.reducerPath]: commentApi.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    commentApi.middleware,
  ],
});
