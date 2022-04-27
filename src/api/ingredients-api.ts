import { SERVER, INGREDIENTS_END_POINTS } from '../utils/api-constants/server';
import { checkResponse } from '../utils/functions/checkResponse';

class IngredientsAPI {
  server: string;

  constructor (server: string) {
    this.server = server;
  }

  getIngredients = async () => {
    return fetch(`${this.server}${INGREDIENTS_END_POINTS.GET_INGREDIENTS}`)
      .then(checkResponse)
  };
}

export const ingredientsAPI = new IngredientsAPI(SERVER);
