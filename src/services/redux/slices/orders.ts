import { createSlice } from '@reduxjs/toolkit';
import { Nullable } from '../../../utils/types/nullable';
import { OrdersType, OrderType } from '../../../utils/types/orders';

export interface OrdersStateType {
  socket: boolean;
  socketUrl: string;
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
      state.socketUrl = action.payload;
    },
    wsClose: (state) => {
      state.socket = false;
      state.ordersData = null;
    },
    wsOpen: (state) =>{
      state.socket = true;
    },
    wsError: (state, action) => {
      state.error = action.payload;
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
  wsOpen,
  wsError,
  wsClose,
} = ordersSlice.actions;
export const ordersReducer = ordersSlice.reducer;
