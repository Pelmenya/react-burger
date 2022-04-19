import { SERVER, SERVER_API_END_POINTS } from '../utils/api-constants/server';

class DataAPI {
  server: string;

  constructor (server: string) {
    this.server = server;
  }

  getIngredients = () => {
    return fetch(`${this.server}${SERVER_API_END_POINTS.GET_INGREDIENTS}`)
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          return res.json();
        }
        throw new Error('Data request error');
      })
      .catch((err) => console.log(err));
  };
}

export const dataAPI = new DataAPI(`${SERVER}`);
