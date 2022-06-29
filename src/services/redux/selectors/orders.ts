import { OrdersStateType } from "../slices/orders";

interface State {
  ordersData: OrdersStateType;
}

export const getOrdersState = (state: State) => state.ordersData;