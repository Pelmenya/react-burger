import { SERVER, ORDERS_END_POINTS } from '../utils/api-constants/server';

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
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Ingredients request error');
      })
      .catch((err) => console.log(err));
  };
}

export const ordersAPI = new OrdersAPI(SERVER);
