import { createSlice } from '@reduxjs/toolkit';
import { BurgerIngredientType } from '../../../utils/types/burger-ingredient';
import { Nullable } from '../../../utils/types/nullable';

export interface BurgerConstructorStateType {
  bun: Nullable<BurgerIngredientType>;
  toppings: Nullable<BurgerIngredientType[]>
}

const initialIngredientsState = {
} as BurgerConstructorStateType;

const burgerConstractorSlice = createSlice({
  name: 'currentIngredient',
  initialState: initialIngredientsState,
  reducers: {
    setBun: (state, action) => {
      state.bun = action.payload;
    },
    setToppings: (state, action) => {
      state.toppings = action.payload
    },
  },
});

export const { setBun } = burgerConstractorSlice.actions;
export const burgerConstractorReducer = burgerConstractorSlice.reducer;