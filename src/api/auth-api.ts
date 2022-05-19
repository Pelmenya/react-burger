import { headers } from '../utils/api-constants/headers';
import { SERVER, AUTH_END_POINTS } from '../utils/api-constants/server';
import { checkResponse } from '../utils/functions/checkResponse';

export interface UserData{
	name: string;
	email: string;
	password: string;
}

class AuthAPI {
  server: string;

  constructor (server: string) {
    this.server = server;
  }

  postRegiter = async (user: UserData) => {
    return fetch(`${this.server}${AUTH_END_POINTS.POST_REGISTER}`, {
      method: 'POST',
			...headers,
      body: JSON.stringify(user),
    }).then(checkResponse);
  };

	postLogin = async (user: Omit<UserData, 'name'>) => {
    return fetch(`${this.server}${AUTH_END_POINTS.POST_LOGIN}`, {
      method: 'POST',
			...headers,
      body: JSON.stringify(user),
    }).then(checkResponse);
  };

}

export const authAPI = new AuthAPI(SERVER);