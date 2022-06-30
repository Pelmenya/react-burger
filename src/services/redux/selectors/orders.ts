import { OrdersStateType } from "../slices/orders";

interface State {
  orders: OrdersStateType;
}

export const getOrdersState = (state: State) => state.orders;