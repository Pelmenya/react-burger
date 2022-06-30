export interface OrderType {
  ingredients: string[];
  _id: string;
  status: 'created' | 'pending' | 'done';
  number: number;
  createdAt: string;
  updatedAt: string;
  name: string;
}

export interface OrdersType {
  success: boolean;
  orders: OrderType[];
  total: number;
  totalToday: number;
}
