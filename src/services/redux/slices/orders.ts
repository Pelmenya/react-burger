import { createSlice } from '@reduxjs/toolkit';
import { Nullable } from '../../../utils/types/nullable';
import { OrdersType } from '../../../utils/types/orders';

export interface OrdersStateType {
  ordersData: Nullable<OrdersType>;
  error?: string;
}

const initialOrdersState = {
  ordersData: null,
} as OrdersStateType;

const ordersSlice = createSlice({
  name: 'orders',
  initialState: initialOrdersState,
  reducers: {
    wsInit: () => {},
    clearOrdersError: (state) => {
      state.error = undefined;
    },
    setOrdersData: (state, action) => {
      state.ordersData = action.payload;
    },
  },
});

export const { clearOrdersError, setOrdersData, wsInit } = ordersSlice.actions;
export const ordersReducer = ordersSlice.reducer;
