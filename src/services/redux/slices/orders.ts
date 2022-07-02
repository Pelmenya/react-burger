import { createSlice } from '@reduxjs/toolkit';
import { Nullable } from '../../../utils/types/nullable';
import { OrdersType } from '../../../utils/types/orders';

export interface OrdersStateType {
  socketUser: boolean;
  socketAll: boolean;
  ordersData: Nullable<OrdersType>;
  ordersUserData: Nullable<OrdersType>;
  error?: string;
}

const initialOrdersState = {
  ordersData: null,
  ordersUserData: null,
  socketAll: false,
  socketUser: false
} as OrdersStateType;

const ordersSlice = createSlice({
  name: 'orders',
  initialState: initialOrdersState,
  reducers: {
    wsInitAllOrders: (state, action) => {
      state.socketAll = true;
    },
    wsInitUserOrders: (state, action) => {
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
  },
});

export const {
  clearOrdersError,
  setOrdersData,
  setOrdersUserData,
  wsInitAllOrders,
  wsInitUserOrders,
  wsClose,
} = ordersSlice.actions;
export const ordersReducer = ordersSlice.reducer;
