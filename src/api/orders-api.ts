import { headers } from '../utils/api-constants/headers';
import { SERVER, ORDERS_END_POINTS } from '../utils/api-constants/server';
import { checkResponse } from '../utils/functions/checkResponse';

export interface IngredientsIdsPropsType {
  ingredientsIds: string[];
  token: string;
}

class OrdersAPI {
  server: string;

  constructor (server: string) {
    this.server = server;
  }

  postOrders = async (orderData: IngredientsIdsPropsType) => {
    const reqHeaders = {
      ...headers.headers,
      authorization: orderData.token,
    };
    console.log(orderData.ingredientsIds);
    return fetch(`${this.server}${ORDERS_END_POINTS.POST_ORDERS}`, {
      method: 'POST',
      headers: { ...reqHeaders },
      body: JSON.stringify({ ingredients: orderData.ingredientsIds }),
    }).then(checkResponse);
  };
}

export const ordersAPI = new OrdersAPI(SERVER);
