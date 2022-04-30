import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ingredientsAPI } from '../../../api/ingredients-api';
import { BurgerIngredientsType } from '../../../utils/types/burger-ingredients';

export interface BurgerIngredientsStateType extends BurgerIngredientsType {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  currentTab: 'buns' | 'sauses' | 'toppings';
  bunsRef: null | JSX.Element
}

const initialIngredientsState = {
  loading: 'idle',
  currentTab: 'buns',
  ingredients: [],
} as BurgerIngredientsStateType;

export const fetchIngredients = createAsyncThunk('burgerIngredients/fetchIngredients', async () => {
  const response = await ingredientsAPI.getIngredients();
  return response.data;
});

const burgerIngredientsSlice = createSlice({
  name: 'burgerIngredients',
  initialState: initialIngredientsState,
  reducers: {
    setCurrentTab: (state, action) => {
      state.currentTab = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(fetchIngredients.fulfilled, (state, action) => {
      state.ingredients = action.payload;
      state.loading = 'succeeded';
    });
    builder.addCase(fetchIngredients.rejected, (state) => {
      state.loading = 'failed';
    });
  },
});

export const { setCurrentTab } = burgerIngredientsSlice.actions;
export const burgerIngredientsReducer = burgerIngredientsSlice.reducer;
