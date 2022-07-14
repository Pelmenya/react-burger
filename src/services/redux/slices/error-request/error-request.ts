import { createSlice } from '@reduxjs/toolkit';

export interface ErrorRequestStateType {
  isError: boolean;
  message: string;
}

export const initialErrorRequestState = {
  isError: false,
  message: '',
} as ErrorRequestStateType;

const errorRequestSlice = createSlice({
  name: 'errorRequest',
  initialState: initialErrorRequestState,
  reducers: {
    setError: (state, action) => {
      state.message = action.payload;
      state.isError = true;
    },
    clearError: (state) => {
      state.message = '';
      state.isError = false;
    },
  },
});

export const { setError, clearError } = errorRequestSlice.actions;
export const errorRequestReducer = errorRequestSlice.reducer;
