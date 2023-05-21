import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    commentsData: []  
};

export const commentsDataSlice = createSlice({
  name: 'name',
  initialState,
  reducers: { setCommentsData: (state, { payload }) => { state.commentsData = payload } },
});

export const {setCommentsData} = commentsDataSlice.actions;

export default commentsDataSlice.reducer;

// Selector
export const selectCommentsData = (state) => state.commentsData.commentsData
