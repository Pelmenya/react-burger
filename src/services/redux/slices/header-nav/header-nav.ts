import { createSlice } from '@reduxjs/toolkit';

export interface HeaderNavStateType {
  activeLink: '/' | 'profile' | 'feed';
}

export const initialHeaderNavState = {
  activeLink: '/',
} as HeaderNavStateType;

const headerNavSlice = createSlice({
  name: 'headerNav',
  initialState: initialHeaderNavState,
  reducers: {
    setActiveLink: (state, action) => {
      state.activeLink = action.payload;
    },
  },
});

export const { setActiveLink } = headerNavSlice.actions;
export const headerNavReducer = headerNavSlice.reducer;
