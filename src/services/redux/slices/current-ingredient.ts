import { createSlice } from '@reduxjs/toolkit';
import { BurgerIngredientType } from '../../../utils/types/burger-ingredient';
import { Nullable } from '../../../utils/types/nullable';

export interface CurrentIngredientStateType {
  isOpen: boolean;
  ingredient: Nullable<BurgerIngredientType>;
}

const initialIngredientsState = {
  isOpen: false,
  ingredient: null,
} as CurrentIngredientStateType;

const currentIngredientSlice = createSlice({
  name: 'currentIngredient',
  initialState: initialIngredientsState,
  reducers: {
    setCurrentIngredient: (state, action) => {
      state.ingredient = action.payload;
      state.isOpen = true;
    },
    resetCurrentIngredient: (state) => {
      state.isOpen = false;
      state.ingredient = null;
    },
  },
});

export const { setCurrentIngredient, resetCurrentIngredient } = currentIngredientSlice.actions;
export const currentIngredientReducer = currentIngredientSlice.reducer;
