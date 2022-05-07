import { createSlice } from '@reduxjs/toolkit';

export interface HeaderNavStateType {
  activeLink: 'main' | 'profile' | 'orders-flow';
}

const initialHeaderNavState = {
  activeLink: 'main',
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
