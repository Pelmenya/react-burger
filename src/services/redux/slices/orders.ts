import { createSlice } from '@reduxjs/toolkit';
import { Nullable } from '../../../utils/types/nullable';
import { OrdersType } from '../../../utils/types/orders';

export interface OrdersStateType {
  socket?: 'user-orders' | 'all-orders';
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
    wsInitAllOrders: (state, action) => {
      state.socket = 'all-orders';
    },
    wsInitUserOrders: (state, action) => {
      state.socket = 'user-orders';
    },
    wsClose: (state) => {
      state.socket = undefined;
    },
    clearOrdersError: (state) => {
      state.error = undefined;
    },
    setOrdersData: (state, action) => {
      state.ordersData = action.payload;
    },
  },
});

export const {
  clearOrdersError,
  setOrdersData,
  wsInitAllOrders,
  wsInitUserOrders,
} = ordersSlice.actions;
export const ordersReducer = ordersSlice.reducer;
