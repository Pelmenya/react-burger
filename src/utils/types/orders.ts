export interface OrderType {
  ingredients: string[];
  _id: string;
  status: 'created' | 'pending' | 'done';
  number: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrdersType {
  success: boolean;
  orders: OrdersType[];
  total: number;
  totalToday: number;
}
