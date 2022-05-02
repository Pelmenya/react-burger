import { OrderStateType } from "../slices/order";

interface State {
  order: OrderStateType;
}

export const getOrderState = (state: State) => state.order;