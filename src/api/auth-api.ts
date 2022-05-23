import { headers } from '../utils/api-constants/headers';
import { SERVER, AUTH_END_POINTS } from '../utils/api-constants/server';
import { checkResponse } from '../utils/functions/checkResponse';

export interface UserData {
  name: string;
  email: string;
  password: string;
}

class AuthAPI {
  server: string;

  constructor (server: string) {
    this.server = server;
  }

  postRegiter = async (userData: UserData) => {
    return fetch(`${this.server}${AUTH_END_POINTS.POST_REGISTER}`, {
      method: 'POST',
      ...headers,
      body: JSON.stringify(userData),
    }).then(checkResponse);
  };

  postLogin = async (userData: Omit<UserData, 'name'>) => {
    return fetch(`${this.server}${AUTH_END_POINTS.POST_LOGIN}`, {
      method: 'POST',
      ...headers,
      body: JSON.stringify(userData),
    }).then(checkResponse);
  };

  postToken = async (refreshTokenData: { token: string | null }) => {
    return fetch(`${this.server}${AUTH_END_POINTS.POST_TOCKEN}`, {
      method: 'POST',
      ...headers,
      body: JSON.stringify(refreshTokenData),
    }).then(checkResponse);
  };
}

export const authAPI = new AuthAPI(SERVER);
