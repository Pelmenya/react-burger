import { headers } from '../utils/api-constants/headers';
import { SERVER, USER_END_POINTS } from '../utils/api-constants/server';
import { checkResponse } from '../utils/functions/checkResponse';

export type TForgotPassword = {
  password: string;
};

export type TResetPassword = TForgotPassword & {
  token: string;
};

class UserAPI {
  server: string;

  constructor (server: string) {
    this.server = server;
  }

  postForgotPassword = async (data: TForgotPassword) => {
    return fetch(`${this.server}${USER_END_POINTS.POST_FORGOT_PASSWORD}`, {
      method: 'POST',
      ...headers,
      body: JSON.stringify(data),
    }).then(checkResponse);
  };

  postResetPassword = async (data: TResetPassword) => {
    return fetch(`${this.server}${USER_END_POINTS.POST_RESET_PASSWORD}`, {
      method: 'POST',
      ...headers,
      body: JSON.stringify(data),
    }).then(checkResponse);
  };
}

export const userAPI = new UserAPI(SERVER);
