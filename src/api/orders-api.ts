import { headers } from '../utils/api-constants/headers';
import { SERVER, ORDERS_END_POINTS } from '../utils/api-constants/server';
import { checkResponse } from '../utils/functions/checkResponse';

export interface IngredientsIdsPropsType {
  ingredients: string[];
}

class OrdersAPI {
  server: string;

  constructor (server: string) {
    this.server = server;
  }

  postOrders = async (ingredientsIds: IngredientsIdsPropsType) => {
    return fetch(`${this.server}${ORDERS_END_POINTS.POST_ORDERS}`, {
      method: 'POST',
      ...headers,
      body: JSON.stringify({}),
    }).then(checkResponse);
  };
}

export const ordersAPI = new OrdersAPI(SERVER);
