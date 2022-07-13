import { createSlice } from '@reduxjs/toolkit';
import { BurgerIngredientType } from '../../../../utils/types/burger-ingredient';

export interface CurrentIngredientStateType {
  isOpen: boolean;
  ingredient?: BurgerIngredientType;
}

export const initialCurrentIngredientState = {
  isOpen: false,
} as CurrentIngredientStateType;

const currentIngredientSlice = createSlice({
  name: 'currentIngredient',
  initialState: initialCurrentIngredientState,
  reducers: {
    setCurrentIngredient: (state, action) => {
      state.ingredient = action.payload;
      state.isOpen = true;
    },
    resetCurrentIngredient: (state) => {
      state.isOpen = false;
      state.ingredient = undefined;
    },
  },
});

export const { setCurrentIngredient, resetCurrentIngredient } = currentIngredientSlice.actions;
export const currentIngredientReducer = currentIngredientSlice.reducer;
