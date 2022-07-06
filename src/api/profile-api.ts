import { headers } from '../utils/api-constants/headers';
import { SERVER, PROFILE_END_POINTS } from '../utils/api-constants/server';
import { checkResponse } from '../utils/functions/check-response';
import { UserData } from './auth-api';

export type TForgotPassword = {
  password: string;
};

export type TResetPassword = TForgotPassword & {
  token: string;
};
export interface AuthUserData {
  userData: UserData;
  token: string;
}
class ProfileAPI {
  server: string;

  constructor (server: string) {
    this.server = server;
  }

  getUser = async (token: string) => {
    const reqHeaders = {
      ...headers.headers,
      authorization: token,
    };
    return fetch(`${this.server}${PROFILE_END_POINTS.GET_USER}`, {
      headers: { ...reqHeaders },
    }).then(checkResponse);
  };

  patchUser = async (authUserData: AuthUserData) => {
    const reqHeaders = {
      ...headers.headers,
      authorization: authUserData.token,
    };
    return fetch(`${this.server}${PROFILE_END_POINTS.PATCH_USER}`, {
      method: 'PATCH',
      headers: { ...reqHeaders },
      body: JSON.stringify(authUserData.userData),
    }).then(checkResponse);
  };

  postForgotPassword = async (data: TForgotPassword) => {
    return fetch(`${this.server}${PROFILE_END_POINTS.POST_FORGOT_PASSWORD}`, {
      method: 'POST',
      ...headers,
      body: JSON.stringify(data),
    }).then(checkResponse);
  };

  postResetPassword = async (data: TResetPassword) => {
    return fetch(`${this.server}${PROFILE_END_POINTS.POST_RESET_PASSWORD}`, {
      method: 'POST',
      ...headers,
      body: JSON.stringify(data),
    }).then(checkResponse);
  };
}

export const profileAPI = new ProfileAPI(SERVER);
