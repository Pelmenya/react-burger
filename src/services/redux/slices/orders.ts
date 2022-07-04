import { createSlice } from '@reduxjs/toolkit';
import { Nullable } from '../../../utils/types/nullable';
import { OrdersType, OrderType } from '../../../utils/types/orders';

export interface OrdersStateType {
  socketUser: boolean;
  socketAll: boolean;
  ordersData: Nullable<OrdersType>;
  ordersUserData: Nullable<OrdersType>;
  viewOrder: Nullable<OrderType>;
  error?: string;
}

const initialOrdersState = {
  ordersData: null,
  ordersUserData: null,
  viewOrder: null,
  socketAll: false,
  socketUser: false,
} as OrdersStateType;

const ordersSlice = createSlice({
  name: 'orders',
  initialState: initialOrdersState,
  reducers: {
    wsInitAllOrders: (state) => {
      state.socketAll = true;
    },
    wsInitUserOrders: (state) => {
      state.socketUser = true;
    },
    wsClose: (state) => {
      state.socketUser = false;
      state.ordersUserData = null;
    },
    clearOrdersError: (state) => {
      state.error = undefined;
    },
    setOrdersData: (state, action) => {
      state.ordersData = action.payload;
    },
    setOrdersUserData: (state, action) => {
      state.ordersUserData = action.payload;
    },
    setViewOrder: (state, action) => {
      state.viewOrder = action.payload;
    },
    clearViewOrder: (state, action) => {
      state.viewOrder = null;
    },
  },
});

export const {
  clearOrdersError,
  setOrdersData,
  setOrdersUserData,
  setViewOrder,
  clearViewOrder,
  wsInitAllOrders,
  wsInitUserOrders,
  wsClose,
} = ordersSlice.actions;
export const ordersReducer = ordersSlice.reducer;
