import { createSlice } from '@reduxjs/toolkit';
import { BurgerIngredientType } from '../../../utils/types/burger-ingredient';

export interface BurgerConstructorStateType {
  bun?:BurgerIngredientType;
  toppings: BurgerIngredientType[];
}

const initialBurgerConstructorState = {
  toppings: [],
} as BurgerConstructorStateType;

const burgerConstractorSlice = createSlice({
  name: 'currentIngredient',
  initialState: initialBurgerConstructorState,
  reducers: {
    setBun: (state, action) => {
      state.bun = action.payload;
    },
    setToppings: (state, action) => {
      state.toppings = action.payload;
    },
  },
});

export const { setBun, setToppings } = burgerConstractorSlice.actions;
export const burgerConstructorReducer = burgerConstractorSlice.reducer;
