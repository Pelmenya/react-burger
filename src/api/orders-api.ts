import { SERVER, ORDERS_END_POINTS } from '../utils/api-constants/server';
import { checkResponse } from '../utils/functions/checkResponse';

interface IngredientsId {
  ingredients: string[];
}

class OrdersAPI {
  server: string;

  constructor (server: string) {
    this.server = server;
  }

  postOrders = async (ingredientsId: IngredientsId) => {
    return fetch(`${this.server}${ORDERS_END_POINTS.POST_ORDERS}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ingredientsId),
    }).then(checkResponse);
  };
}

export const ordersAPI = new OrdersAPI(SERVER);
