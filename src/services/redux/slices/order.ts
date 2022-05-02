import { createSlice } from '@reduxjs/toolkit';
import { LoadingType } from '../../../utils/types/loading';
import { Nullable } from '../../../utils/types/nullable';
export interface OrderStateType extends LoadingType {
  isOpen: boolean;
  num: Nullable<string>;
  ingredientsIds: string[];
  total: number;
  error?: string;
}

const initialIngredientsState = {
  isOpen: false,
  loading: 'idle',
  num: null,
  total: 0,
  ingredientsIds: [],
} as OrderStateType;

const orderSlice = createSlice({
  name: 'currentIngredient',
  initialState: initialIngredientsState,
  reducers: {
    setIngredientsIds: (state, action) => {
      state.ingredientsIds = action.payload;
    },
    setOrderTotal: (state, action) => {
      state.total = action.payload;
    },
    resetOrder: (state) => {
      state.isOpen = false;
      state.num = null;
    },
  },
});

export const { setIngredientsIds, setOrderTotal, resetOrder } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
