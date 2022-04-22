import { SERVER, SERVER_API_END_POINTS } from '../utils/api-constants/server';

class IngredientsAPI {
  server: string;

  constructor (server: string) {
    this.server = server;
  }

  getIngredients = () => {
    return fetch(`${this.server}${SERVER_API_END_POINTS.GET_INGREDIENTS}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Ingredients request error');
      })
      .catch((err) => console.log(err));
  };
}

export const ingredientsAPI = new IngredientsAPI(SERVER);
