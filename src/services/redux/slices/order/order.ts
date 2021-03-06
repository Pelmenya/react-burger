import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IngredientsIdsPropsType, ordersAPI } from '../../../../api/orders-api';
import { LoadingType } from '../../../../utils/types/loading';
import { Nullable } from '../../../../utils/types/nullable';
export interface OrderStateType extends LoadingType {
  isOpen: boolean;
  num: Nullable<string>;
  ingredientsIds: string[];
  total: number;
  error?: string;
}

export const initialOrderState = {
  isOpen: false,
  loading: 'idle',
  num: null,
  total: 0,
  ingredientsIds: [],
} as OrderStateType;

export const postOrders = createAsyncThunk(
  'order/postOrders',
  async (body: IngredientsIdsPropsType) => {
    const response = await ordersAPI.postOrders(body);
    return response;
  },
);

const orderSlice = createSlice({
  name: 'order',
  initialState: initialOrderState,
  reducers: {
    setIngredientsIds: (state, action) => {
      state.ingredientsIds = action.payload;
    },
    setOrderTotal: (state, action) => {
      state.total = action.payload;
    },
    setOpenOrderModal: (state, action) => {
      state.isOpen = action.payload;
    },
    resetOrder: (state) => {
      state.isOpen = false;
      state.num = null;
    },
    clearOrderError: (state) => {
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postOrders.pending, (state) => {
      state.loading = 'pending';
      state.error = undefined;
    });
    builder.addCase(postOrders.fulfilled, (state, action) => {
      state.num = action.payload.order.number;
      state.loading = 'succeeded';
    });
    builder.addCase(postOrders.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.error.message;
    });
  },
});

export const {
  setIngredientsIds,
  setOrderTotal,
  setOpenOrderModal,
  resetOrder,
  clearOrderError,
} = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
