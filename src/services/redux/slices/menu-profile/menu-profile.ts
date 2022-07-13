import { createSlice } from '@reduxjs/toolkit';

export interface MenuProfileStateType {
  activeItem: 'logout' | 'profile' | 'orders';
}

export const initialMenuProfileState = {
  activeItem: 'profile',
} as MenuProfileStateType;

const menuProfileSlice = createSlice({
  name: 'menuProfile',
  initialState: initialMenuProfileState,
  reducers: {
    setActiveMenuProfileItem: (state, action) => {
      state.activeItem = action.payload;
    },
  },
});

export const { setActiveMenuProfileItem } = menuProfileSlice.actions;
export const menuProfileReducer = menuProfileSlice.reducer;
