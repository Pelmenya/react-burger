import { createSlice } from '@reduxjs/toolkit';
import { Nullable } from '../../../utils/types/nullable';
import { OrdersType, OrderType } from '../../../utils/types/orders';

export interface OrdersStateType {
  socket: boolean;
  ordersData: Nullable<OrdersType>;
  viewOrder?: OrderType;
  error?: string;
}

const initialOrdersState = {
  ordersData: null,
  socket: false,
} as OrdersStateType;

const ordersSlice = createSlice({
  name: 'orders',
  initialState: initialOrdersState,
  reducers: {
    wsInit: (state, action) => {
      state.socket = true;
    },
    wsClose: (state) => {
      state.socket = false;
      state.ordersData = null;
    },
    clearOrdersError: (state) => {
      state.error = undefined;
    },
    setOrdersData: (state, action) => {
      state.ordersData = action.payload;
    },
    clearOrdersData: (state) => {
      state.ordersData = null;
    },
    setViewOrder: (state, action) => {
      state.viewOrder = action.payload;
    },
  },
});

export const {
  clearOrdersError,
  setOrdersData,
  setViewOrder,
  clearOrdersData,
  wsInit,
  wsClose,
} = ordersSlice.actions;
export const ordersReducer = ordersSlice.reducer;
