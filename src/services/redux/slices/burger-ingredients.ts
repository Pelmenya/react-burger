import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ingredientsAPI } from '../../../api/ingredients-api';
import { BurgerIngredientsType } from '../../../utils/types/burger-ingredients';
import { LoadingType } from '../../../utils/types/loading';
export interface BurgerIngredientsStateType extends BurgerIngredientsType, LoadingType {
  currentTab: 'buns' | 'sauces' | 'toppings';
}

const initialIngredientsState = {
  loading: 'idle',
  currentTab: 'buns',
  ingredients: [],
} as BurgerIngredientsStateType;

export const fetchIngredients = createAsyncThunk('burgerIngredients/fetchIngredients', async () => {
  try {
    const response = await ingredientsAPI.getIngredients();
    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
});

const burgerIngredientsSlice = createSlice({
  name: 'burgerIngredients',
  initialState: initialIngredientsState,
  reducers: {
    setCurrentTab: (state, action) => {
      state.currentTab = action.payload;
    },
    updateCountIngredient: (state, action) =>{
      state.ingredients = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(fetchIngredients.fulfilled, (state, action) => {
      state.ingredients = action.payload;
      state.loading = 'succeeded';
    });
    builder.addCase(fetchIngredients.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.error.message;
    });
  },
});

export const { setCurrentTab, updateCountIngredient } = burgerIngredientsSlice.actions;
export const burgerIngredientsReducer = burgerIngredientsSlice.reducer;
