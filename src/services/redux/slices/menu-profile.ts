import { createSlice } from '@reduxjs/toolkit';

export interface MenuProfileStateType {
  activeItem: 'logout' | 'profile' | 'feed';
}

const initialMenuProfileState = {
  activeItem: 'profile',
} as MenuProfileStateType;

const menuProfileSlice = createSlice({
  name: 'menuProfile',
  initialState: initialMenuProfileState,
  reducers: {
    setActiveItem: (state, action) => {
      state.activeItem = action.payload;
    },
  },
});

export const { setActiveItem } = menuProfileSlice.actions;
export const menuProfileReducer = menuProfileSlice.reducer;
